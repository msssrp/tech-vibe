"use client";
import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { tinyProps } from "@/types/article/article";
import { useEditorStore } from "@/store/article";

  const editorRef = useRef<any>(null);

  const { article, updateArticle, setSaveStatus } = useEditorStore((state) => ({
    setSaveStatus: state.setSaveStatus,
    article: state.article,
    updateArticle: state.updateArticle,
  }));
  const log = () => {
    console.log(article);
  };
  useEffect(() => {
    updateArticle({
      ...article,
      article_id: writeId,
      article_cover: imageCover,
      article_title: title,
      article_description: description,
      user_id: user_id,
    });

    setSaveStatus("saving");
  }, [article.article_content, imageCover, user_id, title, description]);

  const handlerEditorChange = (newContent: string, editor: any) => {
    updateArticle({ ...article, article_content: newContent });
  };
  const hasCoverImageBeenSet = useRef(false);
  const handleSetCoverImage = (imageUrl: string) => {
    if (!hasCoverImageBeenSet.current) {
      setImageCover(imageUrl);
      hasCoverImageBeenSet.current = true;
    }
  };
  const handlerImageUpload: any = (
    blobInfo: any,
    success: any,
    failure: any
  ) => {
    return new Promise(async (resolve, reject) => {
      const file = blobInfo.blob();
      const uploadData = await uploadImage(writeId, file);
      if (uploadData.imagePath) {
        const imageUrl = uploadData.imagePath;
        success(imageUrl);
        handleSetCoverImage(imageUrl);
        resolve(
          `https://cqphjwakpkovcvrouaoz.supabase.co/storage/v1/object/public/Images/${imageUrl}`
        );
        console.log(imageCover);
      }
    });
  };

  return (
    <>
      <div className="container mx-auto px-14 border-none outline-none overflow-auto min-h-96">
        <Editor
          apiKey="r867q9o4rl69mxxxwmj4ok0xypnt6hswpfhcaeq27kxma3wz"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue=""
          onEditorChange={(newContent, editor) => {
            handlerEditorChange(newContent, editor);
          }}
          init={{
            height: 500,
            toolbar: false,
            menubar: false,
            skin: "borderless",
            icons: "thin",
            plugins:
              "autoresize quickbars image media table hr paste link anchor lists codesample",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:18px }",
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
                  e.element.style.width = "60%";
                  e.element.style.height="400px"
                }
               
              });
            },
          }}
        />

        
      </div>
      <div className="container mx-auto w-full px-14 overflow-x-auto ">
        <button onClick={log}>log</button>
          <TagsInput className="w-1/3 " label="Press Enter to submit a tag" clearable placeholder="Enter tag"/>
        </div>
      
    </>
  );
};

export default TinyEditor;
