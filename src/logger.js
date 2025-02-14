import { CloudWatchLogsClient, PutLogEventsCommand } from "@aws-sdk/client-cloudwatch-logs";
import { config } from "./index.js";

// Initialize CloudWatchLogsClient only if logging is enabled
const cloudWatchClient = config.enableCloudWatchLogging
  ? new CloudWatchLogsClient({
      region: config.awsRegion,
      credentials: {
        accessKeyId: config.awsAccessKeyId,
        secretAccessKey: config.awsSecretAccessKey,
      },
    })
  : null;

/**
 * Logs messages to AWS CloudWatch.
 * @param {string} message - The log message to send.
 */
export async function logToCloudWatch(message) {
  if (!config.enableCloudWatchLogging || !cloudWatchClient) {
    if (config.debug) console.log("CloudWatch logging is disabled.");
    return;
  }

  const logParams = {
    logGroupName: config.logGroupName,
    logStreamName: config.logStreamName,
    logEvents: [
      {
        message: JSON.stringify(message),
        timestamp: Date.now(),
      },
    ],
  };

  try {
    const command = new PutLogEventsCommand(logParams);
    await cloudWatchClient.send(command);
  } catch (error) {
    console.error("CloudWatch logging failed:", error);
  }
}
