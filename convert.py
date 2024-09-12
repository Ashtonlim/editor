def convert_markdown_to_single_line_with_preserved_newlines(markdown_text):
    # Replace actual newlines with the escaped newline character
    single_line_text = markdown_text.replace('\n', '\\n')
    return single_line_text

markdown_text = """# Header 1

This is some **bold** text, and this is some *italic* text.

- List item 1
- List item 2"""

single_line_text = convert_markdown_to_single_line_with_preserved_newlines(markdown_text)
print(single_line_text)