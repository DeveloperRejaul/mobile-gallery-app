import { Skeleton } from "moti/skeleton";

export default function Loading() {
  return (
    <Skeleton
      show={true}
      colorMode="light"
      radius="square"
      height="100%"
      width="100%"
    />
  );
}
