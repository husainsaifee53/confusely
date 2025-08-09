import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:3001");

function App() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit("send_message", { message: msg });
    setMsg("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>BridgeBreaker Chat 💬❌</h1>
      <div style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "scroll" }}>
        {chat.map((c, i) => (
          <p key={i}><strong>{c.from}</strong>: {c.message}</p>
        ))}
      </div>
      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Say something (it won't help)"
        style={{ width: "70%", padding: "10px", marginTop: "10px" }}
      />
      <button onClick={sendMessage} style={{ marginLeft: "10px", padding: "10px" }}>
        Send
      </button>
    </div>
  );
}

export default App;
