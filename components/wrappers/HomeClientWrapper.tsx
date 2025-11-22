"use client";

import dynamic from "next/dynamic";

export const MainSwiperClient = dynamic(
    () => import("@/components/sections/home/MainSwiper"),
    {
        ssr: false,
        loading: () => <div style={{ height: "400px" }}></div>
    }
);

export const HomeSwiperClient = dynamic(
    () => import("@/components/ui/HomeSwiper"),
    {
        ssr: false,
        loading: () => <div style={{ height: "300px" }}></div>
    }
);
