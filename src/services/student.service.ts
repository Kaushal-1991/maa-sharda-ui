import StudentModel from "../models/Student";
import SequenceModel from "../models/Sequence";
import { connectToDatabase } from "../lib/mongodb";
import type { StudentRegistrationInput } from "../lib/validation";

export type StudentRecord = {
  id: string;
  registrationNumber: string;
  name: string;
  email: string;
  phone: string;
  musicOption: string;
  mode: string;
  address: string;
  registrationStatus: "PENDING" | "COMPLETED";
  createdAt: string;
  updatedAt: string;
};

function toRecord(value: any): StudentRecord {
  return {
    id: value._id.toString(),
    registrationNumber: value.registrationNumber ?? "",
    name: value.name,
    email: value.email,
    phone: value.phone,
    musicOption: value.musicOption,
    mode: value.mode,
    address: value.address ?? "",
    registrationStatus: value.registrationStatus,
    createdAt: value.createdAt.toISOString(),
    updatedAt: value.updatedAt.toISOString(),
  };
}

async function nextRegistrationNumber(): Promise<string> {
  const sequence = await SequenceModel.findOneAndUpdate(
    { _id: "student-registration" },
    { $inc: { value: 1 } },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
  return `MSA-${String(sequence.value).padStart(6, "0")}`;
}

async function ensureRegistrationNumber(student: any): Promise<any> {
  if (student.registrationNumber) {
    return student;
  }

  const registrationNumber = await nextRegistrationNumber();
  const updated = await StudentModel.findOneAndUpdate(
    { _id: student._id, registrationNumber: { $exists: false } },
    { $set: { registrationNumber } },
    { new: true },
  );
  return updated ?? StudentModel.findById(student._id);
}

export async function registerStudent(
  input: StudentRegistrationInput,
): Promise<StudentRecord> {
  await connectToDatabase();
  const registrationNumber = await nextRegistrationNumber();
  const student = await StudentModel.create({ ...input, registrationNumber });
  return toRecord(student);
}

export async function listStudents(search = ""): Promise<StudentRecord[]> {
  await connectToDatabase();
  const filter = search.trim()
    ? {
        $or: [
          { registrationNumber: { $regex: escapeRegExp(search.trim()), $options: "i" } },
          { name: { $regex: escapeRegExp(search.trim()), $options: "i" } },
          { email: { $regex: escapeRegExp(search.trim()), $options: "i" } },
          { phone: { $regex: escapeRegExp(search.trim()), $options: "i" } },
        ],
      }
    : {};
  const students = await StudentModel.find(filter).sort({ createdAt: -1 });
  const records = await Promise.all(
    students.map(async (student) => toRecord(await ensureRegistrationNumber(student))),
  );
  return records;
}

export async function getStudentCounts(): Promise<{
  total: number;
  pending: number;
  completed: number;
}> {
  await connectToDatabase();
  const [total, pending, completed] = await Promise.all([
    StudentModel.countDocuments(),
    StudentModel.countDocuments({ registrationStatus: "PENDING" }),
    StudentModel.countDocuments({ registrationStatus: "COMPLETED" }),
  ]);
  return { total, pending, completed };
}

export async function updateStudentStatus(
  id: string,
  status: "PENDING" | "COMPLETED",
): Promise<StudentRecord | null> {
  await connectToDatabase();
  const updated = await StudentModel.findByIdAndUpdate(
    id,
    { registrationStatus: status },
    { new: true, runValidators: true },
  );
  return updated ? toRecord(await ensureRegistrationNumber(updated)) : null;
}

export async function updateStudentDetails(
  id: string,
  input: StudentRegistrationInput,
): Promise<StudentRecord | null> {
  await connectToDatabase();
  const updated = await StudentModel.findByIdAndUpdate(
    id,
    input,
    { new: true, runValidators: true },
  );
  return updated ? toRecord(await ensureRegistrationNumber(updated)) : null;
}

export async function deleteStudent(id: string): Promise<boolean> {
  await connectToDatabase();
  const deleted = await StudentModel.findByIdAndDelete(id);
  return deleted !== null;
}

export function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
