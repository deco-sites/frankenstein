import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import { useId } from "preact/hooks";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Banner {
  /** @description desktop otimized image */
  desktop: LiveImage;
  /** @description mobile otimized image */
  mobile: LiveImage;
  /** @description Image's alt text */
  alt: string;
}

export interface Props {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function BannerItem({ image, lcp }: { image: Banner; lcp?: boolean }) {
  const {
    alt,
    mobile,
    desktop,
  } = image;

  return (
    <Picture preload={lcp}>
      <Source
        media="(max-width: 767px)"
        fetchPriority={lcp ? "high" : "auto"}
        src={mobile}
        width={360}
        height={600}
      />
      <Source
        media="(min-width: 768px)"
        fetchPriority={lcp ? "high" : "auto"}
        src={desktop}
        width={1440}
        height={600}
      />
      <img
        class="object-cover w-full"
        loading={lcp ? "eager" : "lazy"}
        src={desktop}
        alt={alt}
      />
    </Picture>
  );
}

function Dots({ images, interval = 0 }: Props) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          `,
        }}
      />
      <ul class="carousel justify-center col-span-full gap-4 z-10 row-start-4">
        {images?.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index}>
              <div class="py-5">
                <div
                  class="w-16 sm:w-20 h-0.5 rounded group-disabled:animate-progress bg-gradient-to-r from-[rgb(150,130,182)] from-[length:var(--dot-progress)] to-[rgba(150,130,182,0.4)] to-[length:var(--dot-progress)]"
                  style={{ animationDuration: `${interval}s` }}
                />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}

function Buttons() {
  return (
    <>
      <div class="z-20 absolute top-0 left-0 w-2/4 h-full">
        <Slider.PrevButton class="flex items-center pl-5 w-full h-full drop-shadow">
          <Icon
            class="text-base-100 drop-shadow"
            size={20}
            id="ChevronLeft"
            strokeWidth={3}
          />
        </Slider.PrevButton>
      </div>
      <div class="z-20 absolute top-0 right-0 w-2/4 h-full">
        <Slider.NextButton class="flex items-center justify-end pr-5 w-full h-full drop-shadow">
          <Icon
            class="text-base-100 drop-shadow"
            size={20}
            id="ChevronRight"
            strokeWidth={3}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

function BannerCarousel({ images, preload, interval }: Props) {
  const id = useId();

  return (
    <div
      id={id}
      class="relative grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px]"
    >
      <Slider class="carousel carousel-center w-full col-span-full row-span-full scrollbar-none gap-6">
        {images?.map((image, index) => (
          <Slider.Item index={index} class="carousel-item w-full">
            <BannerItem image={image} lcp={index === 0 && preload} />
          </Slider.Item>
        ))}
      </Slider>

      <Buttons />

      <Dots images={images} interval={interval} />

      <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
    </div>
  );
}

export default BannerCarousel;
