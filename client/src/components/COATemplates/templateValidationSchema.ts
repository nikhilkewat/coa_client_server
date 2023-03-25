import * as yup from "yup";

export const templateValidationSchema = yup.object({
  template: yup.string().required("Test Name is required."),

});