import { Button, Container, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';


const NotFound = () => (
  <div className="not-found-page">
    <main className="not-found-main">
      <Container size="sm" className="not-found-content">
        <Text className="not-found-code">404</Text>
        <Text className="eyebrow">PAGE NOT FOUND</Text>
        <Title order={1}>This page has gone off key.</Title>
        <Text className="not-found-message">
          The address you entered does not exist or may have been moved.
        </Text>
        <Button component={Link} to="/" className="hero-button" size="md" radius="md">
          Return to home <span aria-hidden="true">→</span>
        </Button>
      </Container>
    </main>
  </div>
);

export default NotFound;
