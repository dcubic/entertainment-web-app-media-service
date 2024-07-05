import request from "supertest";
import { createApp } from "../../src/app/app";
import { StatusCode } from "../../src/utils/StatusCode";

let app = createApp()

describe("healthCheck", () => {
  it("success case", async () => {
    const response = await request(app).get("/media/health");
    
    expect(response.status).toBe(StatusCode.OK);
  });
});
