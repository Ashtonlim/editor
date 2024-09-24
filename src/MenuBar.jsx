import TurndownService from "turndown";
import tables from "./table";
import { useCallback, useState, useRef } from "react";
import Showdown from "showdown";

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
  const converter = new Showdown.Converter();
  const turndownService = new TurndownService();
  turndownService.use([tables]);
  const inputFile = useRef(null);

  const [markdown, setmarkdown] = useState("");

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  // Handle file selection
  const testConvert = () => {
    const markdown = `
    # Header 1 
    This is some **bold** text, and this is some _italic_ text.\<br>- List item 1\n- List item 2
    `;
    converter.setOption("tables", true);
    converter.setOption("parseImgDimensions", true);
    const htmlFromMarkdown = converter.makeHtml(markdown);
    console.log(htmlFromMarkdown);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    console.log("handle", event.target);
    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        console.log(reader.result);
        // setFileData(reader.result);
        // setFileName(reader.result);
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

      // Implement your upload logic here
      // For example, you can use FormData to send the file to a server
      // const formData = new FormData();
      // formData.append('file', file);
      // fetch('/upload-endpoint', {
      //   method: 'POST',
      //   body: formData,
      // })
      // .then(response => response.json())
      // .then(data => console.log('Upload successful:', data))
      // .catch(error => console.error('Upload error:', error));
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
    <div className="control-group">
      <div className="button-group">
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
          onClick={() => editor.chain().focus().mergeOrSplit().run()}
          disabled={!editor.can().mergeOrSplit()}
        >
          Merge or split
        </button>

        <button
          onClick={() => editor.chain().focus().fixTables().run()}
          disabled={!editor.can().fixTables()}
        >
          Fix tables
        </button>
        <button
          onClick={() => editor.chain().focus().goToNextCell().run()}
          disabled={!editor.can().goToNextCell()}
        >
          Go to next cell
        </button>
        <button
          onClick={() => editor.chain().focus().goToPreviousCell().run()}
          disabled={!editor.can().goToPreviousCell()}
        >
          Go to previous cell
        </button>
        <button
          onClick={() => {
            const url = window.prompt("URL");

            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
        >
          Add image from URL
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
      </div>
      <div>
        <button
          onClick={() => {
            const html = editor.getHTML();
            console.log(html);

            const JSON = editor.getJSON();
            console.log(JSON);

            const markdown = turndownService.turndown(html);
            console.log(markdown);

            converter.setOption("tables", true);
            converter.setOption("parseImgDimensions", true);
            const htmlFromMarkdown = converter.makeHtml(markdown);
            console.log(htmlFromMarkdown);
          }}
        >
          Save
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
      <div>
        <input
          type="file"
          onChange={handleFileChange}
          accept="*/*" // You can specify MIME types here
        />
        <button onClick={handleUpload}>Upload</button>

        {fileName && <p>Selected file: {fileName}</p>}
      </div>
      <button onClick={testConvert}>Convert</button>
    </div>
  );
};

export default MenuBar;
