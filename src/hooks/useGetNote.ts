import useSWR from "swr";
import fetcher from './fetcher';

export function useGetNote({ noteId }: { noteId: string }) {
    const { data, error, isLoading } = useSWR(
        `/note/${noteId}`,
        fetcher,
        {
            
        }
    );

    return {
        data,
        error,
        isLoading,
    };
}
