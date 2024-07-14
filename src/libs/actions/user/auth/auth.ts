import createSupabaseClient from "@/libs/supabase/client";
const supabase = createSupabaseClient();
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

export async function SignOut() {
  await supabase.auth.signOut();
}
