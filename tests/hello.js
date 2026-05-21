import { sleep } from "k6";
import http from "k6/http";

export default function () {
  http.get("http://localhost:3333");

  sleep(1);
}
