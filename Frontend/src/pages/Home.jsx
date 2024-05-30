import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";
import { Login } from "../componants/authentication/Login";
import { SignUp } from "../componants/authentication/SignUp";
import { selectAuth } from "../store/auth";

export const Home = () => {
  const auth = useSelector(selectAuth);

  if (!auth.isRestored) return null;
  if (auth.user) return <Navigate to="/products" replace />;
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          fontSize="4xl"
          fontFamily="Work sans"
          color={"black"}
          align={"center"}
        >
          Rapidshop
        </Text>
      </Box>
      <Box
        bg={"white"}
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        color={"black"}
      >
        <Tabs isFitted variant="enclosed" colorScheme="red" fontWeight="2px">
          <TabList mb="1em">
            <Tab>Log In</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};
