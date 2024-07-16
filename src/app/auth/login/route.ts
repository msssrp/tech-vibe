import { NextRequest, NextResponse } from "next/server";
import createSupabaseServerClient from "@/libs/supabase/server";
export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { walletAddr, nonce, email } = await req.json();
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
    if (error)
      return NextResponse.json({ error: "Login failed" }, { status: 500 });
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
    if (error) {
      return NextResponse.json(
        { error: "Login failed. Email is not correct." },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: "Login Successfully" },
      { status: 200 }
    );
  }
}
