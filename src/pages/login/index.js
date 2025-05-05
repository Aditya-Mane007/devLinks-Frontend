import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import SEO from "@/components/SEO";

function Login() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formState;

  const [errorState, setErrorState] = useState({
    emailError: "",
    passwordError: "",
  });
  const { emailError, passwordError } = errorState;

  const [passwordVisible, setPasswordVisible] = useState(false);

  const changeHandler = (e) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (e.target.name === "email") {
      setErrorState((prev) => ({ ...prev, emailError: "" }));
    }

    if (e.target.name === "password") {
      setErrorState((prev) => ({ ...prev, passwordError: "" }));
    }
  };

  const submitHandle = (e) => {
    e.preventDefault();

    if (!email) {
      setErrorState((prev) => ({
        ...prev,
        emailError: "cannot be empty",
      }));
    } else {
      setErrorState((prev) => ({
        ...prev,
        emailError: "",
      }));
    }

    if (!password) {
      setErrorState((prev) => ({
        ...prev,
        passwordError: "cannot be empty",
      }));
    } else {
      setErrorState((prev) => ({
        ...prev,
        passwordError: "",
      }));
    }

    console.log(formState);
  };

  return (
    <>
      <SEO
        title="Login | devLinks"
        description="Add your details below to get back into the app"
      />
      <div className="w-[90%] md:w-[60%] lg:w-[45%] xl:w-[40%] mx-auto bg-PrimaryWhite rounded-[0.75rem] p-[1.5rem] md:px-[2rem] md:py-[1.5rem]">
        <div className="mb-[1.5rem] md:mb-[1.25rem]">
          <h1 className="text-[1.25rem] md:text-[1.5rem] lg:text-[2rem] font-instrumentBold">
            Login
          </h1>
          <p className="text-PrimaryGray">
            Add your details below to get back into the app
          </p>
        </div>
        <div>
          <form onSubmit={submitHandle}>
            <div className="mb-[1rem] md:mb-[.75rem]">
              <label className="block">
                {emailError ? (
                  <p className="text-Red">Email address {emailError}</p>
                ) : (
                  "Email address"
                )}
              </label>
              <div className="relative my-1">
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={changeHandler}
                  autoComplete="off"
                  placeholder="e.g. harry@hogwarts.com"
                  className={`rounded-[0.5rem] w-full py-[0.75rem] px-[2.25rem] border outline-none border-PrimaryGray ${
                    emailError
                      ? "border-Red"
                      : "focus:border-PrimaryPurple focus:shadow-[-5px_0px_30px_-15px_rgba(0,0,0,0.3)] focus:shadow-PrimaryPurple"
                  }   
                `}
                />
                <Image
                  src="/assets/images/icon-email.svg"
                  width={16}
                  height={16}
                  alt="Password"
                  className="absolute top-[35%] mx-[.75rem]"
                />
              </div>
            </div>
            <div className="mb-[1rem] md:mb-[1.25rem]">
              <label className="block">
                {passwordError ? (
                  <p className="text-Red">Password {emailError}</p>
                ) : (
                  "Password"
                )}
              </label>
              <div className="relative my-1">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={changeHandler}
                  autoComplete="off"
                  placeholder="Enter your password"
                  className={`rounded-[0.5rem] w-full py-[0.75rem] px-[2.25rem] border outline-none border-PrimaryGray ${
                    passwordError
                      ? "border-Red"
                      : "focus:border-PrimaryPurple focus:shadow-[-5px_0px_30px_-15px_rgba(0,0,0,0.3)] focus:shadow-PrimaryPurple"
                  }   
                `}
                />
                <Image
                  src="/assets/images/icon-password.svg"
                  width={16}
                  height={16}
                  alt="Password"
                  className="absolute top-[35%] mx-[.75rem]"
                />
                <div
                  className="absolute top-[35%] right-0 mx-[.75rem] cursor-pointer select-none"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? (
                    <FaEyeSlash className="text-PrimaryGray" />
                  ) : (
                    <FaEye className="text-PrimaryGray" />
                  )}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-[.75rem] mb-[1rem] md:mb-[1rem] rounded-[.5rem] bg-PrimaryPurple text-PrimaryWhite
            hover:bg-SecondaryPurple transition duration-150
            "
            >
              Login
            </button>
            <p className="text-center text-PrimaryGray select-none">
              Don’t have an account?{" "}
              <Link href="/register" className="text-PrimaryPurple">
                Create account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

Login.getLayout = function getLayout(page) {
  return (
    <>
      <div className="w-full min-h-screen md:h-screen bg-SecondaryWhite">
        <div className="w-full min-h-screen md:h-full container mx-auto flex items-center">
          <div className="w-full flex flex-col justify-center itmes-center">
            <div className="w-[90%] md:w-[50%] lg:w-[40%] mx-auto mb-[2rem] md:mb-[2.5rem]">
              <Image
                src="/assets/images/logo-devlinks-large.svg"
                width={182}
                height={40}
                alt="devLinks"
                className="flex mx-auto"
              />
            </div>
            {page}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
