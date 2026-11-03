import ContactMessageModel from "../models/ContactMessage";
import { connectToDatabase } from "../lib/mongodb";
import type { ContactMessageInput } from "../lib/validation";

export type ContactMessageRecord = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "NEW" | "READ";
  createdAt: string;
};

function toRecord(value: any): ContactMessageRecord {
  return {
    id: value._id.toString(),
    name: value.name,
    email: value.email,
    phone: value.phone ?? "",
    subject: value.subject ?? "",
    message: value.message,
    status: value.status,
    createdAt: value.createdAt.toISOString(),
  };
}

export async function createContactMessage(
  input: ContactMessageInput,
): Promise<void> {
  await connectToDatabase();
  const { website: _website, ...message } = input;
  await ContactMessageModel.create(message);
}

export async function listContactMessages(): Promise<ContactMessageRecord[]> {
  await connectToDatabase();
  const messages = await ContactMessageModel.find()
    .sort({ createdAt: -1 })
    .lean();
  return messages.map((message) => toRecord(message));
}

export async function updateContactMessageStatus(
  id: string,
  status: "NEW" | "READ",
): Promise<ContactMessageRecord | null> {
  await connectToDatabase();
  const updated = await ContactMessageModel.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true },
  );
  return updated ? toRecord(updated) : null;
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  await connectToDatabase();
  const deleted = await ContactMessageModel.findByIdAndDelete(id);
  return deleted !== null;
}
