import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
// import { useUserContext } from "../context/UserContext"; // Assuming you have a UserContext


// Example UserContext
import React, { createContext, useContext, useEffect, useState } from "react";

// Define the shape of the UserContext
type User = {
  name: string;
};

const UserContext = createContext<{ user: User | null }>({ user: null });

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulate an API call to fetch the user
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user"); // Replace with your actual API endpoint
        const data = await response.json();
        setUser(data); // Set the fetched user data
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser({ name: "Guest" }); // Fallback to a default user
      }
    };

    fetchUser();
  }, []);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};


export const Appbar = () => {
  const { user } = useUserContext(); // Fetch the logged-in user's data from context
  const userName = user?.name || "Guest"; // Fallback to "Guest" if no user is logged in

  return (
    <div className="border-b bg-white shadow-md sticky top-0 flex justify-between items-center px-6 py-3">
      {/* Logo Section */}
      <Link
        to={"/blogs"}
        className="flex items-center text-lg font-bold text-gray-800 hover:text-gray-900 transition-colors duration-300"
      >
        Medium
      </Link>

      {/* Navigation Section */}
      <div className="flex items-center space-x-4">
        {/* New Button */}
        <Link to={"/publish"}>
          <button
            type="button"
            className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 transition-transform duration-300 hover:scale-105 shadow-md"
          >
            New
          </button>
        </Link>

        {/* User Avatar */}
        <Avatar size={"big"} name={userName} />
      </div>
    </div>
  );
};
