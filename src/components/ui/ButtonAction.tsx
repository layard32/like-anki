import React from "react";
import { IconType } from "react-icons";
import { Button } from "@/components/ui/button";

interface Props {
  text?: string;
  Icon?: IconType;
  onClickAction: () => void;
}

const ButtonAction: React.FC<Props> = ({
  text,
  Icon,
  onClickAction,
}: Props) => {
  return (
    <div>
      <Button onClick={onClickAction}>
        {text ? text : null}
        {Icon ? <Icon /> : null}
      </Button>
    </div>
  );
};

export default ButtonAction;
