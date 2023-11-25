"use client";

import { Select } from "@radix-ui/themes";
import React, { FC } from "react";
import toast, { Toaster } from "react-hot-toast";
import { statuses } from "../IssueStatusFilter";
import { Issue, Status } from "@prisma/client";
import axios from "axios";

interface Props {
  issue: Issue;
}

const StatusSelect: FC<Props> = ({ issue }) => {
  const onSelect = async (status: Status) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        status,
      });
    } catch (error) {
      toast.error("Changes could not be saved.");
    }
  };

  return (
    <>
      <Select.Root defaultValue={issue.status} onValueChange={onSelect}>
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            {statuses?.map(({ label, value }) => (
              <Select.Item key={value} value={value}>
                {label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default StatusSelect;
