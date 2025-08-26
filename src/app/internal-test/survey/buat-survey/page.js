import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BuatSurvey from "./BuatSurvey";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions);
  return <BuatSurvey session={session} />;
};

export default page;
