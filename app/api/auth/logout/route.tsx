import { authOptions } from "../[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getIdToken } from "@/utils/sessionTokenAccessor";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session) {
    const idToken = await getIdToken();

    //untuk log out user dari sisi Keycloak
    var url = `${
      process.env.END_SESSION_URL
    }?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(
      process.env.NEXTAUTH_URL || ""
    )}`;

    try {
      const resp = await fetch(url, { method: "GET" });
      if (!resp.ok) {
        throw new Error("Failed to log out from Keycloak");
      }
    } catch (err) {
      console.error(err);
      return new Response("Error during logout process", { status: 500 });
    }
  }
  return new Response("Logout successful", { status: 200 });
}
