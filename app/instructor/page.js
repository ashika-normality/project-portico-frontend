'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
//import jwt_decode from "jwt-decode";

export default function InstructorHome() {
    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
        let token;
        if(typeof window !== "undefined") {
            token = localStorage.getItem("accessToken");
        }
        console.log("Token:", token);
        if (!token) {
            setAuthorized(false);
            router.push("/instructor/login");
            return;
        }
        
        // If token exists, set authorized to true
        setAuthorized(true);
        
        // Uncomment and modify this section when you want to add JWT validation
        // try {
        //     const decoded = jwt_decode(token);
        //     if (decoded.userType !== "instructor") {
        //         setAuthorized(false);
        //         router.replace("/instructor/login");
        //     } else {
        //         setAuthorized(true);
        //         // Remove this line if you want to stay on this page
        //         // router.push("/instructor/dashboard");
        //     }
        // } catch (e) {
        //     setAuthorized(false);
        //     router.replace("/instructor/login");
        // }
        
        console.log("Instructor Home Page Loaded");
    }, [router]);

    // Show loading or nothing while redirect is happening
    if (!authorized) {
        return <div>Redirecting...</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">Instructor Home Page</h1>
            <p>Welcome to the instructor dashboard.</p>
        </div>
    );
}