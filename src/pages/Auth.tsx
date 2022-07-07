import { MDBInput } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../fetures/authSlice";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../services/authApi";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirm: "",
};

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [showReg, setShowReg] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [
    loginUser,
    {
      data: loginData,
      isSuccess: loginIsSuccess,
      isError: loginIsError,
      error: loginError,
    },
  ] = useLoginUserMutation();

  const [registerUser, responseRegisterUser] = useRegisterUserMutation();

  const { firstName, lastName, email, password, confirm } = form;

  const handleRegister = async () => {
    if (password !== confirm) {
      return toast.error("Passwords do not match");
    }
    if (firstName && lastName && password && email) {
      await registerUser({ firstName, lastName, email, password });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (email && password) {
      await loginUser({ email, password });
    } else {
      toast.error("Please fill all Inputs");
    }
  };

  useEffect(() => {
    if (loginIsSuccess) {
      toast.success("User Has been logged in");
      dispatch(
        setUser({ name: loginData.result.name, token: loginData.token }),
      );
      navigate("/dashboard");
    }
    if (responseRegisterUser.isSuccess) {
      toast.success("User Has been registered succesfully");
      dispatch(
        setUser({
          name: responseRegisterUser.data.result.name,
          token: responseRegisterUser.data.token,
        }),
      );
      navigate("/dashboard");
    }
  }, [loginIsSuccess, responseRegisterUser.isSuccess]);

  useEffect(() => {
    if (loginIsError) {
      toast.error((loginError as any).data.message);
    }
    if (responseRegisterUser.isError) {
      toast.error((responseRegisterUser.error as any).data.message);
    }
  }, [loginIsError, responseRegisterUser.isError]);

  return (
    <div className="vh-100">
      <div className="container py-4 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="column-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-4 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2">
                    {!showReg ? "Login" : "Register"}
                  </h2>
                  <p className="mb-4">
                    {!showReg
                      ? "Please enter your Email & Password"
                      : "Please enter user detail"}
                  </p>
                  {showReg && (
                    <>
                      <div className="form-outline  mb-4">
                        <MDBInput
                          type="text"
                          name="firstName"
                          value={firstName}
                          onChange={handleChange}
                          label="First Name"
                          className="form-control form-control-lg "
                        />
                      </div>
                      <div className="form-outline  mb-4">
                        <MDBInput
                          type="text"
                          name="lastName"
                          value={lastName}
                          onChange={handleChange}
                          label="Last Name"
                          className="form-control form-control-lg "
                        />
                      </div>
                    </>
                  )}

                  <div className="form-outline  mb-4">
                    <MDBInput
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      label="Email"
                      className="form-control form-control-lg "
                    />
                  </div>
                  <div className="form-outline  mb-4">
                    <MDBInput
                      type="password"
                      name="password"
                      value={password}
                      onChange={handleChange}
                      label="Password"
                      className="form-control form-control-lg "
                    />
                  </div>
                  {showReg && (
                    <MDBInput
                      type="password"
                      name="confirm"
                      value={confirm}
                      onChange={handleChange}
                      label="Confirm Password"
                      className="form-control form-control-lg "
                    />
                  )}
                  {!showReg ? (
                    <button
                      onClick={() => handleLogin()}
                      type="button"
                      className="btn btn-outline-dark btn-lg px-5">
                      Login
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-outline-dark mt-4 btn-lg px-5"
                      onClick={() => handleRegister()}>
                      Register
                    </button>
                  )}
                </div>
                <div>
                  <h5 className="mb-0">
                    {!showReg ? (
                      <>
                        Do not have an account?
                        <p
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowReg((prev) => !prev)}
                          className=" fw-bold">
                          Sign Up
                        </p>
                      </>
                    ) : (
                      <>
                        Already have an account?{" "}
                        <p
                          style={{ cursor: "pointer" }}
                          className=" fw-bold"
                          onClick={() => setShowReg((prev) => !prev)}>
                          Sign In
                        </p>{" "}
                      </>
                    )}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
