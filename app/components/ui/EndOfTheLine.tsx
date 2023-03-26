import React from "react";
import { TbRobotOff } from "react-icons/tb";

const EndOfTheLine = () => {
  return (
    <div className="flex justify-center items-center mt-6">
      <div>
        <p className="text-black/50 dark:text-slate-50/50 text-sm mr-1">
          End of the line
        </p>
      </div>
      <div className="text-black/50 dark:text-slate-50/50 text-md">
        <TbRobotOff />
      </div>
    </div>
  );
};

export default EndOfTheLine;
