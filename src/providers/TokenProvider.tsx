"use client";
import { fromUnixTime, isAfter, subSeconds } from "date-fns";
import { jwtDecode } from "jwt-decode";
import { signOut, useSession } from "next-auth/react";
import { FC, PropsWithChildren, useEffect, useCallback } from "react";

interface JWTPayload {
  exp?: number;
  iat?: number;
  [key: string]: any;
}

const TokenProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data: session, status } = useSession();

  const checkTokenValidity = useCallback(() => {
    if (status !== "authenticated" || !session?.user?.accessToken) return;

    try {
      const decodedToken = jwtDecode<JWTPayload>(session.user.accessToken);

      if (!decodedToken.exp) return;

      const tokenExpiry = fromUnixTime(decodedToken.exp);
      const logoutTime = subSeconds(tokenExpiry, 10);
      const now = new Date();

      if (isAfter(now, logoutTime)) {
        console.log("Session nearly expired or expired, signing out...");
        signOut({ callbackUrl: "/login", redirect: true });
      }
    } catch (error) {
      console.error("Token translation error:", error);
      signOut({ callbackUrl: "/login", redirect: true });
    }
  }, [session, status]);

  useEffect(() => {
    if (status === "authenticated") {
      checkTokenValidity();

      const interval = setInterval(checkTokenValidity, 15000);
      return () => clearInterval(interval);
    }
  }, [status, checkTokenValidity]);

  return <>{children}</>;
};

export default TokenProvider;
