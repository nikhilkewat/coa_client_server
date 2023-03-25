import { useState } from "react";
import { ColDef } from "ag-grid-community";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { confirmAlert } from "react-confirm-alert";
import { useCOATemplateHooks } from "./useCOATemplateHooks";
import { AgGridReact } from "../common/AgGridReact";
import GridActions from "../common/GridActions";

const COATemplates = () => {
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
    test_master_list,
    onTestMasterChange
  } = useCOATemplateHooks();

  const [colDefs] = useState<ColDef[]>([
    { field: "template", headerName: "Test" },
    { field: "applicableTests", headerName: "Applicable for Test(s)" },
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
      <h1 className="header-title">{`COA Template Master`}</h1>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="row g-2">
              <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <label className="form-label">Template Name</label>
                <input
                  {...register("template")}
                  className={`form-control ${errors?.template ? `error` : ``} `}
                  name={"template"}
                  placeholder="Template Name"
                  onChange={handleChange}
                  value={formData.template}
                />
                {errors?.template && (
                  <div className="invalid-feedback">
                    {!!errors?.template?.message}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <label className="form-label">Test(s)</label>

                <Controller
                  name={"testMasterIds"}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="react-select"
                      value={formData.selectedTestMasters}
                      options={test_master_list}
                      isMulti={true}
                      onChange={onTestMasterChange}
                    />
                  )}
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

export default COATemplates;
