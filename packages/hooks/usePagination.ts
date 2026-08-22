import { useMemo, useState } from "react";
import { type TablePaginationConfig, type TableProps } from 'antd';

interface Pagination {
  current: number;
  pageSize: number;
}

//===================================================================
// Default Pagination
//===================================================================
export const defaultPagination: Pagination = {
  current: 1,
  pageSize: 10
};

//===================================================================
// Hooks For Pagination
//===================================================================
export function usePagination<T extends object>(
  config: TablePaginationConfig,
  hidePage = false
) {
  const [pagination, setPagination] = useState({
    ...defaultPagination,
    pageSize: config.pageSize
  });
  
  const paginationConfig = useMemo(() => {
    if (hidePage) {
      return false;
    } else {
      return {
        ...config,
        ...pagination,
        showSizeChanger: false,
        pageSizeOptions: ['5', '10', '20', '30', '50'],
        onChange: (current: number, pageSize: number) => {
          setPagination({ pageSize, current });
        },
        onShowSizeChange: (current: number, pageSize: number) => {
          setPagination({ pageSize, current });
        }
      };
    }
  }, [config, hidePage, pagination]) as TableProps<T>['pagination'];

  return { newPagination: paginationConfig, setPagination };
};
