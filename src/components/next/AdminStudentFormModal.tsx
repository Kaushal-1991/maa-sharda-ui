"use client";

import { useState } from "react";
import {
  validateRegistrationForm,
  type RegistrationFormValues,
} from "../../lib/registration-form";
import type { StudentRecord } from "../../services/student.service";

type AdminStudentFormModalProps = {
  student?: StudentRecord;
  onClose: () => void;
  onSaved: (student: StudentRecord) => void;
};

const blankForm: RegistrationFormValues = {
  name: "",
  email: "",
  phone: "",
  musicOption: "",
  mode: "",
  address: "",
};

export default function AdminStudentFormModal({
  student,
  onClose,
  onSaved,
}: AdminStudentFormModalProps) {
  const [form, setForm] = useState<RegistrationFormValues>(() =>
    student
      ? {
          name: student.name,
          email: student.email,
          phone: student.phone,
          musicOption: student.musicOption,
          mode: student.mode,
          address: student.address,
        }
      : blankForm,
  );
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const fieldErrors = validateRegistrationForm(form);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHasSubmitted(true);
    setError("");

    if (Object.keys(fieldErrors).length > 0) {
      setError("Please check the highlighted fields and try again.");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/admin/students", {
        method: student ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student ? { id: student.id, ...form } : form),
      });
      const result: { student?: StudentRecord; error?: string } = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to save student.");
      }
      if (!result.student) {
        throw new Error("The server did not return the saved student.");
      }
      onSaved(result.student);
    } catch (saveError) {
      setError(
        saveError instanceof Error ? saveError.message : "Unable to save student.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  function getError(field: keyof RegistrationFormValues) {
    return hasSubmitted ? fieldErrors[field] : undefined;
  }

  function updateField(
    field: keyof RegistrationFormValues,
    value: string,
  ) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <div
      className="admin-student-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSaving) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && !isSaving) onClose();
      }}
    >
      <section
        className="admin-student-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-student-modal-title"
      >
        <header className="admin-student-modal__header">
          <div className="admin-student-modal__mark" aria-hidden="true">♫</div>
          <div>
            <p>{student ? "UPDATE DIRECTORY" : "NEW ENROLLMENT"}</p>
            <h2 id="admin-student-modal-title">
              {student ? "Edit student" : "Add a student"}
            </h2>
            <span>
              {student
                ? `Registration ${student.registrationNumber}`
                : "Add student details to the academy directory."}
            </span>
          </div>
          <button
            type="button"
            className="admin-student-modal__close"
            aria-label="Close dialog"
            disabled={isSaving}
            onClick={onClose}
          >
            ×
          </button>
        </header>

        <form className="admin-student-form" onSubmit={handleSubmit} noValidate>
          {error ? <p className="admin-student-form__error" role="alert">{error}</p> : null}
          <div className="admin-student-form__grid">
            <label className={getError("name") ? "has-error" : ""}>
              <span className="admin-student-form__label">Student name <i>*</i></span>
              <input
                autoFocus
                autoComplete="name"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                aria-invalid={Boolean(getError("name"))}
              />
              {getError("name") ? <small>{getError("name")}</small> : null}
            </label>
            <label className={getError("email") ? "has-error" : ""}>
              <span className="admin-student-form__label">Email address <i>*</i></span>
              <input
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                aria-invalid={Boolean(getError("email"))}
              />
              {getError("email") ? <small>{getError("email")}</small> : null}
            </label>
            <label className={getError("phone") ? "has-error" : ""}>
              <span className="admin-student-form__label">Phone number <i>*</i></span>
              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                maxLength={10}
                value={form.phone}
                onChange={(event) =>
                  updateField("phone", event.target.value.replace(/\D/g, "").slice(0, 10))
                }
                aria-invalid={Boolean(getError("phone"))}
              />
              {getError("phone") ? <small>{getError("phone")}</small> : null}
            </label>
            <label className={getError("musicOption") ? "has-error" : ""}>
              <span className="admin-student-form__label">Course <i>*</i></span>
              <select
                value={form.musicOption}
                onChange={(event) => updateField("musicOption", event.target.value)}
                aria-invalid={Boolean(getError("musicOption"))}
              >
                <option value="">Select a course</option>
                <option value="CLASSICAL_MUSIC">Classical Music</option>
                <option value="LIGHT_MUSIC">Light Music</option>
                <option value="HARMONIUM">Harmonium</option>
                <option value="GUITAR">Guitar</option>
              </select>
              {getError("musicOption") ? <small>{getError("musicOption")}</small> : null}
            </label>
            <label className={getError("mode") ? "has-error" : ""}>
              <span className="admin-student-form__label">Tuition mode <i>*</i></span>
              <select
                value={form.mode}
                onChange={(event) => updateField("mode", event.target.value)}
                aria-invalid={Boolean(getError("mode"))}
              >
                <option value="">Select tuition mode</option>
                <option value="HOME">Home Tuition</option>
                <option value="ONLINE">Online Tuition</option>
                <option value="OFFLINE">Offline Tuition</option>
              </select>
              {getError("mode") ? <small>{getError("mode")}</small> : null}
            </label>
            <label className="admin-student-form__full">
              <span className="admin-student-form__label">
                Address <i className="admin-student-form__optional">Optional</i>
              </span>
              <textarea
                rows={3}
                maxLength={500}
                value={form.address}
                onChange={(event) => updateField("address", event.target.value)}
              />
            </label>
          </div>
          <footer className="admin-student-form__footer">
            <button
              type="button"
              className="admin-student-form__cancel"
              disabled={isSaving}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="admin-student-form__submit" disabled={isSaving}>
              {isSaving ? "Saving..." : student ? "Save changes" : "Add student"}
              {!isSaving ? <span aria-hidden="true">→</span> : null}
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}
