"use client";

import Processing from "@/components/Processing";
import SectionTitle from "@/components/SectionTitle";
import useAuth from "@/hooks/useAuth";
import { useLogin } from "@/hooks/useLogin";
import { ILogin } from "@/interfaces";
import { loginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({ resolver: zodResolver(loginSchema) });

  const { mutate, isLoading } = useLogin();
  const { saveCredentialsDispatcher } = useAuth();

  const router = useRouter();

  const onSubmit = (data: ILogin) => {
    mutate(data, {
      onSuccess: (res) => {
        saveCredentialsDispatcher(res);
        setTimeout(() => {
          router.push("/");
        }, 100);
      },
      onError: (err) => {
        if (axios.isAxiosError(err) && err.response) {
          toast.error(err.response.data?.message || "An error occurred");
        } else {
          toast.error(err.message || "Something went wrong!");
        }
      },
    });
  };

  return (
    <main>
      <section className="wrapper">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 max-w-xl mx-auto"
        >
          <SectionTitle title="Create an account" noMargin />

          <label htmlFor="email" className="form-control w-full">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              {...register("email")}
              type="email"
              id="email"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <div className="label">
                <span className="label-text-alt text-rose-500">
                  {errors.email.message}
                </span>
              </div>
            )}
          </label>
          <label htmlFor="password" className="form-control w-full">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              {...register("password")}
              type="password"
              id="password"
              className="input input-bordered w-full"
            />
            {errors.password && (
              <div className="label">
                <span className="label-text-alt text-rose-500">
                  {errors.password.message}
                </span>
              </div>
            )}
          </label>

          <button
            disabled={isLoading}
            type="submit"
            className="btn btn-primary"
          >
            {isLoading ? <Processing /> : "Submit"}
          </button>

          <p className="mt-1">
            Do not have an account?{" "}
            <button
              onClick={() => router.push("/sign-up")}
              type="button"
              className="link link-hover font-bold"
            >
              Register
            </button>
          </p>
        </form>
      </section>
    </main>
  );
};

export default SignInPage;
