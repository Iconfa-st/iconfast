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
                <div className="flex flex-col justify-center items-center min-h-[70vh]">
                    <div
                        className={"flex justify-center py-10 border border-gray-800 bg-gray-800 border-solid rounded-2xl w-1/3 min-w-[320px]"}>
                        <div
                            className="gap-3 flex flex-col justify-center items-center w-9/12">
                            <input type="text" placeholder={"Email"} name={"email"}
                                   className={"w-full p-2 border border-gray-300 rounded"}/>
                            <input type={"password"} placeholder={"Password"} name={"password"}
                                   className={"w-full p-2 border border-gray-300 rounded"}/>
                            <button onClick={onClickCredentials}
                                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded">
                                Sign in
                            </button>
                            <button onClick={() => window.location.href = "/auth/register"}
                                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded">
                                Register
                            </button>
                            <button onClick={onClickGoogle}
                                    className="flex items-center justify-center w-full bg-gray-100 hover:bg-gray-200 font-bold py-2 px-4 rounded">
                                <div className={"flex items-center justify-around w-full max-w-[200px]"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32"
                                         viewBox="0 0 48 48">
                                        <path fill="#FFC107"
                                              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                        <path fill="#FF3D00"
                                              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                        <path fill="#4CAF50"
                                              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                        <path fill="#1976D2"
                                              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                    </svg>
                                    <div>Sign in with Google</div>
                                </div>
                            </button>
                            <button
                                className="flex items-center justify-center w-full bg-gray-100 hover:bg-gray-200 font-bold py-2 px-4 rounded">
                                <div className={"flex items-center justify-around w-full max-w-[200px]"}>
                                    <svg width="32" height="32" viewBox="0 0 800 800" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_21_2)">
                                            <path
                                                d="M553.954 0C555.816 0 557.678 0 559.645 0C564.212 56.4177 542.678 98.5729 516.506 129.1C490.827 159.417 455.662 188.82 398.788 184.359C394.994 128.749 416.564 89.7203 442.7 59.2632C466.939 30.8787 511.378 5.62069 553.954 0Z"
                                                fill="black"/>
                                            <path
                                                d="M726.123 587.222C726.123 587.784 726.123 588.276 726.123 588.803C710.139 637.211 687.34 678.698 659.518 717.2C634.119 752.154 602.995 799.192 547.42 799.192C499.398 799.192 467.501 768.313 418.285 767.47C366.223 766.627 337.593 793.29 289.993 800C284.548 800 279.102 800 273.763 800C238.809 794.941 210.6 767.259 190.05 742.318C129.452 668.616 82.6242 573.416 73.9121 451.587C73.9121 439.643 73.9121 427.735 73.9121 415.791C77.6007 328.6 119.967 257.709 176.279 223.352C205.998 205.085 246.854 189.523 292.346 196.478C311.843 199.499 331.761 206.174 349.221 212.778C365.766 219.137 386.458 230.413 406.06 229.816C419.339 229.43 432.547 222.509 445.932 217.626C485.136 203.469 523.567 187.239 574.224 194.862C635.103 204.066 678.312 231.116 705.01 272.849C653.511 305.625 612.796 355.017 619.751 439.362C625.934 515.979 670.478 560.804 726.123 587.222Z"
                                                fill="black"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_21_2">
                                                <rect width="800" height="800" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <div>Sign in with Apple</div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}