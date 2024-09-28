"use client"
import Navbar from "@/components/Navbar";
import {useEffect, useRef} from "react";
import {checkAuth, handleAuthWithCredentials, handleAuthWithGoogle} from "@/utils/auth/auth";

export default function Signin() {
    useEffect(() => {
        redirectIfAuthenticated()
    }, []);

    const formRef = useRef<HTMLFormElement>(null);

    const redirectIfAuthenticated = async () => {
        checkAuth().then((res) => {
            if (res) {
                window.location.href = "/dashboard"
            }
        })
    }
    const onClickGoogle = async () => {
        await handleAuthWithGoogle()
    }

    const onClickCredentials = async () => {
        const form = formRef.current
        if (!form) return
        const formData = new FormData(form)

        await handleAuthWithCredentials({
            email: formData.get("email") as string,
            password: formData.get("password") as string
        })
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <form ref={formRef} onSubmit={(e) => (e.preventDefault())}>
                <div className="flex flex-col justify-center items-center">
                    <div className="gap-3 flex flex-col justify-center items-center">
                        <input type="text" placeholder={"Email"} name={"email"}
                               className={"w-full p-2 border border-gray-300 rounded"}/>
                        <input type={"password"} placeholder={"Password"} name={"password"}
                               className={"w-full p-2 border border-gray-300 rounded"}/>
                        <button onClick={onClickCredentials}
                                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Sign in
                        </button>
                        <div className={"flex w-full"}>
                            <button onClick={onClickGoogle}
                                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Sign in with Google
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}