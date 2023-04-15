import { useState } from "react";
import { ColDef } from "ag-grid-community";
import { confirmAlert } from "react-confirm-alert";
import { useUserHooks } from "./useCustomerHooks";
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
    onGridDelete,
    reset
  } = useUserHooks();

  const [colDefs] = useState<ColDef[]>([
    { field: "fullName", headerName: "Name" },
    { field: "address", headerName: "Address" },
    { field: "contactPersonName", headerName: "Contact Person" },
    { field: "contactPersonEmail", headerName: "Contact Email" },
    { field: "contactPersonMobile", headerName: "Contact Mobile" },
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
      <h1 className="header-title">{`Customer Master`}</h1>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="row g-2">
              <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
                <label className="form-label">Full Name</label>
                <input
                  {...register("fullName")}
                  className={`form-control ${errors?.fullName ? `error` : ``} `}
                  name={"fullName"}
                  placeholder="Name"
                  onChange={handleChange}
                  value={formData.fullName}
                />
                {errors?.fullName && (
                  <div className="invalid-feedback">
                    {errors?.fullName?.message as string}
                  </div>
                )}
              </div>
              <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
                <label className="form-label">Address</label>
                <textarea
                  {...register("address")}
                  className={`form-control ${errors?.address ? `error` : ``} `}
                  name={"address"}
                  placeholder="Address"
                  onChange={handleChange}
                  value={formData.address}
                />
                {errors?.address && (
                  <div className="invalid-feedback">
                    {errors?.address?.message as string}
                  </div>
                )}
              </div>
              <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
                <label className="form-label">1st Contact Person</label>
                <input
                  {...register("contactPersonName")}
                  className={`form-control ${
                    errors?.contactPersonName ? `error` : ``
                  } `}
                  name={"contactPersonName"}
                  placeholder="1st Contact Person Name"
                  onChange={handleChange}
                  value={formData.contactPersonName}
                />
              </div>
              <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
                <label className="form-label">1st Contact Mobile</label>
                <input
                  {...register("contactPersonMobile")}
                  className={`form-control ${
                    errors?.contactPersonMobile ? `error` : ``
                  } `}
                  name={"contactPersonMobile"}
                  placeholder="1st Contact Person Mobile"
                  onChange={handleChange}
                  value={formData.contactPersonMobile}
                />
              </div>
              <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
                <label className="form-label">1st Contact Email</label>
                <input
                  {...register("contactPersonEmail")}
                  className={`form-control ${
                    errors?.contactPersonEmail ? `error` : ``
                  } `}
                  name={"contactPersonEmail"}
                  placeholder="1st Contact Person Email"
                  onChange={handleChange}
                  value={formData.contactPersonEmail}
                />
              </div>

              <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
                <label className="form-label">2nd Contact Person</label>
                <input
                  {...register("contactPersonName1")}
                  className={`form-control ${
                    errors?.contactPersonName1 ? `error` : ``
                  } `}
                  name={"contactPersonName1"}
                  placeholder="2nd Contact Person Name"
                  onChange={handleChange}
                  value={formData.contactPersonName1}
                />
              </div>
              <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
                <label className="form-label">2nd Contact Mobile</label>
                <input
                  {...register("contactPersonMobile1")}
                  className={`form-control ${
                    errors?.contactPersonMobile1 ? `error` : ``
                  } `}
                  name={"contactPersonMobile1"}
                  placeholder="2nd Contact Person Mobile"
                  onChange={handleChange}
                  value={formData.contactPersonMobile1}
                />
              </div>
              <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
                <label className="form-label">2nd Contact Email</label>
                <input
                  {...register("contactPersonEmail1")}
                  className={`form-control ${
                    errors?.contactPersonEmail1 ? `error` : ``
                  } `}
                  name={"contactPersonEmail1"}
                  placeholder="2nd Contact Person Email"
                  onChange={handleChange}
                  value={formData.contactPersonEmail1}
                />
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
                  onClick={() => {
                    setFormData(intialValues);
                    reset(intialValues);
                  }}
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
