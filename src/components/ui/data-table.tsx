
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface DataTableProps<T> {
  data: T[];
  columns?: { key: keyof T; label: string }[];
  caption?: string;
}

export function DataTable<T extends Record<string, any>>({ 
  data, 
  columns, 
  caption 
}: DataTableProps<T>) {
  // If no columns are provided, create them from the first data item
  const tableColumns = columns || 
    (data.length > 0 
      ? Object.keys(data[0]).map(key => ({ 
          key: key as keyof T, 
          label: key.charAt(0).toUpperCase() + key.slice(1) 
        })) 
      : []);
  
  return (
    <Table>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {tableColumns.map((column) => (
            <TableHead key={column.key as string}>
              {column.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {tableColumns.map((column) => (
              <TableCell key={`${index}-${column.key as string}`}>
                {row[column.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
