import { Layout } from "antd";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(
  process.env.BACKEND_URL ? process.env.BACKEND_URL : "http://localhost:3000",
  { withCredentials: true },
);

const FriendPage = () => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socket.emit("location", "hihihihi");
  }, []);

  return <Layout style={{ minHeight: "100vh" }}></Layout>;
};

export default FriendPage;
