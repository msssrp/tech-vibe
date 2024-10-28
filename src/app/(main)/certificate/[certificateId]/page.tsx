import { redirect } from "next/navigation";
import React from "react";
import CertificateSec from "./component/CertificateSec";
import SwitchNet from "@/components/web3/SwitchNet";

const page = ({ params }: { params: { certificateId: string } }) => {
  if (!params.certificateId) return redirect("/");

  return (
    <>
      {" "}
      <div className="flex flex-col space-y-4 mt-5">
        <SwitchNet />
        <CertificateSec certificateId={params.certificateId} />
      </div>
    </>
  );
};

export default page;
