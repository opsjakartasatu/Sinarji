"use client";

import { SessionProvider } from "next-auth/react";

const basePath = process.env.BASE_PATH;

export const AuthProvider = ({children}) => {
    return <SessionProvider basePath={`${basePath}/api/auth`}>{children}</SessionProvider>
}