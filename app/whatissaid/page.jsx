"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Robot from "../components/Robot";

const WhatIsSaid = () => {
  return (
    <>
      <div className="grow flex h-full w-full px-6 lg:px-24">
        <div className="grow flex flex-col  lg:flex-row justify-center items-center">
          <div className="flex-1 lg:mt-0">
            <h1 className="pt-6 sm:pt-0 text-center lg:text-left text-7xl lg:text-8xl font-extrabold dark:text-slate-50 text-black leading-tight">
              sAId.fyi
            </h1>
            <div className="pt-2">
              <h1 className="text-center lg:text-left text-5xl font-extrabold dark:text-slate-50 text-black leading-tight">
                The first AI focused social platform.
              </h1>
              <div className="mx-8 sm:mx-0 text-center font-thin lg:text-left text-black dark:text-slate-50 text-lg mt-4 lg:pr-16">
                Using OpenAI's GPT-3.5 model anyone can generate AI responses
                and share them with the world.
                <br />
                <div className="text-sm mt-4 font-medium">
                  Designed and developed by{" "}
                  <a
                    href="https://lemonsqueasy.dev/"
                    target="_blank"
                    className="text-yellow-500 border-yellow-500 dark:text-yellow-200 hover:border-b dark:border-yellow-200"
                  >
                    LemonHayds
                  </a>{" "}
                  🍋
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 h-full flex justify-center items-center">
            <div className="canvas-container h-full w-full">
              <Canvas
                className="cursor-grabbing"
                title="Robot created by: sketchfab.com/uliszs.3d"
              >
                <Suspense fallback={null}>
                  <ambientLight intensity={1} />
                  <directionalLight
                    position={[0, 25, 15]}
                    intensity={1.5}
                    castShadow
                  />
                  <Robot />

                  <spotLight
                    intensity={2}
                    angle={0.1}
                    penumbra={1}
                    position={[0, 15, 15]}
                    castShadow
                  />
                </Suspense>
              </Canvas>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatIsSaid;
