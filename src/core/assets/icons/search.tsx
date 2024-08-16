import Svg, { Path } from "react-native-svg";
import { IIconsProps } from "./types";

export default function SearchIcon(props: IIconsProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={props.size || 24}
      height={props.size || 24}
      {...props}
    >
      <Path d="m0 0h24v24h-24z" fill="#fff" opacity="0" />
      <Path
        d="m20.71 19.29-3.4-3.39a7.92 7.92 0 0 0 1.69-4.9 8 8 0 1 0 -8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zm-15.71-8.29a6 6 0 1 1 6 6 6 6 0 0 1 -6-6z"
        fill={props.color || "#231f20"}
      />
    </Svg>
  );
}
