import toast from "react-hot-toast";

/////// USER VALIDATION //////
export async function userValidate(values) {
  const errors = userVerify({}, values);
  return errors;
}

function userVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username Required");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username");
  }
  if (!values.password) {
    error.password = toast.error("Enter a Password!");
  }
  return error;
}

/////// OTP VALIDATION //////
export async function otpValidate(values) {
  const errors = otpVerify({}, values);
  return errors;
}

function otpVerify(error = {}, values) {
  if (!values.otp) {
    error.otp = toast.error("OTP Required");
  }
  return error;
}

/////// RESET PASS VALIDATION //////
export async function resetPassValidate(values) {
  const errors = resetPassVerify({}, values);
  return errors;
}

function resetPassVerify(error = {}, values) {
  if (!values.password) {
    error.password = toast.error("Username Required");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Invalid Username");
  }
  if (!values.confirm_pwd) {
    error.confirm_pwd = toast.error("Username Required");
  } else if (values.confirm_pwd.includes(" ")) {
    error.confirm_pwd = toast.error("Invalid Username");
  }
  if (values.password !== values.confirm_pwd) {
    error.password = toast.error("Password MisMatch!!!");
  }
  return error;
}

/////// REGISTER VALIDATION //////
export async function registerUserValidate(values) {
  const errors = registerUserVerify({}, values);
  return errors;
}

function registerUserVerify(errors = {}, values) {
  if (!values.fullName) {
    errors.fullName = toast.error("Full Name required");
  } else if (values.fullName.includes(" ")) {
    errors.fullName = toast.error("Invalid Name");
  }

  if (!values.email) {
    errors.email = toast.error("Email required");
  } else if (values.email.includes(" ")) {
    errors.email = toast.error("Invalid Email");
  }

  if (!values.username) {
    errors.username = toast.error("Username required");
  } else if (values.username.includes(" ")) {
    errors.username = toast.error("Invalid Username");
  }

  if (!values.password) {
    errors.password = toast.error("Password required");
  } else if (values.password.includes(" ")) {
    errors.password = toast.error("Invalid Password");
  }
  return errors;
}
