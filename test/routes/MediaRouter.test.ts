import request from "supertest";
import jwt from "jsonwebtoken";
import { createApp } from "../../src/app/app";
import { JWT_SECRET } from "../../src/utils/constants";
import { randomObjectId } from "../../src/utils/utils";
import { StatusCode } from "../../src/utils/StatusCode";
import jsonData from "../../src/data/data.json";
import { MediaObject } from "../../src/data/MediaData";

const mediaData: MediaObject[] = jsonData as MediaObject[];

const app = createApp();

describe("JWT Authentication", () => {
  it("failure case - JWT is missing", async () => {
    const response = await request(app).get(`/data`);

    expect(response.status).toBe(StatusCode.UNAUTHORIZED);
    expect(response.body).toEqual({ message: "Invalid Credentials" });
  });

  it("failure case - not a valid JWT", async () => {
    const response = await request(app)
      .get(`/data`)
      .set("Authorization", `Bearer ASDSADASD`);

    expect(response.status).toBe(StatusCode.UNAUTHORIZED);
    expect(response.body).toEqual({ message: "Invalid Credentials" });
  });

  it("failure case - JWT is expired", async () => {
    const userId = randomObjectId();
    const email = "pizza@lunch.com";

    const token = jwt.sign({ subject: userId, email: email }, JWT_SECRET, {
      expiresIn: "-1h",
    });

    const response = await request(app)
      .get(`/data`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(StatusCode.UNAUTHORIZED);
    expect(response.body).toEqual({ message: "Invalid Credentials" });
  });

  it("failure case - JWT has an invalid signature (secret is different)", async () => {
    const differentSecret = "SECRETY_WECRETY";
    const userId = randomObjectId();
    const email = "pizza@lunch.com";

    const token = jwt.sign({ subject: userId, email: email }, differentSecret, {
      expiresIn: "1h",
    });

    const response = await request(app)
      .get(`/data`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(StatusCode.UNAUTHORIZED);
    expect(response.body).toEqual({ message: "Invalid Credentials" });
  });

  it("failure case - JWT has been tampered with", async () => {
    const userId = randomObjectId();
    const email = "pizza@lunch.com";

    const validToken = jwt.sign({ subject: userId, email: email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const [header, payload, signature] = validToken.split(".");
    const decodedPayload = JSON.parse(
      Buffer.from(payload, "base64").toString()
    );
    decodedPayload.email = "xXx_eL337_H4CK3R_xXx";

    const tamperedPayload = Buffer.from(
      JSON.stringify(decodedPayload)
    ).toString("base64");
    const tamperedToken = `${header}.${tamperedPayload}.${signature}`;

    const response = await request(app)
      .get(`/data`)
      .set("Authorization", `Bearer ${tamperedToken}`);

    expect(response.status).toBe(StatusCode.UNAUTHORIZED);
    expect(response.body).toEqual({ message: "Invalid Credentials" });
  });
});

describe("getData", () => {
  it("success case - only possible case", async () => {
    const userId = randomObjectId();
    const email = "pizza@lunch.com";

    const token = jwt.sign({ subject: userId, email: email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const response = await request(app)
      .get(`/data`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(StatusCode.OK);
    expect(response.body).toEqual(mediaData);
  });
});
