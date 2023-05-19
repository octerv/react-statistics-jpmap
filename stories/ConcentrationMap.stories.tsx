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
  return <ConcentrationMap prefStats={prefStats} />;
};
