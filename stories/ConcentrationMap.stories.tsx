import React from "react";
import ConcentrationMap from "../src/ConcentrationMap";

export default {
  title: "ConcentrationMap",
  component: ConcentrationMap,
};

const prefStats = {
  10: 50,
  26: 50000,
  35: 10000,
};

export const Default = () => {
  const onClick = (prefNum: number) => {
    console.log(`prefNum: ${prefNum}`);
  };
  return <ConcentrationMap prefStats={prefStats} onClick={onClick} />;
};
