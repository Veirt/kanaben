import { Avatar, Box, Button, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

const Navbar = () => {
  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const user = useContext(UserContext);

  return (
    <>
      <Box
        w="100%"
        h="64px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="#1d1e2c"
      >
        <NextLink href="/">
          <Link
            p="3"
            fontWeight="bold"
            color="#80b7dc"
            textTransform="uppercase"
            letterSpacing="3px"
          >
            Kanaben
          </Link>
        </NextLink>
        <Box display="flex" alignItems="center">
          {user.loggedIn ? (
            <Button>Log out</Button>
          ) : (
            <NextLink href={`${API_ENDPOINT}/auth/discord`}>
              <Button>Login</Button>
            </NextLink>
          )}

          <Avatar m="3" size="sm" name="Guest" src={user.avatar} />
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
