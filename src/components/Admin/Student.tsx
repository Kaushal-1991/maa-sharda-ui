import React, { useEffect, useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';

import { IconEdit, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { fetchStudents } from '../../Service/StudentService';
import { errorNotification } from '../../Utility/NotificationUtil';


const Student = () => {

    const [globalFilterValue, setGlobalFilterValue] = useState('');

    // Dummy Student Data
    const [students,setStudents] = useState<any[]>([]);


    useEffect(() => {
        fetchStudents()
            .then((data: any) => {
                setStudents(data.data);
            })
            .catch(error => {
                console.error(error);
                errorNotification("Error fetching students");
            });
    }, []);
    // Filters
    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: {
            value: null,
            matchMode: FilterMatchMode.CONTAINS
        }
    });

    // Global Search
    const onGlobalFilterChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;

        setFilters({
            global: {
                value: value,
                matchMode: FilterMatchMode.CONTAINS
            }
        });

        setGlobalFilterValue(value);
    };

    // Header
    const renderHeader = () => {
        return (
            <div
                className="flex justify-between items-center gap-4"
                style={{ padding: '10px 0' }}
            >
            <div
                    className="flex items-center"
                    style={{
                        position: 'relative'
                    }}
                >
                    <i
                        className="pi pi-search"
                        style={{
                            position: 'absolute',
                            left: '10px',
                            zIndex: 1
                        }}
                    />

                    <InputText
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder="Search students..."
                        style={{
                            paddingLeft: '35px'
                        }}
                    />
                </div>

            </div>
        );
    };

    // Music Type Template
    const musicTypeTemplate = (rowData: any) => {

        let severity: any = 'info';

        if (rowData.musicOption === 'CLASSICAL_MUSIC') {
            severity = 'success';
        }

        if (rowData.musicOption === 'LIGHT_MUSIC') {
            severity = 'warning';
        }

        if (rowData.musicOption === 'HARMONIUM') {
            severity = 'info';
        }

        if (rowData.musicOption === 'GUITAR') {
            severity = 'danger';
        }

        return (
            <Tag
                value={rowData.musicOption}
                severity={severity}
            />
        );
    };

    // Delete
    const handleDelete = (rowData: any) => {

        modals.openConfirmModal({
            title: (
                <span className="text-xl font-semibold">
                    Are you sure?
                </span>
            ),

            centered: true,

            children: (
                <Text size="sm">
                    Do you really want to delete{' '}
                    <strong>{rowData.name}</strong>?
                    This process cannot be undone.
                </Text>
            ),

            labels: {
                confirm: 'Delete',
                cancel: 'Cancel'
            },

            confirmProps: {
                color: 'red'
            },

            onConfirm: () => {
                console.log('Delete student:', rowData);
            }
        });
    };

    // Actions
    const actionBodyTemplate = (rowData: any) => {

        return (
            <div className="flex gap-2">

                <ActionIcon
                    color="blue"
                    variant="light"
                    onClick={() => {
                        console.log('Edit student:', rowData);
                    }}
                >
                    <IconEdit
                        size={18}
                        stroke={1.5}
                    />
                </ActionIcon>

                <ActionIcon
                    color="red"
                    variant="light"
                    onClick={() => handleDelete(rowData)}
                >
                    <IconTrash
                        size={18}
                        stroke={1.5}
                    />
                </ActionIcon>

            </div>
        );
    };

    const header = renderHeader();

    return (
        <div className="patient-appointment-container">

            <div
                className="appointment-card appointment-table"
                style={{
                    backgroundColor: '#f0f0f0',
                    padding: '15px'
                }}
            >

                <DataTable
                    value={students}
                    header={header}
                    stripedRows
                    size="small"
                    className="p-datatable-sm"

                    paginator
                    rows={10}

                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"

                    rowsPerPageOptions={[10, 25, 50]}

                    dataKey="id"

                    filters={filters}

                    globalFilterFields={[
                        'name',
                        'email',
                        'phone',
                        'musicOption',
                    ]}

                    emptyMessage="📭 No students found"

                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} students"

                    responsiveLayout="scroll"
                >

                    <Column
                        field="name"
                        header="Name"
                        sortable
                        filter
                        filterPlaceholder="Search by name"
                        style={{ minWidth: '12rem' }}
                    />

                    <Column
                        field="email"
                        header="Email"
                        sortable
                        filter
                        filterPlaceholder="Search by email"
                        style={{ minWidth: '16rem' }}
                    />

                    <Column
                        field="phone"
                        header="Phone"
                        sortable
                        filter
                        filterPlaceholder="Search by phone"
                        style={{ minWidth: '12rem' }}
                    />

                    <Column
                        field="musicOption"
                        header="Music Option"
                        sortable
                        filter
                        body={musicTypeTemplate}
                        style={{ minWidth: '14rem' }}
                    />

                    

                    <Column
                        header="Actions"
                        body={actionBodyTemplate}
                        headerStyle={{
                            width: '8rem',
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
