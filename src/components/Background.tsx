import React from "react";

import noise from "../img/mooning.png";
import Image from "next/image";

const Background: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="relative overflow-hidden bg-gray-900">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle,_rgba(200,200,200,0.1)_1px,_transparent_1px)] [background-size:10px_10px] mix-blend-multiply" />
      <div className="absolute inset-0 z-0">
        <Image
          src={noise}
          alt="Granite Background"
          layout="fill"
          objectFit="cover"
          className=""
        />
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-neutral-700 via-gray-800 to-neutral-900 opacity-60" />

      <div className="relative z-10 min-h-screen p-4 flex flex-col items-center ">{children}</div>
    </div>
  );
};

export default Background;
