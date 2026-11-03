export type RegistrationFormValues = {
  name: string;
  email: string;
  phone: string;
  musicOption: string;
  mode: string;
  address: string;
};

export type RegistrationField = keyof RegistrationFormValues;
export type RegistrationFieldErrors = Partial<
  Record<RegistrationField, string>
>;

const musicOptions = new Set([
  "CLASSICAL_MUSIC",
  "LIGHT_MUSIC",
  "HARMONIUM",
  "GUITAR",
]);
const tuitionModes = new Set(["HOME", "ONLINE", "OFFLINE"]);

export function validateRegistrationForm(
  form: RegistrationFormValues,
): RegistrationFieldErrors {
  const errors: RegistrationFieldErrors = {};
  const name = form.name.trim();
  const email = form.email.trim();
  const phone = form.phone.trim();

  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (name.length > 100) {
    errors.name = "Name must be 100 characters or fewer.";
  }

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  } else if (email.length > 254) {
    errors.email = "Email must be 254 characters or fewer.";
  }

  if (!phone) {
    errors.phone = "Please enter your phone number.";
  } else if (!/^\d{10}$/.test(phone)) {
    errors.phone = "Enter a valid 10-digit phone number.";
  }

  if (!musicOptions.has(form.musicOption)) {
    errors.musicOption = "Please choose a music option.";
  }

  if (!tuitionModes.has(form.mode)) {
    errors.mode = "Please choose a tuition mode.";
  }

  if (form.address.trim().length > 500) {
    errors.address = "Address must be 500 characters or fewer.";
  }

  return errors;
}
