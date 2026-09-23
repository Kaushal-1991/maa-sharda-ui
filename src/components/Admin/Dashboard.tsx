import React, { useEffect, useState } from "react";

import {
  Badge,
  Card,
  Center,
  Container,
  Divider,
  Group,
  Image,
  Paper,
  Progress,
  RingProgress,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";

import {
  IconUsers,
  IconMusic,
  IconMicrophone,
  IconPiano,
  IconGuitarPick,
  IconSchool,
  IconChartBar,
  IconArrowUpRight,
} from "@tabler/icons-react";

import maaShardaLogo from "../../images/maa-sharda.jpeg";
import { countStudents } from "../../Service/StudentService";
import { errorNotification } from "../../Utility/NotificationUtil";

// =====================================================
// TYPES
// =====================================================

interface StudentCount {
  totalClassicalMusicStudent: number;
  totalGuitarStudent: number;
  totalHarmoniumStudent: number;
  totalLightMusicStudent: number;
  totalStudent: number;
}

// =====================================================
// PROGRAM CONFIGURATION
// =====================================================

const programs = [
  {
    label: "Classical Music",
    color: "yellow",
    icon: IconMusic,

    getCount: (data: StudentCount | null) =>
      data?.totalClassicalMusicStudent ?? 0,
  },

  {
    label: "Light Music",
    color: "pink",
    icon: IconMicrophone,

    getCount: (data: StudentCount | null) => data?.totalLightMusicStudent ?? 0,
  },

  {
    label: "Harmonium",
    color: "green",
    icon: IconPiano,

    getCount: (data: StudentCount | null) => data?.totalHarmoniumStudent ?? 0,
  },

  {
    label: "Guitar",
    color: "violet",
    icon: IconGuitarPick,

    getCount: (data: StudentCount | null) => data?.totalGuitarStudent ?? 0,
  },
];

// =====================================================
// DASHBOARD
// =====================================================

const Dashboard: React.FC = () => {
  const [studentCount, setStudentCount] = useState<StudentCount | null>(null);

  // =====================================================
  // GET STUDENT COUNTS
  // =====================================================

  useEffect(() => {
    getStudentsCount();
  }, []);

  const getStudentsCount = () => {
    countStudents()
      .then((data: StudentCount) => {
        console.log("API DATA =====>", data);

        setStudentCount(data);
      })
      .catch((error) => {
        errorNotification(
          error?.response?.data?.message ||
            error.message ||
            "Something went wrong",
        );
      });
  };

  // =====================================================
  // TOTAL STUDENTS
  // =====================================================

  const totalStudents = studentCount?.totalStudent ?? 0;

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <Container
      fluid
      px={{ base: "sm", sm: "lg" }}
      py={{ base: "sm", sm: "lg" }}
    >
      <Stack gap="lg">
        {/* =================================================
            WELCOME BANNER
        ================================================= */}

        <Paper
          radius="xl"
          p={{ base: "lg", sm: "xl" }}
          bg="dark.9"
          c="white"
          withBorder
        >
          <Group justify="space-between" align="center" wrap="nowrap">
            {/* Academy Information */}

            <Group gap="lg" wrap="nowrap">
              <Image
                src={maaShardaLogo}
                alt="Maa Sharda Academy"
                w={{ base: 60, sm: 82 }}
                h={{ base: 60, sm: 82 }}
                radius="50%"
                fit="cover"
              />

              <Stack gap={6}>
                <Group gap="xs">
                  <Badge color="yellow" variant="light" size="sm">
                    ADMIN PANEL
                  </Badge>

                  <Badge color="green" variant="light" size="sm">
                    ACTIVE
                  </Badge>
                </Group>

                <Title order={2} c="white" fz={{ base: 20, sm: 26 }}>
                  Welcome to Maa Sharda Academy
                </Title>

                <Text size="sm" c="gray.5">
                  Your complete academy overview at a glance.
                </Text>
              </Stack>
            </Group>

            {/* Academy Icon */}

            <ThemeIcon
              visibleFrom="sm"
              size={70}
              radius="xl"
              variant="light"
              color="yellow"
            >
              <IconSchool size={36} stroke={1.5} />
            </ThemeIcon>
          </Group>
        </Paper>

        {/* =================================================
            OVERVIEW HEADER
        ================================================= */}

        <Group justify="space-between" align="flex-end">
          <Stack gap={2}>
            <Text size="xs" fw={700} c="dimmed" tt="uppercase" lts={1}>
              Academy Overview
            </Text>

            <Title order={3}>Student Statistics</Title>
          </Stack>

          <Badge
            color="blue"
            variant="light"
            leftSection={<IconArrowUpRight size={14} />}
          >
            {totalStudents} Total Students
          </Badge>
        </Group>

        {/* =================================================
            TOTAL + PROGRAM CARDS
        ================================================= */}

        <SimpleGrid
          cols={{
            base: 1,
            xs: 2,
            lg: 5,
          }}
          spacing="md"
        >
          {/* =================================================
              TOTAL STUDENTS
          ================================================= */}

          <Card radius="lg" withBorder shadow="sm" p="lg" bg="blue.6" c="white">
            <Group justify="space-between" align="flex-start">
              <ThemeIcon size={48} radius="md" color="white" variant="light">
                <IconUsers size={26} stroke={1.8} />
              </ThemeIcon>

              <Badge color="white" c="blue.7" variant="light">
                TOTAL
              </Badge>
            </Group>

            <Stack gap={2} mt="xl">
              <Text size="sm" c="blue.0">
                Total Students
              </Text>

              <Text size="36px" fw={800}>
                {totalStudents}
              </Text>

              <Text size="xs" c="blue.0">
                Currently enrolled
              </Text>
            </Stack>
          </Card>

          {/* =================================================
              PROGRAM CARDS
          ================================================= */}

          {programs.map((program) => {
            const Icon = program.icon;

            const count = program.getCount(studentCount);

            const percentage =
              totalStudents > 0 ? Math.round((count / totalStudents) * 100) : 0;

            return (
              <Card
                key={program.label}
                radius="lg"
                withBorder
                shadow="sm"
                p="lg"
              >
                <Group justify="space-between" align="flex-start">
                  <ThemeIcon
                    size={46}
                    radius="md"
                    variant="light"
                    color={program.color}
                  >
                    <Icon size={24} stroke={1.8} />
                  </ThemeIcon>

                  <Badge variant="light" color={program.color}>
                    {percentage}%
                  </Badge>
                </Group>

                <Stack gap={3} mt="lg">
                  <Text size="sm" fw={500} c="dimmed">
                    {program.label}
                  </Text>

                  <Group align="baseline" gap={5}>
                    <Text size="30px" fw={800}>
                      {count}
                    </Text>

                    <Text size="xs" c="dimmed">
                      students
                    </Text>
                  </Group>

                  <Progress
                    value={percentage}
                    color={program.color}
                    size="sm"
                    radius="xl"
                    mt={5}
                  />
                </Stack>
              </Card>
            );
          })}
        </SimpleGrid>

        {/* =================================================
            LOWER DASHBOARD
        ================================================= */}

        <SimpleGrid
          cols={{
            base: 1,
            md: 2,
          }}
          spacing="md"
        >
          {/* =================================================
              PROGRAM DISTRIBUTION
          ================================================= */}

          <Card radius="lg" withBorder shadow="sm" p="xl">
            <Group justify="space-between" mb="xl">
              <Group gap="sm">
                <ThemeIcon size={42} radius="md" variant="light" color="blue">
                  <IconChartBar size={22} />
                </ThemeIcon>

                <Stack gap={0}>
                  <Text fw={700}>Program Distribution</Text>

                  <Text size="xs" c="dimmed">
                    Enrollment by music program
                  </Text>
                </Stack>
              </Group>
            </Group>

            <Stack gap="lg">
              {programs.map((program) => {
                const Icon = program.icon;

                const count = program.getCount(studentCount);

                const percentage =
                  totalStudents > 0
                    ? Math.round((count / totalStudents) * 100)
                    : 0;

                return (
                  <div key={program.label}>
                    <Group justify="space-between" mb={6}>
                      <Group gap="xs">
                        <ThemeIcon
                          size={28}
                          radius="xl"
                          variant="light"
                          color={program.color}
                        >
                          <Icon size={15} />
                        </ThemeIcon>

                        <Text size="sm">{program.label}</Text>
                      </Group>

                      <Text size="sm" fw={700}>
                        {count}
                      </Text>
                    </Group>

                    <Progress
                      value={percentage}
                      color={program.color}
                      size="md"
                      radius="xl"
                    />
                  </div>
                );
              })}
            </Stack>
          </Card>

          {/* =================================================
              ENROLLMENT CARD
          ================================================= */}

          <Card radius="lg" withBorder shadow="sm" p="xl">
            <Group justify="space-between">
              <Stack gap={2}>
                <Text fw={700}>Enrollment Overview</Text>

                <Text size="xs" c="dimmed">
                  Current academy enrollment
                </Text>
              </Stack>

              <Badge color="green" variant="light">
                Active
              </Badge>
            </Group>

            <Center mt="lg">
              <RingProgress
                size={190}
                thickness={18}
                roundCaps
                sections={[
                  {
                    value: totalStudents > 0 ? 100 : 0,
                    color: "blue",
                  },
                ]}
                label={
                  <Center>
                    <Stack align="center" gap={0}>
                      <Text size="32px" fw={800}>
                        {totalStudents}
                      </Text>

                      <Text size="xs" c="dimmed">
                        Students
                      </Text>
                    </Stack>
                  </Center>
                }
              />
            </Center>

            <Divider my="lg" />

            <SimpleGrid cols={2}>
              <Paper p="sm" radius="md" bg="blue.0">
                <Text size="xs" c="dimmed">
                  Programs
                </Text>

                <Text size="xl" fw={700} c="blue.7">
                  4
                </Text>
              </Paper>

              <Paper p="sm" radius="md" bg="green.0">
                <Text size="xs" c="dimmed">
                  Students
                </Text>

                <Text size="xl" fw={700} c="green.7">
                  {totalStudents}
                </Text>
              </Paper>
            </SimpleGrid>
          </Card>
        </SimpleGrid>

        {/* =================================================
            BOTTOM SUMMARY
        ================================================= */}

        <Paper radius="lg" withBorder p="lg">
          <Group justify="space-between" align="center">
            <Group gap="sm">
              <ThemeIcon size={40} radius="md" variant="light" color="yellow">
                <IconMusic size={21} />
              </ThemeIcon>

              <Stack gap={0}>
                <Text fw={600}>Maa Sharda Music Programs</Text>

                <Text size="xs" c="dimmed">
                  Classical • Light Music • Harmonium • Guitar
                </Text>
              </Stack>
            </Group>

            <Badge color="blue" variant="light">
              4 Programs
            </Badge>
          </Group>
        </Paper>
      </Stack>
    </Container>
  );
};

export default Dashboard;
