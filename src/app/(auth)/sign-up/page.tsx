"use client";

import Processing from "@/components/Processing";
import SectionTitle from "@/components/SectionTitle";
import useAuth from "@/hooks/useAuth";
import { useRegistration } from "@/hooks/useRegistration";
import { IRegistration } from "@/interfaces";
import { registerSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistration>({ resolver: zodResolver(registerSchema) });

  const { mutate, isLoading } = useRegistration();
  const { saveCredentialsDispatcher } = useAuth();

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect");

  const onSubmit = (data: IRegistration) => {
    mutate(data, {
      onSuccess: (res) => {
        saveCredentialsDispatcher(res);
        setTimeout(() => {
          router.push(redirectPath || "/");
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

          <label htmlFor="username" className="form-control w-full">
            <div className="label">
              <span className="label-text">Username</span>
            </div>
            <input
              {...register("username")}
              type="text"
              id="username"
              className="input input-bordered w-full"
            />
            {errors.username && (
              <div className="label">
                <span className="label-text-alt text-rose-500">
                  {errors.username.message}
                </span>
              </div>
            )}
          </label>
          <label htmlFor="name" className="form-control w-full">
            <div className="label">
              <span className="label-text">Name</span>
            </div>
            <input
              {...register("name")}
              type="text"
              id="name"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <div className="label">
                <span className="label-text-alt text-rose-500">
                  {errors.name.message}
                </span>
              </div>
            )}
          </label>
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
          <label htmlFor="image" className="form-control w-full">
            <div className="label">
              <span className="label-text">Image</span>
            </div>
            <input
              {...register("image")}
              type="text"
              id="image"
              className="input input-bordered w-full"
            />
            {errors.image && (
              <div className="label">
                <span className="label-text-alt text-rose-500">
                  {errors.image.message}
                </span>
              </div>
            )}
          </label>
          <label htmlFor="address" className="form-control w-full">
            <div className="label">
              <span className="label-text">Address</span>
            </div>
            <input
              {...register("address")}
              type="text"
              id="address"
              className="input input-bordered w-full"
            />
            {errors.address && (
              <div className="label">
                <span className="label-text-alt text-rose-500">
                  {errors.address.message}
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
            Already have an account?{" "}
            <button
              onClick={() =>
                router.push(
                  redirectPath
                    ? `/sign-in?redirect=${redirectPath}`
                    : "/sign-in"
                )
              }
              type="button"
              className="link link-hover font-bold"
            >
              Login
            </button>
          </p>
        </form>
      </section>
    </main>
  );
};

export default SignUpPage;
