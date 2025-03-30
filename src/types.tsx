
export interface User {
    username: string;
    password: string;
    date: string;
  }
  
  export interface AuthProps {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  }
  