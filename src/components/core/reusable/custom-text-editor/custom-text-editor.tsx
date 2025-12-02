import { FormatItalic, FormatBold, Redo, Undo, FormatUnderlined, FormatAlignLeft, FormatAlignCenter, FormatAlignRight, FormatAlignJustify, FormatListBulleted, FormatListNumbered, FormatIndentDecrease, FormatIndentIncrease, FormatQuote } from "@mui/icons-material";
import { IconButton, Toolbar } from "@mui/material";

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
      return null;
    }

    return (
      <Toolbar
        sx={{
          backgroundColor: '#f8f9fa',
          border: '1px solid #e9ecef',
          borderBottom: 'none',
          borderRadius: '4px 4px 0 0',
          minHeight: 2,
          padding:0.2,
        }}
      >
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo fontSize="small" />
        </IconButton>

        <div
          style={{ width: '1px', height: '24px', backgroundColor: '#e9ecef', margin: '0 8px' }}
        />

        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleBold().run()}
          color={editor.isActive('bold') ? 'primary' : 'default'}
        >
          <FormatBold fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          color={editor.isActive('italic') ? 'primary' : 'default'}
        >
          <FormatItalic fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          color={editor.isActive('underline') ? 'primary' : 'default'}
        >
          <FormatUnderlined fontSize="small" />
        </IconButton>

        <div
          style={{ width: '1px', height: '24px', backgroundColor: '#e9ecef', margin: '0 8px' }}
        />

        <IconButton
          size="small"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          color={editor.isActive({ textAlign: 'left' }) ? 'primary' : 'default'}
        >
          <FormatAlignLeft fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          color={editor.isActive({ textAlign: 'center' }) ? 'primary' : 'default'}
        >
          <FormatAlignCenter fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          color={editor.isActive({ textAlign: 'right' }) ? 'primary' : 'default'}
        >
          <FormatAlignRight fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          color={editor.isActive({ textAlign: 'justify' }) ? 'primary' : 'default'}
        >
          <FormatAlignJustify fontSize="small" />
        </IconButton>

        <div
          style={{ width: '1px', height: '24px', backgroundColor: '#e9ecef', margin: '0 8px' }}
        />

        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          color={editor.isActive('bulletList') ? 'primary' : 'default'}
        >
          <FormatListBulleted fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          color={editor.isActive('orderedList') ? 'primary' : 'default'}
        >
          <FormatListNumbered fontSize="small" />
        </IconButton>

        <div
          style={{ width: '1px', height: '24px', backgroundColor: '#e9ecef', margin: '0 8px' }}
        />

        <IconButton size="small" onClick={() => editor.chain().focus().outdent().run()}>
          <FormatIndentDecrease fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={() => editor.chain().focus().indent().run()}>
          <FormatIndentIncrease fontSize="small" />
        </IconButton>

        <div
          style={{ width: '1px', height: '24px', backgroundColor: '#e9ecef', margin: '0 8px' }}
        />

        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          color={editor.isActive('blockquote') ? 'primary' : 'default'}
        >
          <FormatQuote fontSize="small" />
        </IconButton>
      </Toolbar>
    );
  };

export default MenuBar;