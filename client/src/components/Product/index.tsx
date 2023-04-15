import { useState } from "react";
import { ColDef } from "ag-grid-community";
import { confirmAlert } from "react-confirm-alert";
import { useProductHooks } from "./useProductHooks";
import { AgGridReact } from "../common/AgGridReact";
import GridActions from "../common/GridActions";

const ProductMaster = () => {
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
  } = useProductHooks();

  const [colDefs] = useState<ColDef[]>([
    { field: "productCode", headerName: "Code" },
    { field: "productName", headerName: "Product Name" },
    { field: "casNo", headerName: "CAS No." },
    { field: "molecularWeight", headerName: "Molecular Wt." },
    { field: "molecularFormula", headerName: "Molecular Formula" },
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
      <h1 className="header-title">{`Product Master`}</h1>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="row g-2">
              <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <label className="form-label">Product Code</label>
                <input
                  {...register("productCode")}
                  className={`form-control ${
                    errors?.productCode ? `error` : ``
                  } `}
                  name={"productCode"}
                  placeholder="Product Code"
                  onChange={handleChange}
                  value={formData.productCode}
                />
                {errors?.productCode && (
                  <div className="invalid-feedback">
                    {errors?.productCode?.message as string}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <label className="form-label">Product Name</label>
                <input
                  {...register("productName")}
                  className={`form-control ${
                    errors?.productName ? `error` : ``
                  } `}
                  name={"productName"}
                  placeholder="Product Name"
                  onChange={handleChange}
                  value={formData.productName}
                />
                {errors?.productName && (
                  <div className="invalid-feedback">
                    {errors?.productName?.message as string}
                  </div>
                )}
              </div>

              <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
                <label className="form-label">CAS No.</label>
                <input
                  {...register("casNo")}
                  className={`form-control ${errors?.casNo ? `error` : ``} `}
                  name={"casNo"}
                  placeholder="CAS No"
                  onChange={handleChange}
                  value={formData.casNo}
                />
                {errors?.casNo && (
                  <div className="invalid-feedback">
                    {!!errors?.casNo?.message}
                  </div>
                )}
              </div>
              <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
                <label className="form-label">Molecular Weight</label>
                <input
                  className={`form-control`}
                  name={"molecularWeight"}
                  placeholder="Molecular Weight"
                  onChange={handleChange}
                  value={formData.molecularWeight}
                />
              </div>
              <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
                <label className="form-label">Molecular Formula</label>
                <input
                  className={`form-control`}
                  name={"molecularFormula"}
                  placeholder="Molecular Formula"
                  onChange={handleChange}
                  value={formData.molecularFormula}
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

export default ProductMaster;
