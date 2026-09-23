import React, { useEffect, useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import {
    DataTable,
    DataTableFilterMeta
} from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import './Student.css';

import {
    IconEdit,
    IconTrash,
    IconSearch,
    IconUsers
} from '@tabler/icons-react';

import { ActionIcon, Text } from '@mantine/core';
import { modals } from '@mantine/modals';

import { deleteStudents, fetchStudents } from '../../Service/StudentService';
import { errorNotification, successNotification } from '../../Utility/NotificationUtil';


const Student = () => {

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [students, setStudents] = useState<any[]>([]);

    useEffect(() => {
       getFetchStudent();
    }, []);

    function getFetchStudent(){
        fetchStudents()
            .then((data: any) => {
                setStudents(data.data);
            })
            .catch(error => {
                console.error(error);
                errorNotification('Error fetching students');
        });
    }

    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: {
            value: null,
            matchMode: FilterMatchMode.CONTAINS
        }
    });

    // =========================
    // GLOBAL SEARCH
    // =========================

    const onGlobalFilterChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const value = e.target.value;

        setFilters({
            global: {
                value,
                matchMode: FilterMatchMode.CONTAINS
            }
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
                        <IconUsers
                            size={19}
                            stroke={1.8}
                        />
                    </div>

                    <div>
                        <div className="student-title">
                            Students
                        </div>

                        <div className="student-subtitle">
                            Manage registered students
                        </div>
                    </div>

                </div>

                <div className="student-search-wrapper">

                    <IconSearch
                        size={17}
                        className="student-search-icon"
                        stroke={1.8}
                    />

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

        let severity:
            | 'success'
            | 'warning'
            | 'info'
            | 'danger'
            | undefined = 'info';

        let label = 'Not Selected';

        switch (rowData.musicOption) {

            case 'CLASSICAL_MUSIC':
                severity = 'success';
                label = 'Classical Music';
                break;

            case 'LIGHT_MUSIC':
                severity = 'warning';
                label = 'Light Music';
                break;

            case 'HARMONIUM':
                severity = 'info';
                label = 'Harmonium';
                break;

            case 'GUITAR':
                severity = 'danger';
                label = 'Guitar';
                break;

            
            case '':
            case null:
            case undefined:
                label = 'Not Selected';
                break;
            default:
                label = 'Not Selected';
        }

        return (
            <Tag
                value={label}
                severity={severity}
                className="music-tag"
            />
        );
    };

    // =========================
    // DELETE
    // =========================

    const handleDelete = (rowData: any) => {
       modals.openConfirmModal({
            title: <span className='text-xl font-serif font-semibold'>Are you sure?</span>,
            centered: true,
            children: (
                <Text size="sm">
                    Do you really want to delete this student? This process cannot be undone.
                </Text>
            ),
            labels: { confirm: 'Confirm', cancel: 'Cancel' },
            onConfirm: () => {
                deleteStudents(rowData.id).then(() => {
                    successNotification("Student canceled successfully!");
                    getFetchStudent();
                }).catch((error) => {
                    console.error('Error deleteing student:', error);
                    errorNotification("Failed to delete student.");
                });
            }
        });
    };

    // =========================
    // ACTIONS
    // =========================

    const actionBodyTemplate = (rowData: any) => {

        return (
            <div className="student-actions">

                <ActionIcon
                    size="30"
                    color="blue"
                    variant="light"
                    className="student-action-btn"
                    onClick={() => {
                        console.log(
                            'Edit student:',
                            rowData
                        );
                    }}
                    title="Edit Student"
                >

                    <IconEdit
                        size={16}
                        stroke={1.7}
                    />

                </ActionIcon>

                <ActionIcon
                    size="30"
                    color="red"
                    variant="light"
                    className="student-action-btn"
                    onClick={() =>
                        handleDelete(rowData)
                    }
                    title="Delete Student"
                >

                    <IconTrash
                        size={16}
                        stroke={1.7}
                    />

                </ActionIcon>

            </div>
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

                    rowsPerPageOptions={[
                        10,
                        25,
                        50
                    ]}

                    dataKey="id"

                    filters={filters}

                    globalFilterFields={[
                        'name',
                        'email',
                        'phone',
                        'musicOption'
                    ]}

                    emptyMessage={
                        <div className="student-empty">
                            <span className="empty-icon">
                                📭
                            </span>

                            <span>
                                No students found
                            </span>
                        </div>
                    }

                    currentPageReportTemplate="
                        Showing {first} to {last}
                        of {totalRecords} students
                    "responsiveLayout="scroll"
                >

                    {/* NAME */}

                    <Column
                        field="name"
                        header="Student"
                        sortable
                        filterPlaceholder="Search name"
                        style={{
                            minWidth: '11rem'
                        }}
                    />

                    {/* EMAIL */}

                    <Column
                        field="email"
                        header="Email"
                        sortable
                        filterPlaceholder="Search email"
                        style={{
                            minWidth: '15rem'
                        }}
                    />

                    {/* PHONE */}

                    <Column
                        field="phone"
                        header="Phone"
                        sortable
                        filterPlaceholder="Search phone"
                        style={{
                            minWidth: '10rem'
                        }}
                    />

                    {/* MUSIC */}

                    <Column
                        field="musicOption"
                        header="Music"
                        sortable
                        body={musicTypeTemplate}
                        style={{
                            minWidth: '11rem'
                        }}
                    />

                    {/* ACTIONS */}

                    <Column
                        header="Actions"
                        body={actionBodyTemplate}
                        headerStyle={{
                            width: '7rem',
                            textAlign: 'center'
                        }}
                        bodyStyle={{
                            textAlign: 'center'
                        }}
                    />

                </DataTable>

            </div>

        </div>
    );
};

export default Student;