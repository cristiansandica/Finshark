import { createContext, useEffect, useState } from "react";
import React from "react";
import { UserProfile } from "../Models/User";

type UserContextType = {
    user: UserProfile | null;
    loginUser: (username: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;

}

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const [isReady, setIsReady] = useState(false);
    const [user, setUser] = useState<UserProfile | null>(null);

    const loginUser = () => {

    }

    const isLoggedIn = () => {
        return !!user;
    };

    const logout = () => {

    }


    return (
        <UserContext.Provider
            value={{ loginUser, logout, isLoggedIn, user }}
        >
            {isReady ? children : null}
        </UserContext.Provider>
    )
}

export const useAuth = () => React.useContext(UserContext);