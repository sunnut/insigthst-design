import { useCallback, useMemo } from 'react';
import { type TableProps } from 'antd';
import { type Result } from './types';
import { useFetch } from './useFetch';
import { usePagination, defaultPagination } from './usePagination';
import { useRowSelection } from './useRowSelection';

type FetchFunction<T extends object> = (params: Record<string, unknown>) => Promise<Result<T>>;

//===================================================================
// clear the empty data of params
//===================================================================
export const processParams = (params: Record<string, unknown>) => {
  if (!params.sortOrder) {
    delete params.sortOrder;
    delete params.sortField;
  }

  for (let [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        delete params[key];
      } else {
        params[key] = value.map(item => {
          if (typeof item === 'object' && item._isAMomentObject) {
            return item.valueOf();
          } else {
            return item;
          }
        });
      }
    } else if (typeof value === 'object') {
      const val = value as { '_isAMomentObject': boolean; };

      if (val._isAMomentObject) {
        params[key] = val.valueOf();
      }
    }
  }
};

interface UseTableProps<T extends object> {
  getData: FetchFunction<T[]>;
  params?: Record<string, unknown>;
  options?: Partial<TableProps<T>>;
}

//===================================================================
// Hooks For Table
//===================================================================
export function useTable<T extends object>({
  getData,
  params = {},
  options = {}
}: UseTableProps<T>) {
  let hidePagination = options.pagination === false;
  const newParams = useMemo(() => {
    const { current: page, pageSize: per } = {
      ...defaultPagination,
      ...options.pagination
    };
    return !hidePagination
      ? {
        page,
        per,
        ...params
      }
      : params;
  }, [hidePagination, params])

  const [loading, result, setResult, request, oldParams] = useFetch(getData, newParams);
  const dataSource = useMemo(() => addKeyForTableData<T>(
    hidePagination,
    result as Result<T>,
    oldParams as Record<string, unknown>
  ), [result]);

  const paginationConfig = {
    total: hidePagination ? 0 : (result === null ? 0 : result.total),
    ...(options.pagination || {})
  };

  const { newPagination, setPagination } = usePagination(paginationConfig, hidePagination);
  const [rowSelection, selectedList, resetSelection] = useRowSelection(options.rowSelection);

  const refresh = useCallback((newParams?: Record<string, unknown>) => {
    request((newParams || { ...oldParams }));
    resetSelection();

    if (newPagination !== false) {
      setPagination({
        current: newParams?.page as number ?? newPagination?.current ?? 1,
        pageSize: newParams?.per as number ?? newPagination?.pageSize ?? 10,
      });
    }
  }, [request, oldParams, resetSelection, newPagination, setPagination]);

  const tableProps: Partial<TableProps<T>> = {
    ...options,
    loading,
    dataSource,
    pagination: newPagination,
    rowSelection,
    onChange: (pagination, filters, sorter) => {
      const newParams: Record<string, unknown> = {
        ...oldParams,
        page: pagination.current,
        per: pagination.pageSize,
        sortField: Array.isArray(sorter) ? sorter[0].field : sorter.field,
        sortOrder: Array.isArray(sorter) ? sorter[0].order : sorter.order,
        ...filters
      };
      processParams(newParams);
      refresh(newParams);
    }
  };

  return {
    tableProps,
    refresh,
    oldParams,
    selectedList,
    resetSelection,
    result,
    setResult
  };
}

//===================================================================
// Add Key property For Table data
//===================================================================
function addKeyForTableData<T extends object>(
  hidePagination: boolean,
  result: Result<T>,
  params: Record<string, unknown>
) {
  if (!result) return [];
  let data = (result.data || []) as T[];

  if (hidePagination) {
    // No pagination
    return data.map((item: T, index: number) => ({ key: index, ...item }));
  } else if (params) {
    let current = (params.page as number) - 1;
    let pageSize = params.per as number;
    return data.map((item: T, index: number) => ({ key: index + current * pageSize, ...item }));
  }

  return [];
};
