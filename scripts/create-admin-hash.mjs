import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const terminal = createInterface({ input: stdin, output: stdout });
const lines = terminal[Symbol.asyncIterator]();
stdout.write("Admin password (12+ characters): ");
const password = (await lines.next()).value ?? "";
stdout.write("Confirm password: ");
const confirmation = (await lines.next()).value ?? "";
terminal.close();
const passwordBytes = Buffer.from(password);
const confirmationBytes = Buffer.from(confirmation);

if (password.length < 12) {
  console.error("Choose a password with at least 12 characters.");
  process.exitCode = 1;
} else if (
  passwordBytes.length !== confirmationBytes.length ||
  !timingSafeEqual(
    passwordBytes,
    confirmationBytes.length === passwordBytes.length
      ? confirmationBytes
      : Buffer.alloc(passwordBytes.length),
  )
) {
  console.error("Passwords do not match.");
  process.exitCode = 1;
} else {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64);
  console.log(`scrypt$${salt.toString("base64url")}$${hash.toString("base64url")}`);
}
