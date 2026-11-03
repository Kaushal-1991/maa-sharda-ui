import { redirect } from "next/navigation";
import AdminStudentsManager from "../../../components/next/AdminStudentsManager";
import { getAdminSession } from "../../../lib/auth";
import { listStudents } from "../../../services/student.service";

export default async function AdminStudentsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const students = await listStudents();

  return (
    <>
      <AdminStudentsManager initialStudents={students} />
    </>
  );
}
