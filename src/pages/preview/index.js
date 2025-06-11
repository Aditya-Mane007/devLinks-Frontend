import Navbar from "@/components/UI/Navbar/Navbar";
import { LinksBackground } from "@/components/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function Preview({ initialLinks, messageText }) {
  const [links, setLinks] = useState(initialLinks);

  return (
    <div className="w-full h-fit flex justify-center items-start">
      <div className="w-[90%] md:w-[50%] lg:w-[35%] bg-PrimaryWhite p-[1.5rem] rounded-[1rem]">
        <div className="w-[7rem] h-[7rem] bg-PrimaryGray rounded-full mx-auto"></div>
        <h1 className="mt-4 mb-1 text-3xl text-center font-bold">
          Aditya Mane
        </h1>
        <p className="text-center text-PrimaryGray">aditya@gmail.com</p>
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

Preview.getLayout = function getLayout(page) {
  return (
    <div className="w-full h-full min-h-screen flex flex-col relative">
      <div className="bg-PrimaryPurple h-[45%] lg:h-[50%] rounded-b-[.5rem]">
        <Navbar isPreview={true} />
      </div>
      <main className="flex-1 h-full container mx-auto absolute top-[30%] left-0 right-0 ">
        {page}
      </main>
    </div>
  );
};

export default Preview;
