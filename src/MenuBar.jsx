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

import AddColumnLeft from "./Icons/AddColumnLeft";
import AddColumnRight from "./Icons/AddColumnRight";
import AddRowTop from "./Icons/AddRowTop";
import AddRowBottom from "./Icons/AddRowBottom";

import TableDelTable from "./Icons/TableDelTable";
import TableDelRow from "./Icons/TableDelRow";
import TableDelCol from "./Icons/TableDelCol";

import AttachPicture from "./Icons/AttachPicture";
import TextStrikethrough from "./Icons/TextStrikethrough";

export const tableHTML = `
  <table style="width:100%">
    <tr>
      <th>Firstname</th>
      <th>Lastname</th>
    </tr>
    <tr>
      <td>Jill</td>
      <td>Smith</td>
    </tr>
    <tr>
      <td>John</td>
      <td>Doe</td>
    </tr>
  </table>
`;

const MenuBar = ({ editor }) => {
  const [dangerText, setdangerText] = useState("");
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // console.log(selectedFile);
    // console.log("handle", event.target);
    if (selectedFile) {
      const reader = new FileReader();

      const fileSizeInMB = selectedFile.size / (1024 * 1024); // Convert file size to MB

      if (fileSizeInMB > 0) {
        // alert("File size should be less than 2MB.");
        setdangerText("file size too big");
        return; // Exit the function if the file size is too large
      }

      reader.onloadend = () => {
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

  if (!editor) {
    return null;
  }

  return (
    <div className="sticky-top">
      <div className="flex" style={{ justifyContent: "space-between" }}>
        <div className="flex border" style={{ padding: "7px 0px" }}>
          <div className="flex border-right">
            <div
              onClick={() => {
                editor.chain().focus().toggleBold().run();
              }}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={`jxIcon  ${
                editor.isActive("bold") ? "is-active" : ""
              }`}
            >
              <TextBold />
            </div>
            <div
              onClick={() => {
                console.log("Strike");
                editor.chain().focus().toggleStrike().run();
              }}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
            >
              <TextStrikethrough />
            </div>
            <div
              onClick={() => {
                editor.chain().focus().toggleItalic().run();
              }}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              className={`jxIcon  ${
                editor.isActive("italic") ? "is-active" : ""
              }`}
            >
              <TextItalics />
            </div>
            <div
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`jxIcon  ${
                editor.isActive("underline") ? "is-active" : ""
              }`}
            >
              <TextUnderline />
            </div>
            <div
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`jxIcon ${
                editor.isActive("orderedList") ? "is-active" : ""
              }`}
            >
              <IndentOrderedList />
            </div>
            <div
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`jxIcon `}
            >
              <IndentUnorderedList />
            </div>
          </div>

          <div className="flex">
            <div className="remove-padding">
              <label className="custom-style-tiptap jxIcon ">
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
              className="jxIcon "
            >
              <Table />
            </div>
          </div>
        </div>

        {/* {(editor.isActive("bulletList") || editor.isActive("orderedList")) && (
          <div className="flex border" style={{ padding: "7px 0px" }}>
            <div
              onClick={() => editor.chain().focus().indent().run()}
              className={`jxIcon `}
            >
              <IndentInc />
            </div>
            <div
              onClick={() => editor.chain().focus().indent().run()}
              className={`jxIcon `}
            >
              <IndentDec />
            </div>
          </div>
        )} */}

        {editor.can().deleteTable() && (
          <div className="flex border" style={{ padding: "7px 0px" }}>
            <div
              onClick={() => editor.chain().focus().addColumnBefore().run()}
              disabled={!editor.can().addColumnBefore()}
              className="jxIcon"
            >
              <AddColumnLeft />
            </div>
            <div
              onClick={() => editor.chain().focus().addColumnAfter().run()}
              disabled={!editor.can().addColumnAfter()}
              className="jxIcon"
            >
              <AddColumnRight />
            </div>
            <div
              onClick={() => editor.chain().focus().addRowBefore().run()}
              disabled={!editor.can().addRowBefore()}
              className="jxIcon"
            >
              <AddRowTop />
            </div>
            <div
              onClick={() => editor.chain().focus().addRowAfter().run()}
              disabled={!editor.can().addRowAfter()}
              className="jxIcon"
            >
              <AddRowBottom />
            </div>
            <div
              onClick={() => editor.chain().focus().deleteTable().run()}
              disabled={!editor.can().deleteTable()}
              className="jxIcon"
            >
              <TableDelTable />
            </div>
            <div
              onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
              disabled={!editor.can().toggleHeaderColumn()}
              className="jxIcon"
            >
              <TableToggleColHeader />
            </div>
            <div
              onClick={() => editor.chain().focus().toggleHeaderRow().run()}
              disabled={!editor.can().toggleHeaderRow()}
              className="jxIcon"
            >
              <TableToggleRowHeader />
            </div>
            <div
              onClick={() => editor.chain().focus().deleteColumn().run()}
              disabled={!editor.can().deleteColumn()}
              className="jxIcon flex-center"
            >
              <TableDelCol />
            </div>
            <div
              onClick={() => editor.chain().focus().deleteRow().run()}
              disabled={!editor.can().deleteRow()}
              className="jxIcon flex-center"
            >
              <TableDelRow />
            </div>
          </div>
        )}
      </div>
      {dangerText && (
        <div className="danger-text">
          <div>{dangerText}</div>
          <button className="close-btn" onClick={() => setdangerText("")}>
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuBar;
