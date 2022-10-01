import { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor as TextEditor } from "react-draft-wysiwyg";
import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  EditorState,
} from "draft-js";
import { useEffect } from "react";
import { is } from "lodash";

function Editor({ value, onChange }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    try {
      const object = JSON.parse(value);
      setEditorState(EditorState.createWithContent(convertFromRaw(object)));
    } catch (error) {
      setEditorState(EditorState.createEmpty());
    }
  }, []);

  const handleEditorStateChange = (editor) => {
    const stringContent = JSON.stringify(
      convertToRaw(editor.getCurrentContent())
    );
    setEditorState(editor);
    onChange(stringContent);
  };
  return (
    <div style={{ border: "1px solid #efefef" }}>
      <TextEditor
        editorStyle={{ padding: "0 20px", minHeight: 200 }}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        editorState={editorState}
        onEditorStateChange={handleEditorStateChange}
      />
    </div>
  );
}

export default Editor;
