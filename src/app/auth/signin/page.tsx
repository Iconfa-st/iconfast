"use client"
import Navbar from "@/components/Navbar";
import {handleAuthWithCredentials, handleAuthWithGoogle} from "@/utils/auth/auth";

export default function Signin() {
    const onClickGoogle = async () => {
        await handleAuthWithGoogle()
    }

    const onClickCredentials = async () => {
        await handleAuthWithCredentials({
            mail: "jsmith@mail.com",
            password: "test"
        })
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <div className="flex flex-col justify-center items-center">
                <div className="gap-3 flex flex-col justify-center items-center">
                    <input type="text" placeholder={"Email"}
                           className={"w-full p-2 border border-gray-300 rounded"}/>
                    <input type={"password"} placeholder={"Password"}
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
        </div>
    )
}