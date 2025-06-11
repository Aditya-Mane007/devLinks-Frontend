import { LinksBackground } from "@/components/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { LuSlash } from "react-icons/lu";

function Username({ userInfo, status, messageText }) {
  const [links, setLinks] = useState(userInfo?.links || []);

  useEffect(() => {
    if (status !== 200) {
      toast.error(messageText);
    } else {
      toast.success(messageText);
    }
  }, []);

  if (!userInfo) {
    return (
      <div className="w-full h-full min-h-screen bg-PrimaryPurple flex justify-center items-center">
        <div className="w-fit text-center text-PrimaryWhite">
          <h1 className="text-[5rem] font-instrumentSemiBold">404</h1>
          <p className="text-[2rem]">
            The page you’re looking for doesn’t exist
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-full min-h-screen flex flex-col relative">
      <div className="bg-PrimaryPurple h-[45%] lg:h-[50%] rounded-b-[.5rem]"></div>
      <main className="flex-1 h-full container mx-auto absolute top-[20%] left-0 right-0 ">
        <div className="w-full h-fit flex justify-center items-start">
          <div className="w-[90%] md:w-[50%] lg:w-[35%] bg-PrimaryWhite p-[1.5rem] rounded-[1rem]">
            <div className="w-[7rem] h-[7rem] bg-PrimaryGray rounded-full mx-auto"></div>
            <h1 className="mt-4 mb-1 text-3xl text-center font-bold">
              {userInfo.userInfo.fullName ? (
                userInfo?.userInfo.fullName
              ) : (
                <div className="flex justify-center items-center">
                  <IoIosArrowBack size={30} className="-mx-1" />
                  /
                  <IoIosArrowForward size={30} className="-mx-1 mr-1" />
                  {userInfo.userInfo.username}
                </div>
              )}
            </h1>
            <p className="text-center text-PrimaryGray">
              {userInfo.userInfo.email}
            </p>
            <div className="w-full h-auto flex flex-col mt-4 text-PrimaryWhite">
              {links.map((link) => {
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

export const getServerSideProps = async (context) => {
  const { username } = context.params;
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + `/link/getUserInfo/${username}`,
      {
        method: "GET",
      }
    );

    if (!res.ok) {
      const data = await res.json();

      return {
        props: {
          userInfo: null,
          status: 404,
          messageText: data.message,
        },
      };
    }

    const data = await res.json();

    return {
      props: {
        userInfo: data.userData,
        status: 200,
        messageText: data.message,
      },
    };
  } catch (error) {
    return {
      props: {
        userInfo: null,
        status: 500,
        messageText: "Internal Server Error",
      },
    };
  }
};

// Username.getLayout = function getLayout(page) {
//   return (
//     <div className="w-full h-full min-h-screen flex flex-col relative">
//       <div className="bg-PrimaryPurple h-[45%] lg:h-[50%] rounded-b-[.5rem]"></div>
//       <main className="flex-1 h-full container mx-auto absolute top-[20%] left-0 right-0 ">
//         {page}
//       </main>
//     </div>
//   );
// };

export default Username;
