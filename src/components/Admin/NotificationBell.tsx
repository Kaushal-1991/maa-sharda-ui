import {
  ActionIcon,
  Badge,
  Indicator,
  Menu,
  ScrollArea,
  Stack,
  Text,
  Group,
  Divider,
  ThemeIcon,
  Center,
} from "@mantine/core";

import {
  IconBell,
  IconUserPlus,
  IconCheck,
} from "@tabler/icons-react";

import { useEffect, useState } from "react";
import { connectNotificationSocket, disconnectNotificationSocket } from "../../Service/NotificationService";




interface Notification {
  id: number;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}


const NotificationBell = () => {

  const [notifications, setNotifications] =
    useState<Notification[]>([]);


  useEffect(() => {
    connectNotificationSocket(
      (notification: Notification) => {

        setNotifications((prev) => [

          notification,

          ...prev,

        ]);

      }
    );


    return () => {

      disconnectNotificationSocket();

    };

  }, []);


  const unreadCount =
    notifications.filter(
      (notification) => !notification.read
    ).length;


  const formatDate = (date: string) => {

    return new Date(date).toLocaleString();

  };


  return (

    <Menu
      shadow="md"
      width={380}
      position="bottom-end"
      withinPortal
    >

      <Menu.Target>

        <Indicator
          disabled={unreadCount === 0}
          label={
            unreadCount > 99
              ? "99+"
              : unreadCount
          }
          size={18}
          offset={5}
        >

          <ActionIcon
            variant="subtle"
            color="gray"
            size="lg"
            radius="xl"
          >

            <IconBell
              size={22}
              stroke={1.7}
            />

          </ActionIcon>

        </Indicator>

      </Menu.Target>


      <Menu.Dropdown>

        {/* HEADER */}

        <Group
          justify="space-between"
          px="sm"
          py="xs"
        >

          <Group gap="xs">

            <IconBell
              size={19}
            />

            <Text fw={700}>
              Notifications
            </Text>

          </Group>


          {unreadCount > 0 && (

            <Badge
              size="sm"
              color="blue"
              variant="light"
            >

              {unreadCount} New

            </Badge>

          )}

        </Group>


        <Divider />


        {/* NOTIFICATIONS */}

        <ScrollArea
          h={350}
        >

          {notifications.length === 0 ? (

            <Center
              h={300}
            >

              <Stack
                align="center"
                gap={5}
              >

                <ThemeIcon
                  size={50}
                  radius="xl"
                  variant="light"
                  color="gray"
                >

                  <IconBell
                    size={25}
                  />

                </ThemeIcon>


                <Text
                  fw={600}
                  size="sm"
                >
                  No notifications
                </Text>


                <Text
                  size="xs"
                  c="dimmed"
                >
                  You're all caught up
                </Text>

              </Stack>

            </Center>

          ) : (

            <Stack
              gap={0}
            >

              {notifications.map(
                (notification) => (

                  <Menu.Item
                    key={notification.id}
                    py="sm"
                  >

                    <Group
                      align="flex-start"
                      wrap="nowrap"
                    >

                      <ThemeIcon
                        size={38}
                        radius="xl"
                        color="blue"
                        variant="light"
                      >

                        <IconUserPlus
                          size={19}
                        />

                      </ThemeIcon>


                      <Stack
                        gap={2}
                        style={{
                          flex: 1,
                        }}
                      >

                        <Text
                          size="sm"
                          fw={600}
                        >
                          {notification.title}
                        </Text>


                        <Text
                          size="xs"
                          c="dimmed"
                        >
                          {notification.message}
                        </Text>


                        <Text
                          size="xs"
                          c="dimmed"
                        >
                          {formatDate(
                            notification.createdAt
                          )}
                        </Text>

                      </Stack>


                      {!notification.read && (

                        <Badge
                          size="xs"
                          color="blue"
                          variant="dot"
                        >
                          New
                        </Badge>

                      )}

                    </Group>

                  </Menu.Item>

                )
              )}

            </Stack>

          )}

        </ScrollArea>


        <Divider />


        <Group
          justify="center"
          py="xs"
        >

          <Text
            size="xs"
            c="dimmed"
          >

            Real-time notifications

          </Text>

          <IconCheck
            size={14}
          />

        </Group>

      </Menu.Dropdown>

    </Menu>

  );
};


export default NotificationBell;