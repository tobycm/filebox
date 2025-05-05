import { Flex, Loader } from "@mantine/core";
import { Outlet } from "react-router";
import { useAppContext } from "../../contexts/APIContext";

import { useQuery } from "@tanstack/react-query";
import "../../css/center.css";
import ContinueAs from "./ContinueAs";

export default function Auth() {
  const { auth } = useAppContext();

  const session = useQuery({
    queryKey: ["session"],
    queryFn: () => auth.getSession(),
  });

  if (!session.isFetched)
    return (
      <Flex className="center">
        <Loader />
      </Flex>
    );

  if (session.data!.data?.session.id) return <ContinueAs />;

  return <Outlet />;
}
