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
  const [image, setImage] = useState(null);
  const [mdContent, setmdContent] = useState("");
  const [mdContentAsHTML, setmdContentAsHTML] = useState("");

  const editor = useEditor({
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
    content: mdContentAsHTML,
  });

  useEffect(() => {
    const converter = new Showdown.Converter();
    converter.setOption("tables", true);
    converter.setOption("parseImgDimensions", true);

    const mditem = localStorage.getItem("markdown");
    const mdAsHtml = converter.makeHtml(mditem);

    console.log(mditem);
    console.log(mdAsHtml);

    setmdContentAsHTML(mdAsHtml);
    editor.commands.setContent(mdAsHtml);

    // setTimeout(()  => {
    //   const mditem = localStorage.getItem("markdown");
    //   console.log(mditem);
    //   setmd(mditem);
    // }, 2000)
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "80%" }}>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
      <div>{mdContent}</div>
    </div>
  );
}

export default App;
