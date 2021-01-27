import * as yup from "yup";

export default yup.object().shape({
   name: yup.string().required("Name is required"),
   email: yup
      .string()
      .email("Must be a valid email")
      .required("Email is required"),
   password: yup
      .string()
      .min(6, "Your Password should be at least 6 characters")
      .required("Password is required"),
   role: yup
      .string()
      .oneOf(["frontend", "backend", "devops"], "You need to pick a role"),
   agreed: yup.boolean().isTrue("You must accept the TOS"),
});
