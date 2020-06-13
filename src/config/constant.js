import {
  validateEmail,
  validatePassword,
  validateLoginId,
} from "../utils/validate";

export const responseType = {
  SUCCESS: 200,
  UNAUTHORIZED: 401,
  SERVER_ERROR: 500,
  BAD_REQUEST: 400,
};

export const LoginFormConfig = {
  loginId: {
    label: "Login Id",
    tag: "input",
    type: "text",
    touched: false,
    valid: true,
    required: true,
    error: "",
    name: "loginId",
    value: "",
    placeholder: "Email or Username"
  },
  password: {
    label: "Password",
    tag: "input",
    type: "password",
    touched: false,
    valid: true,
    required: true,
    error: "",
    name: "password",
    value: "",
    placeholder: "Password"
  },
};
export const LoginFormConfigValidate = {
  loginId: validateLoginId,
  password: validatePassword,
};
export const SignUpFormConfig = {
  email: {
    label: "Email",
    tag: "input",
    type: "email",
    tocuhed: false,
    valid: true,
    required: true,
    error: "",
    name: "email",
    value: "",
    placeholder: "Email"
  },
  password: {
    label: "Password",
    tag: "input",
    type: "password",
    touched: false,
    valid: true,
    required: true,
    error: "",
    name: "password",
    value: "",
    placeholder: "Password"
  },
  password2: {
    label: "Confirm Password",
    tag: "input",
    type: "password",
    touched: false,
    valid: true,
    required: true,
    error: "",
    name: "password2",
    value: "",
    placeholder: "Confirm Password"
  },
};
export const SignUpFormConfigValidate = {
  email: validateEmail,
  password: validatePassword,
  password2: validatePassword,
};
export const ForgotPasswordFormConfig = {
  email: {
    label: "Email",
    tag: "input",
    type: "email",
    tocuhed: false,
    valid: true,
    required: true,
    error: "",
    name: "email",
    value: "",
    placeholder: "Email"

  },
};
export const ForgotPasswordValidate = {
  email: validateEmail,
};

export const ChangePasswordFormConfig = {
  oldPassword: {
    label: "Old Password",
    tag: "input",
    type: "olPassword",
    touched: false,
    valid: true,
    required: true,
    error: "",
    name: "oldPassword",
    value: "",
    placeholder: "Old Password"

  },
  newPassword: {
    label: "Password",
    tag: "input",
    type: "password",
    touched: false,
    valid: true,
    required: true,
    error: "",
    name: "newPassword",
    value: "",
    placeholder: "New Password"

  },
  newPassword2: {
    label: "Confirm Password",
    tag: "input",
    type: "password",
    touched: false,
    valid: true,
    required: true,
    error: "",
    name: "newPassword2",
    value: "",
    placeholder: "Confirm New Password"

  },
};
export const ChangePasswordValidate = {
  oldPassword: validatePassword,
  newPassword: validatePassword,
  newPassword2: validatePassword,
};
export const ResetFormConfig = {
  password: {
    label: "Password",
    tag: "input",
    type: "password",
    touched: false,
    valid: true,
    required: true,
    error: "",
    name: "password",
    value: "",
    placeholder: "Password"
  },
  password2: {
    label: "Confirm Password",
    tag: "input",
    type: "password",
    touched: false,
    valid: true,
    required: true,
    error: "",
    name: "password2",
    value: "",
    placeholder: "Confirm Password"
  },
};
export const ResetFormConfigValidate = {
  password: validatePassword,
  password2: validatePassword,
};