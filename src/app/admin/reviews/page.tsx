import { redirect } from "next/navigation";
import AdminReviewsManager from "../../../components/next/AdminReviewsManager";
import { getAdminSession } from "../../../lib/auth";

export default async function AdminReviewsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return <AdminReviewsManager />;
}
