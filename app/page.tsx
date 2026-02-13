import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '../src/lib/api'; 
import NotesClient from './notes/Notes.client';
 

export default async function Page() {
  const qc = new QueryClient();

  await qc.prefetchQuery({
    queryKey: ['notes'],
    queryFn: () => fetchNotes({ page: 1, perPage: 12 }),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
