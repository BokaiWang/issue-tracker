"use client";

import { Select } from "@radix-ui/themes";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

const pageSizes = [5, 10, 15, 20, 25, 30];

const PageSizeSelection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSelect = (pageSize: string) => {
    const params = new URLSearchParams();
    if (pageSize) {
      params.append("pageSize", pageSize);
    }
    if (searchParams.get("orderBy")) {
      params.append("orderBy", searchParams.get("orderBy")!);
    }
    const query = params.size ? `?${params.toString()}` : "";
    router.push(`/issues${query}`);
  };

  return (
    <Select.Root onValueChange={onSelect}>
      <Select.Trigger placeholder="Select a page size..." />
      <Select.Content>
        {pageSizes.map((size) => (
          <Select.Item key={size} value={size.toString()}>
            {size}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default PageSizeSelection;
