"use client";

import React from "react";

type LoadingProps = {
  size?: number;
  className?: string;
};

const Loading = ({
  size = 70,
  className = "",
}: LoadingProps) => {
  const segments = [
    "M64 8 A56 56 0 0 1 92 15",
    "M103 24 A56 56 0 0 1 118 52",
    "M120 64 A56 56 0 0 1 113 92",
    "M104 103 A56 56 0 0 1 78 118",
    "M64 120 A56 56 0 0 1 36 113",
    "M25 104 A56 56 0 0 1 10 76",
    "M8 64 A56 56 0 0 1 15 36",
    "M24 25 A56 56 0 0 1 50 10",
  ];

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>
          {`
            @keyframes accessories-ring {
              0%, 10% {
                stroke: #E31E24;
                opacity: 1;
              }

              20%, 100% {
                stroke: #777777;
                opacity: 0.35;
              }
            }

            @keyframes accessories-lights {
              0%, 35% {
                fill: #ffffff;
              }

              50%, 85% {
                fill: #E31E24;
              }

              100% {
                fill: #ffffff;
              }
            }

            .accessories-ring {
              animation: accessories-ring 1.6s linear infinite;
              stroke-linecap: round;
            }

            .accessories-light {
              animation: accessories-lights 0.8s ease-in-out infinite;
            }
          `}
        </style>

        {/* =========================
            OUTER LOADING RING
        ========================== */}

        <g fill="none" strokeWidth="9" strokeLinecap="round">
          {segments.map((path, index) => (
            <path
              key={index}
              d={path}
              className="accessories-ring"
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            />
          ))}
        </g>

        {/* =========================
            GEAR
        ========================== */}

        <path
          d="
            M67.8 31.5
            L72.8 36.2
            C75.4 36.8 77.9 37.8 80.2 39.1
            L86.7 37.1
            L92.2 46.7
            L87.1 51.1
            C87.6 53.6 87.6 56.1 87.1 58.6
            L92.2 63
            L86.7 72.6
            L80.2 70.6
            C77.9 71.9 75.4 72.9 72.8 73.5
            L67.8 82.2
            L56.2 82.2
            L51.2 73.5
            C48.6 72.9 46.1 71.9 43.8 70.6
            L37.3 72.6
            L31.8 63
            L36.9 58.6
            C36.4 56.1 36.4 53.6 36.9 51.1
            L31.8 46.7
            L37.3 37.1
            L43.8 39.1
            C46.1 37.8 48.6 36.8 51.2 36.2
            L56.2 31.5
            Z
          "
          fill="#4A4A4A"
        />

        {/* =========================
            GEAR CENTER
        ========================== */}

        <circle
          cx="62"
          cy="54.8"
          r="19"
          fill="#FFFFFF"
          stroke="#4A4A4A"
          strokeWidth="3"
        />

        {/* =========================
            CAR BODY
        ========================== */}

        <path
          d="
            M45 57.5
            L48.8 48.5
            C49.6 46.6 51.4 45.4 53.5 45.4
            H70.5
            C72.6 45.4 74.4 46.6 75.2 48.5
            L79 57.5
            V66.5
            H45
            Z
          "
          fill="#4A4A4A"
        />

        {/* =========================
            WINDSHIELD
        ========================== */}

        <path
          d="
            M52 48.2
            H72
            L75.5 55
            H48.5
            Z
          "
          fill="#FFFFFF"
        />

        {/* =========================
            LEFT HEADLIGHT
        ========================== */}

        <path
          d="
            M46.5 58.5
            H54
            L51.5 62
            H46.5
            Z
          "
          className="accessories-light"
        />

        {/* =========================
            RIGHT HEADLIGHT
        ========================== */}

        <path
          d="
            M70 58.5
            H77.5
            V62
            H72.5
            Z
          "
          className="accessories-light"
          style={{
            animationDelay: "0.15s",
          }}
        />

        {/* =========================
            WHEELS
        ========================== */}

        <circle cx="51" cy="66" r="3" fill="#292929" />

        <circle cx="73" cy="66" r="3" fill="#292929" />

        {/* =========================
            WRENCH
        ========================== */}

        {/* Mirrored red wrench */}
        <g transform="translate(176 95) rotate(45) scale(-1 1)">
          {/* Wrench head */}
          <path
            d="
      M84.5 60.5
      C82.2 58.2 78.6 57.8 75.9 59.3
      L79.1 62.5
      L75.2 66.4
      L72 63.2
      C70.5 65.9 70.9 69.5 73.2 71.8
      C76.1 74.7 80.8 74.7 83.7 71.8
      C85.2 70.3 86 68.3 85.9 66.3
      L91.2 61
      L84.5 60.5
      Z
    "
            fill="#E31E24"
          />

          {/* Wrench handle */}
          <path
            d="M76.2 69.5L88.5 81.8"
            stroke="#E31E24"
            strokeWidth="6"
            strokeLinecap="round"
          />

          <circle cx="90.5" cy="83.8" r="4.2" fill="#E31E24" />
        </g>
      </svg>

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loading;
