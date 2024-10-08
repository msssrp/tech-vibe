"use client";
import { Editor } from "@tinymce/tinymce-react";
import React from "react";

type tinyProps = {
  editorRef: any;
  handlerEditorChange: any;
  handlerImageUpload: any;
  initData?: string;
};

const TinyEditor: React.FC<tinyProps> = ({
  editorRef,
  handlerEditorChange,
  handlerImageUpload,
  initData,
}) => {
  return (
    <>
      <Editor
        apiKey="r867q9o4rl69mxxxwmj4ok0xypnt6hswpfhcaeq27kxma3wz"
        onInit={(evt: any, editor: any) => (editorRef.current = editor)}
        onEditorChange={(newContent: any, editor: any) => {
          handlerEditorChange(newContent, editor);
        }}
        initialValue={initData && initData}
        init={{
          height: 500,
          toolbar: false,
          menubar: false,
          skin: "borderless",
          icons: "thin",
          plugins:
            "autoresize quickbars image media table hr paste link anchor lists codesample",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
          quickbars_selection_toolbar:
            "bold italic | h1 h2 h3 blockquote | alignleft aligncenter alignright | outdent indent",
          quickbars_insert_toolbar:
            "image media link | alignleft aligncenter alignright table hr | numlist bullist anchor codesample",
          file_picker_types: "image",
          quickbars_image_toolbar: false,
          images_upload_handler: handlerImageUpload,
          placeholder: "Write something",
          setup: function (editor: any) {
            editor.on("NodeChange", function (e: any) {
              if (e.element.nodeName === "IMG") {
                e.element.style.display = "block";
                e.element.style.margin = "0 auto";
              }
            });
          },
        }}
      />
    </>
  );
};

export default TinyEditor;
