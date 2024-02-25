"use client";
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuid } from "uuid";

const TinyEditor = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const handlerImageUpload = (blobInfo, success, failure) => {
    return new Promise(async (resolve, reject) => {
      const file = blobInfo.blob();
      const fileName = blobInfo.filename();
      const { data, error } = await supabase.storage
        .from("image")
        .upload(uuid(), file);
      if (data) {
        const imageUrl = data.path;
        success(imageUrl);
        resolve(
          `https://ulpjugqpjzizahxbjstt.supabase.co/storage/v1/object/public/image/${imageUrl}`
        );
      } else {
        console.log(error);
        reject(error);
      }
    });
  };

  return (
    <>
      <div className="container mx-auto px-14">
        <Editor
          apiKey="r867q9o4rl69mxxxwmj4ok0xypnt6hswpfhcaeq27kxma3wz"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue=""
          init={{
            height: 500,
            toolbar: false,
            menubar: false,
            skin: "snow",
            icons: "thin",
            plugins: "autoresize quickbars image media table hr paste",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            quickbars_selection_toolbar: "bold italic link h1 h2 blockquote",
            quickbars_insert_toolbar: false,
            a11y_advanced_options: true,
            file_picker_types: "image",
            quickbars_image_toolbar: false,
            images_upload_handler: handlerImageUpload,
            placeholder: "Content",
          }}
        />
      </div>
    </>
  );
};

export default TinyEditor;
