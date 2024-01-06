'use client';
import React from "react";
import Image from "next/image";
import { CompleteUser } from "@/lib/db/schema/users";
import Articles from "../ui/suzus/userProfile/article";
import Avatar from "../ui/suzus/userProfile/avatar";
import ButtonSuzu from "../ui/suzus/userProfile/button";
import { Input } from "../ui/input";
import Divider from "../ui/suzus/userProfile/divider";

export default function UserProfile() {
  return (
    <div className="flex py-2.5 flex-col items-center gap-5 "> {/* col 1  */}
      <div className="flex w-[542px] h-[175px] max-w-Content-breakpoint-Desktop px-4 flex-col items-start gap-2.5 self-stretch">
        <div className="flex items-start gap-4 self-stretch"> {/* row thu 3  */}
          <div className="flex flex-col items-start gap-2 flex-grow flex-shrink-0 basis-0">
            <div className="felx felx-col items-start self-stretch pb-2">
              <div className="self-stretch font-openSans text-slate-900 text-29 font-normal not-italic leading-37.7">
                Cẩm Khúc
              </div>
              <div className="self-stretch font-openSans text-slate-500 text-15 font-normal not-italic leading-22.5">
                @camkhuc.99
              </div>
            </div>
            <div className="flex items-start gap-4 self-stretch pt-2">
              <div className="flex items-baseline gap-1">
                <div className="text-black font-openSans text-15 not-italic leading-22.5 font-semibold">
                  16
                </div>
                <div className="text-black text-12 not-italic leading-18 font-normal ">
                  Người theo dõi
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <div className="text-black font-openSans text-15 not-italic leading-22.5 font-semibold">
                  16
                </div>
                <div className="text-black text-12 not-italic leading-18 font-normal ">
                  Đang theo dõi
                </div>
              </div>
            </div>
          </div>
          <div className="w-[92px] h-[92px] flex flex-col items-start">
            <Avatar />
          </div>

        </div>
        <div className="self-stretch text-slate-900 font-openSans text-15 not-italic font-normal leading-22.5">
          All good things are wild and free..
        </div>
        <div className="w-[510px] mt-2.5 mx-4 pb-5 flex h-10 px-4 py-2 flex-col items-center gap-1 self-stretch rounded-full 
        border border-gray-200 border-solid ">
          <div className="w-[175px] h-[24] flex items-start gap-2 rounded-[999px]">
            <Image src="/images/icons/Pencil.png" width={24} height={24} alt="pencil" />
            <div className="text-slate-900 font-openSans text-15 font-normal leading-24">
              Chỉnh sửa thông tin
            </div>
          </div>
        </div>
        <div className="flex w-[574px] max-w-Content-breakpoint-Desktop p-4 items-start mx-5">
          <ButtonSuzu LeadingIcon={false} Text="Đã Đăng" TailingIcon={false} />
          <ButtonSuzu LeadingIcon={false} Text="Đã Lưu" TailingIcon={false} />
        </div>
        {/* Conent */}
        <div className="container flex mt-5 mb-2.5 w-Content-breakpoint-Desktop max-w-Content-breakpoint-Desktop flex-col justify-center items-start gap-6 h-[72px]">
          {/*CTA */}
          <div className="flex mb-2.5 w-[574px] flex-col items-start ">
            <div className="flex p-4 flex-col items-start gap-2 self-stretch bg-white rounded-[20px]">
              <div className="m-4 flex items-center gap-2 self-stretch">
                {/* avatar */}
                <div className="flex w-10 h-10 flex-col items-start">
                  {/* <Avatar /> */}
                </div>
                <div className="flex items-center gap-1 flex-grow flex-shrink-0 basis-0">
                  <Input className="flex items-start flex-grow flex-shrink-0 basis-0" type="text" placeholder="Chia sẻ Suzu của bạn..." />
                </div>
                <div className="flex w-6 h-6 px-4 py-2 ml-1 flex-col justify-center items-center gap-1 rounded-[999px] ">
                  <button className="flex items-start gap-2 rounded-[999px] mx-4 mb-2">
                    <div className="w-6 h-6 flex flex-col justify-center items-center mr-2">
                      <Image className="p-[2px] m-[2.5px] w-[19px] h-[19px] flex-shrink-0 stroke-2 stroke-slate-700" src={'/images/icons/Icon_19_19.svg'} alt="img text" width={19} height={19} />
                    </div>
                  </button>
                </div>
              </div>
            </div>
            {/* divider */}
            <div className="mt-[10px]">
              <Divider axis="horizontal" />
            </div>
            {/* article */}
            <div className="container">
              <Articles breakpoint="Desktop" video={false} image={false} />
            </div>


          </div>

        </div>
      </div>
    </div >

  );
}