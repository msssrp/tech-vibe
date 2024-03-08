import { uploadImage } from "./article";

export const handlerImageUpload: any = (
  blobInfo: any,
  success: any,
  writeId: string
) => {
  return new Promise(async (resolve, reject) => {
    const file = blobInfo.blob();
    const uploadData = await uploadImage(writeId, file);
    if (uploadData.imagePath) {
      const imageUrl = uploadData.imagePath;
      success(imageUrl);
      resolve(
        `https://cqphjwakpkovcvrouaoz.supabase.co/storage/v1/object/public/Images/${imageUrl}`
      );
      return imageUrl;
    }
  });
};
