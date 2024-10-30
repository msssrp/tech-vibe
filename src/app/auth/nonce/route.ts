import createSupabaseServerClient from "@/libs/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { walletAddr } = await req.json();
  if (!walletAddr)
    return NextResponse.json(
      { error: "no wallet found in body" },
      { status: 400 }
    );
  const nonce = uuidv4();
  const { data, error } = await supabase
    .from("web3_user")
    .select("nonce")
    .eq("walletAddr", walletAddr)
    .single();

  //@ts-ignore
  if (data && data.nonce) {
    const { error } = await supabase
      .from("web3_user")
      .update({ nonce })
      .eq("walletAddr", walletAddr);
    if (error) {
      return NextResponse.json({ error }, { status: 300 });
    }
    return NextResponse.json({ nonce: nonce }, { status: 200 });
  } else {
    const { data, error } = await supabase.from("web3_user").insert({
      nonce,
      walletAddr,
    });
    if (error) {
      return NextResponse.json({ error }, { status: 300 });
    }
    return NextResponse.json({ nonce: nonce }, { status: 200 });
  }
}
