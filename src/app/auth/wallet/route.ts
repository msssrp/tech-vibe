import { ethers } from "ethers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { walletAddr, signature, nonce } = await req.json();
  console.log(signature, nonce);

  const signatureAddr = ethers.verifyMessage(nonce, signature);

  if (signatureAddr !== walletAddr) {
    return NextResponse.json({ error: "Wrong signature" }, { status: 300 });
  }

  return NextResponse.json({ nonce, walletAddr }, { status: 200 });
}
