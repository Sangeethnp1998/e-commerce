import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Collapse,
  Flex,
  IconButton,
  Link,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  Link as ReactRouterLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { signOut } from "../../store/auth";
import { clearCart } from "../../store/cart";
import { setProducts } from "../../store/products";

const EXCLUDED_PATHS = ["/"];

const NAV_ITEMS = [
  {
    label: "Products",
    href: "/products",
    isProtected: true,
  },
  {
    label: "Cart",
    href: "/cart",
    isProtected: true,
  },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { isOpen, onToggle, onClose } = useDisclosure();

  const activeNavItem = useMemo(
    () => NAV_ITEMS.find((item) => item.href === location.pathname),
    [location.pathname],
  );

  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  const handleLogOut = () => {
    dispatch(setProducts([]));
    dispatch(clearCart());
    dispatch(signOut());
    navigate("/");
  };

  if (EXCLUDED_PATHS.includes(location.pathname)) return null;
  return (
    <Box width="100%" position="fixed" zIndex={10}>
      <Flex
        bg="white"
        color="gray.600"
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor="gray.200"
        align="center"
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            as="h1"
            textAlign={{ base: "center", md: "left" }}
            fontFamily="heading"
            color="gray.800"
            fontWeight="semibold"
          >
            Rapidshop
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav activeNavItem={activeNavItem} />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify="flex-end"
          direction="row"
          spacing={6}
        >
          {activeNavItem?.isProtected ? (
            <Button
              colorScheme="blue"
              fontSize="sm"
              fontWeight={600}
              color="white"
              onClick={handleLogOut}
            >
              Log Out
            </Button>
          ) : null}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav activeNavItem={activeNavItem} />
      </Collapse>
    </Box>
  );
};

const DesktopNav = ({ activeNavItem }) => (
  <Stack direction="row" spacing={4}>
    {NAV_ITEMS.map((navItem) => {
      const isActive = navItem.href === activeNavItem?.href;

      return (
        <Box key={navItem.label}>
          <Link
            as={ReactRouterLink}
            p={2}
            to={navItem.href ?? "#"}
            fontSize="sm"
            fontWeight={500}
            color={isActive ? "gray.800" : "gray.600"}
            _hover={{
              textDecoration: "none",
              color: "gray.800",
            }}
          >
            {navItem.label}
          </Link>
        </Box>
      );
    })}
  </Stack>
);

const MobileNav = ({ activeNavItem }) => (
  <Stack bg="white" p={4} display={{ md: "none" }}>
    {NAV_ITEMS.map((navItem) => (
      <MobileNavItem
        key={navItem.label}
        {...navItem}
        isActive={navItem.href === activeNavItem?.href}
      />
    ))}
  </Stack>
);

const MobileNavItem = ({ label, href, isActive }) => (
  <Stack spacing={4}>
    <Flex
      py={2}
      as={ReactRouterLink}
      to={href ?? "#"}
      justify="space-between"
      align="center"
      _hover={{
        textDecoration: "none",
      }}
    >
      <Text fontWeight={600} color={isActive ? "gray.800" : "gray.600"}>
        {label}
      </Text>
    </Flex>
  </Stack>
);

export default Navbar;
