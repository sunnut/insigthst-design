import { useCallback, useEffect, useState } from "react";
import { type Result } from './types';

type FetchFunction<T extends object> = (params: Record<string, unknown>) => Promise<Result<T>>;

//===================================================================
// Hooks For Fetch
//===================================================================
export function useFetch<T extends object>(
  fetch: FetchFunction<T>,
  params: Record<string, unknown>,
  isLazy?: boolean
) {
  const [result, setResult] = useState<Result<T> | null>(null);
  const [loading, setLoading] = useState(false);
  const [newParams, setNewParams] = useState(params);
  const [newIsLazy, setNewIsLazy] = useState(isLazy);

  const execRequest = useCallback(async () => {
    try {
      if (newIsLazy) {
        return;
      }

      setLoading(true);
      const data = await fetch(newParams);

      if (data) {
        setResult(data as Result<T>);
      }

      setLoading(false);
    } catch (e) {
      setLoading(false);
      throw e;
    }
  }, [fetch, newParams, newIsLazy]);

  useEffect(() => {
    execRequest();
  }, [execRequest]);

  const request = useCallback((myParams?: Record<string, unknown>) => {
    setNewParams(myParams ?? { ...newParams });
    setNewIsLazy(false);
  }, [newParams]);

  return [loading, result, setResult, request, newParams] as const;
}
