import createSupabaseClient from "@/libs/supabase/client";
const supabase = createSupabaseClient();
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;
export async function handlerGoogle() {
  console.log(window.location.hostname);
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `https://techvibe.app/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
}

export async function handlerGithub() {
  await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `https://techvibe.app/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
}

export async function handlerFacebook() {
  console.log(window.location.hostname);
  await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo: `https://techvibe.app/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
}

export async function SignOut() {
  await supabase.auth.signOut();
}
