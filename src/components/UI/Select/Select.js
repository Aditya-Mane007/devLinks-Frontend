import { LinksOption } from "@/components/utils";
import Image from "next/image";
import React, { useState } from "react";

function Select({ label, platform, setPlatform }) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label className="block mb-1 text-PrimaryGray text-[.8rem]">
        {label}
      </label>
      <div className="relative">
        <button
          className=" w-full h-full border p-2 rounded-[.5rem] flex items-center justify-between outline-PrimaryPurple outline-2  border-PrimaryGray focus:border-PrimaryPurple"
          type="button"
          role="combobox"
          onClick={(e) => setVisible(!visible)}
          onBlur={() => {
            setTimeout(() => {
              setVisible(false);
            }, 150);
          }}
        >
          <p className="text-base">{platform ? platform : "Select platform"}</p>
          <div>
            <Image
              src="/assets/images/icon-chevron-down.svg"
              className={visible ? "rotate-180" : "rotate-0"}
              width={15}
              height={15}
            />
          </div>
        </button>
        {visible && (
          <ul
            role="menu"
            aria-label="menu"
            className="w-full h-[10rem] overflow-y-scroll border my-2 p-2 rounded-[.5rem] absolute bg-PrimaryWhite top-[100%] backdrop-blur-2xl border-PrimaryGray"
          >
            {LinksOption.map((link, index) => (
              <li
                key={index}
                role="menuitem"
                className={`${
                  LinksOption.length === index + 1
                    ? "border-none"
                    : "border-b-[1px] mb-2 pb-1 p-1"
                }  flex cursor-pointer outline-PrimaryPurple outline-1`}
                tabindex="0"
                onClick={() => {
                  setPlatform(link.title);
                  setVisible(false);
                }}
              >
                <Image
                  src={link.icon}
                  width={15}
                  height={15}
                  alt={link.title}
                  className="mr-2"
                />
                {link.title}
              </li>
            ))}
            {/* 
            <li role="menuitem" className="border-b-[1px] mb-2" tabindex="0">
              Intagram
            </li>
            <li role="menuitem" className="border-b-[1px] mb-2" tabindex="0">
              Twitter
            </li> */}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Select;
