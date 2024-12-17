import { motion } from "framer-motion";
import { useState } from "react";
import Register from "../register/page";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [animateOut, setAnimateOut] = useState(false);
  const [isActive, setIsActive] = useState({
    login: true,
    register: false,
  });

  const renderRegister = (e: React.MouseEvent) => {
    e.preventDefault();
    setAnimateOut(true);
    setTimeout(() => {
      setIsActive({ login: false, register: true });
      setAnimateOut(false);
    }, 1600);
  };

  const signIn = () => {
    console.log("sign in");
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
      className="flex items-center text-center justify-center"
    >
      {isActive.login && (
        <div className="w-full h-full flex justify-center items-center text-white">
          <form className="form-content p-5 min-w-[40vh] rounded-lg border-r-boxShadow-input backdrop-blur-2xl border border-slate-700">
            <div className="font-semibold text-3xl pb-5 w-full text-center text-white">
              Sign In
            </div>
            <div className="form-group pb-5 w-full">
              <input
                type="email"
                id="formEmail"
                placeholder="email"
                className="p-2 rounded-lg bg-bluefield text-black dark:text-white w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group pb-5 w-full">
              <input
                type="password"
                id="formPassword"
                placeholder="password"
                className="p-2 rounded-lg bg-bluefield text-black dark:text-white w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <div className="flex pt-1 mb-1">
                <div className="pr-2 text-sm text-white">
                  Dont have an account?
                </div>
                <button
                  onClick={renderRegister}
                  className="text-white text-sm underline"
                >
                  Register here
                </button>
              </div>
              <button
                onClick={signIn}
                type="button"
                className=" rounded-xl bg-slate-800 text-white font-semibold min-w-[20rem] w-full p-2  hover:text-slate-50 items-center justify-center"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      )}
      {isActive.register && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={animateOut ? { opacity: 0, y: -50 } : { opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          <Register />
        </motion.div>
      )}
    </motion.div>
  );
}
