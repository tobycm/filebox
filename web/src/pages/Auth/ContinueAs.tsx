import { Button, Flex, Image } from "@mantine/core";
import { useNavigate } from "react-router";
import { useAppContext } from "../../contexts/APIContext";

import { useQuery } from "@tanstack/react-query";
import "../../css/center.css";

export default function ContinueAs() {
  const navigate = useNavigate();

  const { auth } = useAppContext();

  const session = useQuery({
    queryKey: ["session"],
    queryFn: () => auth.getSession(),
  });

  const { data } = session.data!;

  return (
    <Flex className="center" direction="column" gap="lg">
      <Image src={data!.user.image} fallbackSrc="/mouse.svg" alt="User profile picture" radius="xl" h="25vh" w="auto" />

      <Button size="lg" mt="md" onClick={() => navigate("/")}>
        Continue as {data?.user?.name || data?.user?.displayUsername || data?.user?.username || data?.user?.email}
      </Button>

      <Button
        size="lg"
        mt="xl"
        variant="outline"
        color="red"
        onClick={() => {
          auth.signOut();
          navigate("/auth/signin");
        }}>
        Sign out
      </Button>
    </Flex>
  );
}
