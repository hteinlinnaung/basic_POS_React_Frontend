import React from 'react';
import { Pagination, Center } from '@mantine/core';

interface OrderPaginationProps {
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  totalItems: number;
  itemsPerPage: number;
}

const OrderPagination: React.FC<OrderPaginationProps> = ({ activePage, setActivePage, totalItems, itemsPerPage }) => (
  <Center mt="lg">
    <Pagination
      value={activePage}
      onChange={setActivePage}
      total={Math.ceil(totalItems / itemsPerPage)}
    />
  </Center>
);

export default OrderPagination;
