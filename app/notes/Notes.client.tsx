'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../lib/api';

import NoteList from '../../src/components/NoteList/NoteList';
import Pagination from '../../src/components/Pagination/Pagination';
import SearchBox from '../../src/components/SearchBox/SearchBox';
import Modal from '../../src/components/Modal/Modal';
import NoteForm from '../../src/components/NoteForm/NoteForm';

import css from './page.module.css';

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: search || undefined,
      }),
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={setSearch} />

        {data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onChange={setPage}
          />
        )}

        <button className={css.button} onClick={() => setIsOpen(true)}>
          Create note +
        </button>
      </header>

      {data.notes.length > 0 && <NoteList notes={data.notes} />}

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm onClose={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
