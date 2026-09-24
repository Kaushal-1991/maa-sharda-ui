// import {
//   ActionIcon,
//   Badge,
//   Indicator,
//   Menu,
//   ScrollArea,
//   Stack,
//   Text,
//   Group,
//   Divider,
//   ThemeIcon,
//   Center,
// } from "@mantine/core";

// import { IconBell, IconUserPlus, IconCheck } from "@tabler/icons-react";

// import { useEffect, useState } from "react";

// // import {
// //   connectNotificationSocket,
// //   disconnectNotificationSocket,
// // } from "../../Service/NotificationService";
// import axiosInstance from "../../Interceptor/AxioxInterceptor";

// interface Notification {
//   id: number;
//   title: string;
//   message: string;
//   read: boolean;
//   createdAt: string;
// }

// const NotificationBell = () => {
//   const [notifications, setNotifications] = useState<Notification[]>([]);

//   // =====================================================
//   // LOAD OLD NOTIFICATIONS FROM DATABASE
//   // =====================================================

//   const fetchNotifications = async () => {
//     try {
//       console.log("📥 Loading old notifications...");

//       const response = await axiosInstance.get("/api/notifications");

//       console.log("📥 Old notifications:", response.data);

//       setNotifications(response.data);
//     } catch (error) {
//       console.error("❌ Failed to load notifications:", error);
//     }
//   };

//   // =====================================================
//   // MARK NOTIFICATION AS READ
//   // =====================================================

//   const markAsRead = async (notificationId: number) => {
//     try {
//       await axiosInstance.put(`/api/notifications/${notificationId}/read`);

//       setNotifications((prev) =>
//         prev.map((notification) =>
//           notification.id === notificationId
//             ? {
//                 ...notification,
//                 read: true,
//               }
//             : notification,
//         ),
//       );
//     } catch (error) {
//       console.error("❌ Failed to mark notification as read:", error);
//     }
//   };

//   // =====================================================
//   // WEBSOCKET
//   // =====================================================

//   useEffect(() => {
//     // 1️⃣ Load old notifications
//     fetchNotifications();

//     // 2️⃣ Listen for new notifications
//     // connectNotificationSocket(
//     //   (notification: Notification) => {

//     //     console.log(
//     //       "🔔 New notification received:",
//     //       notification
//     //     );

//     //     setNotifications((prev) => {

//     //       // Prevent duplicate notification
//     //       const exists =
//     //         prev.some(
//     //           (item) =>
//     //             item.id === notification.id
//     //         );

//     //       if (exists) {
//     //         return prev;
//     //       }

//     //       return [
//     //         {
//     //           ...notification,
//     //           read: false,
//     //         },
//     //         ...prev,
//     //       ];

//     //     });

//     //   }
//     // );

//     // return () => {

//     //   disconnectNotificationSocket();

//     // };
//   }, []);

//   // =====================================================
//   // UNREAD COUNT
//   // =====================================================

//   const unreadCount = notifications.filter(
//     (notification) => !notification.read,
//   ).length;

//   // =====================================================
//   // DATE
//   // =====================================================

//   const formatDate = (date: string) => {
//     if (!date) {
//       return "";
//     }

//     return new Date(date).toLocaleString();
//   };

//   return (
//     <Menu shadow="md" width={380} position="bottom-end" withinPortal>
//       <Menu.Target>
//         <Indicator
//           disabled={unreadCount === 0}
//           label={unreadCount > 99 ? "99+" : String(unreadCount)}
//           size={18}
//           offset={5}
//         >
//           <ActionIcon variant="subtle" color="gray" size="lg" radius="xl">
//             <IconBell size={22} stroke={1.7} />
//           </ActionIcon>
//         </Indicator>
//       </Menu.Target>

//       <Menu.Dropdown>
//         {/* HEADER */}

//         <Group justify="space-between" px="sm" py="xs">
//           <Group gap="xs">
//             <IconBell size={19} />

//             <Text fw={700}>Notifications</Text>
//           </Group>

//           {unreadCount > 0 && (
//             <Badge size="sm" color="blue" variant="light">
//               {unreadCount} New
//             </Badge>
//           )}
//         </Group>

//         <Divider />

//         {/* NOTIFICATIONS */}

//         <ScrollArea h={350}>
//           {notifications.length === 0 ? (
//             <Center h={300}>
//               <Stack align="center" gap={5}>
//                 <ThemeIcon size={50} radius="xl" variant="light" color="gray">
//                   <IconBell size={25} />
//                 </ThemeIcon>

//                 <Text fw={600} size="sm">
//                   No notifications
//                 </Text>

//                 <Text size="xs" c="dimmed">
//                   You're all caught up
//                 </Text>
//               </Stack>
//             </Center>
//           ) : (
//             <Stack gap={0}>
//               {notifications.map((notification) => (
//                 <Menu.Item
//                   key={notification.id}
//                   py="sm"
//                   onClick={() => {
//                     if (!notification.read) {
//                       markAsRead(notification.id);
//                     }
//                   }}
//                 >
//                   <Group align="flex-start" wrap="nowrap">
//                     <ThemeIcon
//                       size={38}
//                       radius="xl"
//                       color="blue"
//                       variant="light"
//                     >
//                       <IconUserPlus size={19} />
//                     </ThemeIcon>

//                     <Stack
//                       gap={2}
//                       style={{
//                         flex: 1,
//                       }}
//                     >
//                       <Text size="sm" fw={notification.read ? 500 : 700}>
//                         {notification.title}
//                       </Text>

//                       <Text size="xs" c="dimmed">
//                         {notification.message}
//                       </Text>

//                       <Text size="xs" c="dimmed">
//                         {formatDate(notification.createdAt)}
//                       </Text>
//                     </Stack>

//                     {!notification.read && (
//                       <Badge size="xs" color="blue" variant="dot">
//                         New
//                       </Badge>
//                     )}
//                   </Group>
//                 </Menu.Item>
//               ))}
//             </Stack>
//           )}
//         </ScrollArea>

//         <Divider />

//         <Group justify="center" py="xs">
//           <Text size="xs" c="dimmed">
//             Real-time notifications
//           </Text>

//           <IconCheck size={14} />
//
// </Group>
//       </Menu.Dropdown>
//     </Menu>
//   );
// };

// export default NotificationBell;
export {};
