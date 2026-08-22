import { type Key, useCallback, useMemo, useState } from "react";
import { type TableProps } from "antd";

type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];

//===================================================================
// Hooks For RowSelection
//===================================================================
export function useRowSelection<T extends object>(
  options: TableRowSelection<T>
): [TableRowSelection<T>, T[], () => void] {
  const [selectedList, setSelectedList] = useState<T[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const rowSelection = useMemo(() => {
    if (!options) return undefined;
    return {
      columnWidth: "44px",
      selectedRowKeys,
      onChange: (selectedRowKeys: any) => {
        setSelectedRowKeys(selectedRowKeys);
      },
      onSelect: (record: any, selected: any) => {
        if (selected) {
          setSelectedList([...selectedList, record]);
        } else {
          setSelectedList(selectedList.filter((x) => (x as T & { key: Key }).key !== record.key));
        }
      },
      onSelectAll: (selected: any, _selectedRows: any, changeRows: any) => {
        if (selected) {
          setSelectedList([...selectedList, ...changeRows]);
        } else {
          setSelectedList(selectedList.filter((x: any) => changeRows.find((y: any) => x.key === y.key) === undefined));
        }
      }
    };
  }, [selectedList, selectedRowKeys]);

  // 操作完取消选中
  const resetSelection = useCallback(() => {
    setSelectedList([]);
    setSelectedRowKeys([]);
  }, []);

  return [rowSelection, selectedList, resetSelection];
};
