"use client";

// import Link from "next/link";
import Logo from "./logo";
import { useSession, signIn, signOut } from "next-auth/react";

async function keycloakSessionLogOut() {
  try {
    await fetch("/api/auth/logout"), { method: "GET" };
  } catch (err) {
    console.error(err);
  }
} 

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="z-30 mt-2 w-full md:mt-5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-gray-900/90 px-3 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] after:absolute after:inset-0 after:-z-10 after:backdrop-blur-sm">
          {/* Site branding */}
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          {/* Desktop sign in links */}
          <ul className="flex flex-1 items-center justify-end gap-3">
            <li>
              {status === "loading" ? (
                <div className="my-3">Loading</div>
              ) : session ? (
                <div>
                  Loggedd in as <span>{session?.user?.email}</span>
                </div>
              ) : null}
              <button
                className="btn-sm relative bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] py-[5px] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]"
                onClick={() => {
                  signIn("keycloak");
                }}
              >
                Log In
              </button>
              <button
                className="btn-sm relative bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] py-[5px] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]"
                onClick={() => {
                  keycloakSessionLogOut().then(() =>
                    signOut({ callbackUrl: "/" })
                  );
                }}
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
