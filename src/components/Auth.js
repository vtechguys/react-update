import React from "react";
import "./Auth.css";
import { UserContext } from "../utils/context";
import { Redirect, useHistory, useLocation, Route } from "react-router-dom";
import {
  LoginFormConfig,
  LoginFormConfigValidate,
  SignUpFormConfig,
  SignUpFormConfigValidate,
  ForgotPasswordFormConfig,
  ForgotPasswordValidate,
  ChangePasswordFormConfig,
  ChangePasswordValidate,
  ResetFormConfig,
  ResetFormConfigValidate,
} from "../config/constant";
import { RouteOnlyWhenLoggedIn } from "./Routes";
import Form from "./Form";
import { loginApi } from "../utils/services";
import { useQuery } from "../utils/hooks";

function Login(props) {
  const { user, setUser } = React.useContext(UserContext);

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState(null);
  const [errors, setErrors] = React.useState(null);

  const onSubmit = (v) => {
    setFormData(v);
    setIsSubmitting(true);
  };

  React.useEffect(() => {
    if (isSubmitting && formData) {
      loginApi(formData).then(({ code, data, message, errors }) => {
        if (code === 400) {
          setFormData(null);
          setIsSubmitting(false);
          return setErrors(errors);
        }
        if (code !== 200) {
          return alert(message);
        }
        const { user } = data;
        setUser({
          ...user,
          isAuthenticated: true,
        });
        return history.replace(from);
      });
    }
  });

  if (user && user.isAuthenticated) {
    return <Redirect to={from} />;
  }
  return (
    <div className="container-fluid column height80p justify_center align_center ">
      <div className="Form_Content">
        <Form
          config={LoginFormConfig}
          validators={LoginFormConfigValidate}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          errors={errors}
        />
      </div>
    </div>
  );
}
function SignUp(props) {
  const { user, setUser } = React.useContext(UserContext);

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState(null);
  const [errors, setErrors] = React.useState(null);

  const onSubmit = (v) => {
    setFormData(v);
    setIsSubmitting(true);
  };

  React.useEffect(() => {
    if (isSubmitting && formData) {
      loginApi(formData).then(({ code, data, message, errors }) => {
        if (code === 400) {
          setFormData(null);
          setIsSubmitting(false);
          return setErrors(errors);
        }
        if (code !== 200) {
          return alert(message);
        }
        const { user } = data;
        setUser({
          ...user,
          isAuthenticated: true,
        });
        return history.replace(from);
      });
    }
  });

  if (user && user.isAuthenticated) {
    return <Redirect to={from} />;
  }
  return (
    <div className="container-fluid column height80p justify_center align_center ">
      <div className="Form_Content">
        <Form
          config={SignUpFormConfig}
          validators={SignUpFormConfigValidate}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          errors={errors}
        />
      </div>
    </div>
  );
}
function ForgotPassword(props) {
  const { user, setUser } = React.useContext(UserContext);
  const { email } = useQuery();

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState(null);
  const [errors, setErrors] = React.useState(null);

  const onSubmit = (v) => {
    setFormData(v);
    setIsSubmitting(true);
  };

  React.useEffect(() => {
    if (isSubmitting && formData) {
      loginApi(formData).then(({ code, data, message, errors }) => {
        if (code === 400) {
          setFormData(null);
          setIsSubmitting(false);
          return setErrors(errors);
        }
        if (code !== 200) {
          return alert(message);
        }
        const { user } = data;
        setUser({
          ...user,
          isAuthenticated: true,
        });
        return history.replace(from);
      });
    }
  });

  if ((user && user.isAuthenticated) || !email) {
    return <Redirect to={from} />;
  }
  return (
    <div className="container-fluid column height80p justify_center align_center ">
      <div className="Form_Content">
        <Form
          config={ForgotPasswordFormConfig}
          validators={ForgotPasswordValidate}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          errors={errors}
        />
      </div>
    </div>
  );
}
function ResetPassword(props) {
  const { user, setUser } = React.useContext(UserContext);
  const { email, token } = useQuery();

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState(null);
  const [errors, setErrors] = React.useState(null);

  const onSubmit = (v) => {
    setFormData(v);
    setIsSubmitting(true);
  };

  React.useEffect(() => {
    if (isSubmitting && formData) {
      loginApi(formData).then(({ code, data, message, errors }) => {
        if (code === 400) {
          setFormData(null);
          setIsSubmitting(false);
          return setErrors(errors);
        }
        if (code !== 200) {
          return alert(message);
        }
        const { user } = data;
        setUser({
          ...user,
          isAuthenticated: true,
        });
        return history.replace(from);
      });
    }
  });

  if ((user && user.isAuthenticated) || !email || !token) {
    return <Redirect to={from} />;
  }
  return (
    <div className="container-fluid column height80p justify_center align_center ">
      <div className="Form_Content">
        <Form
          config={ResetFormConfig}
          validators={ResetFormConfigValidate}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          errors={errors}
        />
      </div>
    </div>
  );
}
function ChangePassword(props) {
  const { user, setUser } = React.useContext(UserContext);
  const location = useLocation();
  const { email } = useQuery();
  const { from } = location.state || { from: { pathname: "/" } };

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState(null);
  const [errors, setErrors] = React.useState(null);

  const onSubmit = (v) => {
    setFormData(v);
    setIsSubmitting(true);
  };

  React.useEffect(() => {
    if (isSubmitting && formData) {
      loginApi(formData).then(({ code, data, message, errors }) => {
        if (code === 400) {
          setFormData(null);
          setIsSubmitting(false);
          return setErrors(errors);
        }
        if (code !== 200) {
          return alert(message);
        }
        const { user } = data;
        return setUser({
          ...user,
          isAuthenticated: true,
        });
      });
    }
  });
  if (!user || (user && !user.isAuthenticated) || !email) {
    return <Redirect to={from} />;
  }
  return (
    <div className="container-fluid column height80p justify_center align_center ">
      <div className="Form_Content">
        <Form
          config={ChangePasswordFormConfig}
          validators={ChangePasswordValidate}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          errors={errors}
        />
      </div>
    </div>
  );
}
export default function Auth(props) {
  return (
    <div className="container-fluid contentHeight">
      <Route path="/auth/login">
        <Login />
      </Route>
      <Route path="/auth/signup">
        <SignUp />
      </Route>
      <Route path="/auth/forgot-password">
        <ForgotPassword />
      </Route>
      <Route path="/auth/reset-password">
        <ResetPassword />
      </Route>
      <RouteOnlyWhenLoggedIn path="/auth/change-password">
        <ChangePassword />
      </RouteOnlyWhenLoggedIn>
    </div>
  );
}
