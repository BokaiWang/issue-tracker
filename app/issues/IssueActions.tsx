import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";
import PageSizeSelection from "./PageSizeSelection";

const IssueActions = () => {
  return (
    <Flex justify="between">
      <Flex gap="3">
        <IssueStatusFilter />
        <PageSizeSelection />
      </Flex>
      <Button>
        <Link href={"/issues/new"}>New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
