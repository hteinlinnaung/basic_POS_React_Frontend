import React, { useState, useEffect } from "react";
import { useForm, isNotEmpty } from "@mantine/form";
import { useDebouncedValue } from "@mantine/hooks";
import {
  Table,
  Stack,
  Select,
  TextInput,
  Group,
  Pagination,
  Title,
  Container,
  Paper,
  Center,
  Text,
} from "@mantine/core";
import {
  IconSearch,
  IconSortAscending,
  IconSortDescending,
} from "@tabler/icons-react";

// Sample data for demonstration purposes
const sampleData = [
  { id: 1, name: "John Doe", age: 30, status: "Active" },
  { id: 2, name: "Jane Smith", age: 25, status: "Inactive" },
  { id: 3, name: "Michael Johnson", age: 35, status: "Active" },
  // Add more sample data as needed
];

interface ReportData {
  id: number;
  name: string;
  age: number;
  status: string;
}

const Report: React.FC = () => {
  const [data] = useState<ReportData[]>(sampleData);
  const [filteredData, setFilteredData] = useState<ReportData[]>(sampleData);
  const [sortField, setSortField] = useState<keyof ReportData | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [activePage, setActivePage] = useState<number>(1);
  const itemsPerPage = 5;

  const form = useForm({
    initialValues: {
      search: "",
      status: "",
    },
    validate: {
      search: isNotEmpty("Search cannot be empty"),
    },
  });

  const [debouncedSearch] = useDebouncedValue(form.values.search, 300);

  useEffect(() => {
    filterData();
  }, [debouncedSearch, form.values.status, sortField, sortOrder]);

  const filterData = () => {
    let filtered = data;

    // Apply search filter
    if (debouncedSearch) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
    }

    // Apply status filter
    if (form.values.status) {
      filtered = filtered.filter((item) => item.status === form.values.status);
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
  };

  const handleSort = (field: keyof ReportData) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const getPaginatedData = () => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  return (
    <Container fluid>
      <Paper withBorder shadow="sm" p="md">
        <Stack gap="lg">
          <Title order={2} style={{ textAlign: "center" }}>
            Report
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
                <Table.Th onClick={() => handleSort("age")}>
                  Age{" "}
                  {sortField === "age" &&
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
              {getPaginatedData().map((item) => (
                <Table.Tr key={item.id}>
                  <Table.Td>{item.id}</Table.Td>
                  <Table.Td>{item.name}</Table.Td>
                  <Table.Td>{item.age}</Table.Td>
                  <Table.Td>{item.status}</Table.Td>
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
    </Container>
  );
};

export default Report;
