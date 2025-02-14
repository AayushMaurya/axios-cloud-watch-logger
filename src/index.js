import { sendRequest } from "./httpClient.js";
import { logToCloudWatch } from "./logger.js";

/**
 * Configuration object for Axios CloudWatch Logger
 */
const config = {
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  awsRegion: process.env.AWS_REGION || "us-east-1",
  logGroupName: "AxiosCloudWatchLogs",
  logStreamName: "Requests",
  enableCloudWatchLogging: true,
  logRequests: true,
  logResponses: true,
  logErrors: true,
  baseURL: "",
  timeout: 5000,
  headers: {},
  debug: false,
};

/**
 * Configure the Axios CloudWatch Logger with custom settings.
 * @param {Object} options - Configuration options
 */
function configureAxiosCloudWatch(options = {}) {
  Object.assign(config, options);
  if (config.debug) {
    console.log("Axios CloudWatch Logger configured:", config);
  }
}

export { configureAxiosCloudWatch, sendRequest, logToCloudWatch, config };