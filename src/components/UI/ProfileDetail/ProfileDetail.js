import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";

function ProfileDetail() {
  const router = useRouter();
  const logoutHandler = async () => {
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
    <div className=" h-full">
      <h1>Profile Details</h1>
      <div className="my-4">
        <button
          className="py-2 px-4 bg-PrimaryPurple rounded-[.5rem] text-PrimaryWhite"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileDetail;
