import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Annotation,
} from "react-simple-maps";
import { GEO_URL, PREFECTURE_DICT } from "./constants";
import { ConcentrationMapProps } from "./interfaces";
import { getCenter, getHexColor, getPrefNum } from "./common";

const ConcentrationMap = (props: ConcentrationMapProps) => {
  const scale = props.scale || 1200;
  const [tooltipContent, setTooltipContent] = React.useState("");
  const [hoveredGeo, setHoveredGeo] = React.useState<any>(null);
  const [center, setCenter] = React.useState<[number, number]>([0, 0]);

  const getRegionColor = (geo: any) => {
    const en = geo.properties.NAME_1;
    const prefNum = getPrefNum(en);
    console.debug(`${prefNum}:${en}`);
    if (prefNum === 0) return "#ddd";

    const value = props.prefStats[prefNum];
    console.debug(`${prefNum}:${en}:${value}`);
    if (!value) return "#ddd";

    const hex = getHexColor(value);
    return hex;
  };

  const handleMouseEnter = (geo: any) => {
    setHoveredGeo(geo);
    const newCenter = getCenter(geo.geometry.coordinates);
    setCenter(newCenter);
    const en = geo.properties.NAME_1;
    const prefNum = getPrefNum(en);
    const jp = PREFECTURE_DICT[prefNum as keyof typeof PREFECTURE_DICT].jp;
    const value = props.prefStats[prefNum] || 0;
    const newTooltipContent = `${jp}: ${value}`;
    setTooltipContent(newTooltipContent);
  };

  const handleMouseLeave = () => {
    setHoveredGeo(null);
  };

  const handleClick = (geo: any) => {
    if (!props.onClick) return;
    const en = geo.properties.NAME_1;
    const prefNum = getPrefNum(en);
    props.onClick(prefNum);
  };

  return (
    <>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [139.6917, 35.6895], scale: scale }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={getRegionColor(geo)}
                onMouseEnter={() => handleMouseEnter(geo)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(geo)}
              />
            ))
          }
        </Geographies>
        {hoveredGeo && (
          <Annotation
            subject={center}
            dx={-20}
            dy={-20}
            connectorProps={{
              stroke: "#999",
              strokeWidth: 1,
              strokeLinecap: "round",
            }}
            fill="rgba(255, 255, 255, 0.5)"
          >
            <text
              x={4}
              textAnchor="middle"
              alignmentBaseline="baseline"
              fill="#777"
            >
              {tooltipContent}
            </text>
          </Annotation>
        )}
      </ComposableMap>
    </>
  );
};

export default ConcentrationMap;
