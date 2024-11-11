import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tableColumns } from "./lib/cols";

const colorCodes = {
  wfs: "#DCEEFF",
  wlmt: "#D0E2F1",
  mfn: "#F8FBFF",
};

export function SellersTable({ sellersData }) {
  const [sorting, setSorting] = React.useState([{ id: "percent", desc: true }]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  // const [resetVisible, setResetVisible] = React.useState(false);
  

  const table = useReactTable({
    data: sellersData,
    columns: tableColumns,
    onSortingChange: (newSorting) => {
      setSorting(newSorting);
      // if (sorting[0]?.id == "percent" && sorting[0]?.desc === false) {
      //   setResetVisible(false);
      // } else {
      //   setResetVisible(true);
      // }
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // // Function to reset sorting and filters
  // const resetTable = () => {
  //   setSorting([{ id: "percent", desc: true }]); // Keep sorting for BuyBox Win %
  //   setColumnFilters([]);
  //   setResetVisible(false); // Hide reset button after reset
  // };

  return (
    <div className="flex flex-col items-center gap-[10px]">
      {/* <div
        style={{
          alignSelf: "flex-end",
          marginRight: "18px",
          minHeight: "20px", // Ensure the height is fixed to avoid layout shift
        }}
      >
        <div
          onClick={resetTable}
          style={{
            borderRadius: "14px",
            border: "1px solid transparent",
            padding: "2px 10px",
            fontSize: "10px",
            fontWeight: 600,
            backgroundColor: "rgb(50 50 54)",
            color: "white",
            transition: "background-color 0.2s",
            cursor: resetVisible ? "pointer" : "default",
            outline: "none",
            visibility: resetVisible ? "visible" : "hidden", // This ensures the button is hidden but the space is maintained
          }}
        >
          Reset
        </div>
      </div> */}
      <div className="w-full">
        <div className="rounded-md border">
          <Table>
            <TableHeader style={{ fontFamily: "Poppins" }}>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    style={{
                      fontFamily: "Poppins",
                      backgroundColor:
                        colorCodes[
                          row.original["sellerCategory"].toLowerCase()
                        ],
                      fontWeight: row.original["buybox_winner"] ? "600" : "",
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={tableColumns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
