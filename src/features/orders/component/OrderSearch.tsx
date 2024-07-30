import React from 'react';
import { TextInput, Group, Button } from '@mantine/core';
import { IconSearch, IconPlus } from '@tabler/icons-react';

interface OrderSearchProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  openModal: () => void;
}

const OrderSearch: React.FC<OrderSearchProps> = ({ search, setSearch, openModal }) => (
  <Group grow>
    <TextInput
      placeholder="Search by customer name"
      leftSection={<IconSearch />}
      value={search}
      onChange={(e) => setSearch(e.currentTarget.value)}
    />
    <Button
      leftSection={<IconPlus size={16} />}
      onClick={openModal}
    >
      Add Order
    </Button>
  </Group>
);

export default OrderSearch;
