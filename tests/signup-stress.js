import http from "k6/http";
import { check, sleep } from "k6";
import uuid from "./libs/uuid.js";

export const options = {
  stages: [
    { duration: "2m", target: 100 },
    { duration: "5m", target: 100 },
    { duration: "2m", target: 200 },
    { duration: "5m", target: 200},
    { duration: "2m", target: 200 },
    { duration: "5m", target: 300 },
    { duration: "2m", target: 300 },
    { duration: "5m", target: 400 },
    { duration: "1m", target: 400 },
  ],
  
  thresholds: {
    http_req_duration: ["p(95)<2000"], // 95% dos requisições devem responer em até 2s
    http_req_failed: ["rate<0.01"],
  },
};

export default function () {
  const url = "http://localhost:3333/signup";

  const payload = JSON.stringify({
    email: `${uuid.v4().substring(24)}@qacademy.com.br`,
    password: "pwd123",
  });

  const headers = {
    headers: {
      "content-type": "application/json",
    },
  };

  const res = http.post(url, payload, headers);

  console.log(res.body);

  check(res, {
    "status should be 201": (r) => r.status === 201,
  });

  sleep(1);
}
