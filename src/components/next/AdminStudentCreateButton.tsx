"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import AdminStudentFormModal from "./AdminStudentFormModal";
import type { StudentRecord } from "../../services/student.service";

export default function AdminStudentCreateButton() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  function handleSaved(_student: StudentRecord) {
    setIsOpen(false);
    router.refresh();
  }

  return (
    <>
      <button
        className="admin-dashboard__action"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        <span aria-hidden="true">＋</span> Add student
      </button>
      {isOpen ? (
        <AdminStudentFormModal
          onClose={() => setIsOpen(false)}
          onSaved={handleSaved}
        />
      ) : null}
    </>
  );
}
