import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const socketIo = io(
      process.env.BACKEND_URL
        ? process.env.BACKEND_URL
        : "http://localhost:3000",
      { withCredentials: true },
    );

    setSocket(socketIo);

    function cleanup() {
      socketIo.disconnect();
    }
    return cleanup;

    // should only run once and not on every re-render,
    // so pass an empty array
  }, []);

  return socket;
};
