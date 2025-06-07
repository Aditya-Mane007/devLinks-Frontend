import React, { useEffect, useState } from "react";
import SEO from "@/components/SEO";
import Links from "@/components/UI/Links/Links";
import Navbar from "@/components/UI/Navbar/Navbar";
import ProfileDetail from "@/components/UI/ProfileDetail/ProfileDetail";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@/components/UI/Modal/Modal";
import { deleteLink, getLinks, reset } from "@/features/Links/linkSlice";
import toast from "react-hot-toast";
import { MdDeleteOutline } from "react-icons/md";
import { DummyData } from "@/components/utils";

function Home({ initialLinks, messageText }) {
  const dispatch = useDispatch();
  const { links, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.link
  );

  const [Links, setLinks] = useState(links);
  const [checkbox, setCheckbox] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setLinks(links);
  }, [links]);

  useEffect(() => {
    if (initialLinks && initialLinks.length > 0) {
      setLinks(initialLinks);
      toast.success(messageText, {
        duration: 1000,
      });
    } else {
      toast.error(messageText, {
        duration: 1000,
      });
    }
  }, []);

  // const deleteLink = async (id) => {
  //   const res = await fetch(
  //     process.env.NEXT_PUBLIC_API_URL + `/link/deleteLink/${id}`,
  //     {
  //       method: "DELETE",
  //       credentials: "include",
  //     }
  //   );

  //   const data = await res.json();

  //   return data;
  // };

  return (
    <>
      <SEO
        title="Customize your links | devLinks"
        description="Add/edit/remove links below and then share all your profiles with the world!"
      />
      <div
        className="h-full min-h-0 flex-1 flex justify-between"
        aria-hidden={isModalOpen}
      >
        <div className="hidden lg:block w-[33%] bg-PrimaryWhite rounded-[.5rem]">
          <div className="w-full h-full flex justify-center 2xl:items-center items-start">
            <Image
              src="/assets/images/illustration-phone-mockup.svg"
              width={100}
              height={100}
              alt="Phone Mockup"
              className="w-auto h-full scale-75"
            />
          </div>
        </div>
        <div className="lg:w-[65%] w-full bg-PrimaryWhite flex flex-col rounded-[.5rem] p-[1.5rem] min-h-0">
          <div>
            <h1 className="text-[2rem] font-instrumentBold p-0 lg:leading-none">
              Customize your links
            </h1>
            <p className="text-PrimaryGray leading-normal lg:leading-10">
              Add/edit/remove links below and then share all your profiles with
              the world!
            </p>
          </div>

          {/* <div className="flex items-center"> */}
          <button
            className="w-full py-2 my-4 rounded-[.5rem] border border-PrimaryPurple text-PrimaryPurple hover:bg-LightPurple font-semibold"
            onClick={() => setIsModalOpen((prev) => !prev)}
          >
            + Add new link
          </button>
          {/* </div> */}
          {Links && Links.length > 0 ? (
            <div className="flex-1 min-h-0 overflow-y-scroll scrollbarNone">
              {Links &&
                Links.map((link, index) => (
                  <div
                    key={link._id}
                    className={`p-4 pb-[.5rem] rounded-[0.6rem] bg-SecondaryWhite relative ${
                      Links.length !== index + 1 ? "mb-4" : "mb-0"
                    } `}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        <Image
                          src="/assets/images/icon-drag-and-drop.svg"
                          width={15}
                          height={15}
                          alt={index}
                          className="mr-3 cursor-grab"
                        />
                        <p>Link #{index + 1}</p>
                      </div>

                      <div className="flex items-center cursor-pointer">
                        <div className="mr-2">
                          <label htmlFor="checkbox" className="flex">
                            <input
                              type="checkbox"
                              name="checkbox"
                              id="checkbox"
                              className="w-0 h-0 "
                              value={link.visible}
                              onChange={() => setCheckbox(!checkbox)}
                            />
                            <div
                              className={`w-[3.5rem] h-[2rem] rounded-[50px] relative border ${
                                link.visible
                                  ? "border-PrimaryPurple bg-PrimaryPurple"
                                  : "border-Red bg-Red"
                              }`}
                            >
                              <span
                                className={`w-[1.65rem] h-[1.65rem] bg-PrimaryWhite rounded-full absolute translate-y-[7%] translate-x-[0.15rem] transition duration-500 ease-out ${
                                  link.visible && "translate-x-[1.55rem]"
                                }`}
                              ></span>
                            </div>
                          </label>
                        </div>

                        <div
                          className="flex items-center p-2 border border-Red rounded-[.5rem] cursor-pointer text-Red font-bold tracking-wide hover:bg-Red/40 px-4 md:px-4 py-2"
                          onClick={() => dispatch(deleteLink(link._id))}
                        >
                          <MdDeleteOutline
                            className="md:mr-2 font-bold block md:hidden"
                            size={21}
                          />
                          <span className="hidden md:block">Remove</span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-2">
                      <p className="text-[.8rem] text-PrimaryGray mb-2">
                        Platform
                      </p>
                      <div className="p-2 border border-PrimaryGray rounded-[.5rem]">
                        {link.platform}
                      </div>
                    </div>
                    <div className="mb-2">
                      <p className="text-[.8rem] text-PrimaryGray mb-2">Link</p>
                      <div className="p-2 border border-PrimaryGray rounded-[.5rem] block truncate ">
                        {link.url}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="flex flex-col justify-start items-center">
              <Image
                src="/assets/images/illustration-empty.svg"
                width={200}
                height={200}
              />
              <h2 className="w-[50%] text-center text-[1rem] md:text-[1.25rem] lg:text-[2rem] font-instrumentBold ">
                Let’s get you started
              </h2>
              <p className="lg:w-[55%] text-center text-PrimaryGray">
                Use the “Add new link” button to get started. Once you have more
                than one link, you can reorder and edit them. We’re here to help
                you share your profiles with everyone!
              </p>
            </div>
          )}
        </div>
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;

  const token = req.cookies.token;
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/link/getLinks",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch links");
    }

    const data = await res.json();

    return {
      props: {
        initialLinks: data.links || [],
        messageText: data.message,
      },
    };
  } catch (error) {
    return {
      props: {
        initialLinks: [],
        messageText: data.message,
      },
    };
  }
}

Home.getLayout = function getLayout(page) {
  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />
      <main className="h-full min-h-0 container mx-auto flex-1">{page}</main>
    </div>
  );
};

export default Home;
