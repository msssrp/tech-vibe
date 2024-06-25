import Image from "next/image";
import Link from "next/link";
import React from "react";

type verifyNavbarProps = {
  webLogoUrl: string;
};

const VerifyNavbar: React.FC<verifyNavbarProps> = ({ webLogoUrl }) => {
  return (
    <div className="flex justify-center items-center">
      <Link href={"/"}>
        <Image src={webLogoUrl} alt="TechVibe" width={130} height={130} />
      </Link>
    </div>
  );
};

export default VerifyNavbar;
