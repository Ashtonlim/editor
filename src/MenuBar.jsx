import { useCallback, useState } from "react";

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
    <div className="control-group" style={{ marginBottom: "15px" }}>
      <div className="button-group flex-wrap">
        <button
          onClick={() => {
            console.log("Bold");
            editor.chain().focus().toggleBold().run();
          }}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          Bold
        </button>
        <button
          onClick={() => {
            console.log("Italic");
            editor.chain().focus().toggleItalic().run();
          }}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          Italic
        </button>
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
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          Paragraph
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          Bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          Ordered list
        </button>

        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        >
          Insert table
        </button>
        <button
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
        >
          Insert HTML table
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
          onClick={() => editor.chain().focus().deleteColumn().run()}
          disabled={!editor.can().deleteColumn()}
        >
          Delete column
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
        <button
          onClick={() => editor.chain().focus().deleteRow().run()}
          disabled={!editor.can().deleteRow()}
        >
          Delete row
        </button>
        <button
          onClick={() => editor.chain().focus().deleteTable().run()}
          disabled={!editor.can().deleteTable()}
        >
          Delete table
        </button>
        <button
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
          onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
          disabled={!editor.can().toggleHeaderColumn()}
        >
          ToggleHeaderColumn
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeaderRow().run()}
          disabled={!editor.can().toggleHeaderRow()}
        >
          Toggle header row
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeaderCell().run()}
          disabled={!editor.can().toggleHeaderCell()}
        >
          Toggle header cell
        </button>

        <button
          onClick={() => editor.chain().focus().fixTables().run()}
          disabled={!editor.can().fixTables()}
        >
          Fix tables
        </button>
        <button className="remove-padding">
          <label className="custom-style-tiptap">
            <input
              type="file"
              onChange={handleFileChange}
              accept="*/*" // You can specify MIME types here
            />
            Upload Image
          </label>
        </button>

        <button
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
        </button>
        <button
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
        </button>
      </div>
      {/* <div>
        <button onClick={handleUpload}>Upload Files</button>
        {fileName && <p>Selected file: {fileName}</p>}
      </div> */}
    </div>
  );
};

export default MenuBar;
