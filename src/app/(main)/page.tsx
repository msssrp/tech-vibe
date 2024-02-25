import getUserSession from "@/libs/actions/getSession";
import UserPage from "./component/UserPage";
import HomePage from "./component/HomePage";
import { getUser } from "@/libs/actions/user/user";
import { redirect } from "next/navigation";
export default async function Home() {
  const { data } = await getUserSession();
  if (data.user) {
    const userId = data.user.id;
    const userData = await getUser(userId);
    console.log(userData);
    if (userData.user_verify == false) {
      return redirect(`/verify/${userData.user_id}`);
    }
    return <UserPage />;
  }

  return <HomePage />;
}
