import http from "k6/http";
import { check, sleep } from "k6";

export default function () {
  const res = http.get("http://localhost:3333");

  check(res, {
    "status should be 200": (r) => r.status === 200,
  });

   sleep(1);
}
