import { redirect } from "next/navigation";
import Link from "next/link";
import AdminStudentCreateButton from "../../../components/next/AdminStudentCreateButton";
import { getAdminSession } from "../../../lib/auth";
import { getStudentCounts } from "../../../services/student.service";
import { getAdminClasses } from "../../../services/class.service";
import { listContactMessages } from "../../../services/contact.service";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const [counts, classes, messages] = await Promise.all([
    getStudentCounts(),
    getAdminClasses(),
    listContactMessages(),
  ]);

  return (
    <div className="admin-dashboard">
      <header className="admin-dashboard__heading">
        <div>
          <p className="admin-dashboard__eyebrow">Academy overview</p>
          <h1>Dashboard</h1>
          <p className="admin-dashboard__description">
            A quick look at student registrations and academy activity.
          </p>
        </div>
        <AdminStudentCreateButton />
      </header>

      <section className="admin-dashboard__stats" aria-label="Student registration summary">
        <article className="admin-dashboard__stat admin-dashboard__stat--students">
          <div className="admin-dashboard__stat-top">
            <span className="admin-dashboard__icon" aria-hidden="true">♙</span>
            <span className="admin-dashboard__stat-label">Total students</span>
          </div>
          <p className="admin-dashboard__stat-value">{counts.total}</p>
          <p className="admin-dashboard__stat-note">All academy registrations</p>
        </article>
        <article className="admin-dashboard__stat admin-dashboard__stat--pending">
          <div className="admin-dashboard__stat-top">
            <span className="admin-dashboard__icon" aria-hidden="true">◷</span>
            <span className="admin-dashboard__stat-label">Pending</span>
          </div>
          <p className="admin-dashboard__stat-value">{counts.pending}</p>
          <p className="admin-dashboard__stat-note">Awaiting follow-up</p>
        </article>
        <article className="admin-dashboard__stat admin-dashboard__stat--completed">
          <div className="admin-dashboard__stat-top">
            <span className="admin-dashboard__icon" aria-hidden="true">✓</span>
            <span className="admin-dashboard__stat-label">Completed</span>
          </div>
          <p className="admin-dashboard__stat-value">{counts.completed}</p>
          <p className="admin-dashboard__stat-note">Registrations completed</p>
        </article>
      </section>

      <section className="admin-dashboard__activity" aria-labelledby="admin-dashboard-activity">
        <div className="admin-dashboard__section-heading">
          <div>
            <p className="admin-dashboard__eyebrow">Stay in the loop</p>
            <h2 id="admin-dashboard-activity">Academy activity</h2>
          </div>
          <span>Quick links</span>
        </div>
        <div className="admin-dashboard__quick-links">
          <Link className="admin-dashboard__quick-link" href="/admin/students">
            <span className="admin-dashboard__quick-icon" aria-hidden="true">♙</span>
            <span className="admin-dashboard__quick-copy">
              <strong>Students</strong>
              <small>{counts.total} in the academy directory</small>
            </span>
            <span className="admin-dashboard__quick-arrow" aria-hidden="true">→</span>
          </Link>
          <Link className="admin-dashboard__quick-link" href="/admin/classes">
            <span className="admin-dashboard__quick-icon" aria-hidden="true">♫</span>
            <span className="admin-dashboard__quick-copy">
              <strong>Classes</strong>
              <small>{classes.length} published {classes.length === 1 ? "class" : "classes"}</small>
            </span>
            <span className="admin-dashboard__quick-arrow" aria-hidden="true">→</span>
          </Link>
          <Link className="admin-dashboard__quick-link" href="/admin/messages">
            <span className="admin-dashboard__quick-icon" aria-hidden="true">✉</span>
            <span className="admin-dashboard__quick-copy">
              <strong>Messages</strong>
              <small>{messages.length} contact {messages.length === 1 ? "message" : "messages"}</small>
            </span>
            <span className="admin-dashboard__quick-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
