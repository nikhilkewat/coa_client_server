import { useState } from "react";
import { ColDef } from "ag-grid-community";
import { Controller } from "react-hook-form";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { confirmAlert } from "react-confirm-alert";
import { useCOAReportHooks } from "./useCOAReportHooks";
import { AgGridReact } from "../common/AgGridReact";
import GridActions from "../common/GridActions";

const COAReportMaster = () => {
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
    control,
    product_list,
    onProductChange
  } = useCOAReportHooks();

  const [colDefs] = useState<ColDef[]>([
    { field: "testName", headerName: "Test" },
    { field: "productName", headerName: "Product" },
    { field: "testResultsGroupConcat", headerName: "Results" },
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
      <h1 className="header-title">{`COA Test Master`}</h1>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="row g-2">
              <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <label className="form-label">Product</label>
                <Controller
                  name={"productId"}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="react-select"
                      value={formData.selectedProduct}
                      options={product_list}
                      onChange={onProductChange}
                    />
                  )}
                />
              </div>
              <div className="col-md-2 col-lg-2 col-sm-12 col-xs-12">
                <label className="form-label">CAS No.</label>
                <input
                  disabled={true}
                  className={`form-control `}
                  name={"testResultsGroupConcat"}
                  placeholder="Result"
                  onChange={handleChange}
                  value={formData.selectedProduct?.other?.casNo}
                />
              </div>
              <div className="col-md-2 col-lg-2 col-sm-12 col-xs-12">
                <label className="form-label">Modecular Wt.</label>
                <input
                  disabled={true}
                  className={`form-control `}
                  name={"testResultsGroupConcat"}
                  placeholder="Result"
                  onChange={handleChange}
                  value={formData.selectedProduct?.other?.modecularWeight}
                />
              </div>
              <div className="col-md-2 col-lg-2 col-sm-12 col-xs-12">
                <label className="form-label">Molecular Wt.</label>
                <input
                  disabled={true}
                  className={`form-control `}
                  name={"testResultsGroupConcat"}
                  placeholder="Result"
                  onChange={handleChange}
                  value={formData.selectedProduct?.other?.molecularWeight}
                />
              </div>
            
              <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
                <label className="form-label">Grade</label>
                <input
                  {...register("grade")}
                  className={`form-control ${errors?.grade ? `error` : ``} `}
                  name={"grade"}
                  placeholder="Grade"
                  onChange={handleChange}
                  value={formData.grade}
                />
                {errors?.grade && (
                  <div className="invalid-feedback">
                    {!!errors?.grade?.message}
                  </div>
                )}
              </div>
              <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
                <label className="form-label">Batch</label>
                <input
                  {...register("batchNo")}
                  className={`form-control ${errors?.batchNo ? `error` : ``} `}
                  name={"batchNo"}
                  placeholder="Batch No"
                  onChange={handleChange}
                  value={formData.batchNo}
                />
                {errors?.batchNo && (
                  <div className="invalid-feedback">
                    {!!errors?.batchNo?.message}
                  </div>
                )}
              </div>
              <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
                <label className="form-label">AR No</label>
                <input
                  {...register("arNo")}
                  className={`form-control ${errors?.arNo ? `error` : ``} `}
                  name={"arNo"}
                  placeholder="AR No"
                  onChange={handleChange}
                  value={formData.arNo}
                />
                {errors?.arNo && (
                  <div className="invalid-feedback">
                    {!!errors?.arNo?.message}
                  </div>
                )}
              </div>
              <div className="col-md-2 col-lg-2 col-sm-12 col-xs-12">
                <label className="form-label">Supply</label>
                <input
                  {...register("supplyQty")}
                  className={`form-control ${errors?.supplyQty ? `error` : ``} `}
                  name={"supplyQty"}
                  placeholder="Supply Qty."
                  onChange={handleChange}
                  value={formData.supplyQty}
                />
                {errors?.supplyQty && (
                  <div className="invalid-feedback">
                    {!!errors?.supplyQty?.message}
                  </div>
                )}
              </div>
              <div className="col-md-1 col-lg-1 col-sm-12 col-xs-12">
                <label className="form-label">Page #</label>
                <input
                  className={`form-control`}
                  name={"pageNo"}
                  placeholder="Page #"
                  onChange={handleChange}
                  value={formData.pageNo}
                />
            
              </div>
              <div className="col-md-3 col-lg-3 col-sm-12">
              <label className="form-label">Mfg. Date</label>
    
              <DatePicker
                {...register("startdate")}
                selected={formData?.mfgDate as Date}
                onChange={(date: Date) =>
                console.log(date)
                }
                showYearDropdown
                dateFormat={"dd/MM/yyyy"}
                className={`form-control ${errors?.chequeDate ? `error` : ``} `}
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

export default COAReportMaster;
