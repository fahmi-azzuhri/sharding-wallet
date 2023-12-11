import React, { useState } from "react";
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function SignUpForm({ showSignInText }) {
  const [showSignIn, setShowSignIn] = useState(showSignInText);

  const schema: z.ZodType<FormData> = z
    .object({
      name: z.string().min(2).max(30),
      email: z.string().email(),
      password: z.string().min(5).max(20),
      confirmPassword: z.string().min(5).max(20),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password do not match",
      path: ["confirmPassword"],
    });

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submitData = (data: FormData) => {
    console.log("yes worked", data);
    // Add your logic for handling the submitted data
  };

  return (
    <div className="form-container sign-up-container">
      <h1 className="signuph1">Create Account</h1>

      <form onSubmit={handleSubmit(submitData)}>
        <input type="text" placeholder="Name" {...register("name")} />
        <input type="email" placeholder="Email" {...register("email")} />
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />
        <button className="mt-5" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
