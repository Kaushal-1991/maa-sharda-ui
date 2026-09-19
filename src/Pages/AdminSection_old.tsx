import { Button, Paper, Text, Title } from '@mantine/core';
import { Link, useParams } from 'react-router-dom';

const labels: Record<string, string> = {
  students: 'Students',
  classes: 'Classes',
  events: 'Events',
  enquiries: 'Enquiries',
  settings: 'Academy settings',
};

const AdminSection = () => {
  const { section = '' } = useParams();
  const title = labels[section] ?? 'Administration';

  return (
    <div className="admin-section-placeholder">
      <Text className="admin-kicker">ADMINISTRATION</Text>
      <Title order={1}>{title}</Title>
      <Paper className="admin-panel" radius="sm" p="xl">
        <Title order={2}>{title} module</Title>
        <Text c="dimmed" mt="sm">This area is ready for your {title.toLowerCase()} management features.</Text>
        <Button component={Link} to="/admin" className="admin-primary-button" mt="xl">Back to dashboard</Button>
      </Paper>
    </div>
  );
};

export default AdminSection;
