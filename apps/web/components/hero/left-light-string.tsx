import React from "react";

// Left Light String SVG Component with twinkling bulbs
const LeftLightString = () => (
  <svg
    width="508"
    height="313"
    viewBox="0 0 508 313"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <style>
      {`
        @keyframes twinkle1 { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes twinkle2 { 0%, 100% { opacity: 0.9; } 40% { opacity: 0.2; } }
        @keyframes twinkle3 { 0%, 100% { opacity: 1; } 60% { opacity: 0.4; } }
        @keyframes twinkle4 { 0%, 100% { opacity: 0.85; } 35% { opacity: 0.15; } }
        @keyframes twinkle5 { 0%, 100% { opacity: 1; } 70% { opacity: 0.25; } }
        .left-bulb1 { animation: twinkle1 1.7s ease-in-out infinite; }
        .left-bulb2 { animation: twinkle2 2.3s ease-in-out infinite 0.3s; }
        .left-bulb3 { animation: twinkle3 1.9s ease-in-out infinite 0.7s; }
        .left-bulb4 { animation: twinkle4 2.7s ease-in-out infinite 0.2s; }
        .left-bulb5 { animation: twinkle5 2.1s ease-in-out infinite 1.1s; }
        .left-bulb6 { animation: twinkle1 2.5s ease-in-out infinite 0.5s; }
        .left-bulb7 { animation: twinkle3 1.5s ease-in-out infinite 0.9s; }
        .left-bulb8 { animation: twinkle2 2.9s ease-in-out infinite 0.4s; }
      `}
    </style>
    <path
      d="M458.724 0.33998C386.893 97.5888 194.947 290.163 1.80764 282.472"
      stroke="#BBBBBB"
      strokeWidth="1.14436"
    />
    <g filter="url(#filter0_f_260_646)" className="left-bulb1">
      <circle
        cx="69.229"
        cy="278.271"
        r="8.01054"
        transform="rotate(-19.546 69.229 278.271)"
        fill="#D4C71D"
      />
      <circle
        cx="69.229"
        cy="278.271"
        r="7.72445"
        transform="rotate(-19.546 69.229 278.271)"
        stroke="#BBBBBB"
        strokeWidth="0.572181"
      />
    </g>
    <g filter="url(#filter1_f_260_646)" className="left-bulb2">
      <circle
        cx="113.741"
        cy="268.54"
        r="8.01054"
        transform="rotate(-19.546 113.741 268.54)"
        fill="#CB000B"
      />
      <circle
        cx="113.741"
        cy="268.54"
        r="7.72445"
        transform="rotate(-19.546 113.741 268.54)"
        stroke="#BBBBBB"
        strokeWidth="0.572181"
      />
    </g>
    <g filter="url(#filter2_f_260_646)" className="left-bulb3">
      <circle
        cx="146.633"
        cy="256.863"
        r="8.01054"
        transform="rotate(-19.546 146.633 256.863)"
        fill="#055A44"
      />
      <circle
        cx="146.633"
        cy="256.863"
        r="7.72445"
        transform="rotate(-19.546 146.633 256.863)"
        stroke="#BBBBBB"
        strokeWidth="0.572181"
      />
    </g>
    <g filter="url(#filter3_f_260_646)" className="left-bulb4">
      <circle
        cx="178.95"
        cy="243.568"
        r="8.01054"
        transform="rotate(-19.546 178.95 243.568)"
        fill="#D1004C"
      />
      <circle
        cx="178.95"
        cy="243.568"
        r="7.72445"
        transform="rotate(-19.546 178.95 243.568)"
        stroke="#BBBBBB"
        strokeWidth="0.572181"
      />
    </g>
    <g filter="url(#filter4_f_260_646)" className="left-bulb5">
      <circle
        cx="218.868"
        cy="220.896"
        r="8.01054"
        transform="rotate(-19.546 218.868 220.896)"
        fill="#D4C71D"
      />
      <circle
        cx="218.868"
        cy="220.896"
        r="7.72445"
        transform="rotate(-19.546 218.868 220.896)"
        stroke="#BBBBBB"
        strokeWidth="0.572181"
      />
    </g>
    <g filter="url(#filter5_f_260_646)" className="left-bulb6">
      <circle
        cx="287.239"
        cy="172.335"
        r="8.01054"
        transform="rotate(-19.546 287.239 172.335)"
        fill="#CB000B"
      />
      <circle
        cx="287.239"
        cy="172.335"
        r="7.72445"
        transform="rotate(-19.546 287.239 172.335)"
        stroke="#BBBBBB"
        strokeWidth="0.572181"
      />
    </g>
    <g filter="url(#filter6_f_260_646)" className="left-bulb7">
      <circle
        cx="357.436"
        cy="115.234"
        r="8.01054"
        transform="rotate(-19.546 357.436 115.234)"
        fill="#055A44"
      />
      <circle
        cx="357.436"
        cy="115.234"
        r="7.72445"
        transform="rotate(-19.546 357.436 115.234)"
        stroke="#BBBBBB"
        strokeWidth="0.572181"
      />
    </g>
    <g filter="url(#filter7_f_260_646)" className="left-bulb8">
      <circle
        cx="413.471"
        cy="55.8723"
        r="8.01054"
        transform="rotate(-19.546 413.471 55.8723)"
        fill="#D1004C"
      />
      <circle
        cx="413.471"
        cy="55.8723"
        r="7.72445"
        transform="rotate(-19.546 413.471 55.8723)"
        stroke="#BBBBBB"
        strokeWidth="0.572181"
      />
    </g>
    <defs>
      <filter
        id="filter0_f_260_646"
        x="51.3176"
        y="260.359"
        width="35.8229"
        height="35.8229"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="4.94937" result="effect1_foregroundBlur_260_646" />
      </filter>
      <filter
        id="filter1_f_260_646"
        x="95.8293"
        y="250.629"
        width="35.8229"
        height="35.8229"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="4.94937" result="effect1_foregroundBlur_260_646" />
      </filter>
      <filter
        id="filter2_f_260_646"
        x="128.722"
        y="238.951"
        width="35.8229"
        height="35.8229"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="4.94937" result="effect1_foregroundBlur_260_646" />
      </filter>
      <filter
        id="filter3_f_260_646"
        x="161.038"
        y="225.656"
        width="35.8229"
        height="35.8229"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="4.94937" result="effect1_foregroundBlur_260_646" />
      </filter>
      <filter
        id="filter4_f_260_646"
        x="200.956"
        y="202.984"
        width="35.8229"
        height="35.8229"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="4.94937" result="effect1_foregroundBlur_260_646" />
      </filter>
      <filter
        id="filter5_f_260_646"
        x="269.327"
        y="154.424"
        width="35.8229"
        height="35.8229"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="4.94937" result="effect1_foregroundBlur_260_646" />
      </filter>
      <filter
        id="filter6_f_260_646"
        x="339.525"
        y="97.3221"
        width="35.8229"
        height="35.8229"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="4.94937" result="effect1_foregroundBlur_260_646" />
      </filter>
      <filter
        id="filter7_f_260_646"
        x="395.56"
        y="37.9609"
        width="35.8229"
        height="35.8229"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="4.94937" result="effect1_foregroundBlur_260_646" />
      </filter>
    </defs>
  </svg>
);

export default LeftLightString;
