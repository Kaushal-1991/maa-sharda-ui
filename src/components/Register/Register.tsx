import { useForm } from '@mantine/form';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import maaShardaLogo from '../../images/maa-sharda.jpeg';
import {
   Button,
   Container,
   Paper,
   Select,
   Stack,
   Text,
   Textarea,
   TextInput,
   Title,
} from '@mantine/core';
import { registerStudent } from '../../Service/StudentService';
import { errorNotification, successNotification } from '../../Utility/NotificationUtil';
import { useState } from 'react';

const Register = () => {
   const [loading, setLoading] = useState(false);
   const form = useForm({
      initialValues: {
         name: '',
         email: '',
         phone: '',
         musicOption: '',
         address: '',
      },
      validate: {
         name: (value) => (value.trim().length < 2 ? 'Enter your name' : null),
         email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Enter a valid email address'),
         phone: (value) => (/^\d{10}$/.test(value) ? null : 'Enter a valid 10-digit phone number'),
         musicOption: (value) => (value ? null : 'Select a music option'),
      },
   });
   const handleSubmit = (values: typeof form.values) => {
       setLoading(true);
       registerStudent(values).then(() => {
           successNotification("Student registered successfully !!!");
           form.reset();
       }).catch((error: unknown) => {
           const apiMessage =
              (error as { response?: { data?: { errorMessage?: string; message?: string } } })
                 ?.response?.data?.errorMessage ||
              (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
           errorNotification(apiMessage || "Failed to register student.");
       }).finally(()=>{
         setLoading(false);
       });
   }
   return (
      <div>
         <Header />
         <main className="register-page" id="register">
            <Container size="lg">
               <div className="register-layout">
                  <section className="register-intro">
                     <div className="intro-orbit">
                        <img src={maaShardaLogo} alt="Maa Sharda Sangeet Academy" />
                        <span>♪</span>
                     </div>
                     <Text className="eyebrow">MAA SHARDA SANGEET ACADEMY</Text>
                     <Title order={1} className="register-title">
                        Find your <em>musical voice.</em>
                     </Title>
                     <Text className="intro-copy">
                        Learn, create and grow with a community that believes every melody has a
                        story.
                     </Text>
                     <div className="intro-note">
                        <span className="note-mark">♫</span>
                        <div>
                           <Text fw={700}>Your next chapter starts here</Text>
                           <Text size="sm">Choose your instrument and begin your journey.</Text>
                        </div>
                     </div>
                  </section>

                  <Paper className="register-card" withBorder shadow="xl" radius="lg" p={{ base: 'lg', sm: 'xl' }}>
                     <div className="form-heading">
                        <Text className="form-kicker">WELCOME IN</Text>
                        <Title order={2}>Create your account</Title>
                        <Text c="dimmed" size="sm" mt={6}>
                           Fill in your details to join the academy.
                        </Text>
                     </div>

                     <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Stack gap="md">
                           <TextInput
                              label="Your name"
                              placeholder="John Doe"
                              {...form.getInputProps('name')}
                           />
                           <TextInput
                              label="Email address"
                              placeholder="you@example.com"
                              type="email"
                              {...form.getInputProps('email')}
                           />
                           <TextInput
                              label="Phone number"
                              placeholder="1234567890"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              maxLength={10}
                              {...form.getInputProps('phone')}
                              onChange={(event) =>
                                 form.setFieldValue(
                                    'phone',
                                    event.currentTarget.value.replace(/\D/g, '').slice(0, 10)
                                 )
                              }
                           />
                           <Select
                              label="Music option"
                              placeholder="Select your music option"
                              data={[
                                 { value: 'CLASSICAL_MUSIC', label: 'Classical Music' },
                                 { value: 'LIGHT_MUSIC', label: 'Light Music' },
                                 { value: 'HARMONIUM', label: 'Harmonium' },
                                 { value: 'GUITAR', label: 'Guitar' },
                              ]}
                              searchable
                              clearable
                              {...form.getInputProps('musicOption')}
                           />

                           <Textarea
                              label="Address"
                              placeholder="Enter your address"
                              {...form.getInputProps('address')}
                           />

                           <Button type="submit" className="register-button" fullWidth mt="xs" radius="md" loading={loading}>
                              Create my account <span aria-hidden="true">→</span>
                           </Button>
                           {/* <Text size="sm" c="dimmed" ta="center">
                              Already have an account? <Anchor href="#login">Log in</Anchor>
                           </Text> */}
                        </Stack>
                     </form>
                  </Paper>
               </div>
            </Container>
         </main>
         <Footer />
      </div>
   );
};

export default Register;
