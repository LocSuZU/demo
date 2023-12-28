import { getUserAuth } from "@/lib/auth/utils";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { ModeToggle } from "@/components/ui/ThemeToggle";
import Image from "next/image";
import Header from "./common/Header";

export default async function Navbar() {
  const { session } = await getUserAuth();
  const nameExists =
    !!session?.user.name &&
    session?.user.name.length > 5;


  if (session?.user) {
    return (
      <>
        <Header />
        <nav className="py-2 flex items-center justify-between">
          <div className="space-x-2 flex items-center">
            <ModeToggle />
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarFallback>
                      {nameExists
                        ? session.user.name
                          ?.split(" ")
                          .map((word) => word[0].toUpperCase())
                          .join("")
                        : "~"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <span className="font-semibold">
                      {nameExists ? session.user.name : "New User"}
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/account">
                    <DropdownMenuItem className="cursor-pointer">
                      Account
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/api/auth/signout">
                    <DropdownMenuItem className="cursor-pointer">
                      Sign out
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/sign-in">Sign in</Link>
            )}

          </div>
        </nav>
      </>
    );
  } else return null;
}
