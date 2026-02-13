import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  const client = new QueryClient();

  await client.prefetchQuery({
    queryKey: ['note', params.id],
    queryFn: () => fetchNoteById(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
