import React from "react";
import {
  tableCaption,
  tableCellRecipe,
  tableHead,
  tableHeaderCell,
  tableRecipe,
  tableRow,
  tableRowStriped,
  tableWrapper,
} from "../../styles/recipes/table.css";
import { cn } from "../../utils";

type TableSize = "sm" | "md";

interface TableContextValue {
  size: TableSize;
  striped: boolean;
}

const TableContext = React.createContext<TableContextValue>({
  size: "md",
  striped: false,
});

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Accessible name of the table, rendered as its caption. */
  caption?: React.ReactNode;
  /** Cell density. */
  size?: TableSize;
  /** Shade every other body row. */
  striped?: boolean;
  /** Class for the scroll container around the table. */
  wrapperClassName?: string;
  children: React.ReactNode;
}

/**
 * Data table. The wrapper scrolls horizontally on its own, so a wide table
 * never makes the page scroll sideways.
 */
export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (
    {
      caption,
      size = "md",
      striped = false,
      wrapperClassName,
      className,
      children,
      ...props
    },
    ref,
  ) => (
    <TableContext.Provider value={{ size, striped }}>
      <div className={cn(tableWrapper, wrapperClassName)}>
        <table
          ref={ref}
          className={cn(tableRecipe({ size }), className)}
          {...props}
        >
          {caption && <caption className={tableCaption}>{caption}</caption>}
          {children}
        </table>
      </div>
    </TableContext.Provider>
  ),
);
Table.displayName = "Table";

export const TableHead = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn(tableHead, className)} {...props} />
));
TableHead.displayName = "TableHead";

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>((props, ref) => <tbody ref={ref} {...props} />);
TableBody.displayName = "TableBody";

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => {
  const { striped } = React.useContext(TableContext);
  return (
    <tr
      ref={ref}
      className={cn(tableRow, striped && tableRowStriped, className)}
      {...props}
    />
  );
});
TableRow.displayName = "TableRow";

export interface TableCellProps
  extends Omit<React.TdHTMLAttributes<HTMLTableCellElement>, "align"> {
  /** "end" right-aligns the cell, for numbers. */
  align?: "start" | "end";
}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ align = "start", className, ...props }, ref) => {
    const { size } = React.useContext(TableContext);
    return (
      <td
        ref={ref}
        className={cn(tableCellRecipe({ size, align }), className)}
        {...props}
      />
    );
  },
);
TableCell.displayName = "TableCell";

export interface TableHeaderCellProps
  extends Omit<React.ThHTMLAttributes<HTMLTableCellElement>, "align"> {
  /** "end" right-aligns the header, to sit over a numeric column. */
  align?: "start" | "end";
}

/** Column header. Defaults to `scope="col"`. */
export const TableHeaderCell = React.forwardRef<
  HTMLTableCellElement,
  TableHeaderCellProps
>(({ align = "start", scope = "col", className, ...props }, ref) => {
  const { size } = React.useContext(TableContext);
  return (
    <th
      ref={ref}
      scope={scope}
      className={cn(
        tableCellRecipe({ size, align }),
        tableHeaderCell,
        className,
      )}
      {...props}
    />
  );
});
TableHeaderCell.displayName = "TableHeaderCell";
