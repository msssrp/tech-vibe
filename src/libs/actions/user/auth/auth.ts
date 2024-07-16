import createSupabaseClient from "@/libs/supabase/client";
const supabase = createSupabaseClient();
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;
export async function handlerGoogle() {
  console.log(window.location.hostname);
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${
        window.location.hostname === "localhost"
          ? "http://localhost:3000"
          : BASE_URL
      }/auth/callback`,
    },
  });
}

export async function handlerGithub() {
  await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${
        window.location.hostname === "localhost"
          ? "http://localhost:3000"
          : BASE_URL
      }/auth/callback`,
    },
  });
}

export async function handlerFacebook() {
  console.log(window.location.hostname);
  await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo: `${
        window.location.hostname === "localhost"
          ? "http://localhost:3000"
          : BASE_URL
      }/auth/callback`,
    },
  });
}

export async function SignOut() {
  await supabase.auth.signOut();
}
