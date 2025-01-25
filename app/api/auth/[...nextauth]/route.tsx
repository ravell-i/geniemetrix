import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt"; // Tipe untuk token JWT
import { Account } from "next-auth"; // Tipe untuk account
import { jwtDecode } from "jwt-decode";
import { encrypt } from "@/utils/encryption";
import KeycloakProvider from "next-auth/providers/keycloak";

declare module "next-auth/jwt" {
  interface JWT {
    expires_at: number | undefined; // Tambahkan properti expires_at dengan tipe number
    accessToken: string | undefined; // Pastikan tipe tambahan lainnya juga ada jika diperlukan
    id_token: string | undefined;
    refresh_token: string | undefined;
    roles: string | undefined;
    decoded?: {
      realm_access?: {
        roles?: string[];
      };
    };
  }
}

export const authOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.DEMO_FRONTEND_CLIENT_ID!,
      clientSecret: process.env.DEMO_FRONTEND_CLIENT_SECRET!,
      issuer: process.env.AUTH_ISSUER!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Tambahkan secret untuk keamanan

  callbacks: {
    async jwt({ token, account }: { token: JWT; account?: Account | null }) {
      const nowTimeStamp = Math.floor(Date.now() / 1000);

      if (account) {
        // Akun hanya tersedia untuk pertama kali callback ini dipanggil dalam sesi yang baru
        token.decoded = jwtDecode<{ [key: string]: any }>(
          account.access_token!
        );
        token.accessToken = account.access_token;
        token.id_token = account.id_token;
        token.expires_at = account.expires_at;
        token.refresh_token = account.refresh_token;
        return token;
      } else if (nowTimeStamp < token.expires_at!) {
        // Jika token belum kedaluwarsa, return token
        return token;
      } else {
        // Jika token kedaluwarsa, log(akan-refresh-teks) dan return token
        console.log("Token has expired. Will refresh...");
        return token;
      }
    },
    async session({
      session,
      token,
    }: {
      session: any; // Jika ada tipe kustom untuk session Anda, gunakan tipe itu
      token: JWT;
    }) {
      //send properties to the client

      session.access_token =
        typeof token.access_token === "string"
          ? encrypt(token.access_token)
          : null;
      session.id_token =
        typeof token.id_token === "string" ? encrypt(token.id_token) : null;
      session.roles = token.decoded?.realm_access?.roles;
      console.log(session.access_token);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
