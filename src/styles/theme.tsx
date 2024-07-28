import { createTheme, Input, MantineColorsTuple, MantineTheme, MantineThemeOverride, Menu } from "@mantine/core";
import { colors } from "./tokens";

export const theme :MantineThemeOverride = createTheme({
  fontFamily: "Main Font, sans-serif",
  defaultRadius: "md",
  primaryColor: "brand",
  primaryShade: 5,
  colors: {
    brand: Object.values(colors.brand) as unknown as MantineColorsTuple,
    error: Object.values(colors.error) as unknown as MantineColorsTuple,
    accent: Object.values(colors.accent) as unknown as MantineColorsTuple,
  },
  components: {
    Table: {
      styles: (theme :MantineTheme) => ({
        thead: {
          backgroundColor: theme.colors.green[3],
          '& th': {
            color: theme.colors.green[7],
            fontWeight: 700,
            textAlign: 'left',
            padding: theme.spacing.md,
          },
        },
      }),
    },

    InputWrapper: Input.Wrapper.extend({
      defaultProps: {
        classNames: {
          label: "text-sm font-semibold",
        },
      },
    }),
    Input: Input.extend({
      classNames: {
        input: "disabled:bg-[#f2f2f2] disabled:text-[#333]",
      },
    }),
    Menu: Menu.extend({
      defaultProps: {
        withArrow: true,
        arrowPosition: "center",
      },
    }),
  },
});
