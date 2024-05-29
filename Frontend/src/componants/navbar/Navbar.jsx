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
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
    isProtected: false,
  },
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

function Navbar() {
  const location = useLocation();
  const { isOpen, onToggle, onClose } = useDisclosure();

  const activeNavItem = useMemo(
    () => NAV_ITEMS.find((item) => item.href === location.pathname),
    [location.pathname],
  );

  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  return (
    <Box width="100%">
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue("gray.200", "gray.900")}
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
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily="heading"
            color={useColorModeValue("gray.800", "white")}
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
          {activeNavItem.isProtected ? (
            <Button
              as="a"
              colorScheme="blue"
              fontSize="sm"
              fontWeight={600}
              color="white"
              href="#"
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
}

function DesktopNav({ activeNavItem }) {
  const textColor = useColorModeValue("gray.800", "white");
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");

  return (
    <Stack direction="row" spacing={4}>
      {NAV_ITEMS.map((navItem) => {
        const isActive = navItem.href === activeNavItem.href;

        return (
          <Box key={navItem.label}>
            <Link
              as={ReactRouterLink}
              p={2}
              to={navItem.href ?? "#"}
              fontSize="sm"
              fontWeight={500}
              color={isActive ? textColor : linkColor}
              _hover={{
                textDecoration: "none",
                color: linkHoverColor,
              }}
            >
              {navItem.label}
            </Link>
          </Box>
        );
      })}
    </Stack>
  );
}

function MobileNav({ activeNavItem }) {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem
          key={navItem.label}
          {...navItem}
          isActive={navItem.href === activeNavItem.href}
        />
      ))}
    </Stack>
  );
}

function MobileNavItem({ label, href, isActive }) {
  const textColor = useColorModeValue("gray.800", "white");
  const linkColor = useColorModeValue("gray.600", "gray.200");

  return (
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
        <Text fontWeight={600} color={isActive ? textColor : linkColor}>
          {label}
        </Text>
      </Flex>
    </Stack>
  );
}

export default Navbar;
