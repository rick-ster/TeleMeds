import * as Yup from "yup";

export const loginSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required field"),
    password: Yup.string().min(8, "Password too short").max(16, "Password too long").required("Required field"),
});
