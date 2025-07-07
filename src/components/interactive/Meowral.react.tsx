/** @jsxImportSource react */
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";

// export type MeowralProps = {};

export const Meowral = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setCount((oldCount) => oldCount + 1);
    }, 1000);
  }, []);

  return (
    <motion.div
      className="size-20 bg-primary rounded-xl text-white"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      drag
      dragConstraints={{
        top: 0,
        left: -10,
        right: 10,
        bottom: 10,
      }}
    >
      {count}
    </motion.div>
  );
};

export default Meowral;
