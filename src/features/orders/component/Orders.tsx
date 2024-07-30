/* import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Paper,
  Table,
  TextInput,
  Group,
  Stack,
  Title,
  Pagination,
  Center,
  Text,
  Button,
  Modal,
  NumberInput,
} from "@mantine/core";
import {
  IconSearch,
  IconSortAscending,
  IconSortDescending,
  IconPlus,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import { useDebouncedValue } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

// TypeScript interface for Order
interface Order {
  id: number;
  customerName: string;
  item: string;
  quantity: number;
  total: number;
}

// Sample data
const sampleOrders: Order[] = [
  {
    id: 1,
    customerName: "Alice Brown",
    item: "Widget",
    quantity: 3,
    total: 300,
  },
  {
    id: 2,
    customerName: "Bob Green",
    item: "Gadget",
    quantity: 2,
    total: 200,
  },
];

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(sampleOrders);
  const [sortField, setSortField] = useState<keyof Order | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [activePage, setActivePage] = useState<number>(1);
  const itemsPerPage = 5;
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  // Form handling
  const form = useForm({
    initialValues: { search: "" },
  });

  const newOrderForm = useForm({
    initialValues: {
      customerName: "",
      item: "",
      quantity: 1,
      total: 0,
    },
    validate: {
      customerName: (value) => (value ? null : "Customer name is required"),
      item: (value) => (value ? null : "Item is required"),
      quantity: (value) => (value > 0 ? null : "Quantity must be greater than 0"),
      total: (value) => (value >= 0 ? null : "Total must be greater than or equal to 0"),
    },
  });

  const [debouncedSearch] = useDebouncedValue(form.values.search, 300);

  // Filtering orders based on search and sort criteria
  const filterOrders = useCallback(() => {
    let filtered = orders;

    if (debouncedSearch) {
      filtered = filtered.filter(order =>
        order.customerName.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    if (sortField) {
      filtered.sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortField] > b[sortField] ? 1 : -1;
        } else {
          return a[sortField] < b[sortField] ? 1 : -1;
        }
      });
    }

    setFilteredOrders(filtered);
  }, [orders, debouncedSearch, sortField, sortOrder]);

  useEffect(() => {
    filterOrders();
  }, [debouncedSearch, filterOrders, sortField, sortOrder]);

  // Sorting handler
  const handleSort = (field: keyof Order) => {
    setSortField(prevField => prevField === field && sortOrder === "asc" ? "" : field);
    setSortOrder(prevOrder => prevOrder === "asc" ? "desc" : "asc");
  };

  // Paginated orders
  const getPaginatedOrders = () => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredOrders.slice(startIndex, endIndex);
  };

  // Adding new order
  const handleAddOrder = () => {
    const { customerName, item, quantity, total } = newOrderForm.values;

    if (newOrderForm.validate().hasErrors) {
      showNotification({
        title: "Error",
        message: "Please fill out all fields",
        color: "red",
        icon: <IconX />,
        autoClose: 3000,
        position: "top-right",
      });
      return;
    }

    const newOrder: Order = {
      id: orders.length + 1,
      customerName,
      item,
      quantity,
      total,
    };

    setOrders(prevOrders => [newOrder, ...prevOrders]);
    setFilteredOrders(prevOrders => [newOrder, ...prevOrders]);
    newOrderForm.reset();
    setModalOpened(false);

    showNotification({
      title: "Success",
      message: "Order added successfully",
      color: "green",
      icon: <IconCheck />,
      autoClose: 3000,
      position: "top-right",
    });
  };

  return (
    <Container fluid>
      <Paper withBorder shadow="sm" p="md">
        <Stack style={{ overflowX: "auto" }} gap="lg">
          <Title order={2} style={{ textAlign: "center" }}>Orders</Title>
          <Group grow>
            <TextInput
              placeholder="Search by customer name"
              leftSection={<IconSearch />}
              {...form.getInputProps("search")}
            />
            <Button
              leftSection={<IconPlus size={16} />}
              onClick={() => setModalOpened(true)}
            >
              Add Order
            </Button>
          </Group>
          <Table
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
            <Table.Thead>
              <Table.Tr>
                {["id", "customerName", "item", "quantity", "total"].map((field) => (
                  <Table.Th key={field} onClick={() => handleSort(field as keyof Order)}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                    {sortField === field && (
                      sortOrder === "asc" ? <IconSortAscending size={16} /> : <IconSortDescending size={16} />
                    )}
                  </Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {getPaginatedOrders().map(order => (
                <Table.Tr key={order.id}>
                  <Table.Td>{order.id}</Table.Td>
                  <Table.Td>{order.customerName}</Table.Td>
                  <Table.Td>{order.item}</Table.Td>
                  <Table.Td>{order.quantity}</Table.Td>
                  <Table.Td>{order.total}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
          {filteredOrders.length === 0 && (
            <Center mt="lg">
              <Text>No results found</Text>
            </Center>
          )}
          <Center mt="lg">
            <Pagination
              value={activePage}
              onChange={setActivePage}
              total={Math.ceil(filteredOrders.length / itemsPerPage)}
            />
          </Center>
        </Stack>
      </Paper>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Add New Order"
      >
        <form onSubmit={newOrderForm.onSubmit(handleAddOrder)}>
          <Stack>
            <TextInput
              label="Customer Name"
              placeholder="Enter customer name"
              {...newOrderForm.getInputProps("customerName")}
            />
            <TextInput
              label="Item"
              placeholder="Enter item"
              {...newOrderForm.getInputProps("item")}
            />
            <NumberInput
              label="Quantity"
              placeholder="Enter quantity"
              min={1}
              {...newOrderForm.getInputProps("quantity")}
            />
            <NumberInput
              label="Total"
              placeholder="Enter total"
              min={0}
              {...newOrderForm.getInputProps("total")}
            />
            <Group align="right">
              <Button type="submit">Add Order</Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Container>
  );
};

export default Orders;

 */


