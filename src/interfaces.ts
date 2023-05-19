type PrefStats = { [key: number]: number };

interface ConcentrationMapProps {
  prefStats: PrefStats;
  scale?: number;
  onClick?: (prefNum: number) => void;
}

export { PrefStats, ConcentrationMapProps };
