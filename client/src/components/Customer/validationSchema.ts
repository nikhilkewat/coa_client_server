import * as yup from "yup";

export const customerValidationSchema = yup.object({
  fullName: yup.string().required("Full Name is required."),

});