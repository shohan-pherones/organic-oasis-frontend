"use client";

import useAuth from "@/hooks/useAuth";
import { useSignUp } from "@/hooks/useSignUp";
import { IRegistration } from "@/interfaces";
import { registerSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistration>({
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();
  const { mutate, isLoading } = useSignUp();
  const { saveCredentialsDispatcher } = useAuth();

  const onSubmit = (data: IRegistration) => {
    const formData = new FormData();

    formData.append("username", data.username);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("address", data.address);
    formData.append("image", data.image);

    mutate(formData, {
      onSuccess: (data) => {
        saveCredentialsDispatcher(data);
        router.push("/");
      },
      onError: (err) => {
        if (axios.isAxiosError(err) && err.response) {
          toast.error(err.response.data?.message || "An error occured");
        } else {
          toast.error(err.message || "An unexpected error occurred");
        }
      },
    });
  };

  return (
    <main>
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="order-last md:order-first overflow-hidden w-full h-full">
          <Image
            src="/images/registration.jpg"
            alt="Registration"
            width={1080}
            height={1920}
            priority
            className="w-full h-full object-cover"
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="wrapper flex flex-col gap-2 justify-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold">Create an account</h3>
          <p className="text-sm opacity-50">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est et
            nesciunt quam recusandae molestias odio eligendi exercitationem sit
            officiis repellendus, cupiditate architecto similique totam impedit
            unde numquam nulla laborum possimus?
          </p>
          <label htmlFor="username" className="form-control w-full">
            <div className="label">
              <span className="label-text">Username</span>
            </div>
            <input
              {...register("username")}
              type="text"
              id="username"
              placeholder="Type your username"
              className="input input-bordered w-full"
            />
            {errors.username && (
              <div className="label">
                <span className="label-text-alt text-red-500">
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
              placeholder="Type your name"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <div className="label">
                <span className="label-text-alt text-red-500">
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
              placeholder="Type your email"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <div className="label">
                <span className="label-text-alt text-red-500">
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
              placeholder="Type your password"
              className="input input-bordered w-full"
            />
            {errors.password && (
              <div className="label">
                <span className="label-text-alt text-red-500">
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
              placeholder="Paste your image url from pexels"
              className="input input-bordered w-full"
            />
            {errors.image && (
              <div className="label">
                <span className="label-text-alt text-red-500">
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
              placeholder="Type your address"
              className="input input-bordered w-full"
            />
            {errors.address && (
              <div className="label">
                <span className="label-text-alt text-red-500">
                  {errors.address.message}
                </span>
              </div>
            )}
          </label>
          <button
            disabled={isLoading}
            type="submit"
            className="mt-3 btn btn-primary"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
          <p className="mt-1">
            Already have an account?{" "}
            <button
              className="link link-hover font-bold"
              type="button"
              onClick={() => router.push("/sign-in")}
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
