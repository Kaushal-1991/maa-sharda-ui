import { describe, expect, it } from "vitest";
import { ApiError } from "./http";
import { getDatabaseUri } from "./mongodb";

describe("environment-specific MongoDB configuration", () => {
  it("uses the development database outside production", () => {
    const uri =
      "mongodb+srv://user:password@cluster.example/maa-sharada-db-dev?retryWrites=true";

    expect(
      getDatabaseUri({
        NODE_ENV: "development",
        MONGO_URI_DEV: uri,
        MONGO_URI_PROD:
          "mongodb+srv://user:password@cluster.example/maa-sharada-db-prod",
      }),
    ).toBe(uri);
  });

  it("uses the production database in production", () => {
    const uri =
      "mongodb+srv://user:password@cluster.example/maa-sharada-db-prod?retryWrites=true";

    expect(
      getDatabaseUri({
        NODE_ENV: "production",
        MONGO_URI_DEV:
          "mongodb+srv://user:password@cluster.example/maa-sharada-db-dev",
        MONGO_URI_PROD: uri,
      }),
    ).toBe(uri);
  });

  it("rejects a URI targeting the other environment's database", () => {
    expect(() =>
      getDatabaseUri({
        NODE_ENV: "production",
        MONGO_URI_PROD:
          "mongodb+srv://user:password@cluster.example/maa-sharada-db-dev",
      }),
    ).toThrow(ApiError);
  });

  it("does not fall back to a shared legacy URI", () => {
    expect(() =>
      getDatabaseUri({
        NODE_ENV: "production",
        MONGO_URI: "mongodb+srv://user:password@cluster.example/maa-sharada-db-prod",
      }),
    ).toThrow("MONGO_URI_PROD is not configured.");
  });
});
