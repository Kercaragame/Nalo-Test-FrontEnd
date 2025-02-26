import { Auction } from "@/types/nft";
import React from "react";
import { FaRegHeart } from "react-icons/fa";
import Image from "next/image";
import { useSellerAndAuction } from "@/hooks/swr/useSellerAndAuctions";
import { useRouter } from "next/navigation";
import BasicLoading from "./BasicLoading";

function AuctionCard({ auction }: { auction: Auction }) {
  const { data, isLoading } = useSellerAndAuction();
  const router = useRouter();

  const handleOnClickAuction = () => {
    router.push(`/auction/${auction.id}`);
  };

  if (isLoading || !data) return <div>Loading...</div>;

  const seller = data.bestSellers.find(
    (seller) => seller.id === auction.sellerId
  );

  return (
    <div
      onClick={() => {
        handleOnClickAuction();
      }}
      className="bg-white border-2 rounded-lg hover:cursor-pointer hover:bg-gray-100"
    >
      {isLoading || !seller || !auction ? (
        <BasicLoading />
      ) : (
        <>
          {" "}
          <div
            className="p-4"
            data-testid={`auction-seller-${auction.sellerId}`}
          >
            <div className="">
              <Image
                src={auction.image}
                alt={auction.name}
                height={300}
                width={500}
                className="w-full h-40 object-cover rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex text-xs justify-between mt-2 text-nowrap gap-6">
                <p className="text-sm truncate">{auction.name}</p>
                <p className="text-green-400 font-bold">
                  {auction.forSale} for sale
                </p>
              </div>
              <p className="text-gray-400 text-xs font-bold">
                {auction.totalMinted} Editions Minted
              </p>
              <div className="flex items-center gap-2 mt-4">
                <div className="relative">
                  <Image
                    className="rounded-full"
                    src={`${seller.avatar}`}
                    alt="Vercel logomark"
                    width={30}
                    height={30}
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
                <p className="text-xs font-bold">{seller.name}</p>
              </div>
            </div>
          </div>
          <div className="border-t-2 flex justify-between items-center w-full p-4">
            <div>
              <p className="font-semibold text-sm">{auction.price} ETH</p>
              <p className="text-gray-400 text-xs font-semibold">
                Starting Bid
              </p>
            </div>
            <div className="flex gap-2 text-gray-400">
              <p className=" text-xs font-semibold">{auction.like}</p>
              <FaRegHeart />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AuctionCard;
