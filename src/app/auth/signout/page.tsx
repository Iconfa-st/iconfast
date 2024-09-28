"use client";
import { useEffect } from "react";
import {handleSignOut} from "@/utils/auth/auth";

export default function Signout() {
    useEffect(() => {
        handleSignOut()
    }, []);
}
