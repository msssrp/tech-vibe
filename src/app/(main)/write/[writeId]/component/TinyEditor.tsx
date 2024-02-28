"use client";
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import createSupabaseClient from "@/libs/supabase/client";
import { v4 as uuid } from "uuid";
import { tinyProps } from "@/types/article/article";
const TinyEditor: React.FC<tinyProps> = ({ writeId }) => {
  const supabase = createSupabaseClient();
  const editorRef = useRef<any>(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const handlerImageUpload: any = (
    blobInfo: any,
    success: any,
    failure: any
  ) => {
    return new Promise(async (resolve, reject) => {
      const file = blobInfo.blob();
      const { data: uploadData, error } = await supabase.storage
        .from("Images")
        .upload(writeId + "/" + uuid(), file);
      if (uploadData) {
        const imageUrl = uploadData.path;
        success(imageUrl);
        console.log(uploadData.path);
        resolve(
          `https://cqphjwakpkovcvrouaoz.supabase.co/storage/v1/object/public/Images/${imageUrl}`
        );
      }
    });
  };

  return (
    <>
      <div className="container mx-auto px-14 border-none outline-none min-h-screen">
        <Editor
          apiKey="r867q9o4rl69mxxxwmj4ok0xypnt6hswpfhcaeq27kxma3wz"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue=""
          init={{
            height: 500,
            toolbar: false,
            menubar: false,
            skin: "borderless",
            icons: "thin",
            plugins:
              "autoresize quickbars image media table hr paste link anchor lists codesample",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            quickbars_selection_toolbar:
              "bold italic | h1 h2 h3 blockquote  codesample | outdent indent",
            quickbars_insert_toolbar:
              "image media link | alignleft aligncenter alignright table hr | numlist bullist anchor",
            a11y_advanced_options: true,
            file_picker_types: "image",
            quickbars_image_toolbar: false,
            images_upload_handler: handlerImageUpload,
            placeholder: "Write something",
          }}
        />
      </div>

      <button onClick={log}>log</button>
    </>
  );
};

export default TinyEditor;
