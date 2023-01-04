import { updateConsoleContent } from "../utilities/create.js";

export function wsConnect() {
  const ws = new WebSocket("ws://localhost:8080");

  ws.onopen = function (event) {
    console.log("WebSocket connection opened");
  };

  ws.onclose = function (event) {
    console.log("WebSocket connection closed");
    const msgOrigin = "WebSocket:~ ";
    updateConsoleContent(msgOrigin, "WebSocket connection closed");
  };

  ws.onmessage = function (event) {
    const { msgOrigin, message } = JSON.parse(event.data);
    updateConsoleContent(msgOrigin, message);
  };
}
