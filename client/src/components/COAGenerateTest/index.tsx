import { Controller } from "react-hook-form";
import Select from "react-select";
import DatePicker from "react-datepicker";

import { useCOAReportHooks } from "./useCOAReportHooks";

import { useNavigate } from "react-router-dom";
import { TestMasterTypes } from "../COATestMaster/useTestMasterHooks";

const COAReportMaster = () => {
  const {
    formData,
    setFormData,
    handleChange,

    onSubmit,

    register,
    handleSubmit,
    errors,

    control,
    product_list,

    onTestChange,
    onProductChange,
    formTestData,
    handleTranChange,
    onAddTestData,
    onRemoveTestData,
    transactionError,
    customer_list,
    test_master_list,
    template_list,
    onTemplateChange,
    onTranResultChange,
    onCustomerChange,
    user_list,
    onUserChanged
  } = useCOAReportHooks();

  const navigate = useNavigate();

  return (
    <div className="container-fluid">
      <h1 className="header-title">{`COA Test Master`}</h1>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="row g-2">
              <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
                <label className="form-label">Customer</label>
                <Controller
                  {...register("customerId")}
                  name={"customerId"}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="react-select"
                      value={formData.selectedCustomer}
                      options={customer_list}
                      onChange={onCustomerChange}
                    />
                  )}
                />
                {errors?.customerId && (
                  <div className="invalid-feedback">
                    {errors?.customerId?.message as string}
                  </div>
                )}
              </div>
              <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
                <label className="form-label">Product</label>
                <Controller
                  {...register("productId")}
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
                {errors?.productId && (
                  <div className="invalid-feedback">
                    {errors?.productId?.message as string}
                  </div>
                )}
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
                  value={formData.selectedProduct?.other?.molecularWeight}
                />
              </div>
              <div className="col-md-2 col-lg-2 col-sm-12 col-xs-12">
                <label className="form-label">Molecular Formula</label>
                <input
                  disabled={true}
                  className={`form-control `}
                  name={"testResultsGroupConcat"}
                  placeholder="Result"
                  onChange={handleChange}
                  value={formData.selectedProduct?.other?.molecularFormula}
                />
              </div>

              <div className="col-md-2 col-lg-2 col-sm-12 col-xs-12">
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
              <div className="col-md-2 col-lg-2 col-sm-12 col-xs-12">
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
              <div className="col-md-2 col-lg-2 col-sm-12 col-xs-12">
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
              <div className="col-md-1 col-lg-1 col-sm-12 col-xs-12">
                <label className="form-label">Supply</label>
                <input
                  {...register("supplyQty")}
                  className={`form-control ${
                    errors?.supplyQty ? `error` : ``
                  } `}
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
              <div className="col-md-2 col-lg-2 col-sm-12">
                <label className="form-label">Mfg. Date</label>

                <DatePicker
                  {...register("mfgdate")}
                  selected={formData?.mfgDate as Date}
                  onChange={(date: Date) =>
                    setFormData((prev) => ({ ...prev, mfgDate: date }))
                  }
                  showYearDropdown
                  dateFormat={"dd/MM/yyyy"}
                  className={`form-control ${errors?.mfgDate ? `error` : ``} `}
                />
              </div>
              <div className="col-md-2 col-lg-2 col-sm-12">
                <label className="form-label">Exp. Date</label>

                <DatePicker
                  {...register("expDate")}
                  selected={formData?.expDate as Date}
                  onChange={(date: Date) =>
                    setFormData((prev) => ({ ...prev, expDate: date }))
                  }
                  minDate={formData?.mfgDate as Date}
                  showYearDropdown
                  dateFormat={"dd/MM/yyyy"}
                  className={`form-control ${errors?.expDate ? `error` : ``} `}
                />
              </div>
            </div>

            <div className="card mt-2">
              <div className="card-body">
                {transactionError && (
                  <div className="alert alert-warning">
                    {"Atleast one test is required"}
                  </div>
                )}
                <div className="row g-2">
                  <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
                    <label className="form-label">{`Template`}</label>
                    <Controller
                      name={"templateId"}
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          className="react-select"
                          //value={formTestData?.selectedTest}
                          options={template_list}
                          onChange={onTemplateChange}
                        />
                      )}
                    />
                  </div>
                  <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
                    <label className="form-label">{`Test`}</label>
                    <Controller
                      name={"testId"}
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          className="react-select"
                          value={formTestData?.selectedTest}
                          options={test_master_list.filter(
                            (x: TestMasterTypes) =>
                              !formData.results
                                ?.map((y) => y.testName)
                                .includes(x.testName)
                          )}
                          onChange={onTestChange}
                        />
                      )}
                    />
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12 mt-auto">
                    <button
                      onClick={onAddTestData}
                      type="button"
                      className="btn btn-success w-100 btn-sm"
                    >
                      <i className="fa-solid fa-plus"></i> {" Add"}
                    </button>
                  </div>
                </div>
                <div className="row g-2">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th scope="col">Test</th>
                          <th scope="col">Grade</th>
                          <th scope="col">Specification</th>
                          <th scope="col">Result</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody className="table-group-divider">
                        {formData.results?.map((x) => {
                          return (
                            <tr key={x.id}>
                              <td>{x.testName}</td>
                              <td>
                                <input
                                  className={`form-control`}
                                  name={"grade"}
                                  placeholder="Grade"
                                  onChange={(e) => handleTranChange(e, x)}
                                  value={x?.grade}
                                />
                              </td>
                              <td>
                                <textarea
                                  rows={3}
                                  className={`form-control`}
                                  name={"specification"}
                                  placeholder="Specification"
                                  onChange={(e) => handleTranChange(e, x)}
                                  value={x?.specification}
                                />
                              </td>
                              <td>
                                <Controller
                                  name={"result"}
                                  control={control}
                                  render={({ field }) => (
                                    <Select
                                      {...field}
                                      className="react-select"
                                      //value={formTestData?.selectedTest}
                                      options={x.results?.map((x) => ({
                                        value: x,
                                        label: x
                                      }))}
                                      onChange={(option) =>
                                        onTranResultChange(option, x)
                                      }
                                    />
                                  )}
                                />
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm"
                                  onClick={() => onRemoveTestData(Number(x.id))}
                                >
                                  <i className="fas fa-minus"></i>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-2">
              <div className="card-body">
                <div className="row g-2">
                  <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
                    <label className="form-label">Prepared By</label>
                    <Controller
                      name={"preparedBy"}
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          className="react-select"
                          value={formData.selectedPreparedBy}
                          options={user_list}
                          onChange={(option) =>
                            onUserChanged(option, "prepared")
                          }
                        />
                      )}
                    />
                  </div>
                  <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
                    <label className="form-label">Approved By</label>
                    <Controller
                      name={"approvedBy"}
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          className="react-select"
                          value={formData.selectedApprovedBy}
                          options={user_list}
                          onChange={(option) =>
                            onUserChanged(option, "approved")
                          }
                        />
                      )}
                    />
                  </div>
                  <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12">
                    <label className="form-label">Reviewed By</label>
                    <Controller
                      name={"reviewedBy"}
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          className="react-select"
                          value={formData.selectedReviewedBy}
                          options={user_list}
                          onChange={(option) =>
                            onUserChanged(option, "reviewed")
                          }
                        />
                      )}
                    />
                  </div>
                </div>
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
                  onClick={() => navigate("/app/testlist")}
                >
                  <i className="fa-solid fa-xmark"></i> {" Cancel"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default COAReportMaster;
