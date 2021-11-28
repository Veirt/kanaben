import type { GetServerSideProps, NextPage } from "next";
import { UserContextInterface } from "../@types/context";
import instance from "../api/instance";
import Navbar from "../components/navbar";
import UserContext from "../contexts/UserContext";

interface Props {
  user: UserContextInterface;
}

const Home: NextPage<Props> = ({ user }) => {
  console.log(user);

  return (
    <>
      <UserContext.Provider value={user}>
        <Navbar />
      </UserContext.Provider>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const accessToken = ctx.req.cookies.accessToken;

  let userContext: UserContextInterface;

  try {
    const res = await instance.post("http://localhost:3000/auth", null, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    userContext = {
      ...res.data,
      loggedIn: true,
    };
  } catch (err) {
    userContext = { loggedIn: false };
  }

  return {
    props: {
      user: userContext,
    },
  };
};

export default Home;
