import SEO from "@/components/SEO";
import Navbar from "@/components/UI/Navbar/Navbar";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";

function Profile() {
  const router = useRouter();
  const [imageInput, setImageInput] = useState("");
  const [imaagePreview, setImagePreview] = useState("");

  const imageInputHandler = (e) => {
    setImageInput(e.target.files[0]);
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImagePreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const imageSubmitHandler = (e) => {
    const formData = new FormData();
    formData.append("profileImage", e.target.files[0]);

    console.log(formData);
  };

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!res.ok) {
        toast.error(data.message, {
          duration: 1500,
        });
        return;
      }

      localStorage.removeItem("User");

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message, {
          duration: 1000,
        });
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      }
    } catch (error) {
      toast.error(error);
    }
  };
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
        <div className="lg:w-[65%] w-full bg-PrimaryWhite flex flex-col rounded-[.5rem] p-[1.5rem]">
          <div>
            <h1 className="text-[2rem] font-instrumentBold p-0 lg:leading-none">
              Profile Details
            </h1>
            <p className="text-PrimaryGray leading-normal lg:leading-10">
              Add your details to create a personal touch to your profile.
            </p>
          </div>
          <div className="flex-1 min-h-0 overflow-y-scroll scrollbarNone">
            <div className="ImagesDiv bg-[#fafafa] my-4 rounded-[.5rem]  md:flex justify-between p-[1.5rem]">
              <div className="w-full flex items-center text-PrimaryGray md:px-[1rem] md:mb-0 mb-[1rem] text-">
                Profile picture
              </div>
              {imageInput ? (
                <Image
                  src={imaagePreview}
                  width={100}
                  height={100}
                  className="w-full md:w-[700px] h-[193px] rounded-[.5rem] object-cover sm:object-fill cursor-pointer "
                />
              ) : (
                <div className="md:w-[700px] h-[193px] bg-SecondaryPurple rounded-[.5rem] relative flex items-center justify-center cursor-pointer">
                  <form enctype="multipart/form-data">
                    <input
                      type="file"
                      accept="image/*"
                      value={imaagePreview}
                      onChange={imageInputHandler}
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
                  </form>
                </div>
              )}

              <p className="w-full flex items-center text-PrimaryGray md:px-[1rem] text-[.9rem] mt-[1rem] md:mt-0">
                Image must be below 1024x1024px. Use PNG or JPG format.
              </p>
            </div>
            <div className="bg-[#fafafa] rounded-[.5rem]  md:flex justify-between p-[1.5rem]">
              <form className="w-full">
                <div className="lg:flex my-3">
                  <div className="w-full text-PrimaryGray leading-normal lg:leading-10 lg:mb-0 mb-2">
                    First Name*
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="e.g. Harry"
                      className="w-full px-[1rem] py-[.7rem] rounded-[.5rem] border border-PrimaryGray outline-0 focus:outline-PrimaryPurple focus:border-PrimaryPurple"
                    />
                  </div>
                </div>
                <div className="lg:flex my-3">
                  <div className="w-full text-PrimaryGray leading-normal lg:leading-10 lg:mb-0 mb-2">
                    Last Name*
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="e.g. Potter"
                      className="w-full px-[1rem] py-[.7rem] rounded-[.5rem] border border-PrimaryGray outline-0 focus:outline-PrimaryPurple focus:border-PrimaryPurple"
                    />
                  </div>
                </div>
                <div className="lg:flex my-3">
                  <div className="w-full text-PrimaryGray leading-normal lg:leading-10 lg:mb-0 mb-2">
                    Email address*
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="e.g. harry@hogwarts.com"
                      className="w-full px-[1rem] py-[.7rem] rounded-[.5rem] border border-PrimaryGray outline-0 focus:outline-PrimaryPurple focus:border-PrimaryPurple"
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    className="bg-PrimaryPurple hover:bg-PrimaryPurple/80 px-4 py-2 rounded-[.5rem] text-PrimaryWhite -tracking-tighter font-bold"
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 border border-PrimaryPurple hover:bg-SecondaryPurple  text-PrimaryPurple 
                  -tracking-tighter
                  font-bold rounded-[.5rem]"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
            <div className="flex justify-end"></div>
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
      <main className="min-h-0 container mx-auto flex-1 ">{page}</main>
    </div>
  );
};

export default Profile;
