import React, { useState } from "react";
import { useForm } from "@mantine/form";
import {
  Stack,
  Text,
  NumberInput,
  Select,
  TextInput,
  Group,
  Button,
  Notification,
} from "@mantine/core";
import { IconX, IconCheck } from "@tabler/icons-react";

interface PaymentProps {
  orderId: string;
  totalAmount: number;
  onClose: () => void;
}

const Payment: React.FC<PaymentProps> = ({ orderId, totalAmount, onClose }) => {
  const [paymentMethod] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const form = useForm({
    initialValues: {
      amount: totalAmount,
      paymentMethod: "",
      cardNumber: "",
      cardExpiry: "",
      cardCVC: "",
    },
  });

  const handlePayment = async (values: {
    amount: number;
    paymentMethod: string;
    cardNumber: string;
    cardExpiry: string;
    cardCVC: string;
  }) => {
    setIsLoading(true);
    setErrorMessage("");
    setIsPaymentSuccessful(false);

    try {
      // Simulate a payment process
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsPaymentSuccessful(true);
      console.log(values);
    } catch (error) {
      setErrorMessage("Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ margin: "auto", maxWidth: 400 }}>
      <form onSubmit={form.onSubmit((values) => handlePayment(values))}>
        <Stack style={{overflowX:'auto'}} gap="md">
          <Text size="lg" style={{fontWeight:500}}>
            Order ID: {orderId}
          </Text>
          <NumberInput
            label="Amount"
            placeholder="Enter amount"
            {...form.getInputProps("amount")}
            disabled
          />
          <Select
            label="Payment Method"
            placeholder="Select payment method"
            data={["Cash", "Card"]}
            value={paymentMethod}
            // onChange={(value) => setPaymentMethod(value)}
            {...form.getInputProps("paymentMethod")}
          />
          {paymentMethod === "Card" && (
            <>
              <TextInput
                label="Card Number"
                placeholder="Enter card number"
                {...form.getInputProps("cardNumber")}
              />
              <Group grow>
                <TextInput
                  label="Expiry Date"
                  placeholder="MM/YY"
                  {...form.getInputProps("cardExpiry")}
                />
                <TextInput
                  label="CVC"
                  placeholder="Enter CVC"
                  {...form.getInputProps("cardCVC")}
                />
              </Group>
            </>
          )}
          <Group justify="apart" mt="md">
            <Button variant="default" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" loading={isLoading}>
              Pay ${totalAmount}
            </Button>
          </Group>
        </Stack>
      </form>
      {errorMessage && (
        <Notification color="red" icon={<IconX />} mt="md">
          {errorMessage}
        </Notification>
      )}
      {isPaymentSuccessful && (
        <Notification color="green" icon={<IconCheck />} mt="md">
          Payment successful!
        </Notification>
      )}
    </div>
  );
};

export default Payment;
