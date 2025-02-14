import { jest } from "@jest/globals";
import { logToCloudWatch } from "../src/logger.js";
import { CloudWatchLogsClient, PutLogEventsCommand } from "@aws-sdk/client-cloudwatch-logs";

// Mock CloudWatchLogsClient
jest.mock("@aws-sdk/client-cloudwatch-logs", () => {
  return {
    CloudWatchLogsClient: jest.fn(),
    PutLogEventsCommand: jest.fn(),
  };
});

describe("logToCloudWatch", () => {
  it("should send logs to CloudWatch when enabled", async () => {
    const mockSend = jest.fn();
    CloudWatchLogsClient.prototype.send = mockSend; // Mock send method

    await logToCloudWatch({ message: "Test log" });

    expect(mockSend).toHaveBeenCalledWith(expect.any(PutLogEventsCommand));
  });
});
