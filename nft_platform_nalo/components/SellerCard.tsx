import React from "react";
import { Seller } from "@/types/sellers";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SellerCard = ({ seller, rank }: { seller: Seller; rank?: number }) => {
  const router = useRouter();

  const handleSellerClicked = () => {
    router.push(`/seller/${seller.id}`);
  };

  return (
    <div
      onClick={() => {
        handleSellerClicked();
      }}
      data-testid={`seller-card-${seller.id}`}
      role="seller-card"
      className="flex p-2 justify-start items-center hover:cursor-pointer hover:shadow-sm hover:bg-gray-100 rounded-md "
    >
      {rank && (
        <p className="text-gray-300 font-bold mr-2 text-xs">
          {rank < 10 ? `0${rank}` : rank}
        </p>
      )}

      <div className="relative">
        <Image
          className="rounded-full"
          src={`${seller.avatar}`}
          alt="Vercel logomark"
          width={40}
          height={40}
        />
        {seller.isVerified && (
          <Image
            className="absolute right-0 -bottom-1"
            src="/verifiedBadge.png"
            alt="Vercel logomark"
            width={15}
            height={15}
          />
        )}
      </div>

      <div className="ml-3 ">
        <h4 className="text-sm font-semibold">{seller.name}</h4>
        {seller.totalMoney && (
          <p className="text-gray-400 text-xs font-bold">{`${seller.totalMoney} ETH`}</p>
        )}
      </div>
    </div>
  );
};

export default SellerCard;
