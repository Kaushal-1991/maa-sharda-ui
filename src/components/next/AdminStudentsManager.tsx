"use client";

import { useMemo, useState } from "react";
import AdminStudentFormModal from "./AdminStudentFormModal";
import type { StudentRecord } from "../../services/student.service";

const pageSize = 10;

type AdminStudentsManagerProps = {
  initialStudents: StudentRecord[];
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default function AdminStudentsManager({
  initialStudents,
}: AdminStudentsManagerProps) {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [editingStudent, setEditingStudent] = useState<StudentRecord | null>(null);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [busyStudentId, setBusyStudentId] = useState("");
  const [error, setError] = useState("");

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return students.filter((student) => {
      const matchesSearch =
        !query ||
        [
          student.registrationNumber,
          student.name,
          student.email,
          student.phone,
          student.musicOption,
          student.mode,
        ].some((value) => value.toLocaleLowerCase().includes(query));
      const matchesStatus = !statusFilter || student.registrationStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter, students]);

  const pageCount = Math.max(1, Math.ceil(filteredStudents.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visibleStudents = filteredStudents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  function saveStudent(saved: StudentRecord) {
    setStudents((current) => {
      const exists = current.some((student) => student.id === saved.id);
      return exists
        ? current.map((student) => student.id === saved.id ? saved : student)
        : [saved, ...current];
    });
    setEditingStudent(null);
    setIsAddingStudent(false);
    setError("");
    setPage(1);
  }

  async function changeStatus(student: StudentRecord, registrationStatus: string) {
    if (registrationStatus === student.registrationStatus) return;
    setBusyStudentId(student.id);
    setError("");
    try {
      const response = await fetch("/api/admin/students", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: student.id, registrationStatus }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to update student status.");
      }
      setStudents((current) =>
        current.map((item) => item.id === student.id ? result.student : item),
      );
    } catch (statusError) {
      setError(
        statusError instanceof Error
          ? statusError.message
          : "Unable to update student status.",
      );
    } finally {
      setBusyStudentId("");
    }
  }

  return (
    <>
      <div className="admin-students-overview">
        <div>
          <p>STUDENT DIRECTORY</p>
          <strong>{students.length}</strong>
          <span>{students.length === 1 ? "registered student" : "registered students"}</span>
        </div>
        <button
          className="admin-students-add"
          type="button"
          onClick={() => setIsAddingStudent(true)}
        >
          <span aria-hidden="true">＋</span> Add student
        </button>
      </div>

      <section className="admin-student-table-card" aria-label="Student directory">
        <div className="admin-student-toolbar">
          <label className="admin-student-search">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search registration no., name, email or phone"
              aria-label="Search students"
            />
          </label>
          <label className="admin-student-filter">
            <span>Status</span>
            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value);
                setPage(1);
              }}
              aria-label="Filter students by registration status"
            >
              <option value="">All students</option>
              <option value="PENDING">Pending</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </label>
          <p>
            Showing <strong>{filteredStudents.length ? (currentPage - 1) * pageSize + 1 : 0}–
              {Math.min(currentPage * pageSize, filteredStudents.length)}</strong> of{" "}
            <strong>{filteredStudents.length}</strong>
          </p>
        </div>

        {error ? <p className="admin-students-error" role="alert">{error}</p> : null}

        <div className="table-scroll admin-student-table-scroll">
          <table className="admin-student-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Student</th>
                <th>Course &amp; tuition</th>
                <th>Registered</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {visibleStudents.length ? visibleStudents.map((student, index) => (
                <tr key={student.id}>
                  <td className="admin-student-serial">
                    {(currentPage - 1) * pageSize + index + 1}
                  </td>
                  <td>
                    <div className="admin-student-identity">
                      <span className="admin-student-avatar" aria-hidden="true">
                        {initials(student.name)}
                      </span>
                      <span>
                        <strong>{student.name}</strong>
                        <small>{student.email}</small>
                        <small>{student.phone}</small>
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="admin-student-course">{student.musicOption.replaceAll("_", " ")}</span>
                    <small className="admin-student-mode">{student.mode} tuition</small>
                  </td>
                  <td className="admin-student-date">{formatDate(student.createdAt)}</td>
                  <td>
                    <label className={`admin-student-status admin-student-status--${student.registrationStatus.toLowerCase()}`}>
                      <span aria-hidden="true" />
                      <select
                        value={student.registrationStatus}
                        disabled={busyStudentId === student.id}
                        aria-label={`Change status for ${student.name}`}
                        onChange={(event) => changeStatus(student, event.target.value)}
                      >
                        <option value="PENDING">Pending</option>
                        <option value="COMPLETED">Completed</option>
                      </select>
                    </label>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="admin-student-edit"
                      aria-label={`Edit ${student.name}`}
                      onClick={() => setEditingStudent(student)}
                    >
                      Edit <span aria-hidden="true">↗</span>
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td className="admin-students-empty" colSpan={6}>
                    {students.length
                      ? "No students match your search or status filter."
                      : "No student registrations yet. Add your first student to get started."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <footer className="admin-student-pagination">
          <span>Page <strong>{currentPage}</strong> of <strong>{pageCount}</strong></span>
          <div>
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setPage((value) => Math.max(1, value - 1))}
            >
              ← Previous
            </button>
            <button
              type="button"
              disabled={currentPage >= pageCount}
              onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
            >
              Next <span aria-hidden="true">→</span>
            </button>
          </div>
        </footer>
      </section>

      {isAddingStudent ? (
        <AdminStudentFormModal onClose={() => setIsAddingStudent(false)} onSaved={saveStudent} />
      ) : null}
      {editingStudent ? (
        <AdminStudentFormModal
          key={editingStudent.id}
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
          onSaved={saveStudent}
        />
      ) : null}
    </>
  );
}
