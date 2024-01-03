'use client';
import React from "react";
import Image from "next/image";
import { CompleteUser } from "@/lib/db/schema/users";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button";
import CustomerAvatar from "../ui/CustomerAvatar";

export default function UserProfile({ user }: { user: CompleteUser }) {
  return (
    <div className="flex py-2.5 flex-col items-center gap-5 self-stretch "> {/* col 1  */}
      <div className="flex max-w-Content-breakpoint-Desktop px-4 flex-col items-start gap-2.5 self-stretch">
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
      </div>
    </div >


  );
}