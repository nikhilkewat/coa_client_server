import * as yup from "yup";

export const productValidationSchema = yup.object({
  productName: yup.string().required("Product Name is required."),
  productCode: yup.string().required("Product Code is required"),
  casNo: yup.string().required("CAS No. is required"),
});