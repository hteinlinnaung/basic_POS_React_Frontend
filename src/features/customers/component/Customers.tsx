
import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Paper,
  Table,
  TextInput,
  Select,
  Group,
  Stack,
  Title,
  Pagination,
  Center,
  Text,
  Button,
  Modal,
 // useMantineTheme,
} from "@mantine/core";
import {
  IconSearch,
  IconSortAscending,
  IconSortDescending,
  IconPlus,
//  IconUser,
} from "@tabler/icons-react";
import { useDebouncedValue } from "@mantine/hooks";
import { useForm } from "@mantine/form";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
}

// Sample data
const sampleCustomers: Customer[] = [
  { id: 1, name: "Alice Brown", email: "alice@example.com", phone: "123-456-7890", status: "Active" },
  { id: 2, name: "Bob Green", email: "bob@example.com", phone: "234-567-8901", status: "Inactive" },
  // Add more sample data as needed
];

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(sampleCustomers);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(sampleCustomers);
  const [sortField, setSortField] = useState<keyof Customer | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [activePage, setActivePage] = useState<number>(1);
  const itemsPerPage = 5;
  const [modalOpened, setModalOpened] = useState(false);
  //const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      search: "",
      status: "",
    },
  });

  const newCustomerForm = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      status: "Active",
    },
    validate: {
      name: (value) => (value ? null : 'Name is required'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      phone: (value) => (value ? null : 'Phone number is required'),
    },
  });

  const [debouncedSearch] = useDebouncedValue(form.values.search, 300);


  const filterCustomers = useCallback(() => {
    let filtered = customers;

    if (debouncedSearch) {
      filtered = filtered.filter((customer) =>
        customer.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    if (form.values.status) {
      filtered = filtered.filter((customer) => customer.status === form.values.status);
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

    setFilteredCustomers(filtered);
  },[customers, debouncedSearch, form.values.status, sortField, sortOrder]);

  useEffect(() => {
    filterCustomers();
  }, [debouncedSearch, filterCustomers, form.values.status, sortField, sortOrder]);



  const handleSort = (field: keyof Customer) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const getPaginatedCustomers = () => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCustomers.slice(startIndex, endIndex);
  };

  const handleAddCustomer = () => {
    if (newCustomerForm.validate().hasErrors) return;
    const newCustomer: Customer = {
      id: customers.length + 1,
      ...newCustomerForm.values,
    };
    setCustomers([...customers, newCustomer]);
    setFilteredCustomers([...customers, newCustomer]);
    newCustomerForm.reset();
    setModalOpened(false);
  };

  return (
    <Container fluid>
      <Paper withBorder shadow="sm" p="md">
        <Stack  style={{overflowX:'auto'}} gap="lg">
          <Title order={2} style={{ textAlign: "center" }}>
            Customers
          </Title>
          <Group grow>
            <TextInput
              placeholder="Search by name"
              leftSection={<IconSearch />}
              {...form.getInputProps("search")}
            />
            <Select
              placeholder="Filter by status"
              data={["", "Active", "Inactive"]}
              {...form.getInputProps("status")}
            />
            <Button leftSection={<IconPlus size={16} />} onClick={() => setModalOpened(true)}>
              Add Customer
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
                <Table.Th onClick={() => handleSort("id")}>
                  ID{" "}
                  {sortField === "id" &&
                    (sortOrder === "asc" ? (
                      <IconSortAscending size={16} />
                    ) : (
                      <IconSortDescending size={16} />
                    ))}
                </Table.Th>
                <Table.Th onClick={() => handleSort("name")}>
                  Name{" "}
                  {sortField === "name" &&
                    (sortOrder === "asc" ? (
                      <IconSortAscending size={16} />
                    ) : (
                      <IconSortDescending size={16} />
                    ))}
                </Table.Th>
                <Table.Th onClick={() => handleSort("email")}>
                  Email{" "}
                  {sortField === "email" &&
                    (sortOrder === "asc" ? (
                      <IconSortAscending size={16} />
                    ) : (
                      <IconSortDescending size={16} />
                    ))}
                </Table.Th>
                <Table.Th onClick={() => handleSort("phone")}>
                  Phone{" "}
                  {sortField === "phone" &&
                    (sortOrder === "asc" ? (
                      <IconSortAscending size={16} />
                    ) : (
                      <IconSortDescending size={16} />
                    ))}
                </Table.Th>
                <Table.Th onClick={() => handleSort("status")}>
                  Status{" "}
                  {sortField === "status" &&
                    (sortOrder === "asc" ? (
                      <IconSortAscending size={16} />
                    ) : (
                      <IconSortDescending size={16} />
                    ))}
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {getPaginatedCustomers().map((customer) => (
                <Table.Tr key={customer.id}>
                  <Table.Td>{customer.id}</Table.Td>
                  <Table.Td>{customer.name}</Table.Td>
                  <Table.Td>{customer.email}</Table.Td>
                  <Table.Td>{customer.phone}</Table.Td>
                  <Table.Td>{customer.status}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
         
          {filteredCustomers.length === 0 && (
            <Center mt="lg">
              <Text>No results found</Text>
            </Center>
          )}
          <Center mt="lg">
            <Pagination
              value={activePage}
              onChange={setActivePage}
              total={Math.ceil(filteredCustomers.length / itemsPerPage)}
            />
          </Center>
        </Stack>
      </Paper>

      <Modal opened={modalOpened} onClose={() => setModalOpened(false)} title="Add New Customer">
        <form onSubmit={newCustomerForm.onSubmit(handleAddCustomer)}>
          <Stack>
            <TextInput
              label="Name"
              placeholder="Enter customer name"
              {...newCustomerForm.getInputProps("name")}
            />
            <TextInput
              label="Email"
              placeholder="Enter customer email"
              {...newCustomerForm.getInputProps("email")}
            />
            <TextInput
              label="Phone"
              placeholder="Enter customer phone number"
              {...newCustomerForm.getInputProps("phone")}
            />
            <Select
              label="Status"
              data={["Active", "Inactive"]}
              {...newCustomerForm.getInputProps("status")}
            />
            <Group align="right">
              <Button type="submit">Add Customer</Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Container>
  );
};

export default Customers;
