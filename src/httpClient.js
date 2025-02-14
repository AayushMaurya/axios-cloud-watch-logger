import axios from "axios";
import { logToCloudWatch } from "./logger.js";
import { config } from "./index.js";

/**
 * Sends an HTTP request using Axios and logs the request/response.
 * @param {Object} requestConfig - Axios request configuration.
 * @returns {Promise} - Axios response.
 */
export async function sendRequest(requestConfig) {
  try {
    // Merge user-provided config with default settings
    const axiosInstance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout,
      headers: { ...config.headers, ...requestConfig.headers },
    });

    if (config.logRequests) {
      const logMessage = {
        timestamp: Date.now(),
        level: "INFO",
        source: "axios-cloudwatch-logger",
        request: {
          method: requestConfig.method,
          url: requestConfig.url,
          headers: requestConfig.headers || {},
          data: requestConfig.data || null,
        },
      };
      console.log("Request Log:", logMessage);
      await logToCloudWatch(logMessage);
    }

    // Send request
    const response = await axiosInstance(requestConfig);

    if (config.logResponses) {
      const logMessage = {
        timestamp: Date.now(),
        level: "INFO",
        source: "axios-cloudwatch-logger",
        response: {
          status: response.status,
          data: response.data,
        },
      };
      console.log("Response Log:", logMessage);
      await logToCloudWatch(logMessage);
    }

    return response;
  } catch (error) {
    if (config.logErrors) {
      const logMessage = {
        timestamp: Date.now(),
        level: "ERROR",
        source: "axios-cloudwatch-logger",
        error: error.message,
        stack: error.stack,
        request: {
          method: requestConfig.method,
          url: requestConfig.url,
        },
      };
      console.error("Error Log:", logMessage);
      await logToCloudWatch(logMessage);
    }
    throw error;
  }
}
