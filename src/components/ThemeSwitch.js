import React from "react";
import { Switch, VStack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../reducers/theme";

const ThemeSwitch = () => {
  const { isDarkTheme } = useSelector((store) => store.theme);
  const dispatch = useDispatch();

  return (
    <VStack>
      <p>{isDarkTheme ? "Dark" : "Light"} theme</p>
      <Switch
        isChecked={isDarkTheme}
        onChange={() => dispatch(toggleTheme())}
        colorScheme="teal"
        size="lg"
      />
    </VStack>
  );
};

export default ThemeSwitch;
