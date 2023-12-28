
import Image from 'next/image'
import React from 'react'

export default function Header() {
  return (
    <div className="justify-center items-center bg-white flex w-full flex-col px-16 py-4 max-md:max-w-full max-md:px-5">
      <header className="justify-between items-center flex w-full max-w-[1168px] gap-5 pr-2 max-md:max-w-full max-md:flex-wrap">
        <div className="aspect-square object-contain object-center w-10 overflow-hidden self-stretch shrink-0 max-w-full">
          <Image
            loading="lazy"
            src={"/images/Logo.svg"}
            width={100}
            height={100}
            alt=""
          />
        </div>
        <div className="items-start self-stretch flex justify-between gap-5 px-5">
          <div className="aspect-square object-contain object-center w-6 overflow-hidden self-center shrink-0 max-w-full my-auto">
            <Image
              loading="lazy"
              src={"/images/navbars/navbar_button_home.svg"}
              width={100}
              height={100}
              alt=""
            />
          </div>
          <div className="aspect-square object-contain object-center w-6 overflow-hidden self-center shrink-0 max-w-full my-auto">
            <Image
              loading="lazy"
              src={"/images/navbars/navbar_button_search.svg"}
              width={100}
              height={100}
              alt=""
            />
          </div>
          <div
            role="button"
            className="justify-center items-center border border-[color:var(--Slate-100,#E7E7E7)] bg-white self-stretch flex aspect-square flex-col w-10 h-10 px-1 rounded-xl border-solid"
            aria-label="Toggle Button"
          >
            <Image
              loading="lazy"
              src={"/images/navbars/navbar_button_add.svg"}
              width={100}
              height={100}
              alt=""
            />
          </div>
          <div className="aspect-square object-contain object-center w-6 justify-end items-center overflow-hidden self-center shrink-0 max-w-full my-auto">
            <Image
              loading="lazy"
              src={"/images/navbars/navbar_button_profile.svg"}
              width={100}
              height={100}
              alt=""
            />
          </div>
          <div className="aspect-square object-contain object-center w-6 overflow-hidden self-center shrink-0 max-w-full my-auto">
            <Image
              loading="lazy"
              src={"/images/navbars/navbar_button_notification.svg"}
              width={100}
              height={100}
              alt=""
            />
          </div>
        </div>
        <div className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full my-auto">
          <Image
            loading="lazy"
            src={"/images/navbars/navbar_button_more.svg"}
            width={100}
            height={100}
            alt=""
          />
        </div>
      </header>
    </div>
  )
}
