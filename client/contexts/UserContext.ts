import { createContext } from "react";
import { UserContextInterface } from "../@types/context";

const UserContext = createContext<UserContextInterface>({
  loggedIn: false,
});

export default UserContext;
