"use client";
import React, { useState } from "react";
import { Vortex } from "@/components/ui/vortex";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Login from "./login/page";

export default function Page() {
  const [animateOut, setAnimateOut] = useState(false);
  const [isActive, setIsActive] = useState({
    first: true,
    second: false,
    third: false,
  });

  const onGetStarted = () => {
    setAnimateOut(true);
    setTimeout(() => {
      setIsActive({ first: false, second: true, third: false });
      setAnimateOut(false);
    }, 1600);
  };
  return (
    <div className="w-screen h-screen mx-auto rounded-md overflow-hidden">
      <Vortex
        backgroundColor="black"
        baseHue={255}
        particleCount={500}
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full z-10"
      >
        {isActive.first && (
          <motion.div>
            <motion.h1
              initial={{ opacity: 0.5, y: 100 }}
              animate={
                animateOut ? { opacity: 0, y: -50 } : { opacity: 1, y: 0 }
              }
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center"
            >
              Aurora Gems
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0.5, y: 100 }}
              animate={
                animateOut ? { opacity: 0, y: -30 } : { opacity: 1, y: 0 }
              }
              transition={{
                delay: 0.3,
                duration: 1.2,
                ease: "easeInOut",
              }}
              className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center"
            >
              Best Gems Marketplace with 100% transparency and 100% purity.
            </motion.h1>
            <motion.div
              initial={{ opacity: 0.5, y: 100 }}
              animate={
                animateOut ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }
              }
              transition={{
                delay: 0.3,
                duration: 1.6,
                ease: "easeInOut",
              }}
              className="flex items-center text-center justify-center"
            >
              <Button
                className=" min-w-96 md:text-2xl py-5  bg-slate-800 mt-4 text-white"
                onClick={onGetStarted}
              >
                Get Started
              </Button>
            </motion.div>
          </motion.div>
        )}
        {isActive.second && <Login />}
      </Vortex>
    </div>
  );
}
