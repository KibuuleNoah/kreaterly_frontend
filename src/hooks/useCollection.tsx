import { useState, useEffect } from "react";
import { type ListResult, type RecordModel } from "pocketbase";
import { pb } from "../lib/pocketbase";

export function useGetOneCollection<T>(
  collectionName: string,
  id: string,
  options: object = {},
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Return early if no ID is provided (useful for dynamic routing)
    if (!id) return;

    let isMounted = true;

    async function fetchRecord() {
      setLoading(true);
      try {
        const record = await pb
          .collection(collectionName)
          .getOne<T>(id, options);

        if (isMounted) {
          setData(record);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted && !err.isAbort) {
          setError(err as Error);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchRecord();
    return () => {
      isMounted = false;
    };
  }, [collectionName, id, JSON.stringify(options)]);

  return {
    item: data,
    itemLoading: loading,
    itemErr: error,
  };
}
/**
 * Custom hook to fetch a PocketBase collection.
 * T represents the record type for better DX.
 */
export function useCollection<T>(collectionName: string, options: object = {}) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      setLoading(true);
      try {
        // PocketBase handles auto-cancellation internally if another
        // request to this collection is triggered.
        const records = await pb
          .collection(collectionName)
          .getFullList<T>(options);

        if (isMounted) {
          setData(records);
          setError(null);
        }
      } catch (err: any) {
        // Only error out if the request wasn't manually/auto cancelled
        if (isMounted && !err.isAbort) {
          setError(err as Error);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
      // Optional: Force cancel all pending requests for this client on unmount
      pb.cancelAllRequests();
    };
    // Use stringified options to prevent infinite re-renders from object reference changes
  }, [collectionName, JSON.stringify(options)]);

  return { data, loading, error };
}

export function usePaginatedCollection<T>(
  collectionName: string,
  page: number = 1,
  perPage: number = 20,
  options: object = {},
) {
  const [result, setResult] = useState<ListResult<T> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchPage() {
      setLoading(true);
      try {
        // .getList(page, perPage, options)
        const data = await pb
          .collection(collectionName)
          .getList<T>(page, perPage, options);

        if (isMounted) {
          setResult(data);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted && !err.isAbort) {
          setError(err as Error);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchPage();
    return () => {
      isMounted = false;
    };
  }, [collectionName, page, perPage, JSON.stringify(options)]);

  return {
    items: result?.items || [],
    totalPages: result?.totalPages || 0,
    totalItems: result?.totalItems || 0,
    collLoading: loading,
    collErr: error,
  };
}
