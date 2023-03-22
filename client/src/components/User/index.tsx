import { useState } from "react";
import { ColDef } from "ag-grid-community";
import { confirmAlert } from "react-confirm-alert";
import { useUserHooks } from "./useUserHooks";
import { AgGridReact } from "../common/AgGridReact";
import GridActions from "../common/GridActions";

const UserMaster = () => {
  const {
    formData,
    setFormData,
    handleChange,
    intialValues,
    onSubmit,
    rowData,
    onGridEdit,
    register,
    handleSubmit,
    errors,
    onGridDelete
  } = useUserHooks();

  const [colDefs] = useState<ColDef[]>([
    { field: "fullName", headerName: "Name" },
    { field: "userName", headerName: "Username" },
    {
      headerName: "Actions",
      width: 100,
      pinned: "right",
      cellRendererFramework: (val: any) => (
        <GridActions
          data={val}
          onEditClick={onGridEdit}
          onDeleteClick={onDelete}
        />
      ),
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

  return (
    <div className="container-fluid">
      <h1 className="header-title">{`User Master`}</h1>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="row g-2">
              <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
                <label className="form-label">Full Name</label>
                <input
                  {...register("fullName")}
                  className={`form-control ${
                    errors?.ledgeraccountgroupname ? `error` : ``
                  } `}
                  name={"fullName"}
                  placeholder="Name"
                  onChange={handleChange}
                  value={formData.fullName}
                />
                {errors?.fullName && (
                  <div className="invalid-feedback">
                    {!!errors?.fullName?.message}
                  </div>
                )}
              </div>
              <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
                <label className="form-label">User Name</label>
                <input
                  {...register("userName")}
                  className={`form-control ${
                    errors?.ledgeraccountgroupname ? `error` : ``
                  } `}
                  name={"userName"}
                  placeholder="User Name"
                  onChange={handleChange}
                  value={formData.userName}
                />
                {errors?.userName && (
                  <div className="invalid-feedback">
                    {!!errors?.userName?.message}
                  </div>
                )}
              </div>
              <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
                <label className="form-label">Password</label>
                <input
                  {...register("password")}
                  className={`form-control ${
                    errors?.ledgeraccountgroupname ? `error` : ``
                  } `}
                  name={"password"}
                  placeholder="Password"
                  onChange={handleChange}
                  value={formData.password}
                />
                {errors?.password && (
                  <div className="invalid-feedback">
                    {!!errors?.password?.message}
                  </div>
                )}
              </div>
            </div>
            <div className="row g-2 mt-2">
              <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                <button type="submit" className="btn btn-success w-100 btn-sm">
                  <i className="fa-solid fa-floppy-disk"></i> {" Save"}
                </button>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
                <button
                  type="button"
                  className="btn btn-danger w-100 btn-sm"
                  onClick={() => setFormData(intialValues)}
                >
                  <i className="fa-solid fa-xmark"></i> {" Cancel"}
                </button>
              </div>
            </div>
          </form>
          <div className="ag-theme-balham agGrid-height-width mt-2">
            <AgGridReact rowData={rowData} columnDefs={colDefs}></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMaster;
