"use client";

import { useState } from "react";

export type AdminTableRow = {
  id: string;
  cells: string[];
  status?: string;
};

type AdminTableFilterOption = {
  value: string;
  label: string;
};

type AdminDataTableProps = {
  columns: string[];
  rows: AdminTableRow[];
  emptyMessage: string;
  searchPlaceholder: string;
  filterOptions?: AdminTableFilterOption[];
  statusColumnIndex?: number;
};

const statusClassNames: Record<string, string> = {
  COMPLETED: "status-pill--completed",
  READ: "status-pill--read",
  ACTIVE: "status-pill--completed",
  INACTIVE: "status-pill--inactive",
};

export default function AdminDataTable({
  columns,
  rows,
  emptyMessage,
  searchPlaceholder,
  filterOptions,
  statusColumnIndex,
}: AdminDataTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const normalizedSearch = search.trim().toLocaleLowerCase();
  const filteredRows = rows.filter((row) => {
    const matchesSearch =
      !normalizedSearch ||
      row.cells.some((cell) =>
        cell.toLocaleLowerCase().includes(normalizedSearch),
      );
    const matchesStatus = !statusFilter || row.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <section className="admin-table-card" aria-label="Records">
      <div className="admin-table-toolbar">
        <label className="admin-table-search">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
          />
        </label>
        {filterOptions?.length ? (
          <label className="admin-table-filter">
            <span>Status</span>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Filter by status"
            >
              <option value="">All statuses</option>
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}
        <p className="admin-table-count">
          {filteredRows.length} of {rows.length} records
        </p>
      </div>
      <div className="table-scroll">
        <table className="admin-table">
          <thead>
            <tr>
              {columns.map((column) => <th key={column}>{column}</th>)}
            </tr>
          </thead>
          <tbody>
            {filteredRows.length ? filteredRows.map((row) => (
              <tr key={row.id}>
                {row.cells.map((cell, index) => (
                  <td key={`${row.id}-${columns[index]}`}>
                    {index === statusColumnIndex && row.status ? (
                      <span className={`status-pill ${statusClassNames[row.status] ?? ""}`}>
                        {cell}
                      </span>
                    ) : cell}
                  </td>
                ))}
              </tr>
            )) : (
              <tr>
                <td className="admin-table-empty" colSpan={columns.length}>
                  {rows.length ? "No records match your filters." : emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
