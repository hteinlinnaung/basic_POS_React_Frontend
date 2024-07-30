import React from "react";
import { Modal, Stack, TextInput, NumberInput, Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Order } from '../types';

interface AddOrderModalProps {
  opened: boolean;
  onClose: () => void;
  onAddOrder: (order: Order) => void;
}

const AddOrderModal: React.FC<AddOrderModalProps> = ({ opened, onClose, onAddOrder }) => {
  const form = useForm({
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

  const handleSubmit = (values: typeof form.values) => {
    onAddOrder({
      id: new Date().getTime(), // Temporary ID
      customerName: values.customerName,
      item: values.item,
      quantity: values.quantity,
      total: values.total,
    });
    form.reset();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Add New Order"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Customer Name"
            placeholder="Enter customer name"
            {...form.getInputProps("customerName")}
          />
          <TextInput
            label="Item"
            placeholder="Enter item"
            {...form.getInputProps("item")}
          />
          <NumberInput
            label="Quantity"
            placeholder="Enter quantity"
            min={1}
            {...form.getInputProps("quantity")}
          />
          <NumberInput
            label="Total"
            placeholder="Enter total"
            min={0}
            {...form.getInputProps("total")}
          />
          <Group align="right">
            <Button type="submit">Add Order</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export default AddOrderModal;
