import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { useEffect } from 'react';
import useCurrentNoteStore from '~/store/currentNote';
import useNotesStore from '~/store/notes';
import { useDebouncedState } from '@mantine/hooks';
import axios from 'axios';

function NoteEditor({
  content
}: {
  content: string;
}) {
  const [contentState, setContentState] = useDebouncedState({ contentText: '', contentHTML: content }, 400);
  const { id } = useCurrentNoteStore()
  const { updateNoteTitleById, updateNoteContentById } = useNotesStore()
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
    onUpdate({ editor, transaction }) {
      setContentState({
        contentText: editor.getText(),
        contentHTML: editor.getHTML()
      })
    },
    editorProps: {
      attributes: {
        class: '',
      },
    },
  });

  useEffect(() => {
    editor?.chain().focus().run();
  }, [editor]);

  useEffect(() => {
    editor?.commands.setContent(content)
  }, [content, editor])

  useEffect(() => {
    if (id === undefined) {
      return
    }

    if (contentState.contentText.trim() === '') {
      return
    }
    updateNoteTitleById(id, contentState.contentText.split("\n")[0]?.substring(0, 80))
    updateNoteContentById(id, contentState.contentHTML)

    void axios.put(`/api/note/${id}`, {
      content: contentState
    })
  }, [contentState, updateNoteContentById, updateNoteTitleById])




  return (
    <RichTextEditor editor={editor} className=' flex flex-col max-h-screen w-full overflow-scroll'>
      <RichTextEditor.Toolbar sticky >
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
}

export default NoteEditor;