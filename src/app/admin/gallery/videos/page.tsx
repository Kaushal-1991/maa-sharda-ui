import { redirect } from "next/navigation";
import AdminGalleryManager from "../../../../components/next/AdminGalleryManager";
import { getAdminSession } from "../../../../lib/auth";

export default async function AdminGalleryVideosPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return <AdminGalleryManager type="videos" />;
}
