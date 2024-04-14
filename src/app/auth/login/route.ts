import { NextRequest, NextResponse } from "next/server";
import createSupabaseServerClient from "@/libs/supabase/server";
const jwtSecret = process.env.NEXT_PUBLIC_SUPABASE_JWT;
export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { walletAddr, nonce, email } = await req.json();
  if (!jwtSecret)
    return NextResponse.json({ error: "No jwt secret found" }, { status: 500 });
  const { data: walletData, error } = await supabase
    .from("web3_user")
    .select("*")
    .eq("walletAddr", walletAddr)
    .eq("nonce", nonce)
    .single();
  if (walletData.user_id === null) {
    const { data: user, error } = await supabase.auth.signUp({
      email: email,
      password: walletAddr,
    });
    console.log(error);

    if (user.user && user.user.id) {
      await supabase
        .from("web3_user")
        .update({ user_id: user.user.id })
        .eq("walletAddr", walletAddr);

      return NextResponse.json({ success: "Login" }, { status: 200 });
    }
    return NextResponse.json({ error }, { status: 300 });
  } else {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: walletAddr,
    });
    console.log(error);

    return NextResponse.json({ success: "Login" }, { status: 200 });
  }
}
