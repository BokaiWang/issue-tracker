import { FC } from "react";
import Pagination from "./components/Pagination";
interface Props {
  searchParams: { page: string };
}
export default function Home({ searchParams }: Props) {
  return (
    <Pagination
      itemCount={22}
      pageSize={10}
      currentPage={parseInt(searchParams.page)}
    />
  );
}
