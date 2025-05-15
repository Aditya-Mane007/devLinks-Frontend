import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

function Home() {
  const router = useRouter();
  const makeCall = async () => {
    const res = await fetch("http://localhost:5000/", {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    console.log(data);
  };

  useEffect(() => {
    makeCall();
  }, []);

  const logout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "applicaton/json",
        },
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message, {
          duration: 1000,
        });
      }

      if (res.ok) {
        toast.success(data.message, {
          duration: 1000,
        });

        setTimeout(() => {
          router.push("/login");
        }, 1000);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="font-instrument h-full flex justify-between py-4">
        <div className="h-fit">Home</div>
        <button
          className="bg-PrimaryPurple rounded-lg p-2 px-3 text-PrimaryWhite"
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <div className="w-screen min-h-screen">{page}</div>;
};

export default Home;
