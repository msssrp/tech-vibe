import { Tooltip } from "@mantine/core";
import React from "react";
import { FaCircleCheck } from "react-icons/fa6";

const NpruVerify = () => {
  return (
    <Tooltip label="Npru user">
      <FaCircleCheck color="#952124" size={9} />
    </Tooltip>
  );
};

export default NpruVerify;
