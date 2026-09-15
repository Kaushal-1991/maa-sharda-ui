import { useForm } from '@mantine/form';
import { Anchor, Button, Checkbox, Container, Group, PasswordInput, Paper, Stack, Text, TextInput, Title } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import maaShardaLogo from '../images/maa-sharda.jpeg';

const Login = () => {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Enter a valid email address'),
      password: (value) => (value.length >= 6 ? null : 'Password must be at least 6 characters'),
    },
  });

  return (
    <div className="login-page">
      <Header />
      <main className="login-main">
        <Container size="lg" className="login-layout">
          <section className="login-intro">
            <div className="login-logo-orbit">
              <img src={maaShardaLogo} alt="Maa Sharda Sangeet Academy" />
              <span>♪</span>
            </div>
            <Text className="eyebrow">WELCOME BACK</Text>
            <Title order={1}>Return to your musical journey.</Title>
            <Text className="login-intro__copy">
              Continue learning, follow your classes and stay close to the music community at Maa
              Sharda Sangeet Academy.
            </Text>
          </section>

          <Paper className="login-card" withBorder shadow="xl" radius="lg" p={{ base: 'lg', sm: 'xl' }}>
            <Text className="form-kicker">ACADEMY LOGIN</Text>
            <Title order={2}>Sign in to continue</Title>
            <Text c="dimmed" size="sm" mt={6} mb="xl">
              Use your academy account details below.
            </Text>
            <form onSubmit={form.onSubmit(() => navigate('/admin'))}>
              <Stack gap="md">
                <TextInput
                  label="Email address"
                  placeholder="you@example.com"
                  type="email"
                  radius="md"
                  {...form.getInputProps('email')}
                />
                <PasswordInput
                  label="Password"
                  placeholder="Your password"
                  radius="md"
                  {...form.getInputProps('password')}
                />
                <Group className="login-options" justify="space-between">
                  <Checkbox label="Remember me" {...form.getInputProps('remember', { type: 'checkbox' })} />
                  <Anchor href="#forgot-password" size="sm">Forgot password?</Anchor>
                </Group>
                <Button type="submit" className="register-button" fullWidth radius="md" mt="xs">
                  Sign in <span aria-hidden="true">→</span>
                </Button>
                <Text size="sm" c="dimmed" ta="center">
                  New to the academy? <Anchor component={Link} to="/register">Create an account</Anchor>
                </Text>
              </Stack>
            </form>
          </Paper>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
