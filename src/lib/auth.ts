import { createHmac, scrypt, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { ApiError } from "./http";

export const ADMIN_SESSION_COOKIE = "maa_admin_session";
const sessionLifetimeSeconds = 8 * 60 * 60;

export type AdminSession = {
  email: string;
  expiresAt: number;
};

function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new ApiError(503, "Admin authentication is not configured.");
  }
  return secret;
}

export function getConfiguredAdminEmail(): string {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!email) {
    throw new ApiError(503, "Admin authentication is not configured.");
  }
  return email;
}

function derivePasswordHash(password: string, salt: Buffer, length: number): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, length, (error, derivedKey) => {
      if (error) {
        reject(error);
      } else {
        resolve(derivedKey);
      }
    });
  });
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const encoded = process.env.ADMIN_PASSWORD_HASH;

  if (!encoded) {
    if (process.env.NODE_ENV === "production") {
      throw new ApiError(503, "Admin password hash is not configured.");
    }

    const developmentPassword = process.env.ADMIN_PASSWORD;
    if (!developmentPassword) {
      throw new ApiError(503, "Admin password is not configured.");
    }

    const provided = Buffer.from(password);
    const configured = Buffer.from(developmentPassword);
    return (
      provided.length === configured.length &&
      timingSafeEqual(provided, configured)
    );
  }

  const [scheme, saltText, hashText, extra] = encoded.split("$");
  if (
    scheme !== "scrypt" ||
    !saltText ||
    !hashText ||
    extra !== undefined ||
    !/^[A-Za-z0-9_-]+$/.test(saltText) ||
    !/^[A-Za-z0-9_-]+$/.test(hashText)
  ) {
    throw new ApiError(503, "Admin password hash is not configured correctly.");
  }

  const salt = Buffer.from(saltText, "base64url");
  const expected = Buffer.from(hashText, "base64url");
  if (
    salt.length < 16 ||
    salt.toString("base64url") !== saltText ||
    expected.length !== 64 ||
    expected.toString("base64url") !== hashText
  ) {
    throw new ApiError(503, "Admin password hash is not configured correctly.");
  }

  const actual = await derivePasswordHash(password, salt, expected.length);
  return timingSafeEqual(actual, expected);
}

export function createAdminSessionToken(email: string): string {
  const expiresAt = Date.now() + sessionLifetimeSeconds * 1000;
  const payload = Buffer.from(
    JSON.stringify({ email, expiresAt }),
  ).toString("base64url");
  const signature = createHmac("sha256", getAuthSecret())
    .update(payload)
    .digest("base64url");

  return `${payload}.${signature}`;
}

export function verifyAdminSessionToken(
  token: string | undefined,
): AdminSession | null {
  if (!token) {
    return null;
  }

  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra !== undefined) {
    return null;
  }

  const secret = getAuthSecret();
  const expected = createHmac("sha256", secret).update(payload).digest();
  const provided = Buffer.from(signature, "base64url");
  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    );
    if (
      !parsed ||
      typeof parsed !== "object" ||
      !("email" in parsed) ||
      !("expiresAt" in parsed) ||
      typeof parsed.email !== "string" ||
      typeof parsed.expiresAt !== "number" ||
      parsed.expiresAt <= Date.now() ||
      parsed.email !== getConfiguredAdminEmail()
    ) {
      return null;
    }

    return { email: parsed.email, expiresAt: parsed.expiresAt };
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  return verifyAdminSessionToken(
    cookieStore.get(ADMIN_SESSION_COOKIE)?.value,
  );
}

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: sessionLifetimeSeconds,
  };
}

export function requireAdminEmail(email: string): void {
  if (email.trim().toLowerCase() !== getConfiguredAdminEmail()) {
    throw new ApiError(401, "Invalid email or password.");
  }
}
