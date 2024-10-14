import { useCallback, useState } from "react";
// import { ReactComponent as Table } from "./Icons/Table/table";
import Table from "./Icons/Table";
import TextBold from "./Icons/TextBold";
import TextUnderline from "./Icons/TextUnderline";
import TextItalics from "./Icons/TextItalics";
import IndentOrderedList from "./Icons/IndentOrderedList";
import IndentUnorderedList from "./Icons/IndentUnorderedList";
import IndentInc from "./Icons/IndentInc";
import IndentDec from "./Icons/IndentDec";

import TableToggleColHeader from "./Icons/TableToggleColHeader";
import TableToggleRowHeader from "./Icons/TableToggleRowHeader";

import TableDelTable from "./Icons/TableDelTable";
import TableDelRow from "./Icons/TableDelRow";
import TableDelCol from "./Icons/TableDelCol";

import AttachPicture from "./Icons/AttachPicture";

export const tableHTML = `
  <table style="width:100%">
    <tr>
      <th>Firstname</th>
      <th>Lastname</th>
      <th>Age</th>
    </tr>
    <tr>
      <td>Jill</td>
      <td>Smith</td>
      <td>50</td>
    </tr>
    <tr>
      <td>Eve</td>
      <td>Jackson</td>
      <td>94</td>
    </tr>
    <tr>
      <td>John</td>
      <td>Doe</td>
      <td>80</td>
    </tr>
  </table>
`;

const MenuBar = ({ editor }) => {
  const [file, setFile] = useState(null);
  // const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    console.log("handle", event.target);
    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // console.log(reader.result);
        editor
          .chain()
          .focus()
          .setImage({
            src: reader.result,
          })
          .run();
      };

      // Read the file as Data URL (base64 encoded)
      reader.readAsDataURL(selectedFile);
    }
  };

  // Handle file upload
  const handleUpload = () => {
    if (file) {
      // For demonstration, we'll log the file object
      console.log("File to upload:", file);
    } else {
      alert("No file selected");
    }
  };

  const handleSetLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div>
      <div id="jx">
        <div className="flex">
          <div
            onClick={() => {
              editor.chain().focus().toggleBold().run();
            }}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`jxIcon flex-center ${
              editor.isActive("bold") ? "is-active" : ""
            }`}
          >
            <TextBold />
          </div>
          <div
            onClick={() => {
              editor.chain().focus().toggleItalic().run();
            }}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`jxIcon flex-center ${
              editor.isActive("italic") ? "is-active" : ""
            }`}
          >
            <TextItalics />
          </div>
          <div
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`jxIcon flex-center ${
              editor.isActive("underline") ? "is-active" : ""
            }`}
          >
            <TextUnderline />
          </div>
          <div
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`jxIcon flex-center ${
              editor.isActive("orderedList") ? "is-active" : ""
            }`}
          >
            <IndentOrderedList />
          </div>
          <div
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`jxIcon flex-center ${
              editor.isActive("bulletList") ? "is-active" : ""
            }`}
          >
            <IndentUnorderedList />
          </div>
        </div>

        <div className="flex">
          <div className="remove-padding">
            <label className="custom-style-tiptap jxIcon flex-center">
              <AttachPicture />
              <input
                type="file"
                onChange={handleFileChange}
                accept="*/*" // You can specify MIME types here
              />
            </label>
          </div>
          <div
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertContent(tableHTML, {
                  parseOptions: {
                    preserveWhitespace: false,
                  },
                })
                .run()
            }
            className="jxIcon flex-center"
          >
            <Table />
          </div>
        </div>

        <div className="flex">
          <div className="jxIcon flex-center">
            <IndentInc />
          </div>
          <div className="jxIcon flex-center">
            <IndentDec />
          </div>
        </div>
      </div>
      <div className="flex">
        <div
          onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
          disabled={!editor.can().toggleHeaderColumn()}
          className="jxIcon flex-center"
        >
          <TableToggleColHeader />
        </div>
        <div
          onClick={() => editor.chain().focus().toggleHeaderRow().run()}
          disabled={!editor.can().toggleHeaderRow()}
          className="jxIcon flex-center"
        >
          <TableToggleRowHeader />
        </div>
        <div
          onClick={() => editor.chain().focus().deleteTable().run()}
          disabled={!editor.can().deleteTable()}
          className="jxIcon flex-center"
        >
          <TableDelTable />
        </div>
        <div
          onClick={() => editor.chain().focus().deleteRow().run()}
          disabled={!editor.can().deleteRow()}
          className="jxIcon flex-center"
        >
          <TableDelRow />
        </div>
        <div
          onClick={() => editor.chain().focus().deleteColumn().run()}
          disabled={!editor.can().deleteColumn()}
          className="jxIcon flex-center"
        >
          <TableDelCol />
        </div>
      </div>
      <div className="control-group" style={{ marginBottom: "15px" }}>
        <div className="button-group flex-wrap">
          <button
            onClick={() => {
              console.log("Strike");
              editor.chain().focus().toggleStrike().run();
            }}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            Strike
          </button>

          <button
            onClick={() => editor.chain().focus().addColumnBefore().run()}
            disabled={!editor.can().addColumnBefore()}
          >
            Add column before
          </button>
          <button
            onClick={() => editor.chain().focus().addColumnAfter().run()}
            disabled={!editor.can().addColumnAfter()}
          >
            Add column after
          </button>

          <button
            onClick={() => editor.chain().focus().addRowBefore().run()}
            disabled={!editor.can().addRowBefore()}
          >
            Add row before
          </button>
          <button
            onClick={() => editor.chain().focus().addRowAfter().run()}
            disabled={!editor.can().addRowAfter()}
          >
            Add row after
          </button>
          {/* <button className="remove-padding">
            <label className="custom-style-tiptap">
              <input type="file" onChange={handleFileChange} />
              Upload Image
            </label>
          </button> */}

          {/* <button
            onClick={() => editor.chain().focus().mergeCells().run()}
            disabled={!editor.can().mergeCells()}
          >
            Merge cells
          </button>
          <button
            onClick={() => editor.chain().focus().splitCell().run()}
            disabled={!editor.can().splitCell()}
          >
            Split cell
          </button>

          <button
            onClick={() => editor.chain().focus().fixTables().run()}
            disabled={!editor.can().fixTables()}
          >
            Fix tables
          </button> */}

          {/* <button
            onClick={handleSetLink}
            className={editor.isActive("link") ? "is-active" : ""}
          >
            Set link
          </button>
          <button
            onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={!editor.isActive("link")}
          >
            Unset link
          </button> */}
          {/* <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            Undo
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            Redo
          </button> */}
        </div>
        {/* <div>
        <button onClick={handleUpload}>Upload Files</button>
        {fileName && <p>Selected file: {fileName}</p>}
      </div> */}
      </div>
    </div>
  );
};

export default MenuBar;
