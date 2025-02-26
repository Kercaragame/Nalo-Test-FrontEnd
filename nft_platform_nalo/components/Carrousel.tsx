"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Auction } from "@/types/nft";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useMemo, useRef, useState } from "react";
import AuctionCard from "./AuctionCard";
import { useWindowSize } from "@/hooks/useWindowSize";
import BasicLoading from "./BasicLoading";

export default function Carousel({
  title,
  subtitle,
  auctions,
  isLoading,
}: {
  title: string;
  subtitle: string;
  auctions: Auction[];
  isLoading?: boolean;
}) {
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const windowSize = useWindowSize();

  const settings = useMemo(
    () => ({
      infinite: false,
      speed: 500,
      draggable: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 3000,
      beforeChange: (_oldIndex: number, newIndex: number) =>
        setCurrentSlide(newIndex),
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 3 } },
        { breakpoint: 768, settings: { slidesToShow: 2 } },
        { breakpoint: 480, settings: { slidesToShow: 1 } },
      ],
    }),
    []
  );

  const slideToShow = useMemo(() => {
    const breakpoint = settings.responsive;

    const validBreakPoints = breakpoint.filter(
      (bp) => bp.breakpoint >= windowSize.width
    );

    const closestBreakPoint = validBreakPoints.reduce(
      (acc, curr) => {
        return acc.breakpoint > curr.breakpoint
          ? { breakpoint: curr.breakpoint }
          : { breakpoint: acc.breakpoint };
      },
      { breakpoint: 10000 }
    );

    return (
      breakpoint.find(
        (item) => item.breakpoint === closestBreakPoint.breakpoint
      )?.settings.slidesToShow ?? settings.slidesToShow
    );
  }, [settings, windowSize.width]);

  const isPrevDisabled = currentSlide === 0;
  const isNextDisabled = currentSlide >= auctions.length - slideToShow;

  const next = () => {
    sliderRef.current?.slickNext();
  };
  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  return (
    <>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-bold text-xl">{title}</h2>
          <p className="text-zinc-400 font-semibold text-xs">{subtitle}</p>
        </div>
        <div>
          <button
            onClick={() => {
              previous();
            }}
            className={`p-[10px]  ${
              isPrevDisabled ? "opacity-30" : "hover:bg-gray-200 rounded-full"
            }`}
            disabled={isPrevDisabled}
          >
            <IoIosArrowBack className="text-gray-500 w-3 h-3" />
          </button>
          <button
            onClick={() => {
              next();
            }}
            className={`p-[10px]  ${
              isNextDisabled ? "opacity-30" : "hover:bg-gray-200 rounded-full"
            }`}
            disabled={isNextDisabled}
          >
            <IoIosArrowForward className="text-gray-500 w-3 h-3" />
          </button>
        </div>
      </div>
      {isLoading || auctions.length <= 0 ? (
        <BasicLoading />
      ) : (
        <div className="relative w-full mx-auto">
          <Slider ref={sliderRef} {...settings}>
            {auctions.map((auction, index) => (
              <div
                key={auction.id}
                className={index !== auctions.length - 1 ? "pr-4" : ""}
              >
                <AuctionCard auction={auction} />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
}
