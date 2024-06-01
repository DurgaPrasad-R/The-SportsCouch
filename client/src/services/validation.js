import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const signupSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  age: Yup.number()
    .required("Age is required")
    .positive("Age must be a positive number"),
  phone: Yup.string().required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const createTeamSchema = Yup.object().shape({
  name: Yup.string().required("Team name is required"),
  available: Yup.number()
    .required("Number of available players is required")
    .positive("Number of available players must be a positive number"),
  required: Yup.number()
    .required("Number of required players is required")
    .positive("Number of required players must be a positive number"),
  players: Yup.string().required("Player names are required"),
});
