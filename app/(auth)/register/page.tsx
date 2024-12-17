"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Login from "../login/page";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("BUYER");
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

  const handleRegister = () => {
    console.log("register");
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
                onClick={handleRegister}
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
