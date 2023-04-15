import { useMemo, useState } from "react";
import { ColDef, IDetailCellRendererParams } from "ag-grid-community";
import { confirmAlert } from "react-confirm-alert";
import { useCOAReportHooks } from "./useCOAReportHooks";
import { AgGridReact } from "../common/AgGridReact";
import GridActions from "../common/GridActions";
import { Link } from "react-router-dom";


const COAReportMasterList = () => {
  const { rowData, onGridEdit, onGridDelete } = useCOAReportHooks();

  const [colDefs] = useState<ColDef[]>([
    {
      field: "TestDate",
      headerName: "Test Date",
      cellRenderer: "agGroupCellRenderer"
    },
    { field: "customerName", headerName: "Customer" },
    { field: "productName", headerName: "Product" },
    { field: "grade", headerName: "Grade" },
    { field: "batchNo", headerName: "Batch No" },
    { field: "arNo", headerName: "AR No" },
    {
      headerName: "",
      width: 60,
      pinned: "right",
      filter: false,
      cellRendererFramework: (val: any) => {
        return (
          <Link
            className="btn btn-info btn-sm agGrid-button"
            //target="_blank"
            // rel="noopener noreferrer"
            to="/app/printcoa"
            state={{ data: val.data }}
          >
            <i className="fa-solid fa-print" />
          </Link>
        );
      }
    },
    {
      headerName: "Actions",
      width: 100,
      pinned: "right",
      cellRendererFramework: (val: any) =>
        <GridActions
          data={val}
          onEditClick={onGridEdit}
          onDeleteClick={onDelete}
        />,
      field: "id",
      colId: "params"
    }
  ]);

  const onDelete = (data: any) => {
    confirmAlert({
      title: "Delete Confirmation",
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            onGridDelete(data);
          }
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  };

  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        columnDefs: [
          { field: "template", headerName: "Template" },
          { field: "testName", headerName: "Test Name" },
          { field: "grade", headerName: "Grade" },
          { field: "result", headerName: "Result" },
          { field: "specification", headerName: "Specification" }
        ],
        defaultColDef: {
          flex: 1
        }
      },
      getDetailRowData: (params: any) => {
        params.successCallback(params.data.details);
      }
    } as IDetailCellRendererParams<any, any>;
  }, []);

  return (
    <div className="container-fluid">
      <h1 className="header-title">
        {`Generate Test`}
        <Link to={"/app/inittest"} className="btn btn-light btn-sm">
          <i className="fa-solid fa-user-plus" />
          {" Generate New Test"}
        </Link>
      </h1>
      <div className="card">
        <div className="card-body">
          <div className="ag-theme-balham agGrid-height-width mt-2">
            <AgGridReact
              rowData={rowData}
              columnDefs={colDefs}
              masterDetail={true}
              detailCellRendererParams={detailCellRendererParams}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default COAReportMasterList;
