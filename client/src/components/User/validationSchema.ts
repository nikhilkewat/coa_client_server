import * as yup from "yup";

export const userValidationSchema = yup.object({
  fullName: yup.string().required("Full Name is required."),
  userName: yup.string().required("User Name is required"),
  password: yup.string().required("Password is required"),
});