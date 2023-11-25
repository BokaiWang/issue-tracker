"use client";
import { Select } from "@radix-ui/themes";
import React from "react";
import { useUsers } from "./hooks";
import { useRouter, useSearchParams } from "next/navigation";
import Skeleton from "../components/Skeleton";

const IssueAssigneeFilter = () => {
  const { data: users, error, isLoading } = useUsers();
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSelect = (userId: string) => {
    const params = new URLSearchParams();
    if (userId) {
      params.append("assignee", userId);
    }
    if (searchParams.get("orderBy")) {
      params.append("orderBy", searchParams.get("orderBy")!);
    }
    const query = params.size ? `?${params.toString()}` : "";
    router.push(`/issues${query}`);
  };

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    return null;
  }

  return (
    <Select.Root
      defaultValue={searchParams.get("assignee") || ""}
      onValueChange={onSelect}
    >
      <Select.Trigger placeholder="Filter by assignee" />
      <Select.Content>
        <Select.Group>
          <Select.Item value="">All Assignees</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueAssigneeFilter;
