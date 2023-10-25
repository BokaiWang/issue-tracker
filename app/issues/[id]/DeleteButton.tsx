import { Button } from "@radix-ui/themes";
import React, { FC } from "react";

interface Props {
  issueId: number;
}

const DeleteButton: FC<Props> = ({ issueId }) => {
  return <Button color="red">Delete Issue</Button>;
};

export default DeleteButton;
