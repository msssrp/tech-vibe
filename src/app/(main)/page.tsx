import getUserSession from "@/libs/actions/getSession";
import UserPage from "./component/UserPage";
import HomePage from "./component/HomePage";
export default async function Home() {
  const { data } = await getUserSession();
  if (data.user) {
    console.log(data.user);

    return <UserPage />;
  }

  return <HomePage />;
}