import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Paper,
  Stack,
  Title,
  Pagination,
  Center,
  Text,
  Button,
  
  TextInput,
  Group,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconSearch, IconPlus, IconCheck, IconX } from "@tabler/icons-react";
import { Order } from './types';
//import OrderTable from './OrderTable';
import AddOrderModal from './subComponents/AddOrderModel';
import OrderTable from './subComponents/OrderTable';
// Sample data
const sampleOrders: Order[] = [
  {
    id: 1,
    customerName: "Alice Brown",
    item: "Widget",
    quantity: 3,
    total: 300,
  },
  {
    id: 2,
    customerName: "Bob Green",
    item: "Gadget",
    quantity: 2,
    total: 200,
  },
];

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(sampleOrders);
  const [sortField, setSortField] = useState<keyof Order | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [activePage, setActivePage] = useState<number>(1);
  const itemsPerPage = 5;
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  // Form handling
  const form = useForm({
    initialValues: { search: "" },
  });

  const [debouncedSearch] = useDebouncedValue(form.values.search, 300);

  // Filtering orders based on search and sort criteria
  const filterOrders = useCallback(() => {
    let filtered = orders;

    if (debouncedSearch) {
      filtered = filtered.filter(order =>
        order.customerName.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    if (sortField) {
      filtered.sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortField] > b[sortField] ? 1 : -1;
        } else {
          return a[sortField] < b[sortField] ? 1 : -1;
        }
      });
    }

    setFilteredOrders(filtered);
  }, [orders, debouncedSearch, sortField, sortOrder]);

  useEffect(() => {
    filterOrders();
  }, [debouncedSearch, filterOrders, sortField, sortOrder]);

  // Sorting handler
  const handleSort = (field: keyof Order) => {
    setSortField(prevField => prevField === field && sortOrder === "asc" ? "" : field);
    setSortOrder(prevOrder => prevOrder === "asc" ? "desc" : "asc");
  };

  // Paginated orders
  const getPaginatedOrders = () => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredOrders.slice(startIndex, endIndex);
  };

  // Adding new order
  const handleAddOrder = (newOrder: Order) => {
    if (newOrder.customerName && newOrder.item && newOrder.quantity > 0 && newOrder.total >= 0) {
      setOrders(prevOrders => [newOrder, ...prevOrders]);
      setFilteredOrders(prevOrders => [newOrder, ...prevOrders]);
      setModalOpened(false);

      showNotification({
        title: "Success",
        message: "Order added successfully",
        color: "green",
        icon: <IconCheck />,
        autoClose: 3000,
        position: "top-right",
      });
    } else {
      showNotification({
        title: "Error",
        message: "Please fill out all fields correctly",
        color: "red",
        icon: <IconX />,
        autoClose: 3000,
        position: "top-right",
      });
    }
  };

  return (
    <Container fluid>
      <Paper withBorder shadow="sm" p="md">
        <Stack style={{ overflowX: "auto" }} gap="lg">
          <Title order={2} style={{ textAlign: "center" }}>Orders</Title>

          <Stack>
          <Group grow>
            <TextInput
              placeholder="Search by customer name"
              leftSection={<IconSearch />}
              {...form.getInputProps("search")}
            />
            <Button
              leftSection={<IconPlus size={16} />}
              onClick={() => setModalOpened(true)}
            >
              Add Order
            </Button>
            </Group>
          </Stack>
          <OrderTable
            orders={getPaginatedOrders()}
            sortField={sortField}
            sortOrder={sortOrder}
            handleSort={handleSort}
          />
          {filteredOrders.length === 0 && (
            <Center mt="lg">
              <Text>No results found</Text>
            </Center>
          )}
          <Center mt="lg">
            <Pagination
              value={activePage}
              onChange={setActivePage}
              total={Math.ceil(filteredOrders.length / itemsPerPage)}
            />
          </Center>
        </Stack>
      </Paper>

      <AddOrderModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        onAddOrder={handleAddOrder}
      />
    </Container>
  );
};

export default Orders;
