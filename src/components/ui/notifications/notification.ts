import { notifications } from "@mantine/notifications";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function articleNotification(
  title: string,
  articleStatus: string,
  option?: { articleName?: string; router?: AppRouterInstance }
) {
  if (articleStatus === "draft") {
    return notifications.show({
      title: title,
      message: `Your article ${
        option?.articleName ? option.articleName : ""
      } has been saved as draft ✍🏻`,
      withBorder: true,
    });
  } else if (articleStatus === "saved") {
    return notifications.show({
      title: title,
      message: "Your article has been saved 💾. Ready to write",
      withBorder: true,
    });
  } else if (articleStatus === "publish") {
    return notifications.show({
      title: title,
      autoClose: 10000,
      withBorder: true,
      message:
        "Your article has been publish wait for the moderator to confirm. You will be redirect to home page in 10 second",
      onClose: () => {
        option?.router?.push("/");
        option?.router?.refresh();
      },
    });
  }
}

export function rejectPublish(title: string) {
  return notifications.show({
    title: title,
    withBorder: true,
    color: "red",
    message:
      "Title , Description , Image cover , Content , Tags are required please make sure you dont forget any of these",
  });
}

export function tipsNotification(title: string) {
  return notifications.show({
    title: title,
    autoClose: true,
    withBorder: true,
    color: "yellow",
    message:
      "The article cover will automatically choose when you're upload the first image (The image url will not be choose as article cover)",
  });
}

export function howtouseNotification(title: string) {
  return notifications.show({
    title: title,
    autoClose: true,
    withBorder: true,
    color: "yellow",
    message:
      "Every 5 second When you stop typing the article will automatically saved whether on draft or saved status",
  });
}
