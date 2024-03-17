import { Metadata } from "next";
import { redirect } from "next/navigation";
import { validate as uuidValidate } from "uuid";
import { getUser } from "@/libs/actions/user/user";
import Write from "./component/Write";
import { Notifications } from "@mantine/notifications";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Write",
    description: "Write an article",
  };
}
export default async function writepage({
  params,
}: {
  params: { writeId: string[] };
}) {
  const writeId = params.writeId[0];
  const userId = params.writeId[1];

  const data = await getUser(userId);
  if (
    !data ||
    uuidValidate(writeId) === false ||
    uuidValidate(userId) === false
  ) {
    redirect("/");
  }

  return (
    <div>
      <Notifications />
      <Write user={data} writeId={writeId} />
    </div>
  );
}
