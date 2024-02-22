import * as Yup from "yup";

export const studentDetailsSchema = Yup.object({
  First_name: Yup.string()
    .matches(/^[A-Za-z]+$/, "First name must contain only letters")
    .required("First name is required"),
  Last_name: Yup.string()
    .matches(/^[A-Za-z]+$/, "Last name must contain only letters")
    .required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  Phone_Number: Yup.string()
    .matches(/^\d+$/, "Phone number must be numeric")
    .required("Phone number is required"),
  Aadhar_Number: Yup.string()
    .matches(/^\d{12}$/, "Aadhar number must be exactly 12 numeric digits")
    .required("Aadhar number is required"),
  Gender: Yup.string().required("Gender is required"),
  date_of_birth: Yup.date().required("Date of birth is required"),
  current_address: Yup.string().required("Current address is required"),
  Permanent_address: Yup.string().required("Permanent address is required"),
  religion: Yup.string()
    .matches(/^[A-Za-z]+$/, "Religion name must contain only letters")
    .required("Religion is required"),
  category: Yup.string().required("Category is required"),
  nationality: Yup.string()
    .matches(/^[A-Za-z ]+$/, "Nationality must contain only letters")
    .required("Nationality is required"),
  state: Yup.string()
    .matches(/^[A-Za-z ]+$/, "State must contain only letters")
    .required("State is required"),
  branch: Yup.string().required("Branch is required"),
  admission_quota: Yup.string().required("Admission quota is required"),
  registration_number_10th: Yup.string().required(
    "Registration number (10th) is required"
  ),
  passing_year_10th: Yup.string().required("Passing year (10th) is required"),
  school_name_10th: Yup.string()
    .matches(/^[A-Za-z ]+$/, "School Name must contain only letters")
    .required("School name (10th) is required"),
  PUC_registration_Number: Yup.string().required(
    "PUC/Diploma registration number is required"
  ),
  PUC_Passing_Number: Yup.string().required(
    "PUC/Diploma passing number is required"
  ),
  PUC_college_name: Yup.string()
    .matches(/^[A-Za-z ]+$/, "PUC College must contain only letters")
    .required("PUC/Diploma college name is required"),
});
