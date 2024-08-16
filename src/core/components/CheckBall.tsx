import { Pressable } from "react-native";
import CheckMarkIcon from "@/src/core/assets/icons/check";
import { useState } from "react";

interface CheckBallProps {
  isActive?: boolean;
  onPress?: () => void;
}

export default function CheckBall(props: CheckBallProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handlePress = () => {
    setIsChecked((pre) => !pre);
    props.onPress?.();
  };

  return (
    props.isActive && (
      <Pressable
        style={{
          width: 20,
          height: 20,
          borderColor: props.isActive ? "#07c700" : "transparent",
          backgroundColor: isChecked ? "#07c700" : "transparent",
          borderWidth: 2,
          marginRight: 10,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          padding: 1,
        }}
        onPress={handlePress}
      >
        {isChecked && <CheckMarkIcon size={10} color="#fff" />}
      </Pressable>
    )
  );
}
