import React from "react";
import "./Navbar.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { tabHandler } from "@/features/tab/tabSlice";
import Link from "next/link";
import { useRouter } from "next/router";

function Navbar() {
  const dispatch = useDispatch();
  const { tab } = useSelector((state) => state.tab);

  const router = useRouter();

  return (
    <nav>
      <div className="w-full h-fit sm:py-4">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center sm:rounded-[.5rem] bg-PrimaryWhite">
          <Link href="/">
            <Image
              src="/assets/images/logo-devlinks-large.svg"
              width={185}
              height={32}
              alt="DevLinks"
              className="hidden md:block"
            />
            <Image
              src="/assets/images/logo-devlinks-small.svg"
              width={42}
              height={32}
              alt="DevLinks"
              className="block md:hidden"
            />
          </Link>
          <div className="flex">
            <Link
              href="/"
              className={`px-4 md:px-4 py-2  ${
                router.pathname === "/"
                  ? "border border-PrimaryPurple text-PrimaryPurple"
                  : "border border-PrimaryWhite text-PrimaryGray"
              } rounded-[.5rem] font-semibold -tracking-tighter flex items-center mr-1`}
              // onClick={() => dispatch(tabHandler("Links"))}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                fill="none"
                viewBox="0 0 21 20"
                className="md:mr-2"
              >
                <path
                  fill={router.pathname === "/" ? "#633CFF" : "#737373"}
                  d="M11.154 14.65a.936.936 0 0 1 0 1.329l-.464.464a4.689 4.689 0 1 1-6.631-6.631l1.884-1.884a4.687 4.687 0 0 1 6.432-.194.941.941 0 0 1-1.25 1.407 2.813 2.813 0 0 0-3.857.114l-1.883 1.882a2.813 2.813 0 1 0 3.978 3.978l.464-.464a.936.936 0 0 1 1.327 0ZM16.94 3.558a4.695 4.695 0 0 0-6.63 0l-.465.464a.94.94 0 1 0 1.328 1.328l.464-.464a2.813 2.813 0 0 1 3.978 3.978l-1.883 1.885a2.813 2.813 0 0 1-3.858.111.942.942 0 0 0-1.25 1.407 4.688 4.688 0 0 0 6.43-.19l1.884-1.884a4.695 4.695 0 0 0 .002-6.633v-.002Z"
                />
              </svg>
              <span className="hidden md:block">Links</span>
            </Link>
            <Link
              href="/profile"
              className={`px-4 md:px-4 py-2  ${
                router.pathname === "/profile"
                  ? "border border-PrimaryPurple text-PrimaryPurple"
                  : "border border-PrimaryWhite text-PrimaryGray"
              } rounded-[.5rem] font-semibold -tracking-tighter flex items-center ml-1`}
              // onClick={() => dispatch(tabHandler("Profile Details"))}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                fill="none"
                viewBox="0 0 21 20"
                className="md:mr-2"
              >
                <path
                  fill={router.pathname === "/profile" ? "#633CFF" : "#737373"}
                  d="M10.5 1.563A8.437 8.437 0 1 0 18.938 10 8.447 8.447 0 0 0 10.5 1.562ZM6.716 15.357a4.688 4.688 0 0 1 7.568 0 6.54 6.54 0 0 1-7.568 0Zm1.596-5.982a2.188 2.188 0 1 1 4.376 0 2.188 2.188 0 0 1-4.376 0Zm7.344 4.683a6.523 6.523 0 0 0-2.265-1.83 4.062 4.062 0 1 0-5.782 0 6.522 6.522 0 0 0-2.265 1.83 6.562 6.562 0 1 1 10.304 0h.008Z"
                />
              </svg>
              <span className="hidden md:block">Profile Details</span>
            </Link>
          </div>
          <Link href="/preview">
            <button className="px-4 md:px-6 py-2 border border-PrimaryPurple rounded-[.5rem] text-PrimaryPurple hover:bg-LightPurple font-semibold -tracking-tighter">
              <span className="hidden md:block">Preview</span>
              <span className="block md:hidden">
                <Image
                  src="/assets/images/icon-preview-header.svg"
                  width={20}
                  height={20}
                  alt="Preview"
                  title="Preview"
                />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
