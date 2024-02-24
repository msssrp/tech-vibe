import createSupabaseClient from "../supabase/client";

const supabase = createSupabaseClient();
export async function handlerGoogle() {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `http://localhost:3000/auth/callback`,
    },
  });
}

export async function handlerGithub() {
  await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `http://localhost:3000/auth/callback`,
    },
  });
}

export async function SignOut() {
  await supabase.auth.signOut();
}
