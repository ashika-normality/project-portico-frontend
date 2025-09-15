'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LearnerHome() {
    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
        let token;
        if (typeof window !== "undefined") {
            token = localStorage.getItem("learnerAccessToken");
        }

        if (!token) {
            setAuthorized(false);
            router.push("/learner/login");  
            return;
        }

        setAuthorized(true);
        console.log("Learner Home Page Loaded");
    }, [router]);

    if (!authorized) {
        return <div>Redirecting...</div>;
    }

    return (
        <div className="flex-grow flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Learner Home Page</h1>
            <p className="text-lg">Welcome to your learning dashboard.</p>
            
            {/* Temporary button just for testing localStorage */}
            <button 
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => {
                    localStorage.removeItem("learnerAccessToken");
                    router.push("/learner/login");
                }}
            >
                Clear Token (Test Logout)
            </button>
        </div>
    );
}
