import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "";

const ConcentrationMap = () => {
  const getRegionColor = (geo: any) => {
    console.log(geo.properties.NAME_1);
    // 京都の地域コード（pref_code）は26です
    if (geo.properties.NAME_1 === "Kyoto") {
      return "red"; // 京都の地域を赤色で表示
    }
    return "gray"; // その他の地域を灰色で表示
  };

  return (
    <>
      ConcentrationMap
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [139.6917, 35.6895], scale: 1200 }}
      >
        <Geographies geography={geoUrl}>
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
