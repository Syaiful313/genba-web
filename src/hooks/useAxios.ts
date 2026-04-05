"use client";

import { axiosInstance } from "@/lib/axios";
import { useEffect, useRef } from "react";
import { getSession, signOut } from "next-auth/react";

// Cache session to avoid multiple simultaneous calls
let sessionCache: { token: string | null; timestamp: number } | null = null;
const CACHE_DURATION = 5000; // 5 seconds cache

const getCachedSession = async () => {
  const now = Date.now();

  // Return cached session if still valid
  if (sessionCache && now - sessionCache.timestamp < CACHE_DURATION) {
    return sessionCache.token;
  }

  try {
    const session = await getSession();
    const accessToken = session?.user?.accessToken || null;

    // Update cache
    sessionCache = {
      token: accessToken,
      timestamp: now,
    };

    return accessToken;
  } catch (error) {
    console.warn("Failed to get session:", error);
    return null;
  }
};

const useAxios = () => {
  const isSetup = useRef(false);

  useEffect(() => {
    // Prevent multiple setups in development (StrictMode)
    if (isSetup.current) return;
    isSetup.current = true;

    const requestIntercept = axiosInstance.interceptors.request.use(
      async (config) => {
        const accessToken = await getCachedSession();

        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        // Only sign out on 401 from API, not session errors
        if (err?.response?.status === 401) {
          // Clear session cache
          sessionCache = null;
          signOut();
        }

        return Promise.reject(err);
      },
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
      isSetup.current = false;
    };
  }, []);

  return { axiosInstance };
};

export default useAxios;
