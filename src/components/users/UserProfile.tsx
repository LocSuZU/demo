'use client';
import React from "react";
import Image from "next/image";
import { CompleteUser } from "@/lib/db/schema/users";

export default function UserProfile() {
  return (
    <div className="flex py-2.5 flex-col items-center gap-5 "> {/* col 1  */}
      <div className="flex w-[542px] h-[175px] max-w-Content-breakpoint-Desktop px-4 flex-col items-start gap-2.5 self-stretch">
        <div className="flex items-start gap-4 self-stretch"> {/* row thu 3  */}
          <div className="flex flex-col items-start gap-2 flex-1">
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
          <div className="flex w-92 h-92 flex-col items-start pl-4">
            <div className="flex p-15 items-start gap-15 rounded bg-Blue-50">
              <div className="flex w-15 h-80 p-0 flex-col items-start gap-0 rounded-none" >
                <div className="flex flex-col items-start flex-1 self-stretch" style={{
                  '--placeholder-image': 'url("/images/icons/placeholder-image.png")',
                  background: 'var(--placeholder-image, lightgray), #FAFAFA'
                } as React.CSSProperties}>
                  <Image src="/images/icons/placeholder-image.png" alt="Picture of the author" width={40} height={40} />
                </div>
              </div>
            </div>
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
        <div className="flex max-w-[574px] h-auto w-Content-breakpoint-Desktop px-4 my-5 items-start">
          <div className="flex-1">
            <button className="ml-4 w-[271px] flex justify-center items-start flex-1 border-b border-slate-900 border-solid">
              <p className="px-4 pt-2 flex items-start gap-2 rounded-[999px] ">Bài Đăng</p>
            </button>
          </div>
          <div className="flex-2">
            <button className="ml-4 w-[271px] flex justify-center items-start flex-1 border-b border-slate-900 border-solid">
              <p className="px-4 pt-2 flex items-start gap-2 rounded-[999px] ">Đã lưu</p>
            </button>
          </div>

        </div>

      </div>
    </div >


  );
}