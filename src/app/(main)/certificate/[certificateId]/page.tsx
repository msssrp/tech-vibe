import { redirect } from "next/navigation";
import React from "react";
import CertificateSec from "./component/CertificateSec";

const page = ({ params }: { params: { certificateId: string } }) => {
  if (!params.certificateId) return redirect("/");

  return <CertificateSec certificateId={params.certificateId} />;
};

export default page;
