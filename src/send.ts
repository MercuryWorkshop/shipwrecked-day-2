const endpoint: string = "wss://foxmoss.com/daniel";

let socket = new WebSocket(endpoint);

socket.addEventListener(
    "close",
    (_) => { setTimeout(() => { socket = new WebSocket(endpoint); }, 1000); });

let callbacks: Array<(msg: string) => void> = [];

export function add_message_listener(callback: (msg: string) => void) {
  callbacks.push(callback);
}

socket.addEventListener("message", (event) => {
  const msg: string = event.data;
  for (let i = 0; i < callbacks.length; i++) {
    callbacks[i](msg);
  }
});

export function send_message(username: string, message: string, x: number, y: number) {
  socket.send(JSON.stringify({"username" : username, "message" : message, "x": x, "y": y}))
}
