import React from "react";
import { motion } from "framer-motion";
function Loading() {
  const svg = {
    start: { pathLength: 0, fill: "rgba(0,0,0,0)" },
    end: {
      fill: "rgba(0,0,0,1)",
      pathLength: 1,
    },
  };
  return (
    <motion.g
      xmlns="http://www.w3.org/2000/svg"
      transform="translate(0.000000,43.000000) scale(0.5,-0.5)"
      fill="#000000"
      stroke="none"
    >
      <motion.path
        variants={svg}
        initial="start"
        animate="end"
        transition={{
          repeatDelay: 1,

          default: { duration: 0.5 },
          fill: {
            duration: 0.5,
            delay: 0.5,
            repeat: Infinity,
            repeatDelay: 0.5,
          },
        }}
        d="M2523 416 c-116 -38 -176 -152 -138 -265 19 -58 73 -112 130 -131 50 -16 151 -9 200 15 l40 20 3 83 3 82 -41 0 -40 0 0 -55 0 -54 -41 -12 c-132 -40 -225 116 -125 208 30 28 43 33 83 33 31 0 60 -7 81 -20 l34 -21 21 28 c12 15 22 32 22 38 0 17 -89 55 -141 60 -27 3 -67 -1 -91 -9z"
      />
      <motion.path
        variants={svg}
        initial="start"
        animate="end"
        transition={{
          repeatDelay: 1,

          default: { duration: 0.5 },
          fill: {
            duration: 0.5,
            delay: 0.5,
            repeat: Infinity,
            repeatDelay: 0.5,
          },
        }}
        d="M5410 415 c-48 -15 -103 -61 -124 -104 -52 -102 -5 -235 98 -282 78 -36 199 -16 250 39 15 17 14 20 -13 46 l-28 27 -34 -20 c-67 -41 -153 -20 -184 45 -23 49 -13 98 30 141 27 27 41 33 77 33 29 0 55 -8 77 -23 l34 -23 28 30 c32 36 27 46 -34 77 -51 27 -122 32 -177 14z"
      />
      <motion.path
        variants={svg}
        initial="start"
        animate="end"
        transition={{
          repeatDelay: 1,

          default: { duration: 0.5 },
          fill: {
            duration: 0.5,
            delay: 0.5,
            repeat: Infinity,
            repeatDelay: 0.5,
          },
        }}
        d="M6155 419 c-17 -4 -44 -22 -60 -39 -24 -25 -30 -40 -30 -75 0 -60 29 -87 130 -122 65 -23 81 -32 83 -50 8 -52 -97 -53 -170 -2 -16 12 -31 20 -32 18 -2 -2 -11 -19 -20 -37 -22 -42 -13 -54 60 -82 139 -52 264 -2 264 106 0 62 -28 90 -125 122 -70 24 -80 30 -80 51 0 42 34 43 152 6 19 -6 24 -1 38 31 18 44 16 46 -59 69 -55 16 -105 18 -151 4z"
      />
      <motion.path
        variants={svg}
        initial="start"
        animate="end"
        transition={{
          repeatDelay: 1,

          default: { duration: 0.5 },
          fill: {
            duration: 0.5,
            delay: 0.5,
            repeat: Infinity,
            repeatDelay: 0.5,
          },
        }}
        d="M16 398 c3 -13 33 -105 66 -205 l59 -183 49 0 49 0 21 70 c11 39 30 103 41 143 l22 72 40 -143 41 -143 50 3 49 3 68 200 67 200 4 -200 3 -200 163 -3 162 -2 0 40 0 40 -115 0 -115 0 0 45 0 45 100 0 100 0 0 40 0 40 -100 0 -100 0 0 40 0 40 110 0 110 0 0 40 0 40 -211 -2 -212 -3 -38 -138 c-20 -76 -39 -141 -41 -143 -3 -2 -22 60 -45 139 l-40 142 -49 3 -49 3 -39 -146 c-21 -80 -41 -144 -43 -142 -3 4 -21 63 -69 235 l-15 52 -50 0 c-48 0 -50 -1 -43 -22z"
      />
      <motion.path
        variants={svg}
        initial="start"
        animate="end"
        transition={{
          repeatDelay: 1,

          default: { duration: 0.5 },
          fill: {
            duration: 0.5,
            delay: 0.5,
            repeat: Infinity,
            repeatDelay: 0.5,
          },
        }}
        d="M1246 412 c-3 -6 -29 -63 -57 -128 -28 -66 -66 -154 -85 -197 l-33 -77 49 0 c49 0 51 1 66 40 l16 40 94 0 94 0 16 -40 c16 -39 17 -40 65 -40 27 0 49 3 49 8 0 4 -38 95 -84 202 l-82 195 -51 3 c-28 2 -54 -1 -57 -6z m83 -170 l30 -72 -61 0 c-53 0 -59 2 -54 18 29 76 51 130 53 128 1 -1 16 -35 32 -74z"
      />
      <motion.path
        variants={svg}
        initial="start"
        animate="end"
        transition={{
          repeatDelay: 1,

          default: { duration: 0.5 },
          fill: {
            duration: 0.5,
            delay: 0.5,
            repeat: Infinity,
            repeatDelay: 0.5,
          },
        }}
        d="M1532 218 l3 -203 48 -3 47 -3 0 60 0 61 45 0 c44 0 45 -1 77 -60 l33 -60 53 0 c28 0 52 2 52 5 0 2 -18 32 -39 66 l-39 62 28 29 c33 32 45 80 37 139 -11 85 -61 109 -227 109 l-120 0 2 -202z m240 105 c10 -9 18 -30 18 -49 0 -46 -29 -64 -102 -64 l-58 0 0 65 0 65 62 0 c43 0 67 -5 80 -17z"
      />
      <motion.path
        variants={svg}
        initial="start"
        animate="end"
        transition={{
          repeatDelay: 1,

          default: { duration: 0.5 },
          fill: {
            duration: 0.5,
            delay: 0.5,
            repeat: Infinity,
            repeatDelay: 0.5,
          },
        }}
        d="M1930 215 l0 -205 160 0 160 0 0 40 0 40 -115 0 -115 0 0 45 0 45 100 0 100 0 0 40 0 40 -100 0 -100 0 0 40 0 40 110 0 110 0 0 40 0 40 -155 0 -155 0 0 -205z"
      />
      <motion.path
        variants={svg}
        initial="start"
        animate="end"
        transition={{
          repeatDelay: 1,

          default: { duration: 0.5 },
          fill: {
            duration: 0.5,
            delay: 0.5,
            repeat: Infinity,
            repeatDelay: 0.5,
          },
        }}
        d="M2810 215 l0 -205 45 0 45 0 0 60 0 60 48 0 47 0 33 -60 33 -60 55 0 55 0 -37 58 c-20 31 -39 61 -44 65 -4 4 8 23 26 41 44 44 54 106 26 168 -29 66 -62 78 -211 78 l-121 0 0 -205z m233 113 c27 -22 31 -61 7 -91 -19 -24 -28 -27 -86 -27 l-64 0 0 65 0 65 63 0 c35 0 70 -6 80 -12z"
      />
      <motion.path
        variants={svg}
        initial="start"
        animate="end"
        transition={{
          repeatDelay: 1,

          default: { duration: 0.5 },
          fill: {
            duration: 0.5,
            delay: 0.5,
            repeat: Infinity,
            repeatDelay: 0.5,
          },
        }}
        d="M3200 215 l0 -205 163 2 162 3 3 38 3 37 -115 0 -116 0 0 45 0 45 101 0 100 0 -3 38 -3 37 -97 3 -98 3 0 39 0 39 108 3 107 3 3 38 3 37 -160 0 -161 0 0 -205z"
      />
      <motion.path
        variants={svg}
        initial="start"
        animate="end"
        transition={{
          repeatDelay: 1,

          default: { duration: 0.5 },
          fill: {
            duration: 0.5,
            delay: 0.5,
            repeat: Infinity,
            repeatDelay: 0.5,
          },
        }}
        d="M3562 218 l3 -203 160 0 160 0 3 38 3 37 -115 0 -116 0 0 45 0 45 100 0 100 0 0 40 0 40 -100 0 -100 0 0 40 0 40 110 0 110 0 0 40 0 40 -160 0 -160 0 2 -202z"
      />
      <motion.path
        variants={svg}
        initial="start"
        animate="end"
        transition={{
          repeatDelay: 1,

          default: { duration: 0.5 },
          fill: {
            duration: 0.5,
            delay: 0.5,
            repeat: Infinity,
            repeatDelay: 0.5,
          },
        }}
        d="M3930 215 l0 -205 45 0 44 0 3 125 3 125 94 -125 94 -125 44 0 43 0 0 205 0 205 -45 0 -44 0 -3 -125 -3 -126 -94 126 -93 125 -44 0 -44 0 0 -205z"
      />
      <motion.path
        variants={svg}
        initial="start"
        animate="end"
        transition={{
          repeatDelay: 1,

          default: { duration: 0.5 },
          fill: {
            duration: 0.5,
            delay: 0.5,
            repeat: Infinity,
            repeatDelay: 0.5,
          },
        }}
        d="M4360 215 l0 -205 113 0 c135 0 177 11 212 52 37 44 31 111 -13 148 l-30 25 23 17 c49 37 40 113 -17 148 -28 17 -51 20 -160 20 l-128 0 0 -205z m228 113 c35 -35 -3 -68 -79 -68 l-59 0 0 40 0 40 63 0 c36 0 68 -5 75 -12z m10 -160 c17 -17 15 -44 -4 -62 -11 -11 -35 -16 -80 -16 l-64 0 0 45 0 45 68 0 c40 0 73 -5 80 -12z"
      />
      <motion.path
        variants={svg}
        initial="start"
        animate="end"
        transition={{
          repeatDelay: 1,

          default: { duration: 0.5 },
          fill: {
            duration: 0.5,
            delay: 0.5,
            repeat: Infinity,
            repeatDelay: 0.5,
          },
        }}
        d="M4742 218 l3 -203 48 -3 47 -3 0 60 0 61 45 0 c43 0 45 -1 78 -57 33 -58 33 -58 85 -61 29 -2 52 0 52 3 0 3 -18 34 -40 68 l-39 62 24 20 c34 29 45 57 45 118 0 40 -6 61 -21 81 -38 48 -67 56 -204 56 l-125 0 2 -202z m242 106 c9 -8 16 -31 16 -49 0 -47 -29 -65 -102 -65 l-58 0 0 65 0 65 64 0 c45 0 69 -5 80 -16z"
      />
      <motion.path
        variants={svg}
        initial="start"
        animate="end"
        transition={{
          repeatDelay: 1,

          default: { duration: 0.5 },
          fill: {
            duration: 0.5,
            delay: 0.5,
            repeat: Infinity,
            repeatDelay: 0.5,
          },
        }}
        d="M5140 214 l0 -205 48 3 47 3 3 203 2 202 -50 0 -50 0 0 -206z"
      />
      <motion.path
        variants={svg}
        initial="start"
        animate="end"
        transition={{
          repeatDelay: 1,

          default: { duration: 0.5 },
          fill: {
            duration: 0.5,
            delay: 0.5,
            repeat: Infinity,
            repeatDelay: 0.5,
          },
        }}
        d="M5670 214 l0 -205 48 3 47 3 3 49 c3 47 32 106 52 106 5 0 34 -36 64 -80 l56 -80 55 0 c30 0 55 3 55 6 0 3 -36 57 -80 121 l-80 115 76 84 76 84 -55 0 -55 0 -81 -87 -81 -87 0 87 0 87 -50 0 -50 0 0 -206z"
      />
    </motion.g>
  );
}
export default Loading;
