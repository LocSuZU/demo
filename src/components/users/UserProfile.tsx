import React from "react";
import Image from "next/image";
import { CompleteUser } from "@/lib/db/schema/users";

export default function UserProfile({ user }: { user: CompleteUser }) {
  return (
    <div className="items-center self-stretch flex flex-col justify-center px-16 py-2.5 max-md:px-5">
      <div className="flex w-[574px] max-w-full flex-col items-stretch">
        <form className="max-w-[574px] items-stretch flex flex-col px-4 max-md:max-w-full">
          <header className="header items-stretch flex justify-between gap-4 max-md:max-w-full max-md:flex-wrap">
            <div className="items-stretch flex grow basis-[0%] flex-col max-md:max-w-full">
              <h1 className="text-slate-900 text-3xl leading-9 max-md:max-w-full">
                Cẩm Khúc
              </h1>
              <p className="text-gray-500 text-base leading-6 max-md:max-w-full">
                @camkhuc.99
              </p>
              <div className="items-stretch flex justify-between gap-4 mt-2 pr-20 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
                <div className="items-stretch flex justify-between gap-1">
                  <p className="text-black text-base font-semibold leading-6 whitespace-nowrap" aria-label="16">
                    16
                  </p>
                  <p className="text-black text-xs leading-5 self-center grow whitespace-nowrap my-auto">
                    Người theo dõi
                  </p>
                </div>
                <div className="items-stretch flex justify-between gap-1">
                  <p className="text-black text-base font-semibold leading-6 whitespace-nowrap" aria-label="16">
                    16
                  </p>
                  <p className="text-black text-xs leading-5 self-center grow whitespace-nowrap my-auto">
                    Đang theo dõi
                  </p>
                </div>
              </div>
            </div>
          </header>
          <div className="text-slate-900 text-4xl leading-[48.1px] whitespace-nowrap justify-center items-center bg-neutral-200 h-[92px] px-6 rounded-3xl max-md:px-5">
            AB
          </div>
          <p className="text-slate-900 text-base leading-6 mt-2.5 max-md:max-w-full">
            All good things are wild and free..
          </p>
          <div className="form-group border border-bg-slate-300   flex flex-col justify-center mt-2.5 pt-2 pr-4 rounded-[999px] border-solid max-md:max-w-full max-md:px-5">
            <div className="items-stretch flex gap-2 rounded-[999px]">
              <Image
                loading="lazy"
                src="/images/icons/button_edit.svg"
                className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                width={24}
                height={24}
                alt='Chỉnh sửa thông tin'
              />
              <div className="text-slate-900 text-base font-semibold leading-6 grow whitespace-nowrap">
                Chỉnh sửa thông tin
              </div>
            </div>
          </div>
        </form>
      </div >
    </div >
  );
}