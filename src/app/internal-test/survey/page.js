import { getServerSession } from "next-auth";
import MainComponent from "./MainComponent";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const page = async () => {
  const session = await getServerSession(authOptions);
  return <MainComponent session={session} />;
};

export default page;
