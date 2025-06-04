import SEO from "@/components/SEO";
import Navbar from "@/components/UI/Navbar/Navbar";
import Image from "next/image";
import React from "react";

function Profile() {
  return (
    <>
      <SEO
        title="Profile Details | devLinks"
        description="Add your details to create a personal touch to your profile."
      />
      <div className="h-full flex-1 flex justify-between">
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
        <div className="w-full lg:w-[65%] bg-PrimaryWhite flex flex-col rounded-[.5rem] p-[1.5rem] ">
          <div>
            <h1 className="text-[2rem] font-instrumentBold p-0 lg:leading-none">
              Profile Details
            </h1>
            <p className="text-PrimaryGray leading-normal lg:leading-10">
              Add your details to create a personal touch to your profile.
            </p>
          </div>
          <div className="ImagesDiv bg-[#fafafa] my-4 rounded-[.5rem]  md:flex justify-between p-[1.5rem]">
            <div className="w-full flex items-center text-PrimaryGray md:px-[1rem] md:mb-0 mb-[1rem] text-">
              Profile picture
            </div>
            <div className="w-full h-[193px] bg-SecondaryPurple rounded-[.5rem] relative">
              <input
                type="file"
                accept="image/*"
                className="w-full h-full opacity-0 cursor-pointer absolute "
              />
              <div className="flex flex-col items-center justify-center w-full h-full">
                <Image
                  src="/assets/images/icon-upload-image.svg"
                  width={30}
                  height={30}
                  alt="Upload Image"
                />
                <p className="text-PrimaryPurple my-2 font-bold">
                  + Upload Image
                </p>
              </div>
            </div>
            <p className="w-full flex items-center text-PrimaryGray md:px-[1rem] text-[.9rem] mt-[1rem] md:mt-0">
              Image must be below 1024x1024px. Use PNG or JPG format.
            </p>
          </div>
          <div className="bg-[#fafafa] rounded-[.5rem]  md:flex justify-between p-[1.5rem]">
            <form>
              <div>1</div>
              <div>2</div>
              <div>3</div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

Profile.getLayout = function getLayout(page) {
  return (
    <div className="w-full h-full min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto flex-1">{page}</main>
    </div>
  );
};

export default Profile;
