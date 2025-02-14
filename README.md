# axios-cloud-watch-logger

![npm](https://img.shields.io/npm/v/axios-cloud-watch-logger)
![license](https://img.shields.io/npm/l/axios-cloud-watch-logger)

A Node.js module to log Axios HTTP requests and responses to AWS CloudWatch.

## 🚀 Features
- Logs all Axios requests and responses.
- Sends logs to AWS CloudWatch.
- Helps in monitoring and debugging API calls.

## 📦 Installation

```sh
npm install axios-cloud-watch-logger
```

## 🛠️ Usage

### Import the module and send an HTTP request

```javascript
import { sendRequest } from "axios-cloud-watch-logger";

const response = await sendRequest({
  method: "GET",
  url: "https://api.example.com/data",
});

console.log(response.data);
```

### Configuration
The module uses AWS SDK for CloudWatch logging. Ensure your AWS credentials are set up properly via:
- Environment variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`)
- AWS credentials file (`~/.aws/credentials`)

## ⚙️ API

### `sendRequest(config: object): Promise<object>`
Sends an HTTP request and logs it to AWS CloudWatch.

#### Parameters:
- `config`: Object with Axios request parameters (method, URL, headers, data, etc.).

#### Example:
```javascript
await sendRequest({
  method: "POST",
  url: "https://api.example.com/login",
  data: { username: "user", password: "pass" }
});
```

## 🧪 Running Tests

```sh
npm test
```

## 🛑 Troubleshooting

- **Invalid AWS Credentials Error:** Ensure your AWS credentials are correctly set.
- **Network Errors:** Verify API URLs and connectivity.

## 📜 License
This project is licensed under the [ISC License](LICENSE).

## 📬 Issues & Contributions
Have issues or ideas? [Open an issue](https://github.com/AayushMaurya/axios-cloud-watch-logger/issues) or submit a pull request!

---
Happy Logging! 🚀

