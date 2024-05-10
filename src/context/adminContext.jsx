import { createContext, useState } from "react";
import { getAllUsers } from "../Firebase/getOtherStats";

const adminPrimaryData = createContext();

const adminPrimaryDataContextProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState([]);
  const fetchUsers = () => {
    if (!allUsers) {
      getAllUsers(setAllUsers);
    }
  };
};
