import { MantineProvider } from "@mantine/core";
import { Notifications} from "@mantine/notifications";

import { RouterProvider } from "react-router-dom";


import { theme } from "../styles/theme";
import { routes } from "../routes";

export const Providers = () => {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-right">

      </Notifications>
      
      <RouterProvider router={routes}/>
      
    </MantineProvider>
  );
};
