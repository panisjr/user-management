import { createContext } from "react";
import { User } from "./types";

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Export only the context here
export const UserContext = createContext<UserContextType | undefined>(undefined);
