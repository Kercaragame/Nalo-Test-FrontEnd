import { useRouter } from "next/navigation";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className=" flex items-center justify-center gap-2 text-gray-400 font-bold py-2 px-4 rounded-full"
    >
      <IoMdArrowRoundBack />
      Go Back
    </button>
  );
}

export default BackButton;
