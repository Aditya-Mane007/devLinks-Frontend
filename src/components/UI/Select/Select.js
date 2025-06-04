import { LinksOption } from "@/components/utils";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

function Select({ label, platform, setPlatform, platformError }) {
  const [visible, setVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const selectedIndexref = useRef([]);

  const handleNavigation = (e) => {
    // 38 - Arrow Up
    // 40 - Arrow Down
    // 13 - Enter

    // if (e.keyCode === 13) {
    //   setSelectedIndex((prev) => {
    //     setPlatform(LinksOption[prev].title);
    //     return prev;
    //   });
    // }
    if (e.keyCode === 13) {
      setSelectedIndex((prev) => {
        if (prev !== null && LinksOption[prev]) {
          setPlatform(LinksOption[prev].title);
          setVisible(false);
        }
        return prev;
      });
    }

    if (e.keyCode === 38) {
      setSelectedIndex((prev) => {
        return prev === 0 || prev <= 0 ? 0 : prev - 1;
      });
    }
    if (e.keyCode === 40) {
      setSelectedIndex((prev) => {
        if (prev === null) return 0;
        if (prev >= LinksOption.length - 1) return LinksOption.length - 1;
        return prev + 1;
      });
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleNavigation);

    return () => {
      document.removeEventListener("keydown", handleNavigation);
    };
  }, []);

  useEffect(() => {
    if (visible && selectedIndex !== null) {
      const element = selectedIndexref.current[selectedIndex];

      element.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    }
  }, [selectedIndex, visible]);

  return (
    <div>
      <label
        className={`block mb-1  ${
          platformError ? "text-Red" : "text-PrimaryGray "
        }`}
      >
        {platformError ? platformError : label}
      </label>
      <div className="relative">
        <button
          className=" w-full h-full border p-2 rounded-[.5rem] flex items-center justify-between outline-PrimaryPurple outline-0  border-PrimaryGray focus:outline-PrimaryPurple focus:border-PrimaryPurple focus:border-1"
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
            className="w-full h-[10rem] overflow-y-scroll border my-2 p-2 rounded-[.5rem] absolute bg-PrimaryWhite top-[100%] backdrop-blur-2xl border-PrimaryGray "
          >
            {LinksOption.map((link, index) => (
              <li
                key={link.id}
                role="menuitem"
                ref={(element) => (selectedIndexref.current[link.id] = element)}
                className={`${
                  LinksOption.length === index + 1
                    ? "border-none pb-1 p-2 rounded-[.5rem] mb-1"
                    : "border-b-[1px] border-PrimaryGray pb-1 mb-2 p-2 rounded-[.5rem]"
                } ${
                  selectedIndex === index
                    ? "bg-SecondaryPurple text-black"
                    : "bg-PrimaryWhite"
                } flex cursor-pointer outline-PrimaryPurple outline-1`}
                onClick={() => {
                  setPlatform(link.title);
                  setSelectedIndex(link.id);
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
          </ul>
        )}
      </div>
    </div>
  );
}

export default Select;
