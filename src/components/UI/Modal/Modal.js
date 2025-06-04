import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import Select from "../Select/Select";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getLinks } from "@/features/Links/linkSlice";

function Modal({ isModalOpen, setIsModalOpen }) {
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const focusRef = useRef(null);

  // Input Fileds
  const [platform, setPlatform] = useState("");
  const [link, setLink] = useState("");

  // Errors
  const [platformError, setPlatformError] = useState("");
  const [linkError, setLinkError] = useState("");

  const inputVaidation = () => {
    let isvalid;
    if (!platform || platform == "") {
      setPlatformError("Please select a platform");
      isvalid = false;
    } else {
      setPlatformError("");
      isvalid = true;
    }
    if (!link) {
      setLinkError("Cannot be empty");
      isvalid = false;
    } else {
      setLinkError("");
      isvalid = true;
    }
    return isvalid;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const isvalid = inputVaidation();
    if (!isvalid) {
      return;
    }
    const formData = {
      platform: platform,
      url: link,
    };

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/link/createLink",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message, {
          duration: 1000,
        });
        return;
      }

      // if (data) {
      //   setTimeout(() => {
      //     router.push("/");
      //   }, 1000);
      // }

      dispatch(getLinks());

      toast.success(data.message, {
        duration: 1000,
      });

      setTimeout(() => {
        handleClose();
      }, 1000);
    } catch (error) {
      if (!res.ok) {
        return toast.error(error.message, {
          duration: 1000,
        });
      }
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEscClose = (e) => {
    if (e.keyCode === 27) {
      setIsModalOpen(false);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setPlatform("");
    setLink("");
    setPlatformError();
    setLinkError("");
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);
  if (!mounted || !isModalOpen) return null;

  return createPortal(
    <dialog
      ref={focusRef}
      open={isModalOpen}
      role="dialog"
      className="fixed inset-0 z-50 w-full h-screen bg-PrimaryPurple/50  top-0 left-0"
      aria-modal="true"
      tabindex="0"
    >
      <div className="w-full h-full flex justify-center items-center opacity-1 ">
        <div className="w-[90%] md:w-[30%] h-fit bg-PrimaryWhite rounded-[.5rem] px-4 py-4">
          <div className="flex justify-end items-center" role="button">
            <IoClose
              size={21}
              className="cursor-pointer"
              onClick={handleClose}
            />
          </div>
          <div className="formDiv mt-2">
            <form onSubmit={submitHandler}>
              <div className="w-full h-fit">
                <Select
                  label={"Platform"}
                  platform={platform}
                  setPlatform={setPlatform}
                  platformError={platformError}
                  setPlatformError={setPlatformError}
                />
              </div>
              <div className="w-full h-fit mt-2">
                <label
                  className={`block mb-1 ${
                    linkError ? "text-Red" : "text-PrimaryGray"
                  }`}
                >
                  Link {linkError}
                </label>
                <input
                  type="url"
                  placeholder="e.g. https://hogwarts.com/harrypotter"
                  className="w-full h-full rounded-[.5rem] px-2 py-[.65rem] border border-PrimaryGray outline-0 focus:outline-PrimaryPurple focus:border-PrimaryPurple
                  "
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
              <div className="flex items-center mt-4">
                <button
                  type="submit"
                  className="w-fit px-4 py-2 rounded-[.5rem] border bg-PrimaryPurple text-PrimaryWhite hover:bg-PrimaryPurple/80 font-semibold"
                >
                  + Add new link
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </dialog>,
    document.body
  );
}

export default Modal;
