import React, { useCallback, useMemo, useRef } from "react";
import {
  AgGridReact as ReactAgGrid,
  AgGridReactProps,
  AgReactUiProps
} from "ag-grid-react";
import { GridReadyEvent } from "ag-grid-community";

export const AgGridReact = (props: AgGridReactProps | AgReactUiProps | {}) => {
  const gridRef = useRef<ReactAgGrid>(null);
  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
      resizable: true
    };
  }, []);

  const onFirstDataRendered = useCallback((params: any) => {
    gridRef?.current!.api.sizeColumnsToFit();
    // gridRef?.current!.columnApi.autoSizeAllColumns(true);
    // gridRef?.current!.api.sizeColumnsToFit({
    //   defaultMinWidth: 100,
    //   columnLimits: [{ key: 'country', minWidth: 900 }],
    // });
    // const allColumnIds: string[] = [];
    // gridRef.current!.columnApi.getAllColumns()!.forEach((column) => {
    //   allColumnIds.push(column.getId());
    // });
    // gridRef.current!.columnApi.autoSizeColumns(allColumnIds, false);
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    //params.api.sizeColumnsToFit();
    window.addEventListener("resize", function () {
      setTimeout(function () {
        params.api.sizeColumnsToFit();
        //params.columnApi.autoSizeAllColumns(true);
        //     const allColumnIds: string[] = [];
        // gridRef.current!.columnApi.getAllColumns()!.forEach((column) => {
        //   allColumnIds.push(column.getId());
        // });
        // gridRef.current!.columnApi.autoSizeColumns(allColumnIds, false);
      });
    });
    gridRef?.current!.api.sizeColumnsToFit();
    //gridRef?.current!.columnApi.autoSizeAllColumns(true);
    // const allColumnIds: string[] = [];
    // gridRef.current!.columnApi.getAllColumns()!.forEach((column) => {
    //   allColumnIds.push(column.getId());
    // });
    // gridRef.current!.columnApi.autoSizeColumns(allColumnIds, false);
  }, []);

  return (
      <ReactAgGrid
        ref={gridRef}
        defaultColDef={defaultColDef}
        onFirstDataRendered={onFirstDataRendered}
        onGridReady={onGridReady}
        {...props}
      ></ReactAgGrid>
  );
};
