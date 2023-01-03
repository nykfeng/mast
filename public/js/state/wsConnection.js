export function wsConnect() {
  const ws = new WebSocket("ws://localhost:8080");

  ws.onopen = function (event) {
    console.log("WebSocket connection opened");
  };

  ws.onmessage = function (event) {
    console.log(event.data);
  };
}
