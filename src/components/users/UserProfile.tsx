'use client';
import React from "react";
import Image from "next/image";
import { CompleteUser } from "@/lib/db/schema/users";
import Articles from "../ui/suzus/article";
import Avatar from "../ui/suzus/avatar";
import ButtonSuzu from "../ui/suzus/button";
import { Input } from "../ui/input";
import Divider from "../ui/suzus/divider";

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
          <div className="w-92 h-92 flex flex-col items-start">
            <Avatar icon={false} image={false} text="AB" textBackGround={false} size={{ w: '92', h: '92' }} />
          </div>
        </div>
        <div className="self-stretch text-slate-900 font-openSans text-15 not-italic font-normal leading-22.5">
          All good things are wild and free..
        </div>
        <div className="mt-[10px] mx-4 px-4 py-2 flex h-15 flex-col items-center justify-center  gap-1 self-stretch rounded-999 
        border border-gray-200 border-solid">
          <div className="my-2 mx-4 flex items-start gap-2 rounded-999">
            <div className="flex flex-col justify-center items-center mr-2">
              <div className="w-6 h-6">
                <div className="m-[3px] w-[18px] h-[18px] stroke-2 stroke-slate-900   ">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 21 20" fill="none">
                    <path d="M1.5 19L6.66787 17.0124C6.99841 16.8852 7.16368 16.8217 7.31831 16.7387C7.45566 16.6649 7.58659 16.5798 7.70974 16.4843C7.84839 16.3767 7.9736 16.2515 8.22403 16.001L18.7285 5.49657C19.7572 4.46792 19.7572 2.80014 18.7285 1.77149C17.6999 0.742838 16.0321 0.742836 15.0034 1.77149L4.49895 12.276C4.24853 12.5264 4.12331 12.6516 4.01572 12.7902C3.92016 12.9134 3.83507 13.0443 3.76134 13.1817C3.67834 13.3363 3.61477 13.5016 3.48764 13.8321L1.5 19ZM1.5 19L3.41667 14.0167C3.55382 13.6601 3.6224 13.4818 3.74002 13.4002C3.84281 13.3288 3.97001 13.3018 4.09293 13.3253C4.23359 13.3521 4.36867 13.4872 4.63883 13.7574L6.74265 15.8612C7.01281 16.1314 7.14789 16.2664 7.17475 16.4071C7.19823 16.53 7.17123 16.6572 7.09986 16.76C7.01819 16.8776 6.83989 16.9462 6.48329 17.0834L1.5 19Z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="text-slate-900 font-openSans text-15 font-semibold leading-24">
              Chỉnh sửa thông tin
            </div>
          </div>
        </div>
        <div className="flex w-Content-breakpoint-Desktop max-w-Content-breakpoint-Desktop  px-4 items-start my-5">
          <div className="ml-4 flex justify-center items-start flex-grow flex-shrink-0 basis-0 border-b border-solid border-slate-900   ">
            <div className="px-4 pt-2 flex items-start gap-2 rounded-999">
              <div className="text-slate-900 font-openSans text-15 not-italic font-semibold lead">Bài Đăng</div>
            </div>
          </div>
          <div className="ml-4 flex justify-center items-start flex-grow flex-shrink-0 basis-0 border-b border-solid border-slate-50   ">
            <div className="px-4 pt-2 flex items-start gap-2 rounded-999">
              <div className="text-slate-900 font-openSans text-15 not-italic font-semibold lead">Đã Lưu</div>
            </div>
          </div>
        </div>
        {/* Conent */}
        <div className="flex mt-5 mb-2.5 w-Content-breakpoint-Desktop max-w-Content-breakpoint-Desktop p-0 flex-col justify-center items-start gap-6 rounded-none">
          {/*CTA */}
          <div className="flex mb-2.5 w-Content-breakpoint-Desktop flex-col items-start">
            <div className="flex p-4 flex-col items-start gap-2 self-stretch bg-white rounded-20">
              <div className="m-4 p-0 flex items-center gap-2 self-stretch">
                {/* avatar */}
                <div className="flex w-[40px] h-[40px] flex-col items-start ml-2">
                  <div className="flex flex-col items-start flex-grow flex-shrink-0 basis-0 self-stretch">
                    <div className="flex h-15 p-0 flex-col justify-center items-center gap-[10px] self-stretch rounded-avatar-radius-sm bg-slate-100">
                      <div className="text-slate-900 font-openSans text-15 not-italic font-normal leading-24">AB</div>
                    </div>
                  </div>
                </div>
                <div className="mr-2 flex items-start flex-grow flex-shrink-0 basis-0">
                  <input className="flex items-center justify-center flex-wrap rounded-none " type="text" placeholder="Chia sẻ Suzu của bạn..." />
                </div>
                <div className="ml-1 flex w-6 h-6 px-4 py-2 flex-col justify-center items-center gap-1 rounded-[999px] ">
                  <button className="flex items-start gap-2 rounded-[999px] mx-4 mb-2">
                    <div className="flex flex-col items-center justify-center mr-2">
                      <div className="w-6 h-6">
                        <div className="m-[2.5px]  flex-shrink-0 gap-[2px] stroke-slate-700 stroke-2 ">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 22 22" fill="none">
                            <path d="M11 2.5L6.3 2.5C4.61984 2.5 3.77976 2.5 3.13803 2.82698C2.57354 3.1146 2.1146 3.57354 1.82698 4.13803C1.5 4.77976 1.5 5.61984 1.5 7.3L1.5 15.7C1.5 17.3802 1.5 18.2202 1.82698 18.862C2.1146 19.4265 2.57354 19.8854 3.13803 20.173C3.77976 20.5 4.61984 20.5 6.3 20.5L15.5 20.5C16.43 20.5 16.895 20.5 17.2765 20.3978C18.3117 20.1204 19.1204 19.3117 19.3978 18.2765C19.5 17.895 19.5 17.43 19.5 16.5M17.5 7.5V1.5M14.5 4.5L20.5 4.5M9 8C9 9.10457 8.10457 10 7 10C5.89543 10 5 9.10457 5 8C5 6.89543 5.89543 6 7 6C8.10457 6 9 6.89543 9 8ZM13.49 11.4181L5.03115 19.108C4.55536 19.5406 4.31747 19.7568 4.29643 19.9442C4.27819 20.1066 4.34045 20.2676 4.46319 20.3755C4.60478 20.5 4.92628 20.5 5.56929 20.5L14.956 20.5C16.3951 20.5 17.1147 20.5 17.6799 20.2582C18.3894 19.9547 18.9547 19.3894 19.2582 18.6799C19.5 18.1147 19.5 17.3951 19.5 15.956C19.5 15.4717 19.5 15.2296 19.4471 15.0042C19.3805 14.7208 19.253 14.4554 19.0733 14.2264C18.9303 14.0442 18.7412 13.8929 18.3631 13.5905L15.5658 11.3527C15.1874 11.0499 14.9982 10.8985 14.7898 10.8451C14.6061 10.798 14.4129 10.8041 14.2325 10.8627C14.0279 10.9291 13.8486 11.0921 13.49 11.4181Z" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            {/* divider */}
            <div className="mx-[10px] px-4 flex w-Content-breakpoint-Desktop items-start gap-1 rounded-999">
              <div className="mx-4 h-[1px] flex-grow flex-shrink-0 basis-0 rounded-none bg-gray-100">
              </div>
            </div>
            {/* article */}
            <div className="container my-[10px] py-4 flex flex-col items-start gap-6 self-stretch rounded-20 bg-white">
              <Articles breakpoint="Desktop" pag={false} video={false} image={false} />
            </div>
          </div>

        </div>
      </div>
    </div >

  );
}