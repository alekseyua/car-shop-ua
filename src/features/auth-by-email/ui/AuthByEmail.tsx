// ./src/features / auth - by - email /
// ├── ui
// │   ├── AuthByEmail.tsx
'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginUserbyEmail, registerUserByEmail } from "../api/api";

const AuthByEmail = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        setError(null);

        if (!email || !password) {
            setError("Заповніть email і пароль");
            return;
        }

        if (!isLogin && password !== confirmPassword) {
            setError("Паролі не співпадають");
            return;
        }

        try {
            setLoading(true);

            if (isLogin) {
                // try{
                    await loginUserbyEmail({
                        email,
                        password,
                    });
                // } catch (error) {
                //     console.log("Login error:", error);
                //     setError("Помилка авторизації: " + (error instanceof Error ? error.message : String(error)));
                // }
            } else {
                await registerUserByEmail({
                    email,
                    phone,
                    password,
                });
            }

            router.push("/");
        } catch(error: unknown) {
            // console.log("Login error:", error, error instanceof Error);
            const msgAuth = "Помилка авторизації ";
            const msgRegister = "Помилка реєстрації ";
            if (typeof error === "object" 
                && error !== null 
                && "message" in error) {
                    const errMsg = (error as any).message;
                    if(typeof errMsg === "object" && errMsg.length > 0){
                        return setError(msgAuth + errMsg.join(", "));
                    }else{
                        return setError(msgAuth + errMsg);
                    }
            }
            setError(
                isLogin
                    ? msgAuth
                    : msgRegister
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChangeAuthMethod = (method: "email" | "phone") => {
        setError(null);
        setIsLogin(!isLogin);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold text-black mb-6">
                    {isLogin ? "Вхід" : "Реєстрація"}
                </h1>
                {error && (
                    <div className="mb-3 text-red-600 text-sm">
                        {error}
                    </div>
                )}
                <div className="mb-4">
                    <label className="block text-sm text-gray-700 mb-2">
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="your-email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-400 text-black rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>
                {!isLogin && (<div className="mb-4">
                    <label className="block text-sm text-gray-700 mb-2">
                        Мобільний телефон
                    </label>

                    <input
                        type="tel"
                        placeholder="+380"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-black border border-gray-400 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>
                )}
                <div className="mb-4">
                    <label className="block text-sm text-gray-700 mb-2">
                        Пароль
                    </label>
                    <div className="relative">

                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? "text" : "password"}
                            className="w-full text-black border border-gray-400 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setTimeout(() => setShowPassword(false), 2000)
                                setShowPassword(!showPassword)}}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                            {showPassword ? "🚫" : "👁️"}
                        </button>
                    </div>
                </div>
                {!isLogin && (
                <div className="mb-4">
                    <label className="block text-sm text-gray-700 mb-2">
                        Підтвердження пароля
                    </label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full text-black border border-gray-400 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <button
                            type="button"
                            onClick={() =>{
                                setShowConfirmPassword(!showConfirmPassword)
                                setTimeout(() => setShowConfirmPassword(false), 2000);  
                            }}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                            {showConfirmPassword ? "🚫" : "👁️"}
                        </button>
                    </div>
                </div>
                )}
                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-md transition"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "Завантаження..." : "Продовжити"}
                </button>

                <div className="flex items-center my-5">
                    <div className="flex-1 border-t"></div>
                    <span className="px-3 text-gray-500 text-sm">- або -</span>
                    <div className="flex-1 border-t"></div>
                </div>

                <button 
                    className="w-full text-black border rounded-md py-3 flex items-center 
                    justify-center gap-3 hover:bg-gray-50 transition"
                    onClick={() => {
                        setError(null);
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
                        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.3 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z" />
                        <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.5-5.3l-6.2-5.2C29.3 35.1 26.8 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.5 16.2 44 24 44z" />
                        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.6-6.1 7.1l6.2 5.2C39.2 36.8 44 31 44 24c0-1.3-.1-2.4-.4-3.5z" />
                    </svg>

                    Увійти через Google
                </button>

                <button 
                    className="w-full text-black border rounded-md py-3 flex 
                    items-center justify-center gap-3 hover:bg-gray-50 transition mt-3"
                    onClick={() => handleChangeAuthMethod("email")}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none">
                        <path d="M4 6H20C21.1 6 22 6.9 22 8V16C22 17.1 21.1 18 20 18H4C2.9 18 2 17.1 2 16V8C2 6.9 2.9 6 4 6Z"
                            stroke="currentColor" strokeWidth="2" />
                        <path d="M22 8L12 14L2 8"
                            stroke="currentColor" strokeWidth="2" />
                    </svg>
                <span>
                    {!isLogin ? "Увійти через електронну пошту" : "Зареєструватися через електронну пошту"}
                </span>
                </button>
            </div>
        </div>
    );
};

export default AuthByEmail;