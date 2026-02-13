import type { Note } from '../../types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../../lib/api';
;
import css from './NoteList.module.css';

interface Props {
  notes: Note[];
}

export default function NoteList({ notes }: Props) {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => client.invalidateQueries({ queryKey: ['notes'] }),
  });

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>

          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>

            <button
              className={css.button}
              onClick={() => mutation.mutate(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
