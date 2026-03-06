
import { useForm } from "react-hook-form";
import { useAuth } from '../contexts/auth-context';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Alert from '../components/utils/alerts';

function LoginPage() {

    const [serverError, setServerError] = useState(null);

    const navigate = useNavigate();

    const { login } = useAuth();

    const {
        register, 
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({ mode: 'all' })

    const onSubmit = async (data) => {
        try {
            await login(data.email, data.password);
            navigate("/");
        } catch (error) {
            console.log(error?.message);
            setServerError(error?.message);
        }
    }
  
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-red-500 to-orange-400 px-6">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-10">
                {/* Logo / título */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-800">
                        🔥 Irontinder
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Encuentra tu match Irontinder
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {serverError && (
                        <div className="mt-4">
                            <Alert message={serverError} type="error" center />
                        </div>
                    )}
                    {/* email */}
                    <div>
                        <label className="text-sm text-gray-600">
                        Email
                        </label>

                        <input
                        type="email"
                        id="email"
                        placeholder="dev@email.com"
                        className={`w-full mt-2 px-4 py-3 rounded-xl border outline-none transition
                            ${errors.email 
                            ? "border-pink-500 focus:ring-pink-500" 
                            : "border-gray-200 focus:ring-indigo-500"}
                        `}
                        {...register("email", { required: true })}
                        />
                        {errors.email && (
                            <span className="mt-2 flex items-center gap-2 text-sm text-pink-500 font-medium">
                                <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                                </svg>

                                This field is required
                            </span>
                            )}
                    </div>

                    {/* password */}
                    <div>
                        <label className="text-sm text-gray-600">
                        Contraseña
                        </label>

                        <input
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        className={`w-full mt-2 px-4 py-3 rounded-xl border outline-none transition
                            ${errors.password 
                            ? "border-pink-500 focus:ring-pink-500" 
                            : "border-gray-200 focus:ring-indigo-500"}
                        `}
                        {...register("password", { required: true })}
                        />
                        {errors.password && (
                            <span className="mt-2 flex items-center gap-2 text-sm text-pink-500 font-medium">
                                <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                                </svg>

                                This field is required
                            </span>
                            )}
                    </div>

                    {/* login button */}
                    <button
                        type="submit"
                        disabled={ isSubmitting }
                        className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-pink-500 to-red-500 hover:opacity-90 transition shadow-lg"
                    >
                        Iniciar sesión
                    </button>
                </form>

                {/* divider */}
                <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-sm text-gray-400">o</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* register */}
                <p className="text-center text-sm text-gray-500">
                    ¿Nuevo en Irontinder?
                    <span className="ml-1 text-pink-500 font-semibold cursor-pointer hover:underline">
                        Crear cuenta
                    </span>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;