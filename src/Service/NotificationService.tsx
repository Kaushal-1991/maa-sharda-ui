// import { Client } from "@stomp/stompjs";
// import SockJS from "sockjs-client";

// const SOCKET_URL =
//   "https://maa-sharda-academy-production.up.railway.app/ws";

// let client: Client | null = null;

// export const connectNotificationSocket = (
//   onNotification: (notification: any) => void
// ) => {

//   if (client?.active) {
//     console.log("WebSocket already connected");
//     return;
//   }

//   client = new Client({

//     webSocketFactory: () => {
//       console.log("Creating SockJS connection...");
//       return new SockJS(SOCKET_URL);
//     },

//     reconnectDelay: 5000,

//     debug: (message) => {
//       console.log("[STOMP]", message);
//     },

//     onConnect: () => {

//       console.log("✅ WebSocket connected");

//       client?.subscribe(
//         "/topic/notifications",
//         (message) => {

//           try {

//             const notification =
//               JSON.parse(message.body);

//             console.log(
//               "🔔 New notification:",
//               notification
//             );

//             onNotification(notification);

//           } catch (error) {

//             console.error(
//               "Notification JSON parse error:",
//               error
//             );

//           }

//         }
//       );

//       console.log(
//         "✅ Subscribed to /topic/notifications"
//       );
//     },

//     onDisconnect: () => {

//       console.log(
//         "WebSocket disconnected"
//       );

//     },

//     onStompError: (frame) => {

//       console.error(
//         "STOMP ERROR:",
//         frame.headers["message"]
//       );

//       console.error(
//         "STOMP BODY:",
//         frame.body
//       );

//     },

//     onWebSocketError: (error) => {

//       console.error(
//         "WebSocket error:",
//         error
//       );

//     }

//   });

//   client.activate();
// };

// export const disconnectNotificationSocket = () => {

//   if (client) {

//     client.deactivate();

//     client = null;

//   }

// };

export {};
