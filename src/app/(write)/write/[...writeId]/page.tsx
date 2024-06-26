import { Metadata } from "next";
import { redirect } from "next/navigation";
import { validate as uuidValidate } from "uuid";
import { getUser } from "@/libs/actions/user/user";
import Write from "./component/Write";
import { getWebLogoUrl } from "@/libs/actions/setting/webSetting";

const imagesPath = process.env.NEXT_PUBLIC_IMAGES_PATH as string;

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
  const logoUrl = await getWebLogoUrl();
  const webLogoUrl = imagesPath + logoUrl;
  return (
    <div>
      <Write user={data} writeId={writeId} webLogoUrl={webLogoUrl} />
    </div>
  );
}
