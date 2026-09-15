import { Badge, Button, Group, Paper, SimpleGrid, Stack, Table, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

const registrations = [
  { name: 'Ananya Verma', course: 'Classical Music', status: 'New' },
  { name: 'Rohit Singh', course: 'Guitar', status: 'Review' },
  { name: 'Meera Yadav', course: 'Light Music', status: 'Confirmed' },
  { name: 'Aarav Khan', course: 'Harmonium', status: 'New' },
];

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
          <div className="admin-heading">
            <div>
              <Text className="admin-kicker">DASHBOARD</Text>
              <Title order={1}>Welcome back, Tushar</Title>
              <Text c="dimmed" mt={4}>Here is what is happening at Maa Sharda Sangeet Academy.</Text>
            </div>
            <Group>
              <Button component={Link} to="/events" variant="default" color="dark">View website events</Button>
              <Button component={Link} to="/register" className="admin-primary-button">+ New registration</Button>
            </Group>
          </div>

          <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg" className="admin-stats">
            <Paper className="admin-stat-card" p="lg" radius="sm"><Text>Active learners</Text><Title order={2}>128</Title><span className="admin-stat-card__icon">♙</span><small>+12% this month</small></Paper>
            <Paper className="admin-stat-card admin-stat-card--amber" p="lg" radius="sm"><Text>New enquiries</Text><Title order={2}>24</Title><span className="admin-stat-card__icon">✉</span><small>8 need a reply</small></Paper>
            <Paper className="admin-stat-card admin-stat-card--blue" p="lg" radius="sm"><Text>Upcoming events</Text><Title order={2}>06</Title><span className="admin-stat-card__icon">★</span><small>Next: Open Mic</small></Paper>
            <Paper className="admin-stat-card admin-stat-card--accent" p="lg" radius="sm"><Text>Classes this week</Text><Title order={2}>14</Title><span className="admin-stat-card__icon">◷</span><small>Across 4 programs</small></Paper>
          </SimpleGrid>

          <div className="admin-content-grid">
            <Paper className="admin-panel" p="xl" radius="sm">
              <Group justify="space-between" mb="lg"><div><Text className="admin-panel__kicker">LATEST ACTIVITY</Text><Title order={2}>Recent registrations</Title></div><Button variant="subtle" size="compact-sm" color="dark">View all</Button></Group>
              <Table.ScrollContainer minWidth={500}>
                <Table verticalSpacing="md" highlightOnHover>
                  <Table.Thead><Table.Tr><Table.Th>Learner</Table.Th><Table.Th>Program</Table.Th><Table.Th>Status</Table.Th></Table.Tr></Table.Thead>
                  <Table.Tbody>{registrations.map((registration) => <Table.Tr key={registration.name}><Table.Td><Text fw={600}>{registration.name}</Text></Table.Td><Table.Td>{registration.course}</Table.Td><Table.Td><Badge variant="light" color={registration.status === 'Confirmed' ? 'green' : 'orange'}>{registration.status}</Badge></Table.Td></Table.Tr>)}</Table.Tbody>
                </Table>
              </Table.ScrollContainer>
            </Paper>

            <Paper className="admin-panel admin-events-panel" p="xl" radius="sm">
              <Text className="admin-panel__kicker">THIS WEEK</Text><Title order={2}>Your schedule</Title>
              <Stack gap="md" mt="lg">
                <div className="admin-schedule-item"><strong>Tue 05</strong><span><b>Classical Music</b><small>5:00 PM · Studio A</small></span></div>
                <div className="admin-schedule-item"><strong>Thu 07</strong><span><b>Guitar practice</b><small>6:30 PM · Studio B</small></span></div>
                <div className="admin-schedule-item"><strong>Sat 09</strong><span><b>Swarum rehearsal</b><small>4:00 PM · Main hall</small></span></div>
              </Stack>
              <Button component={Link} to="/events" variant="subtle" color="dark" fullWidth mt="lg">Manage schedule →</Button>
            </Paper>
          </div>
    </div>
  );
};

export default AdminDashboard;
