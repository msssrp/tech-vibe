import React from "react";

const ComponentText = () => {
  const onClick = () => {
    console.log("ga");
  };
  return <button onClick={() => onClick()}>click</button>;
};

export default ComponentText;
