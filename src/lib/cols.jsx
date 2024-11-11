import { Button } from "@/components/ui/button";
import ArrowDownCustom from "@/Icons/ArrowDownCustom";
import { BuyBoxBadge } from "@/Icons/BuyboxBadge";
import { ProBadge } from "@/Icons/ProBadge";

const ROTATE_VALUE_MAP = {
  asc: false,
  desc: true,
};
// Track the initial state of the sorted column (e.g., BB % sorted in desc)
const INITIAL_SORT_STATE = {
  id: "percent", // The BB % column accessor key
  desc: true, // Default to descending order
};

//Table columns
export const tableColumns = [
  {
    accessorKey: "sellerName",
    header: <div className="w-[70px]">Seller</div>,
    cell: ({ row }) => {
      const sellerCategory = row.original?.sellerCategory?.toUpperCase();
      const isOOS = sellerCategory === "";
      const isWalmart =
        row.getValue("sellerName").toUpperCase() === "WALMART.COM";

      const sellerNameContent = (
        <div>
          <div className="">{row.getValue("sellerName")}</div>
          <div className="flex justify-start items-center gap-[5px] mt-[5px]">
            {sellerCategory && (
              <div
                style={{
                  fontSize: "11px",
                  fontFamily: "Poppins",
                  color: row.original.buybox_winner ? "#0171DC" : "",
                }}
              >
                {sellerCategory === "WLMT" ? "WMT" : sellerCategory}
              </div>
            )}
            {row.original["buybox_winner"] && (
              <div title="Seller is currently on the Buy Box">
                <BuyBoxBadge />
              </div>
            )}
            {row.original["pro_seller"] && (
              <div title="Pro Seller">
                <ProBadge />
              </div>
            )}
          </div>
        </div>
      );

      if (isOOS) {
        // If sellerCategory is "OOS", return plain text (no link)
        return <div style={{ fontSize: "11px" }}>{sellerNameContent}</div>;
      }

      // If sellerCategory is "Walmart.com", link to Walmart homepage
      const sellerLink = isWalmart
        ? "https://www.walmart.com/"
        : `https://www.walmart.com/global/seller/${row.original["catalogSellerId"]}`;

      return (
        <a
          className="no-underline"
          target="_blank"
          style={{ fontSize: "11px" }}
          href={sellerLink}
        >
          {sellerNameContent}
        </a>
      );
    },
  },
  {
    accessorKey: "percent",
    header: ({ column }) => {
      const showArrow = column.getIsSorted() === "asc";
      return (
        <Button
          variant="ghost"
          style={{
            fontSize: "11px",
            fontWeight: showArrow ? "600" : "",
            color: showArrow ? "black" : "",
          }}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          BB %{showArrow && <ArrowDownCustom rotate={!showArrow} />}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-left ml-[3px]">{`${row.getValue("percent")}%`}</div>
    ),
  },
  {
    accessorKey: "avg_price",
    header: ({ column, table }) => {
      return (
        <Button
          variant="ghost"
          style={{
            fontSize: "11px",
            fontWeight: column.getIsSorted() ? "600" : "",
            color: column.getIsSorted() ? "black" : "",
          }}
          onClick={() => {
            const currentSortState = column.getIsSorted();

            if (!currentSortState) {
              // If not sorted, set to descending
              column.toggleSorting(true);
            } else if (currentSortState === "desc") {
              // If descending, set to ascending
              column.toggleSorting(false);
            } else {
              // If ascending, clear sort
              column.clearSorting();
              table.setSorting([INITIAL_SORT_STATE]); // Reset sorting
            }
          }}
        >
          Avg Price
          {column.getIsSorted() && (
            <ArrowDownCustom rotate={ROTATE_VALUE_MAP[column.getIsSorted()]} />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      let formatted;
      if (row.getValue("avg_price")) {
        const amount = parseFloat(row.getValue("avg_price"));

        // Format the amount as a dollar amount
        formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
      } else {
        formatted = "OOS";
      }

      return <div className="text-left ml-[5px] ">{formatted}</div>;
    },
  },
  {
    accessorKey: "current_price",
    header: ({ column, table }) => {
      return (
        <Button
          variant="ghost"
          style={{
            fontSize: "11px",
            fontWeight: column.getIsSorted() ? "600" : "",
            color: column.getIsSorted() ? "black" : "",
          }}
          onClick={() => {
            const currentSortState = column.getIsSorted();

            if (!currentSortState) {
              // If not sorted, set to descending
              column.toggleSorting(true);
            } else if (currentSortState === "desc") {
              // If descending, set to ascending
              column.toggleSorting(false);
            } else {
              // If ascending, clear sort
              column.clearSorting();
              table.setSorting([INITIAL_SORT_STATE]); // Reset sorting
            }
          }}
        >
          Current
          <br />
          Price
          {/* <ArrowUpDown
            className="ml-2 h-4 w-4"
            style={{
              marginLeft: "5px",
              color:
                column.getIsSorted() === "desc" ||
                column.getIsSorted() === "asc"
                  ? "black"
                  : "",
            }}
          /> */}
          {column.getIsSorted() && (
            <ArrowDownCustom rotate={ROTATE_VALUE_MAP[column.getIsSorted()]} />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      let formatted;
      if (row.getValue("current_price")) {
        const amount = parseFloat(row.getValue("current_price"));

        // Format the amount as a dollar amount
        formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
      } else {
        formatted = "OOS";
      }

      return <div className="text-left ml-[3px] ">{formatted}</div>;
    },
  },
  {
    accessorKey: "qty",
    header: ({ column, table }) => {
      return (
        <Button
          variant="ghost"
          style={{
            fontSize: "11px",
            fontWeight: column.getIsSorted() ? "600" : "",
            color: column.getIsSorted() ? "black" : "",
          }}
          onClick={() => {
            const currentSortState = column.getIsSorted();

            if (!currentSortState) {
              // If not sorted, set to descending
              column.toggleSorting(true);
            } else if (currentSortState === "desc") {
              // If descending, set to ascending
              column.toggleSorting(false);
            } else {
              // If ascending, clear sort
              column.clearSorting();
              table.setSorting([INITIAL_SORT_STATE]); // Reset sorting
            }
          }}
        >
          QTY
          {/* <ArrowUpDown
            className="ml-2 h-4 w-4"
            style={{
              marginLeft: "5px",
              color:
                column.getIsSorted() === "desc" ||
                column.getIsSorted() === "asc"
                  ? "black"
                  : "",
            }}
          /> */}
          {column.getIsSorted() && (
            <ArrowDownCustom rotate={ROTATE_VALUE_MAP[column.getIsSorted()]} />
          )}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-left ml-[3px] ">{row.getValue("qty")}</div>
    ),
  },
  {
    accessorKey: "lastWon",
    header: ({ column, table }) => {
      return (
        <Button
          variant="ghost"
          style={{
            fontSize: "11px",
            fontWeight: column.getIsSorted() ? "600" : "",
            color: column.getIsSorted() ? "black" : "",
          }}
          onClick={() => {
            const currentSortState = column.getIsSorted();

            if (!currentSortState) {
              // If not sorted, set to descending
              column.toggleSorting(true);
            } else if (currentSortState === "desc") {
              // If descending, set to ascending
              column.toggleSorting(false);
            } else {
              // If ascending, clear sort
              column.clearSorting();
              table.setSorting([INITIAL_SORT_STATE]); // Reset sorting
            }
          }}
        >
          Last
          <br />
          Won
          {/* <ArrowUpDown
            className="ml-2 h-4 w-4"
            style={{
              marginLeft: "5px",
              color:
                column.getIsSorted() === "desc" ||
                column.getIsSorted() === "asc"
                  ? "black"
                  : "",
            }}
          /> */}
          {column.getIsSorted() && (
            <ArrowDownCustom rotate={ROTATE_VALUE_MAP[column.getIsSorted()]} />
          )}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-left ml-[3px] ">{row.getValue("lastWon")}</div>
    ),
    sortingFn: (rowA, rowB, columnId) => {
      const dateA = new Date(rowA.getValue(columnId));
      const dateB = new Date(rowB.getValue(columnId));
      return dateA - dateB; // Compare date objects
    },
  },
];
