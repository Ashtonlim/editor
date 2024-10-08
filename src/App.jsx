import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";

import MenuBar from "./MenuBar";
import { useState, useEffect } from "react";
import Showdown from "showdown";

import TurndownService from "turndown";
import tables from "./table";

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      // extend the existing attributes …
      ...this.parent?.(),

      // and add a new one …
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-background-color"),
        renderHTML: (attributes) => {
          return {
            "data-background-color": attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          };
        },
      },
    };
  },
});

function App() {
  const [content, setcontent] = useState("");
  const turndownService = new TurndownService();
  turndownService.use([tables]);

  const editor = useEditor({
    onUpdate({ editor }) {
      const newHtml = editor.getHTML();
      const newMD = turndownService.turndown(newHtml);

      console.log(newHtml);
      console.log(newMD);
      localStorage.setItem("editedMarkdown", newMD);
    },
    extensions: [
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      CustomTableCell,
      Image,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
    ],
    content,
  });

  useEffect(() => {
    const converter = new Showdown.Converter();
    converter.setOption("tables", true);
    converter.setOption("parseImgDimensions", true);

    const injectedMarkdown = localStorage.getItem("injectedMarkdown");
    localStorage.setItem("editedMarkdown", injectedMarkdown);

    const mdAsHtml = converter.makeHtml(injectedMarkdown);

    console.log(injectedMarkdown);
    console.log(mdAsHtml);

    setcontent(mdAsHtml);
    editor.commands.setContent(mdAsHtml);
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "80%" }}>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
      {/* <div>{mdContent}</div> */}
    </div>
  );
}

export default App;
