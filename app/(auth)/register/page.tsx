"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Login from "../login/page";
import * as z from "zod";
import axios from "axios";

const userSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").max(100),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have than 8 characters")
      .max(100),
    role: z.enum(["BUYER", "SELLER"]),
    confirmPassword: z.string().min(1, "Confirm Password is required").max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<"BUYER" | "SELLER">("BUYER");
  const [animateOut, setAnimateOut] = useState(false);
  const [isActive, setIsActive] = useState({
    login: false,
    register: true,
  });

  const renderLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    setAnimateOut(true);
    setTimeout(() => {
      setIsActive({ login: true, register: false });
      setAnimateOut(false);
    }, 1600);
  };

  const handleRegister = async (values: z.infer<typeof userSchema>) => {
    try {
      const parsedData = userSchema.parse({
        username: values.username,
        email: values.email,
        password: values.password,
        role: values.role,
        confirmPassword: values.confirmPassword,
      });

      const response = await axios.post("/api/user", {
        username: parsedData.username,
        email: parsedData.email,
        password: parsedData.password,
        role: parsedData.role,
      });

      if (response.status === 201) {
        alert("User created successfully");
        setAnimateOut(true);
        setTimeout(() => {
          setIsActive({ login: true, register: false });
          setAnimateOut(false);
        }, 1600);
      } else if (response.status === 409) {
        alert("Email or Username already exists");
      } else if (response.status === 500) {
        alert("Something went wrong");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          alert("Email or Username already exists");
        } else if (error.response?.status === 500) {
          alert("Something went wrong");
        }
      } else {
        alert("An unexpected error occurred");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={animateOut ? { opacity: 0, y: -50 } : { opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="flex items-center text-center justify-center text-white"
    >
      {isActive.register && (
        <div className="w-full h-full flex justify-center items-center">
          <form className="form-content p-5 min-w-[50vh] rounded-lg border-r-boxShadow-input backdrop-blur-2xl border border-slate-700">
            <div className="font-semibold text-3xl pb-5 w-full text-center text-white">
              Register
            </div>
            <div className="form-group pb-5 w-full">
              <input
                type="text"
                id="formUsername"
                placeholder="Username"
                className="p-2 rounded-lg text-black dark:text-white w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group pb-5 w-full">
              <input
                type="email"
                id="formEmail"
                placeholder="Email"
                className="p-2 rounded-lg text-black dark:text-white w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group pb-5 w-full">
              <input
                type="password"
                id="formPassword"
                placeholder="Password"
                className="p-2 rounded-lg text-black dark:text-white w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group pb-5 w-full">
              <input
                type="password"
                id="formConfirmPassword"
                placeholder="Confirm Password"
                className="p-2 rounded-lg text-black dark:text-white w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="form-group pb-5 w-full flex justify-between">
              <button
                type="button"
                onClick={() => setSelectedRole("BUYER")}
                className={`flex-1 p-2 rounded-l-lg ${
                  selectedRole === "BUYER"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                User
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole("SELLER")}
                className={`flex-1 p-2 rounded-r-lg ${
                  selectedRole === "SELLER"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                Seller
              </button>
            </div>
            <div>
              <div className="flex pt-1 mb-1">
                <div className="pr-2 text-sm text-white">
                  Already have an account?
                </div>
                <button
                  onClick={renderLogin}
                  className="text-white text-sm underline"
                >
                  Sign in
                </button>
              </div>
              <button
                onClick={() =>
                  handleRegister({
                    username,
                    email,
                    password,
                    confirmPassword,
                    role: selectedRole,
                  })
                }
                type="button"
                className=" rounded-xl bg-slate-800 text-white font-semibold min-w-[20rem] w-full p-2 hover:text-slate-50 items-center justify-center"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      )}
      {isActive.login && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={animateOut ? { opacity: 0, y: -50 } : { opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          <Login />
        </motion.div>
      )}
    </motion.div>
  );
}
