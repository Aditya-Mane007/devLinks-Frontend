import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import SEO from "@/components/SEO";
import axios from "axios";
import toast from "react-hot-toast";

function Register() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { fullName, email, password, confirmPassword } = formState;

  const [errorState, setErrorState] = useState({
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  });
  const { emailError, passwordError, confirmPasswordError } = errorState;

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const changeHandler = (e) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // if (e.target.name === "email") {
    //   setErrorState((prev) => ({ ...prev, emailError: "" }));
    // }
    // if (e.target.name === "password") {
    //   setErrorState((prev) => ({ ...prev, passwordError: "" }));
    // }
    // if (e.target.name === "confirmPassword") {
    //   setErrorState((prev) => ({ ...prev, confirmPasswordError: "" }));
    // }
  };

  const submitHandler = async (e) => {
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

    if (!confirmPassword) {
      setErrorState((prev) => ({
        ...prev,
        confirmPasswordError: "cannot be empty",
      }));
    } else {
      setErrorState((prev) => ({
        ...prev,
        confirmPasswordError: "",
      }));
    }

    if (!email && email.length < 1) {
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

    if (!password && password.length < 1) {
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

    if (password !== "" && password.length < 8) {
      setErrorState((prev) => ({
        ...prev,
        passwordError: "must contain at least 8 characters",
      }));
    }

    if (
      password !== "" &&
      confirmPassword !== "" &&
      password !== confirmPassword
    ) {
      setErrorState((prev) => ({
        ...prev,
        confirmPasswordError: "Password does not match",
      }));
    }

    if (email) {
      const emailValidation = validateEmail(email);

      if (!emailValidation) {
        setErrorState((prev) => ({
          ...prev,
          emailError: "is Invalid",
        }));
        return;
      }
    }

    if (
      email &&
      emailError == "" &&
      password &&
      passwordError == "" &&
      confirmPassword &&
      confirmPasswordError == ""
    ) {
      const formData = {
        email: email,
        password: password,
      };

      console.log("Form Data :", formData);

      try {
        // const res = await axios.post(
        //   process.env.NEXT_PUBLIC_API_URL + "/auth/register",
        //   formData
        // );
        const res = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/auth/register",
          {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // const data = await res.data;
        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message, {
            duration: 1500,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateEmail = (emailText) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(emailText);
  };

  return (
    <>
      <SEO
        title="Create account | devLinks"
        description="Let’s get you started sharing your links!"
      />
      <div className="w-[90%] md:w-[60%] lg:w-[45%] xl:w-[40%] mx-auto bg-PrimaryWhite rounded-[0.75rem] p-[1.5rem] md:px-[2rem] md:py-[1.5rem]">
        <div className="mb-[1.5rem] md:mb-[1.25rem]">
          <h1 className="text-[1.25rem] md:text-[1.5rem] lg:text-[2rem] font-instrumentBold">
            Create account
          </h1>
          <p className="text-PrimaryGray">
            Let’s get you started sharing your links!
          </p>
        </div>
        <div>
          <form onSubmit={submitHandler}>
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
            <div className="mb-[1rem] md:mb-[.75rem]">
              <label className="block">
                {passwordError ? (
                  <p className="text-Red">Password {passwordError}</p>
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
                    <FaEye className="text-PrimaryGray" />
                  ) : (
                    <FaEyeSlash className="text-PrimaryGray" />
                  )}
                </div>
              </div>
            </div>
            <div className="mb-[1rem] md:mb-[.75rem]">
              <label className="block">
                {confirmPasswordError ? (
                  <p className="text-Red">
                    Confirm Password {confirmPasswordError}
                  </p>
                ) : (
                  "Confirm Password"
                )}
              </label>
              <div className="relative my-1">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={changeHandler}
                  autoComplete="off"
                  placeholder="Enter your password"
                  className={`rounded-[0.5rem] w-full py-[0.75rem] px-[2.25rem] border outline-none border-PrimaryGray ${
                    confirmPasswordError
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
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                >
                  {confirmPasswordVisible ? (
                    <FaEye className="text-PrimaryGray" />
                  ) : (
                    <FaEyeSlash className="text-PrimaryGray" />
                  )}
                </div>
              </div>
            </div>

            <p className="mb-[1rem] md:mb-[.8rem] text-sm">
              Password must contain at least 8 characters
            </p>

            <button
              type="submit"
              className="w-full py-[.75rem] mb-[1rem] md:mb-[1rem] rounded-[.5rem] bg-PrimaryPurple text-PrimaryWhite
            hover:bg-SecondaryPurple transition duration-150
            "
            >
              Create new account
            </button>

            <p className="text-center text-PrimaryGray select-none">
              Already have an account?{" "}
              <Link href="/login" className="text-PrimaryPurple">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

Register.getLayout = function getLayout(page) {
  return (
    <>
      <div className="w-full min-h-screen md:h-screen bg-SecondaryWhite">
        <div className="w-full min-h-screen md:h-full container mx-auto flex items-center">
          <div className="w-full flex flex-col justify-center itmes-center">
            <div className="w-[90%] md:w-[50%] lg:w-[40%] mx-auto mb-[2rem] md:mb-[1.8rem]">
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

export default Register;
