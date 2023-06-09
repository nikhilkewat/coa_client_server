import * as yup from "yup";

export const reportValidationSchema = yup.object({

  grade: yup.string().required("Grade is required."),
  productId: yup.number().required("Product is required."),
  customerId: yup.number().required("Customer is required."),
  batchNo: yup.string().required("Batch No is required."),
  arNo: yup.string().required("AR No is required."),
  supplyQty: yup.number().required("AR No is required.").moreThan(0, "Supply Quantity should be greater than 0."),
});