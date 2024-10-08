import Svg, { Path } from "react-native-svg";
import { IIconsProps } from "./types";

export default function CheckMarkIcon(props: IIconsProps) {
  return (
    <Svg
      viewBox="0 0 512 512"
      {...props}
      width={props.size}
      height={props.size}
    >
      <Path
        fill={props.color}
        d="m173.898 439.404-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0l112.095 112.094 240.095-240.094c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
      />
    </Svg>
  );
}
