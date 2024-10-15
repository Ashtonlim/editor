// import TableCell from "@tiptap/extension-table-cell";
// import TableHeader from "@tiptap/extension-table-header";
// import TableRow from "@tiptap/extension-table-row";
// import ListItem from "@tiptap/extension-list-item";
// import TextStyle from "@tiptap/extension-text-style";
// import Image from "@tiptap/extension-image";
// import Link from "@tiptap/extension-link";
// import Table from "@tiptap/extension-table";

import { useState, useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import Showdown from "showdown";
import TurndownService from "turndown";

import ListItem from "./Extensions/extension-list-item/src/index";
import Underline from "./Extensions/extension-underline/src/index";
import TextStyle from "./Extensions/extension-text-style/src/index";
import Image from "./Extensions/extension-image/src/index";
import Link from "./Extensions/extension-link/src/index";
import Table from "./Extensions/extension-table/src/index";
import TableRow from "./Extensions/extension-table-row/src/index";
import TableCell from "./Extensions/extension-table-cell/src/index";
import TableHeader from "./Extensions/extension-table-header/src/index";
import StarterKit from "@tiptap/starter-kit";
import tables from "./table";

import MenuBar from "./MenuBar";

// const CustomTableCell = TableCell.extend({
//   addAttributes() {
//     return {
//       // extend the existing attributes …
//       ...this.parent?.(),

//       // and add a new one …
//       backgroundColor: {
//         default: null,
//         parseHTML: (element) => element.getAttribute("data-background-color"),
//         renderHTML: (attributes) => {
//           console.log("asd", attributes);
//           return {
//             "data-background-color": attributes.backgroundColor,
//             style: `background-color: ${attributes.backgroundColor}`,
//           };
//         },
//       },
//     };
//   },
// });

// original table adds in colgroup into html.
// this confuses the markdown converter and converts to markdown wrongly.
const newTable = Table.extend({
  renderHTML() {
    return ["table", ["tbody", 0]];
  },
});

function App() {
  const [content, setcontent] = useState("");
  const turndownService = new TurndownService();
  turndownService.use([tables]);
  turndownService.addRule("strikethrough", {
    filter: ["del", "s", "strike"],
    replacement: (content) => `~~${content}~~`,
  });

  const editor = useEditor({
    onUpdate({ editor }) {
      const newHtml = editor.getHTML();
      const newMD = turndownService.turndown(newHtml);

      // console.log("print HTML and MD");
      console.log(newHtml);
      console.log(newMD);
      localStorage.setItem("editedMarkdown", newMD);
    },
    extensions: [
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Underline,
      Table.configure({
        resizable: true,
      }),
      // Table,
      // newTable,
      TableRow,
      TableHeader,
      TableCell,
      // CustomTableCell,
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
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
    // <div style={{ display: "flex", justifyContent: "center" }}>

    // </div>
  );
}

export default App;
