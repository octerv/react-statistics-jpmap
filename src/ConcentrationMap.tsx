import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { GEO_URL, PREFECTURE_DICT } from "./constants";
import { ConcentrationMapProps } from "./interfaces";

const getPrefNum = (en: string): number => {
  const prefNum =
    Object.keys(PREFECTURE_DICT).find(
      (key: unknown) =>
        PREFECTURE_DICT[key as keyof typeof PREFECTURE_DICT].en === en
    ) || "0";
  return parseInt(prefNum);
};

function getHexColor(value: number): string {
  const logValue = Math.log(value);
  const normalizedValue = 255 - Math.floor(logValue * 10);

  // 青を基調とする色コードを生成
  const blueColor = Math.floor(normalizedValue * 255);
  const hexColor = `#0000${blueColor.toString(16).padStart(2, "0")}`;

  // 色コードを返す
  return hexColor;
}

const ConcentrationMap = (props: ConcentrationMapProps) => {
  const getRegionColor = (geo: any) => {
    const en = geo.properties.NAME_1;
    const prefNum = getPrefNum(en);
    console.debug(`${prefNum}:${en}`);
    if (prefNum === 0) return "#ddd";

    const value = props.prefStats[prefNum];
    console.log(`${prefNum}:${en}:${value}`);
    if (!value) return "#ddd";

    const hex = getHexColor(value);
    return hex;
  };

  return (
    <>
      ConcentrationMap
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [139.6917, 35.6895], scale: 1200 }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={getRegionColor(geo)}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </>
  );
};

export default ConcentrationMap;
