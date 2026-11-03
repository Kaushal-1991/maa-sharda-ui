import { redirect } from "next/navigation";
import AdminDataTable, { type AdminTableRow } from "../../../components/next/AdminDataTable";
import { getAdminSession } from "../../../lib/auth";
import { listContactMessages } from "../../../services/contact.service";

export default async function AdminMessagesPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const messages = await listContactMessages();
  const rows: AdminTableRow[] = messages.map((message) => ({
    id: message.id,
    cells: [
      message.name,
      message.email,
      message.subject || "General inquiry",
      message.status,
    ],
    status: message.status,
  }));

  return (
    <>
      <header className="admin-page-heading">
        <div>
          <p>INBOX</p>
          <h1>Messages</h1>
          <span>Search contact messages and filter them by read status.</span>
        </div>
      </header>
      <AdminDataTable
        columns={["Name", "Email", "Subject", "Status"]}
        rows={rows}
        searchPlaceholder="Search name, email or subject"
        filterOptions={[
          { value: "NEW", label: "New" },
          { value: "READ", label: "Read" },
        ]}
        statusColumnIndex={3}
        emptyMessage="No contact messages yet."
      />
    </>
  );
}
