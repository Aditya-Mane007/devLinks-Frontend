import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import Select from "../Select/Select";

function Modal({ isModalOpen, setIsModalOpen }) {
  const [mounted, setMounted] = useState(false);
  const focusRef = useRef(null);

  // Input Fileds
  const [platform, setPlatform] = useState("");
  const [link, setLink] = useState("");

  // Errors
  const [platformError, setPlatformError] = useState("");
  const [linkError, setLinkError] = useState("");

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

  console.log(focusRef);
  return createPortal(
    <dialog
      ref={focusRef}
      open={isModalOpen}
      role="dialog"
      className="fixed inset-0 z-50 w-full h-screen bg-PrimaryPurple/30  top-0 left-0"
      aria-modal="true"
      tabindex="0"
    >
      <div className="w-full h-full flex justify-center items-center opacity-1 ">
        <div className="w-[90%] md:w-[30%] h-fit bg-PrimaryWhite rounded-[.5rem] px-4 py-4">
          <div className="flex justify-end items-center ">
            <IoClose
              size={21}
              className="cursor-pointer"
              onClick={handleClose}
            />
          </div>
          <div className="formDiv my-2">
            <form>
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
                <label className="block mb-1 text-PrimaryGray text-[.8rem]">
                  Link
                </label>
                <input
                  type="url"
                  placeholder="e.g. https://hogwarts.com/harrypotter"
                  className="w-full h-full rounded-[.5rem] px-2 py-[.65rem] border border-1-PrimaryGray outline-none
                  focus:border-PrimaryPurple"
                />
              </div>
              <div className="flex items-center mt-4">
                <button
                  className="w-fit px-4 py-2 rounded-[.5rem] border bg-PrimaryPurple text-PrimaryWhite hover:bg-PrimaryPurple/80 font-semibold"
                  onClick={(e) => e.preventDefault()}
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
