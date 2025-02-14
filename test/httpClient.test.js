import { jest } from "@jest/globals";
import axios from "axios";
import { sendRequest } from "../src/httpClient.js";

jest.mock("axios");

describe("sendRequest", () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    };
    axios.create = jest.fn(() => mockAxios); // Mock axios.create()
  });

  it("should make a successful GET request", async () => {
    mockAxios.get.mockResolvedValue({ status: 200, data: { message: "Success" } });

    const response = await sendRequest({ method: "GET", url: "https://api.example.com" });

    expect(response.status).toBe(200);
    expect(response.data.message).toBe("Success");
  });

  it("should throw an error when the request fails", async () => {
    mockAxios.get.mockRejectedValue(new Error("Network Error"));

    await expect(sendRequest({ method: "GET", url: "https://api.example.com" }))
      .rejects.toThrow("Network Error");
  });
});
