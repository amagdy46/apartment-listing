"use client";

import React, { MutableRefObject } from "react";
import {
  useKeenSlider,
  KeenSliderPlugin,
  KeenSliderInstance,
} from "keen-slider/react";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";

function ThumbnailPlugin(
  mainRef: MutableRefObject<KeenSliderInstance | null>
): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

interface ApartmentSliderProps {
  images: string[];
  name: string;
}

const ApartmentSlider: React.FC<ApartmentSliderProps> = ({ images, name }) => {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
  });
  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  return (
    <>
      <div ref={sliderRef} className="keen-slider mb-4">
        {images.map((image, index) => (
          <div key={index} className="keen-slider__slide relative w-full h-96">
            <Image
              src={image}
              alt={`${name} - ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        ))}
      </div>

      <div ref={thumbnailRef} className="keen-slider thumbnail">
        {images.map((image, index) => (
          <div
            key={index}
            className="keen-slider__slide relative w-full h-24 cursor-pointer"
          >
            <Image
              src={image}
              alt={`${name} - ${index + 1} thumbnail`}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ApartmentSlider;
