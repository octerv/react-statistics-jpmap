import { PREFECTURE_DICT } from "./constants";

/**
 * 配列を一次元配列に変換する
 * @param arr 多次元配列
 * @returns 一次元配列
 */
const flattenArray = (arr: any): [] => {
  return arr.reduce((flatArr: any, subArr: any) => {
    return flatArr.concat(
      Array.isArray(subArr) ? flattenArray(subArr) : subArr
    );
  }, []);
};

/**
 * 一次元配列になった座標のlongitude latitudeを全て加算する
 * @param arr 数値配列
 * @returns [longitudeの総和, latitudeの総和]
 */
const getEvenOddSum = (arr: number[]): [number, number] => {
  let evenSum = 0;
  let oddSum = 0;

  for (let i = 0; i < arr.length; i++) {
    if (i % 2 === 0) {
      evenSum += arr[i];
    } else {
      oddSum += arr[i];
    }
  }

  return [evenSum, oddSum];
};

/**
 * 座標データから中心座標を計算する
 * @param coordinates 座標データ
 * @returns 中心座標
 */
const getCenter = (coordinates: any): [number, number] => {
  const points = flattenArray(coordinates);
  const sums = getEvenOddSum(points);

  // 合計を頂点の数で割ることで重心座標を計算します
  const centerX = sums[0] / (points.length / 2);
  const centerY = sums[1] / (points.length / 2);

  return [centerX, centerY];
};

/**
 * 都道府県の英語名から都道府県番号を取得する
 * @param en 都道府県の英語名
 * @returns 都道府県番号
 */
const getPrefNum = (en: string): number => {
  const prefNum =
    Object.keys(PREFECTURE_DICT).find(
      (key: unknown) =>
        PREFECTURE_DICT[key as keyof typeof PREFECTURE_DICT].en === en
    ) || "0";
  return parseInt(prefNum);
};

/**
 * 重みから16進数色を取得する
 * @param weight 重み
 * @returns 16進数色
 */
function getHexColor(weight: number): string {
  const logValue = Math.log(weight);
  const normalizedValue = 255 - Math.floor(logValue * 10);

  // 青を基調とする色コードを生成
  const blueColor = Math.floor(normalizedValue * 255);
  const hexColor = `#0000${blueColor.toString(16).padStart(2, "0")}`;

  // 色コードを返す
  return hexColor;
}

export { flattenArray, getEvenOddSum, getCenter, getPrefNum, getHexColor };
