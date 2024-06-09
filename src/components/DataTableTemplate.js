import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { useRouter } from 'next/router';

import { tableConfig } from '@/utils/config';
import { getPaginationData } from '@/utils/format';
import paginatorTemplate from '@/components/PaginatorTemplate';

export default function DataTableTemplate({
  search = '',
  apiToUse,
  refreshData,
  dropdownValue,
  startDate,
  endDate,
  expandedRows,
  onRowToggle,
  rowExpansionTemplate,
  dataParams = {},
  disableDisplay = false,
  paramsCallback = null,
  doesUserTakeAction = true,
  defaultFunction,
  ...props
}) {
  const router = useRouter();
  const { paginationParams } = router.query;
  const paginationData = JSON.parse(paginationParams || '{}')

  const defaultRow = 2;
  const rowOptions = [2, 5, 10, 15];

  const [data, setData] = useState([]);
  const [params, setParams] = useState({
    rows: defaultRow,
    page: 0,
    first: 0,
    count: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const refresh = async (e = {}) => {
    try {
      setIsLoading(true);
      if (!disableDisplay) {
        if (props?.value) {
          setData(props.value);
        } else {
          const res = await apiToUse({
            ...e,
            page_size: e.rows,
            page: e.page + 1
          });
          setParams((prevData) => ({
            ...prevData,
            rows: e.rows,
            count: res.data.count,
            page: e.page + 1,
            first: e.page * e.rows,
          }));
          if (paramsCallback)
            paramsCallback({
              rows: e.rows,
              count: res.data.count,
              page: e.page + 1,
              first: e.page * e.rows,
            });
          setData(res.data.results);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!doesUserTakeAction) {
      const initParams = {
        rows: getPaginationData({
          data: paginationData,
          key: 'rows',
          defaultReturn: defaultRow
        }),
        page: getPaginationData({
          data: paginationData,
          key: 'page',
          defaultReturn: 0,
          changeReturnData: (val) => parseInt(val) - 1 
        }),
        first: getPaginationData({
          data: paginationData,
          key: 'first',
          defaultReturn: 0,
        }),
        count: getPaginationData({
          data: paginationData,
          key: 'count',
          defaultReturn: 0
        }),
      }
      refresh({
        ...params,
        ...dataParams,
        ...paginationData,
        ...initParams
      });
      router.push(
        {
          query: {},
        },
        undefined,
        { shallow: true }
      );
    }
  }, [])

  useEffect(() => {
    if (doesUserTakeAction) {
      refresh({
        ...params,
        ...dataParams,
        ...(doesUserTakeAction ? {
          page: 0,
          first: 0,
          count: 0,
        } : {
          ...paginationData,
          ...initParams,
        })
      });
    }
  }, [refreshData]);

  return (
    <DataTable
      value={data}
      dataKey="id"
      lazy
      paginator={true}
      paginatorTemplate={paginatorTemplate}
      rows={params.rows}
      first={params.first}
      expandedRows={expandedRows}
      onRowToggle={onRowToggle}
      rowExpansionTemplate={rowExpansionTemplate}
      totalRecords={params.count}
      emptyMessage="Nothing to display."
      onPage={(e) => {
        refresh({
          ...dataParams,
          rows: e.rows,
          page: e.page,
          first: e.first,
        });
      }}
      onSort={(e) => setParams({ ...e, ...tableConfig.startPage })}
      loading={isLoading}
      rowsPerPageOptions={rowOptions}
      {...props}
    >
      {props.children}
    </DataTable>
  );
}
