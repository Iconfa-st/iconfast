"use client"
import Navbar from "@/components/Navbar";
import {useEffect, useRef} from "react";
import {
    checkAuth,
    handleAuthWithCredentials,
    handleAuthWithGoogle,
    handleRegisterWithCredentials
} from "@/utils/auth/auth";

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

    const verifyForm = async () => {
        const form = formRef.current
        if (!form) return
        const formData = new FormData(form)
        const email = formData.get("email") as string
        const emailConfirm = formData.get("emailconfirm") as string
        const password = formData.get("password") as string
        const passwordConfirm = formData.get("passwordconfirm") as string
        const validEmail = email === emailConfirm && email !== ""
        const validPassword = password === passwordConfirm && password !== ""

        if (validEmail && validPassword) {
            await handleRegisterWithCredentials({
                email: email,
                password: password
            })
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <form ref={formRef} onSubmit={(e) => (e.preventDefault())}>
                <div className="flex flex-col justify-center items-center min-h-[70vh]">
                    <div
                        className={"flex justify-center py-10 border border-gray-800 bg-gray-800 border-solid rounded-2xl w-1/3 min-w-[320px]"}>
                        <div className="flex flex-col justify-center items-center w-9/12">
                            <div className="gap-3 flex flex-col justify-center items-center">
                                <div className={"flex flex-col gap-3 justify-center items-center w-full"}>
                                    <input type="text" placeholder={"Email"} name={"email"}
                                           className={"w-full p-2 border border-gray-300 rounded"}/>
                                    <input type="text" placeholder={"Confirm email"} name={"emailconfirm"}
                                           className={"w-full p-2 border border-gray-300 rounded"}/>
                                </div>
                                <div className={"flex gap-3 justify-center items-center"}>
                                    <input type={"password"} placeholder={"Password"} name={"password"}
                                           className={"w-full p-2 border border-gray-300 rounded"}/>
                                    <input type={"password"} placeholder={"Confirm password"} name={"passwordconfirm"}
                                           className={"w-full p-2 border border-gray-300 rounded"}/>
                                </div>
                                <button onClick={() => verifyForm()}
                                        className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded">
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}