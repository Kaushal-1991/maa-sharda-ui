import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

// const SOCKET_URL = "http://localhost:8080/ws";
const SOCKET_URL = "https://maa-sharda-academy-production.up.railway.app/ws"

let client: Client | null = null;

export const connectNotificationSocket = (
  onNotification: (notification: any) => void
) => {

  client = new Client({

    webSocketFactory: () =>
      new SockJS(SOCKET_URL),

    reconnectDelay: 5000,

    onConnect: () => {

      console.log("WebSocket connected");

      client?.subscribe(
        "/topic/notifications",
        (message) => {

          const notification =
            JSON.parse(message.body);

          console.log(
            "New notification:",
            notification
          );

          onNotification(notification);
        }
      );
    },

    onDisconnect: () => {

      console.log("WebSocket disconnected");

    },

    onStompError: (frame) => {

      console.error(
        "STOMP error:",
        frame.headers["message"]
      );

    }
  });

  client.activate();
};


export const disconnectNotificationSocket = () => {

  if (client) {
    client.deactivate();
    client = null;
  }

};