import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Stack,
  Group,
  TextInput,
  Select,
  Button,
  Table,
  Pagination,
  Modal,
  Paper,
  Text,
  Title,
  Notification,
  rem,
  Center,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDebouncedValue } from "@mantine/hooks";
import {
  IconSearch,
  IconSortAscending,
  IconSortDescending,
  IconCheck,
} from "@tabler/icons-react";

interface ItemData {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

const sampleData = [
  { id: 1, name: "Item A", price: 30, category: "Category 1", stock: 100 },
  { id: 2, name: "Item B", price: 25, category: "Category 2", stock: 50 },
  { id: 3, name: "Item C", price: 35, category: "Category 1", stock: 75 },
  // Add more sample data as needed
];

const Sales: React.FC = () => {
  const [data] = useState<ItemData[]>(sampleData);
  const [filteredData, setFilteredData] = useState<ItemData[]>(sampleData);
  const [sortField, setSortField] = useState<keyof ItemData | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [activePage, setActivePage] = useState<number>(1);
  const itemsPerPage = 5;
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ItemData | null>(null);

  const form = useForm({
    initialValues: {
      search: "",
      category: "",
    },
  });

  const [debouncedSearch] = useDebouncedValue(form.values.search, 300);

  const filterData = useCallback(() => {
    let filtered = data;

    // Apply search filter
    if (debouncedSearch) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
    }

    // Apply category filter
    if (form.values.category) {
      filtered = filtered.filter(
        (item) => item.category === form.values.category,
      );
    }

    // Apply sorting
    if (sortField) {
      filtered.sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortField] > b[sortField] ? 1 : -1;
        } else {
          return a[sortField] < b[sortField] ? 1 : -1;
        }
      });
    }

    setFilteredData(filtered);
  }, [data, debouncedSearch, form.values.category, sortField, sortOrder]);

  useEffect(() => {
    filterData();
  }, [filterData]);

  const handleSort = (field: keyof ItemData) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const getPaginatedData = () => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const handleItemClick = (item: ItemData) => {
    setSelectedItem(item);
    setModalOpened(true);
  };

  return (
    <Container fluid>
      <Paper withBorder shadow="sm" p="md">
        <Stack gap="lg">
          <Title order={2} style={{ textAlign: "center" }}>
            Sales
          </Title>
          <Group grow>
            <TextInput
              placeholder="Search by name"
              leftSection={<IconSearch />}
              {...form.getInputProps("search")}
            />
            <Select
              placeholder="Filter by category"
              data={["", "Category 1", "Category 2"]}
              {...form.getInputProps("category")}
            />
          </Group>
          <Table
            horizontalSpacing="lg"
            verticalSpacing="md"
            striped
            highlightOnHover
            /* highlightOnHoverColor="green" */
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
                <Table.Th onClick={() => handleSort("price")}>
                  Price{" "}
                  {sortField === "price" &&
                    (sortOrder === "asc" ? (
                      <IconSortAscending size={16} />
                    ) : (
                      <IconSortDescending size={16} />
                    ))}
                </Table.Th>
                <Table.Th onClick={() => handleSort("category")}>
                  Category{" "}
                  {sortField === "category" &&
                    (sortOrder === "asc" ? (
                      <IconSortAscending size={16} />
                    ) : (
                      <IconSortDescending size={16} />
                    ))}
                </Table.Th>
                <Table.Th onClick={() => handleSort("stock")}>
                  Stock{" "}
                  {sortField === "stock" &&
                    (sortOrder === "asc" ? (
                      <IconSortAscending size={16} />
                    ) : (
                      <IconSortDescending size={16} />
                    ))}
                </Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {getPaginatedData().map((item) => (
                <Table.Tr key={item.id} onClick={() => handleItemClick(item)}>
                  <Table.Td>{item.id}</Table.Td>
                  <Table.Td>{item.name}</Table.Td>
                  <Table.Td>{item.price}</Table.Td>
                  <Table.Td>{item.category}</Table.Td>
                  <Table.Td>{item.stock}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
          {filteredData.length === 0 && (
            <Center mt="lg">
              <Text>No results found</Text>
            </Center>
          )}
          <Center mt="lg">
            <Pagination
              value={activePage}
              onChange={setActivePage}
              total={Math.ceil(filteredData.length / itemsPerPage)}
            />
          </Center>
        </Stack>
      </Paper>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Item Details"
      >
        {selectedItem && (
          <Stack>
            <Text>ID: {selectedItem.id}</Text>
            <Text>Name: {selectedItem.name}</Text>
            <Text>Price: ${selectedItem.price}</Text>
            <Text>Category: {selectedItem.category}</Text>
            <Text>Stock: {selectedItem.stock}</Text>
            <Button
              onClick={() => {
                // Add to cart logic
                setModalOpened(false);

                <Notification icon={checkIcon} color="green" title="Success">
                  {`${selectedItem.name} added to cart`}
                </Notification>;
              }}
            >
              Add to Cart
            </Button>
          </Stack>
        )}
      </Modal>
    </Container>
  );
};

export default Sales;
