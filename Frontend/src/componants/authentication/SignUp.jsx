import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectAuth, signUp } from "../../store/auth";

export const SignUp = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  const [showPass, setShowpass] = useState(false);
  const [showConfirm, setShowconfirm] = useState(false);
  const handleClickPass = () => setShowpass(!showPass);
  const handleClickConfirm = () => setShowconfirm(!showConfirm);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const submitHandler = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please fill all the fields.",
        status: "warning",
        duration: 500,
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Password and Confirm password should be same.",
        status: "error",
        duration: 500,
        isClosable: true,
        position: "top",
      });
      return;
    }

    dispatch(
      signUp(
        { name, email, password },
        () => navigate("/products"),
        (error) => {
          toast({
            title: "An Error Occured",
            description: error?.response?.data?.message || error?.message,
            status: "error",
            duration: 500,
            isClosable: true,
            position: "top",
          });
        },
      ),
    );
  };

  return (
    <VStack spacing="5px">
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPass ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <InputRightElement w="2.5rem">
            <Button h="1.5rem" size="xs" onClick={handleClickPass}>
              {showPass ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm your password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <InputRightElement w="2.5rem">
            <Button h="1.5rem" size="xs" onClick={handleClickConfirm}>
              {showConfirm ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={auth.isLoading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};
