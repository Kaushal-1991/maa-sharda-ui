import { redirect } from "next/navigation";
import AdminDataTable, { type AdminTableRow } from "../../../components/next/AdminDataTable";
import { getAdminSession } from "../../../lib/auth";
import { getAdminClasses } from "../../../services/class.service";

export default async function AdminClassesPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const classes = await getAdminClasses();
  const rows: AdminTableRow[] = classes.map((course) => ({
    id: course.id,
    cells: [
      course.title,
      String(course.displayOrder),
      course.isActive ? "Active" : "Inactive",
    ],
    status: course.isActive ? "ACTIVE" : "INACTIVE",
  }));

  return (
    <>
      <header className="admin-page-heading">
        <div>
          <p>COURSE CATALOG</p>
          <h1>Classes</h1>
          <span>Find a course or filter the catalog by publishing status.</span>
        </div>
      </header>
      <AdminDataTable
        columns={["Course", "Order", "Status"]}
        rows={rows}
        searchPlaceholder="Search courses"
        filterOptions={[
          { value: "ACTIVE", label: "Active" },
          { value: "INACTIVE", label: "Inactive" },
        ]}
        statusColumnIndex={2}
        emptyMessage="No classes have been added yet."
      />
    </>
  );
}
