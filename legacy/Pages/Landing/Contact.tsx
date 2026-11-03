import {
  Anchor,
  Button,
  Container,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconArrowUpRight,
  IconMail,
  IconMessageCircle,
  IconMapPin,
  IconMusic,
  IconPhone,
} from "@tabler/icons-react";
import contactImage from "../../images/contact-image.jpg";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const Contact = () => {
  return (
    <div className="contact-page">
      <Header />
      <main>
        <section className="contact-hero">
          <Container size="lg" className="contact-hero__inner">
            <div>
              <Text className="eyebrow">LET&apos;S MAKE SOME MUSIC</Text>
              <Title order={1}>Come say hello.</Title>
              <Text className="contact-hero__lead">
                Have a question about classes, performances or joining the
                academy? We would love to hear from you.
              </Text>
            </div>
            <div className="contact-hero__note" aria-hidden="true">
              <IconMusic size={170} stroke={1} />
            </div>
          </Container>
        </section>

        <section className="contact-main">
          <Container size="lg" className="contact-layout">
            <div className="contact-details">
              <Text className="eyebrow contact-eyebrow">
                <IconMapPin size={15} aria-hidden="true" />
                FIND THE ACADEMY
              </Text>
              <Title order={2}>Your next note starts here.</Title>
              <div className="contact-photo-frame contact-details__image">
                <img src={contactImage} alt="Maa Sharda music performance" />
                <div className="contact-photo-caption">
                  <Text size="xs">MAA SHARDA SANGEET ACADEMY</Text>
                  <Text fw={700}>Music brings us together.</Text>
                </div>
              </div>
            </div>

            <Paper
              className="contact-connect-card"
              withBorder
              shadow="xl"
              radius="lg"
              p={{ base: "lg", sm: "xl" }}
            >
              <Text className="form-kicker contact-kicker">
                <IconMessageCircle size={15} aria-hidden="true" />
                CONTACT US
              </Text>
              <Title order={2}>Let&apos;s connect.</Title>
              <Text className="contact-connect-card__copy" mt="sm">
                Reach Maa Sharda Sangeet Academy directly about classes, music
                lessons, Swarum Band performances or your musical journey.
              </Text>
              <Stack gap="sm" mt="xl">
                <div className="contact-action contact-action--static">
                  <span className="contact-action__icon"><IconMapPin size={20} /></span>
                  <span>
                    <small>Visit us</small>
                    Kolpanday, Azamgarh, Uttar Pradesh
                  </span>
                </div>
                <Anchor
                  href="mailto:rajtushar276001@gmail.com"
                  className="contact-action"
                >
                  <span className="contact-action__icon"><IconMail size={20} /></span>
                  <span>
                    <small>Email us</small>
                    rajtushar276001@gmail.com
                  </span>
                  <strong><IconArrowUpRight size={18} /></strong>
                </Anchor>
                <Anchor href="tel:+917985910923" className="contact-action">
                  <span className="contact-action__icon"><IconPhone size={20} /></span>
                  <span>
                    <small>Call us</small>
                    +91 79859 10923
                  </span>
                  <strong><IconArrowUpRight size={18} /></strong>
                </Anchor>
              </Stack>
              <div className="contact-connect-card__footer">
                <Text size="sm">Prefer to meet in person?</Text>
                <Button
                  component="a"
                  href="https://www.google.com/maps/search/?api=1&query=Kolpanday%2C+Azamgarh%2C+Uttar+Pradesh"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-submit"
                  radius="md"
                >
                  Open directions <IconArrowUpRight size={16} aria-hidden="true" />
                </Button>
              </div>
            </Paper>
          </Container>
        </section>

        <section className="contact-map-section">
          <Container size="lg">
            <div className="contact-section-heading">
              <Text className="eyebrow contact-eyebrow">
                <IconMapPin size={15} aria-hidden="true" />
                VISIT US
              </Text>
              <Title order={2}>Find your way to the music.</Title>
            </div>
            <div className="contact-map-frame">
              <iframe
                title="Maa Sharda Sangeet Academy location in Kolpanday, Azamgarh"
                src="https://www.google.com/maps?q=Kolpanday%2C+Azamgarh%2C+Uttar+Pradesh&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
