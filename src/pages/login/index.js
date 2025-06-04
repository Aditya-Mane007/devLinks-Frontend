import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import SEO from "@/components/SEO";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

function Login() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
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
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!inputValidation()) {
      return;
    }

    const formData = {
      email: email,
      password: password,
    };

    try {
      setLoading(true);
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message, {
          duration: 1500,
        });
        return;
      }

      if (data) {
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }

      setLoading(false);
      toast.success(data.message, {
        duration: 1000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const inputValidation = () => {
    let isValid;

    if (!email) {
      setErrorState((prev) => ({
        ...prev,
        emailError: "Cannot be empty",
      }));
      isValid = false;
    } else {
      setErrorState((prev) => ({
        ...prev,
        emailError: "",
      }));
      isValid = true;
    }

    if (!password) {
      setErrorState((prev) => ({
        ...prev,
        passwordError: "Cannot be empty",
      }));
      isValid = false;
    } else {
      setErrorState((prev) => ({
        ...prev,
        passwordError: "",
      }));
      isValid = true;
    }

    if (email !== "") {
      const emailCValidation = validateEmail(email);

      if (!emailCValidation) {
        setErrorState((prev) => ({
          ...prev,
          emailError: "is invalid",
        }));
        isValid = false;
      } else {
        setErrorState((prev) => ({
          ...prev,
          emailError: "",
        }));
        isValid = true;
      }
    }

    return isValid;
  };

  const validateEmail = (emailText) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(emailText);
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
            <div className="mb-[1rem] md:mb-[1.25rem]">
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
              {loading ? "Logging you in" : "Login"}
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

export default Login;
