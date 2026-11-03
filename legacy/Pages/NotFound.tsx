import { Button, Container, Text, Title } from '@mantine/core';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const NotFound = () => {

  const token = useSelector((state: any) => state.jwt);

  return (
    <div className="not-found-page">
      <main className="not-found-main">
        <Container size="sm" className="not-found-content">

          <Text className="not-found-code">
            404
          </Text>

          <Text className="eyebrow">
            PAGE NOT FOUND
          </Text>

          <Title order={1}>
            This page has gone off key.
          </Title>

          <Text className="not-found-message">
            The address you entered does not exist or may have been moved.
          </Text>

          {token ? (
            <Button
              component={Link}
              to="/admin/dashboard"
              className="hero-button"
              size="md"
              radius="md"
            >
              Return to Dashboard
              <span aria-hidden="true"> →</span>
            </Button>
          ) : (
            <Button
              component={Link}
              to="/"
              className="hero-button"
              size="md"
              radius="md"
            >
              Return to Home
              <span aria-hidden="true"> →</span>
            </Button>
          )}

        </Container>
      </main>
    </div>
  );
};

export default NotFound;