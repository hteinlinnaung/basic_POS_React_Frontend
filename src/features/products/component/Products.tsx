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
} from "@mantine/core";
import {
  IconSearch,
  IconSortAscending,
  IconSortDescending,
  IconPlus,
} from "@tabler/icons-react";
import { useDebouncedValue } from "@mantine/hooks";
import { useForm } from "@mantine/form";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

// Sample data
const sampleProducts: Product[] = [
  { id: 1, name: "Product A", price: 100, category: "Category 1", stock: 50 },
  { id: 2, name: "Product B", price: 200, category: "Category 2", stock: 30 },
  // Add more sample data as needed
];

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(sampleProducts);
  const [sortField, setSortField] = useState<keyof Product | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [activePage, setActivePage] = useState<number>(1);
  const itemsPerPage = 5;
  const [modalOpened, setModalOpened] = useState(false);

  const form = useForm({
    initialValues: {
      search: "",
      category: "",
    },
  });

  const newProductForm = useForm({
    initialValues: {
      name: "",
      price: 0,
      category: "",
      stock: 0,
    },
    validate: {
      name: (value) => (value ? null : 'Name is required'),
      price: (value) => (value > 0 ? null : 'Price must be greater than 0'),
      category: (value) => (value ? null : 'Category is required'),
      stock: (value) => (value >= 0 ? null : 'Stock cannot be negative'),
    },
  });

  const [debouncedSearch] = useDebouncedValue(form.values.search, 300);

  const filterProducts = useCallback(() => {
    let filtered = products;

    if (debouncedSearch) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    if (form.values.category) {
      filtered = filtered.filter((product) => product.category === form.values.category);
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

    setFilteredProducts(filtered);
  }, [products, debouncedSearch, form.values.category, sortField, sortOrder]);

  useEffect(() => {
    filterProducts();
  }, [debouncedSearch, filterProducts, form.values.category, sortField, sortOrder]);

  const handleSort = (field: keyof Product) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const getPaginatedProducts = () => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const handleAddProduct = () => {
    if (newProductForm.validate().hasErrors) return;
    const newProduct: Product = {
      id: products.length + 1,
      ...newProductForm.values,
    };
    setProducts([...products, newProduct]);
    setFilteredProducts([...products, newProduct]);
    newProductForm.reset();
    setModalOpened(false);
  };

  return (
    <Container fluid>
      <Paper withBorder shadow="sm" p="md">
        <Stack style={{overflowX:'auto'}} gap="lg">
          <Title order={2} style={{ textAlign: "center" }}>
            Products
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
            <Button leftSection={<IconPlus size={16} />} onClick={() => setModalOpened(true)}>
              Add Product
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
              {getPaginatedProducts().map((product) => (
                <Table.Tr key={product.id}>
                  <Table.Td>{product.id}</Table.Td>
                  <Table.Td>{product.name}</Table.Td>
                  <Table.Td>{product.price}</Table.Td>
                  <Table.Td>{product.category}</Table.Td>
                  <Table.Td>{product.stock}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
          {filteredProducts.length === 0 && (
            <Center mt="lg">
              <Text>No results found</Text>
            </Center>
          )}
          <Center mt="lg">
            <Pagination
              value={activePage}
              onChange={setActivePage}
              total={Math.ceil(filteredProducts.length / itemsPerPage)}
            />
          </Center>
        </Stack>
      </Paper>

      <Modal opened={modalOpened} onClose={() => setModalOpened(false)} title="Add New Product">
        <form onSubmit={newProductForm.onSubmit(handleAddProduct)}>
          <Stack>
            <TextInput
              label="Name"
              placeholder="Enter product name"
              {...newProductForm.getInputProps("name")}
            />
            <TextInput
              label="Price"
              placeholder="Enter product price"
              type="number"
              {...newProductForm.getInputProps("price")}
            />
            <TextInput
              label="Category"
              placeholder="Enter product category"
              {...newProductForm.getInputProps("category")}
            />
            <TextInput
              label="Stock"
              placeholder="Enter product stock"
              type="number"
              {...newProductForm.getInputProps("stock")}
            />
            <Group align="right">
              <Button type="submit">Add Product</Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Container>
  );
};

export default Products;
