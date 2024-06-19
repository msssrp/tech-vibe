import UserPage from "./component/UserPage";
import HomePage from "./component/HomePage";
import { getUser } from "@/libs/actions/user/user";
import { redirect } from "next/navigation";
import getUserSession from "@/libs/actions/user/auth/getSession";
export default async function Home({
  searchParams,
}: {
  searchParams: { article: string | undefined; tag: string | undefined };
}) {
  const { data } = await getUserSession();
  if (data.user) {
    const userId = data.user.id;
    const userData = await getUser(userId);

    if (userData.user_verify == false) {
      return redirect(`/verify/${userData.user_id}`);
    }
    return (
      <UserPage
        user_id={data.user.id}
        articleType={searchParams.article}
        isTag={searchParams.tag}
      />
    );
  }

  return <HomePage />;
}
