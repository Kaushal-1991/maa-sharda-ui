import React, { useEffect, useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import "./Student.css";
import "primeicons/primeicons.css";

import {
  IconEdit,
  IconTrash,
  IconSearch,
  IconUsers,
} from "@tabler/icons-react";

import { ActionIcon, Switch, Text, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";

import {
  deleteStudents,
  fetchStudents,
  registrationStudent,
} from "../../Service/StudentService";

import {
  errorNotification,
  successNotification,
} from "../../Utility/NotificationUtil";
import RegistrationCertificate from "./RegistrationCertificate";

const Student = () => {
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    getFetchStudent();
  }, []);

  function getFetchStudent() {
    fetchStudents()
      .then((data: any) => {
        setStudents(data.data);
      })
      .catch((error) => {
        console.error(error);
        errorNotification("Error fetching students");
      });
  }

  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
  });

  // =========================
  // GLOBAL SEARCH
  // =========================

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setFilters({
      global: {
        value,
        matchMode: FilterMatchMode.CONTAINS,
      },
    });

    setGlobalFilterValue(value);
  };

  // =========================
  // HEADER
  // =========================

  const renderHeader = () => {
    return (
      <div className="student-table-header">
        <div className="student-title-section">
          <div className="student-title-icon">
            <IconUsers size={19} stroke={1.8} />
          </div>

          <div>
            <div className="student-title">Students</div>

            <div className="student-subtitle">Manage registered students</div>
          </div>
        </div>

        <div className="student-search-wrapper">
          <IconSearch size={17} className="student-search-icon" stroke={1.8} />

          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search students..."
            className="student-search"
          />
        </div>
      </div>
    );
  };

  // =========================
  // MUSIC TYPE
  // =========================

  const musicTypeTemplate = (rowData: any) => {
    let severity: "success" | "warning" | "info" | "danger" | undefined =
      "info";

    let label = "Not Selected";

    switch (rowData.musicOption) {
      case "CLASSICAL_MUSIC":
        severity = "success";
        label = "Classical Music";
        break;

      case "LIGHT_MUSIC":
        severity = "warning";
        label = "Light Music";
        break;

      case "HARMONIUM":
        severity = "info";
        label = "Harmonium";
        break;

      case "GUITAR":
        severity = "danger";
        label = "Guitar";
        break;

      case "":
      case null:
      case undefined:
        label = "Not Selected";
        break;
      default:
        label = "Not Selected";
    }

    return <Tag value={label} severity={severity} className="music-tag" />;
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = (rowData: any) => {
    modals.openConfirmModal({
      title: (
        <span className="text-xl font-serif font-semibold">Are you sure?</span>
      ),
      centered: true,
      children: (
        <Text size="sm">
          Do you really want to delete this student? This process cannot be
          undone.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: () => {
        deleteStudents(rowData.id)
          .then(() => {
            successNotification("Student canceled successfully!");
            getFetchStudent();
          })
          .catch((error) => {
            console.error("Error deleting student:", error);
            errorNotification("Failed to delete student.");
          });
      },
    });
  };

  // =========================
  // ACTIONS
  // =========================

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="student-actions">
        {/* Edit */}
        <Tooltip label="Edit Student">
          <ActionIcon
            size={30}
            color="blue"
            variant="light"
            className="student-action-btn"
            onClick={() => {
              console.log("Edit student:", rowData);
            }}
          >
            <IconEdit size={16} stroke={1.7} />
          </ActionIcon>
        </Tooltip>

        {/* Enable / Disable */}

        <Switch
          size="sm"
          color="blue"
          checked={rowData.registrationStatus === "COMPLETED"}
          disabled={rowData.registrationStatus === "COMPLETED"}
          styles={{
            track: {
              opacity:
                rowData.registrationStatus === "COMPLETED" ? 1 : undefined,

              backgroundColor:
                rowData.registrationStatus === "COMPLETED"
                  ? "#228be6"
                  : undefined,

              borderColor:
                rowData.registrationStatus === "COMPLETED"
                  ? "#228be6"
                  : undefined,
            },

            thumb: {
              backgroundColor:
                rowData.registrationStatus === "COMPLETED"
                  ? "#ffffff"
                  : undefined,
            },
          }}
          onChange={(event) => {
            const completed = event.currentTarget.checked;

            if (!completed) {
              return;
            }

            const newStatus = "COMPLETED";

            registrationStudent(rowData.id, newStatus)
              .then(() => {
                setStudents((prevStudents) =>
                  prevStudents.map((student) =>
                    student.id === rowData.id
                      ? {
                          ...student,
                          registrationStatus: newStatus,
                        }
                      : student,
                  ),
                );

                successNotification("Registration is completed");
              })
              .catch((error) => {
                console.error(error);
                errorNotification("Error while updating registration");
              });
          }}
        />
        {/* Download */}
        {students?.find(
          (student: any) =>
            student.id === rowData.id &&
            student.registrationStatus === "COMPLETED",
        ) && (
          <Tooltip label="Download Student">
            <div>
              <RegistrationCertificate student={rowData} />
            </div>
          </Tooltip>
        )}
        {/* Delete */}
        <Tooltip label="Delete Student">
          <ActionIcon
            size={30}
            color="red"
            variant="light"
            className="student-action-btn"
            onClick={() => handleDelete(rowData)}
          >
            <IconTrash size={16} stroke={1.7} />
          </ActionIcon>
        </Tooltip>
      </div>
    );
  };

  const registrationStatusTemplate = (rowData: any) => {
    const isCompleted = rowData.registrationStatus === "COMPLETED";

    return (
      <Tag
        value={isCompleted ? "COMPLETED" : "PENDING"}
        severity={isCompleted ? "success" : "danger"}
        icon={isCompleted ? "pi pi-check-circle" : "pi pi-clock"}
        className="student-status-badge"
      />
    );
  };

  const header = renderHeader();

  return (
    <div className="student-page">
      <div className="student-card">
        <DataTable
          value={students}
          header={header}
          stripedRows
          size="small"
          className="student-data-table"
          paginator
          rows={10}
          paginatorTemplate="
                        FirstPageLink
                        PrevPageLink
                        PageLinks
                        NextPageLink
                        LastPageLink
                        CurrentPageReport
                        RowsPerPageDropdown
                    "
          rowsPerPageOptions={[10, 25, 50]}
          dataKey="id"
          filters={filters}
          globalFilterFields={[
            "name",
            "email",
            "phone",
            "musicOption",
            "registrationStatus",
          ]}
          emptyMessage={
            <div className="student-empty">
              <span className="empty-icon">📭</span>

              <span>No students found</span>
            </div>
          }
          currentPageReportTemplate="
                        Showing {first} to {last}
                        of {totalRecords} students
                    "
          responsiveLayout="scroll"
        >
          {/* NAME */}

          <Column
            field="name"
            header="Student"
            sortable
            filterPlaceholder="Search name"
            style={{
              minWidth: "11rem",
            }}
          />

          {/* EMAIL */}

          <Column
            field="email"
            header="Email"
            sortable
            filterPlaceholder="Search email"
            style={{
              minWidth: "15rem",
            }}
          />

          {/* PHONE */}

          <Column
            field="phone"
            header="Phone"
            sortable
            filterPlaceholder="Search phone"
            style={{
              minWidth: "10rem",
            }}
          />

          {/* MUSIC */}

          <Column
            field="musicOption"
            header="Music"
            sortable
            body={musicTypeTemplate}
            style={{
              minWidth: "11rem",
            }}
          />

          <Column
            field="registrationStatus"
            header="Status"
            sortable
            body={registrationStatusTemplate}
            style={{
              minWidth: "11rem",
            }}
          />

          {/* ACTIONS */}

          <Column
            header="Actions"
            body={actionBodyTemplate}
            headerStyle={{
              width: "7rem",
              textAlign: "center",
            }}
            bodyStyle={{
              textAlign: "center",
            }}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default Student;
