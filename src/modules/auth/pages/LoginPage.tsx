"use client";

import Link from "next/link";
import { useLogin } from "../hooks/useLogin";

export const LoginPage = () => {
  const { form, handleLogin } = useLogin();

  return (
    <div className="w-full h-screen bg-primary-200 flex justify-center items-center">
      <form
        onSubmit={form.handleSubmit(handleLogin)}
        className="bg-white max-w-[400px] w-full rounded-xl p-4 shadow  "
      >
        <section>
          <h1 className="heading-5 text-zinc-700 text-center">
            Iniciar sesión
          </h1>
          <p className="paragraph-lg text-zinc-500 text-center">
            Ingresa las credenciales para accedes
          </p>
          <section className="flex flex-col gap-4 mt-4">
            <input
              type="text"
              className="text-zinc-600 p-2 paragraph-lg border-1 border-zinc-400 rounded-lg focus:border-2 focus:border-primary-600 focus:outline-none"
              placeholder="Ingresa tu correo"
              {...form.register("email")}
            />
            <input
              type="password"
              className="text-zinc-600 p-2 paragraph-lg border-1 border-zinc-400 rounded-lg focus:border-2 focus:border-primary-600 focus:outline-none"
              placeholder="Ingresa tu contraseña"
              {...form.register("password")}
            />
            <button
              type="submit"
              className="text-white font-semibold bg-primary-500 hover:bg-primary-600 transition-all rounded-xl p-2 w-full"
            >
              Iniciar sesión
            </button>
          </section>
          <section className="mt-4 flex flex-col justify-center">
            <Link
              href={"/home"}
              className="text-zinc-600 paragraph-lg underline text-center"
            >
              Volver a la web
            </Link>
          </section>
        </section>
      </form>
    </div>
  );
};
