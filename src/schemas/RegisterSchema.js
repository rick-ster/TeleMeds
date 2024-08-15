import * as Yup from "yup";

export const RegisterSchema = Yup.object({
    username : Yup.string().required("Required field"),
    password : Yup.string().min(8, "Too short").max(16, "Too long").required("Required field"),
    confirm_password : Yup.string().required("Required field").oneOf([Yup.ref("password")], "Password does not match"),
    email : Yup.string().email("Invalid email").required("Required field")
});