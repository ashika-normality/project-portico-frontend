// app/learner/profile/page.js
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/utils/axiosInterceptor";
import LearnerProfileComponent from "./learnerProfile";

export default function LearnerProfilePage() {
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

    if (!token) {
      router.push("/learner/login");
      return;
    }

    axiosInstance
      .post("/auth/verify-token", {}, { headers: { "x-access-token": token } })
      .catch(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        router.push("/learner/login");
      });
  }, [router]);

  return <LearnerProfileComponent />;
}
