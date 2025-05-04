import { Box, Button, Image, Title } from "@mantine/core";
import { useNavigate } from "react-router";
import { useAppContext } from "../../contexts/APIContext";

export default function ContinueAs() {
  const navigate = useNavigate();

  const { auth } = useAppContext();

  const { data } = auth.useSession();

  return (
    <Box>
      <Image src={data!.user.image} alt="User profile picture" radius="xl" height="30vh" />

      <Title order={1}>You are logged in as {data?.user?.name || data?.user?.displayUsername || data?.user?.username || data?.user?.email}</Title>

      <Button size="lg" mt="xl" onClick={() => navigate("/")}>
        Continue
      </Button>
    </Box>
  );
}
