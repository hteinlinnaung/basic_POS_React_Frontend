import React from "react";
import { Table as MantineTable } from "@mantine/core";
import { IconSortAscending, IconSortDescending } from "@tabler/icons-react";
import { Order } from '../types';

interface OrderTableProps {
  orders: Order[];
  sortField: keyof Order | "";
  sortOrder: "asc" | "desc";
  handleSort: (field: keyof Order) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, sortField, sortOrder, handleSort }) => {
  return (
    <MantineTable
      horizontalSpacing="lg"
      verticalSpacing="md"
      striped
      highlightOnHover
      withColumnBorders
      withTableBorder
      stickyHeader
      stickyHeaderOffset={60}
      className="mb-9"
    >
      <MantineTable.Thead>
        <MantineTable.Tr>
          {["id", "customerName", "item", "quantity", "total"].map((field) => (
            <MantineTable.Th key={field} onClick={() => handleSort(field as keyof Order)}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
              {sortField === field && (
                sortOrder === "asc" ? <IconSortAscending size={16} /> : <IconSortDescending size={16} />
              )}
            </MantineTable.Th>
          ))}
        </MantineTable.Tr>
      </MantineTable.Thead>
      <MantineTable.Tbody>
        {orders.map(order => (
          <MantineTable.Tr key={order.id}>
            <MantineTable.Td>{order.id}</MantineTable.Td>
            <MantineTable.Td>{order.customerName}</MantineTable.Td>
            <MantineTable.Td>{order.item}</MantineTable.Td>
            <MantineTable.Td>{order.quantity}</MantineTable.Td>
            <MantineTable.Td>{order.total}</MantineTable.Td>
          </MantineTable.Tr>
        ))}
      </MantineTable.Tbody>
    </MantineTable>
  );
};

export default OrderTable;
