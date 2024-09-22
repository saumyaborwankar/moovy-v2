import React, { Component, useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import {
  convertFromRaw,
  convertToRaw,
  EditorState,
  RawDraftContentState,
} from "draft-js";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Card } from "antd";

export function NoteEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newEditorState: any) => {
    setEditorState(newEditorState);
  };
  useEffect(() => {
    const rawContent: RawDraftContentState = {
      blocks: [
        {
          key: "ebjq5",
          text: "\nBOEwevwvw qwvqv",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 15,
              length: 10,
              style: "ITALIC",
            },
            {
              offset: 15,
              length: 15,
              style: "BOLD",
            },
            {
              offset: 15,
              length: 10,
              style: "UNDERLINE",
            },
          ],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    };
    const contentState = convertFromRaw(rawContent);
    setEditorState(EditorState.createWithContent(contentState));
  }, []);

  const saveContent = () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
  };
  return (
    <>
      <Card>
        <Editor
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          editorStyle={{ background: "white", height: 500 }}
        />
      </Card>
      <Button onClick={saveContent} type="primary" style={{ marginTop: 10 }}>
        Save
      </Button>
    </>
  );
}
