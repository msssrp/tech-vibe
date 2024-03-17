import slugify from "slugify";

export function ConvertUrlToSlug(title: string) {
  const slug = slugify(title, {
    remove: /[*+~'"/:@]/g, // Remove special characters except ()
    locale: "th", // Use Thai locale for better support
  });
  return slug;
}
