import Svg, { Path } from "react-native-svg";
import type { IIconsProps } from "./types";

export default function ArrowBackIcon(props: IIconsProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={props.size || "25"}
      height={props.size || "25"}
      {...props}
    >
      <Path
        d="m0 0h24v24h-24z"
        fill="#fff"
        opacity="0"
        transform="matrix(0 1 -1 0 24 0)"
      />
      <Path
        d="m19 11h-11.86l3.63-4.36a1 1 0 1 0 -1.54-1.28l-5 6a1.19 1.19 0 0 0 -.09.15c0 .05 0 .08-.07.13a1 1 0 0 0 -.07.36 1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6a1 1 0 0 0 .77.36 1 1 0 0 0 .64-.23 1 1 0 0 0 .13-1.41l-3.63-4.36h11.86a1 1 0 0 0 0-2z"
        fill={props.color || "#231f20"}
      />
    </Svg>
  );
}
