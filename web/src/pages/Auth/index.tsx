import { Outlet } from "react-router";
import { useAppContext } from "../../contexts/APIContext";
import ContinueAs from "./ContinueAs";

export default function Auth() {
  const { auth } = useAppContext();

  const { data } = auth.useSession();

  if (data) return <ContinueAs />;

  return <Outlet />;
}
