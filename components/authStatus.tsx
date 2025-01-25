"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthStatus() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

// import React from 'react'
// import { useSession, signIn, signOut } from 'next-auth/react';

// function SignIn() {
//     return (
//         <form action={async () => {
//         "use server";
//         await signIn("keycloak");
//     }}>
//         <p>You're not logged in</p>
//         <button type='submit'>Sign in with Keycloak</button>
//     </form>
//     )
// }

// function SignOut({ children }: { children: React.ReactNode }) {
//     return (
//         <form action={async () => {
//         "use server";
//         await signIn("github");
//     }}>
//         <p>You're not logged in</p>
//         <button type='submit'>Sign in with Keycloak</button>
//     </form>
//     )
// }

// export default async function login-demo() {
//     let session = await auth();
//     let user = session?.user?.email;

//   return (
//     <section>
//         <div>login-demo</div>
//         <div>{user ? <SignOut>{'Welcome ${user}'}</SignOut> : <SignIn/>}</div>
//     </section>
//   )
// }
