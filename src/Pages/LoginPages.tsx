import { useForm } from '@mantine/form';
import {Button,Container, PasswordInput, Paper, Stack, Text, TextInput, Title } from '@mantine/core';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import maaShardaLogo from '../images/maa-sharda.jpeg';
import { login } from '../Service/AuthService';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { errorNotification, successNotification } from '../Utility/NotificationUtil';
import { jwtDecode } from 'jwt-decode';
import { setJwt } from '../Slice/JwtSlice';

const LoginPages = () => {
 const dispatch = useDispatch();
 const [loading,setLoading] = useState(false);
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

  const handleSubmit = (values: typeof form.values) => {
       setLoading(true);
       login(values).then((_data:any)=>{
           successNotification("Login Sucessfully!!!");
           setLoading(false);
           dispatch(setJwt(_data.accessToken));
           try{
              const decodedUser = jwtDecode(_data.accessToken);
              console.log("decodedUser=====>"+decodedUser);
           }catch{
               errorNotification("Unable to decode token");
           }
       }).catch(error=>{
           console.log(error?.response?.data?.errorMessage);
           errorNotification(error?.response?.data?.errorMessage);
       }).finally(()=>{
           setLoading(false);
       });
  }

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
            <form onSubmit={form.onSubmit(handleSubmit)}>
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
                <Button type="submit" className="register-button" fullWidth radius="md" mt="xs" loading={loading}>
                  Sign in <span aria-hidden="true">→</span>
                </Button>
               
              </Stack>
            </form>
          </Paper>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPages;
