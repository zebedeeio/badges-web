"use client";

import Link from "next/link";
import { Button } from "../components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { ZBDLogo } from "./icons/zbd";

export default function Header() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm dark:bg-gray-950 dark:text-gray-50">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link className="flex items-center gap-2" href="/">
          <ZBDLogo />
          <span className="sr-only">ZBD</span>
          <span className="ml-3 pt-1 text-lg font-bold uppercase tracking-tight">
            Badges
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            className="text-sm font-medium hover:underline hover:underline-offset-4"
            href="/"
          >
            Home
          </Link>
          <Link
            className="text-sm font-medium hover:underline hover:underline-offset-4"
            href="#"
          >
            Docs
          </Link>
          <Link
            className="text-sm font-medium hover:underline hover:underline-offset-4"
            href="#"
          >
            Examples
          </Link>
          {session?.user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage
                    alt={session.user.name}
                    src={session.user.image}
                  />
                  <AvatarFallback>{session.user.name}</AvatarFallback>
                  <span className="sr-only">Toggle user menu</span>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="#">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <a
                    href={`/api/auth/signout`}
                    onClick={(e) => {
                      e.preventDefault();
                      signOut();
                    }}
                  >
                    Sign out
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {!session && (
            <div className="flex items-center gap-2">
              <a
                className="inline-flex h-8 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href={`/api/auth/signin`}
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                Login
              </a>
            </div>
          )}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="md:hidden" size="icon" variant="outline">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-1/3">
            <div className="grid gap-6 p-6">
              <Link className="flex items-center gap-2" href="/">
                <Image src="/zbd.svg" width={130} height={72} alt="ZBD" />
                <span className="sr-only">ZBD</span>
              </Link>
              <nav className="grid gap-4">
                <Link
                  className="flex items-center gap-2 text-sm font-medium hover:underline hover:underline-offset-4"
                  href="/"
                >
                  Home
                </Link>
                <Link
                  className="flex items-center gap-2 text-sm font-medium hover:underline hover:underline-offset-4"
                  href="#"
                >
                  Docs
                </Link>
                <Link
                  className="flex items-center gap-2 text-sm font-medium hover:underline hover:underline-offset-4"
                  href="#"
                >
                  Examples
                </Link>
                {!session && (
                  <div className="flex items-center gap-2">
                    <a
                      className="inline-flex h-8 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                      href={`/api/auth/signin`}
                      onClick={(e) => {
                        e.preventDefault();
                        signIn();
                      }}
                    >
                      Login
                    </a>
                  </div>
                )}
              </nav>
              {session?.user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-8 w-8 rounded-full">
                      <AvatarImage
                        alt={session.user.name}
                        src={session.user.image}
                      />
                      <AvatarFallback>{session.user.name}</AvatarFallback>
                      <span className="sr-only">Toggle user menu</span>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href="#">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <a
                        href={`/api/auth/signout`}
                        onClick={(e) => {
                          e.preventDefault();
                          signOut();
                        }}
                      >
                        Sign out
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
