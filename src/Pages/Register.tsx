import { useForm } from '@mantine/form';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import maaShardaLogo from '../images/maa-sharda.jpeg';
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

const Register = () => {
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
        phone: (value) => (value.trim().length < 10 ? 'Enter a valid phone number' : null),
        musicOption: (value) => (value ? null : 'Select a music option'),  
    },
   });

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

                     <form onSubmit={form.onSubmit(() => undefined)}>
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
                              placeholder="123-456-7890"
                              {...form.getInputProps('phone')}
                           />
                           <Select
                              label="Music option"
                              placeholder="Select your music option"
                              data={[
                                 { value: 'classical-music', label: 'Classical Music' },
                                 { value: 'light-music', label: 'Light Music' },
                                 { value: 'harmonium', label: 'Harmonium' },
                                 { value: 'guitar', label: 'Guitar' },
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
                          
                           <Button type="submit" className="register-button" fullWidth mt="xs" radius="md">
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