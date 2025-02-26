"use client"

import useSWR from "swr"
import type Data from "@/public/data.json";



export function useSellerAndAuction() {

    const fetcher = async (url: string | URL | Request) => {
        const res = await fetch(url);
        const cleanRes = await res.json()
        return cleanRes
    }

    const { data, error, isLoading } = useSWR<typeof Data>("/data.json", fetcher);


    return {
        data,
        isLoading,
        error
    }
}