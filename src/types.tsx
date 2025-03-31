
export interface User {
    email: string;
    firstname?: string;
    lastname?: string;
    password: string;
    date: string;
  }
  
  export interface AuthProps {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  }
  