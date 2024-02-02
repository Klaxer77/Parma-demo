import React from 'react';
import './Loading.scss';

export default function Loading() {
  return (
    <>
      <div className="w-full h-[100vh] flex justify-center items-center absolute left-0 bg-[black] opacity-[80%] overflow-hidden"></div>
      <div className="bg-[transparent] absolute left-0 w-full h-[100vh] flex justify-center items-center">
        <svg
          className="pl mb-[90px]"
          viewBox="0 0 200 200"
          width="80"
          height="80"
          xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pl-grad1" x1="1" y1="0.5" x2="0" y2="0.5">
              <stop offset="0%" stop-color="#0050FF" />
              <stop offset="100%" stop-color="#0050FF" />
            </linearGradient>
            <linearGradient id="pl-grad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#0050FF" />
              <stop offset="100%" stop-color="#0050FF" />
            </linearGradient>
          </defs>
          <circle
            class="pl__ring"
            cx="100"
            cy="100"
            r="82"
            fill="none"
            stroke="url(#pl-grad1)"
            stroke-width="36"
            stroke-dasharray="0 257 1 257"
            stroke-dashoffset="0.01"
            stroke-linecap="round"
            transform="rotate(-90,100,100)"
          />
          <line
            class="pl__ball"
            stroke="url(#pl-grad2)"
            x1="100"
            y1="18"
            x2="100.01"
            y2="182"
            stroke-width="36"
            stroke-dasharray="1 165"
            stroke-linecap="round"
          />
        </svg>
      </div>
    </>
  );
}