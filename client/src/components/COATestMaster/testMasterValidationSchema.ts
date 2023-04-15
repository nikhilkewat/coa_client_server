import * as yup from "yup";

export const userValidationSchema = yup.object({
  testName: yup.string().required("Test Name is required."),
});