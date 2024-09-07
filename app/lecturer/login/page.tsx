import SignInForm from "@/app/ui/landing-page/sign-in-form";
import Image from "next/image";

export default function Login() {
    return (
        <main className="flex min-h-screen items-center justify-center p-5">
            <div className="w-full flex items-center justify-center flex-col md:w-96">
                <Image
                src="/landing-page/logo.svg"
                alt="IHMA Logo"
                width={30}
                height={30}
                />
                <h1 className="text-3xl font-bold text-center mt-2">
                Welcome back
                </h1>
                <p className="text-center text-sm text-zinc-500 mt-2 mb-6">This is the lecturer portal. Enter your credentials to sign in to your account</p>
                <SignInForm type="lecturer" />
            </div>
        </main>
    )
}