import Image from "next/image";
import Link from "next/link";
import React from "react";

const VerifyNavbar = () => {
  return (
    <div className="flex justify-center items-center">
      <Link href={"/"}>
        <Image
          src="https://cqphjwakpkovcvrouaoz.supabase.co/storage/v1/object/public/Images/Logo/Screenshot%20from%202024-02-13%2016-07-12.png"
          alt="TechVibe"
          width={130}
          height={130}
        />
      </Link>
    </div>
  );
};

export default VerifyNavbar;
