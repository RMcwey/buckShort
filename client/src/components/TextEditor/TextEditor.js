import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import ImageInsert from "@ckeditor/ckeditor5-image/src/imageinsert";

export default function TextEditor(props) {
  // console.log(props.setContent);
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data=""
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          props.setContent(data);
        }}
      />
    </div>
  );
}
