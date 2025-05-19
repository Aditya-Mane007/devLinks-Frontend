import React, { useState } from "react";
import SEO from "@/components/SEO";
import Image from "next/image";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaEye, FaRegEye } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

function Links() {
  const [Links, setLinks] = useState([
    {
      title: "Youtube",
      url: "https://youtube.com/@mr.billionaire47?si=9bO9mhj_oWbX6zXE",
    },
    {
      title: "Youtube",
      url: "https://youtube.com/@mr.billionaire47?si=9bO9mhj_oWbX6zXE",
    },
    {
      title: "Youtube",
      url: "https://youtube.com/@mr.billionaire47?si=9bO9mhj_oWbX6zXE",
    },
    {
      title: "Youtube",
      url: "https://youtube.com/@mr.billionaire47?si=9bO9mhj_oWbX6zXE",
    },
    {
      title: "Youtube",
      url: "https://youtube.com/@mr.billionaire47?si=9bO9mhj_oWbX6zXE",
    },
    {
      title: "Youtube",
      url: "https://youtube.com/@mr.billionaire47?si=9bO9mhj_oWbX6zXE",
    },
    {
      title: "Youtube",
      url: "https://youtube.com/@mr.billionaire47?si=9bO9mhj_oWbX6zXE",
    },
    {
      title: "Youtube",
      url: "https://youtube.com/@mr.billionaire47?si=9bO9mhj_oWbX6zXE",
    },
    {
      title: "Youtube",
      url: "https://youtube.com/@mr.billionaire47?si=9bO9mhj_oWbX6zXE",
    },
    {
      title: "Youtube",
      url: "https://youtube.com/@mr.billionaire47?si=9bO9mhj_oWbX6zXE",
    },
  ]);

  const [optionId, setOptionId] = useState(null);

  console.log(optionId);
  return (
    <>
      <SEO
        title="Customize your links | devLinks"
        description="Add/edit/remove links below and then share all your profiles with the world!"
      />
      <div className="w-full h-full flex justify-between">
        <div className="hidden lg:flex w-[33%] h-full justify-center items-center bg-PrimaryWhite rounded-[.5rem] py-12 h-[85vh]s">
          <div>
            <Image
              src="/assets/images/illustration-phone-mockup.svg"
              width={100}
              height={100}
              alt="Phone Mockup"
              className="w-[70%] h-full mx-auto flex items-start"
            />
          </div>
        </div>
        <div className="w-full lg:w-[65%] p-[1.5rem] bg-PrimaryWhite flex flex-col h-[85vh] rounded-[.5rem]">
          <>
            <h1 className="text-[2rem] font-instrumentBold p-0 lg:leading-none">
              Customize your links
            </h1>
            <p className="text-PrimaryGray leading-normal lg:leading-10">
              Add/edit/remove links below and then share all your profiles with
              the world!
            </p>
            <div className="flex items-center">
              <button className="w-full py-2 my-4 rounded-[.5rem] border border-PrimaryPurple text-PrimaryPurple hover:bg-LightPurple font-semibold">
                + Add new link
              </button>
            </div>
          </>
          {Links && Links.length < 1 ? (
            <div className="flex-1 flex justify-start items-center h-full">
              <div className="flex flex-col justify-center items-center">
                <Image
                  src="/assets/images/illustration-empty.svg"
                  width={200}
                  height={200}
                />
                <h2 className="w-[50%] text-center text-[1rem] md:text-[1.25rem] lg:text-[2rem] font-instrumentBold ">
                  Let’s get you started
                </h2>
                <p className="lg:w-[55%] text-center text-PrimaryGray">
                  Use the “Add new link” button to get started. Once you have
                  more than one link, you can reorder and edit them. We’re here
                  to help you share your profiles with everyone!
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 h-full overflow-scroll scrollbarNone">
              {Links &&
                Links.map((link, index) => (
                  <div
                    className={`p-4 pb-[.5rem] rounded-[0.6rem] bg-SecondaryWhite relative ${
                      Links.length !== index + 1 ? "mb-4" : "mb-0"
                    } `}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex mb-2">
                        <Image
                          src="/assets/images/icon-drag-and-drop.svg"
                          width={15}
                          height={15}
                          alt={index}
                          className="mr-3 cursor-grab"
                        />
                        <p>Link #{index + 1}</p>
                      </div>

                      {optionId == index + 1 ? (
                        <RxCross2
                          size={20}
                          className="cursor-pointer fade-in"
                          onClick={() => setOptionId(null)}
                        />
                      ) : (
                        <BiDotsVerticalRounded
                          size={20}
                          className="cursor-pointer fade-in"
                          onClick={() => setOptionId(index + 1)}
                        />
                      )}

                      {optionId === index + 1 && (
                        <div className="bg-PrimaryWhite absolute py-2 px-4 rounded-[.5rem] top-11 right-5  fade-in-tr shadow-xl">
                          <div className="flex items-center mb-1 cursor-pointer select-none">
                            <FaRegEye className="mr-2" /> Visible
                          </div>
                          <div className="flex items-center mb-1 cursor-pointer select-none">
                            <FaRegEdit className="mr-2" /> Update
                          </div>
                          <div className="flex items-center mb-1 cursor-pointer select-none">
                            <MdDeleteOutline className="mr-2" /> Delete
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mb-2">
                      <p className="text-[.8rem] text-PrimaryGray mb-2">
                        Platform
                      </p>
                      <div className="p-2 border border-PrimaryGray rounded-[.5rem]">
                        {link.title}
                      </div>
                    </div>
                    <div className="mb-2">
                      <p className="text-[.8rem] text-PrimaryGray mb-2">Link</p>
                      <div className="p-2 border border-PrimaryGray rounded-[.5rem]">
                        {link.url}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Links;

// <div className="w-full h-full flex  mt-5">
//   <div className="w-[35%] h-full flex justify-center items-center">
//     <div className="w-[80%]">
//       <Image
//         src="/assets/images/illustration-phone-mockup.svg"
//         width={100}
//         height={100}
//         alt="Phone Mockup"
//         className=" w-full object-scale-down"
//       />
//     </div>
//   </div>
//   <div className="w-[65%] p-[2rem] overflow-y-scroll">Links</div>
// </div>
