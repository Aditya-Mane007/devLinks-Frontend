import Navbar from "@/components/UI/Navbar/Navbar";
import { LinksBackground } from "@/components/utils";
import { setInitialLinks } from "@/features/Links/linkSlice";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

function Preview({ initialLinks, messageText, success }) {
  const [Links, setLinks] = useState(initialLinks);
  const [copyState, setCopyState] = useState(false);

  const dispatch = useDispatch();

  const { links, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.link
  );

  const { userInfo } = useSelector((state) => state.auth);

  const copyToClipboard = async () => {
    const res = await navigator.clipboard.writeText(
      process.env.NEXT_PUBLIC_CLIENT_URL + userInfo.username
    );
    setCopyState(true);

    setTimeout(() => {
      setCopyState(false);
    }, 3000);
  };

  useEffect(() => {
    setLinks(initialLinks);
    dispatch(setInitialLinks(initialLinks));

    if (success) {
      toast.success(messageText, {
        duration: 1000,
      });
    } else {
      toast.error(messageText, {
        duration: 1000,
      });
    }
  }, []);

  useEffect(() => {
    setLinks(links);

    if (isSuccess) {
      toast.success(message);
    }

    if (isError) {
      toast.error(message);
    }
  }, [links, message, isLoading, isError, isSuccess]);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;
  return (
    <div className="w-full h-full min-h-screen flex flex-col relative">
      <div className="bg-PrimaryPurple h-[45%] lg:h-[50%] rounded-b-[.5rem]">
        <Navbar
          isPreview={true}
          copyToClipboard={copyToClipboard}
          isCopied={copyState}
        />
      </div>
      <main className="flex-1 h-full container mx-auto absolute top-[30%] left-0 right-0 ">
        <div className="w-full h-fit flex justify-center items-start">
          <div className="w-[90%] md:w-[50%] lg:w-[35%] bg-PrimaryWhite p-[1.5rem] rounded-[1rem]">
            <div className="w-[7rem] h-[7rem] bg-PrimaryGray rounded-full mx-auto">
              <Image
                src={userInfo.profileImage}
                width={100}
                height={100}
                className="w-full h-full rounded-full"
              />
            </div>

            <h1 className="mt-4 mb-1 text-3xl text-center font-bold">
              {userInfo?.fullName ? (
                userInfo.fullName
              ) : (
                <div className="flex justify-center items-center">
                  <IoIosArrowBack size={30} className="-mx-1" />
                  <span className="mr-1">
                    {userInfo?.username ? userInfo?.username : ""}
                  </span>
                  /
                  <IoIosArrowForward size={30} className="-mx-1 mr-1" />
                </div>
              )}
            </h1>
            <p className="text-center text-PrimaryGray">{userInfo?.email}</p>
            <div className="w-full h-auto flex flex-col mt-4 text-PrimaryWhite">
              {Links.map((link) => {
                let Icon = LinksBackground[link.platform]?.icon;
                return (
                  <Link
                    href={link.url}
                    target="_blank"
                    className="w-full h-full my-[.35rem] p-3 rounded-[.5rem] cursor-pointer flex  justify-between items-center"
                    style={{
                      backgroundColor: LinksBackground[link.platform]
                        ? LinksBackground[link.platform].color
                        : "#333333",
                    }}
                  >
                    <div className="flex items-center ">
                      <Image
                        src={
                          LinksBackground[link.platform] &&
                          LinksBackground[link.platform].icon
                        }
                        width={20}
                        height={20}
                        alt={link.platform}
                        className="mr-3 filter hue-rotate-180"
                      />
                      {link.platform}
                    </div>
                    <Image
                      src="/assets/images/icon-arrow-right.svg"
                      width={20}
                      height={20}
                      alt="Right Arrow"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
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
        success: true,
        initialLinks: data.links || [],
        messageText: data.message,
      },
    };
  } catch (error) {
    return {
      props: {
        success: false,
        initialLinks: [],
        messageText: error.message,
      },
    };
  }
}
// Preview.getLayout = function getLayout(page) {
//   return (
//     <div className="w-full h-full min-h-screen flex flex-col relative">
//       <div className="bg-PrimaryPurple h-[45%] lg:h-[50%] rounded-b-[.5rem]">
//         <Navbar isPreview={true} copyToClipboard={copyToClipboard} />
//       </div>
//       <main className="flex-1 h-full container mx-auto absolute top-[30%] left-0 right-0 ">
//         {page}
//       </main>
//     </div>
//   );
// };

export default Preview;
