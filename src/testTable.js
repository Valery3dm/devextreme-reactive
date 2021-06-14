import React, { useRef, useState, useCallback } from 'react';
import { EditingState } from '@devexpress/dx-react-grid';
import { GridExporter } from '@devexpress/dx-react-grid-export';
import { ExportPanel } from '@devexpress/dx-react-grid-material-ui';
import { PagingState, IntegratedPaging } from '@devexpress/dx-react-grid';
import { SearchState, IntegratedFiltering } from '@devexpress/dx-react-grid';
import saveAs from 'file-saver';
import {
  SortingState,
  IntegratedSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  Toolbar,
  VirtualTable,
  SearchPanel,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
  PagingPanel,
} from '@devexpress/dx-react-grid-bootstrap4';

import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

import data from './dataForTest';

const getRowId = row => row.id;

const TestTable = () => {

  const [columns] = useState([
    { name: "id", title: "ID" },
    { name: "email", title: "Email" },
    { name: "first", title: "First" },
    { name: "last", title: "Last" },
    { name: "company", title: "Company" },
    { name: "created_at", title: "Created at" },
    { name: "country", title: "Country" },
  ]);
  const [tableColumnExtensions] = useState([
    { columnName: 'id', width: '10%', align: 'center' },
    { columnName: 'email', width: '20%' },
    { columnName: 'first', width: '10%' },
    { columnName: 'last', width: '10%' },
    { columnName: 'company', width: '10%', wordWrapEnabled: true },
    { columnName: 'created_at', width: '20%', wordWrapEnabled: true },
    { columnName: 'country', width: '10%', wordWrapEnabled: true }
  ]);
  const [rows, setRows] = useState(data);
  const [pageSizes] = useState([5, 10, 15, 0]);
  const [editingStateColumnExtensions] = useState([
    { columnName: 'name', editingEnabled: false },
  ]);

  const exporterRef = useRef(null);

  const onSave = (workbook) => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
    });
  };

  const startExport = useCallback(() => {
    exporterRef.current.exportGrid();
  }, [exporterRef]);

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.id));
    }
    setRows(changedRows);
  };

  return (
    <div className="card">
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
      >
        

        <VirtualTable>save</VirtualTable>

        <SearchState />
        <IntegratedFiltering />


        <EditingState
          onCommitChanges={commitChanges}
          defaultEditingRowIds={[0]}
          columnExtensions={editingStateColumnExtensions}
        />


        <PagingState
          defaultCurrentPage={0}
          defaultPageSize={5}
        />
        <IntegratedPaging />


        <SortingState
          defaultSorting={[{ columnName: 'city', direction: 'asc' }]}
        />
        <IntegratedSorting />


        <Table 
          columnExtensions={tableColumnExtensions}
        />
        <TableHeaderRow
          showSortingControls
        />


        <TableEditRow />
        <TableEditColumn
          showAddCommand
          showEditCommand
          showDeleteCommand
        />


        <PagingPanel
          pageSizes={pageSizes}
        />


        <Toolbar />
        <SearchPanel />


        <ExportPanel startExport={startExport}/>


      </Grid>


      <GridExporter
        ref={exporterRef}
        rows={rows}
        columns={columns}
        onSave={onSave}
      />

    </div>
  );
};

export default TestTable;
