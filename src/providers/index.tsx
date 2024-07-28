import { MantineProvider } from "@mantine/core";

import { RouterProvider } from "react-router-dom";

import { theme } from "../styles/theme";
import { routes } from "../routes";

export const Providers = () => {
  return (
    <MantineProvider theme={theme}>
      
      <RouterProvider router={routes}/>
      
    </MantineProvider>
  );
};
