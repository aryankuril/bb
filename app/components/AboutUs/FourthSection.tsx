"use client";
import React, { useEffect, useRef, useState } from "react";

/* -------------------- Card Component -------------------- */
interface CardProps {
  imgSrc: string;
  videoSrc: string;
  tag?: string;
  isActive?: boolean;
  desktopMode?: boolean;
}

const Card: React.FC<CardProps> = ({
  imgSrc,
  videoSrc,
  tag,
  isActive = false,
  desktopMode = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlaySound, setCanPlaySound] = useState(false);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(
    null
  );

  // allow sound after first user interaction
  useEffect(() => {
    const handleUserClick = () => setCanPlaySound(true);
    window.addEventListener("click", handleUserClick, { once: true });
    return () => window.removeEventListener("click", handleUserClick);
  }, []);

  // Desktop hover play/pause
  const handleMouseEnter = () => {
    if (!desktopMode || !videoRef.current) return;
    videoRef.current.muted = !canPlaySound;
    videoRef.current.play().catch(() => {});
  };
  const handleMouseLeave = () => {
    if (!desktopMode || !videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    videoRef.current.muted = true;
    setCursorPos(null); // hide tag when leaving
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!desktopMode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Mobile autoplay logic
  useEffect(() => {
    if (desktopMode || !videoRef.current) return;

    if (isActive) {
      videoRef.current.play().catch(() => {});
      videoRef.current.muted = !canPlaySound ? true : false;
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isActive, desktopMode, canPlaySound]);

  return (
    <div
      className="group w-[260px] md:w-[350px] relative rounded-2xl overflow-hidden
                 transform transition-all duration-500
                 md:hover:z-50 md:hover:-translate-y-2 md:hover:scale-105"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <img
        src={imgSrc}
        alt="Card"
        className={`w-full h-full object-cover absolute top-0 left-0 z-0
          transition-opacity duration-500
          ${desktopMode ? "md:group-hover:opacity-0" : ""}
          ${!desktopMode && isActive ? "opacity-0" : "opacity-100"}`}
      />
      <video
        ref={videoRef}
        loop
        playsInline
        className="w-full h-full object-cover z-0"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Hover Tag following cursor */}
{/* {desktopMode && tag && cursorPos && (
  <div
    className="absolute pointer-events-none bg-[#FAB31E] text-black font-medium 
               py-2 px-4 rounded-full text-sm shadow-md whitespace-nowrap
               transition-all duration-75 z-50"   // 👈 added z-20
    style={{
      left: cursorPos.x + 15,
      top: cursorPos.y + 15,
    }}
  >
    {tag}
  </div>
)} */}

    </div>
  );
};

/* -------------------- Mobile Slider -------------------- */
const MobileSlider: React.FC<{ cards: { img: string; video: string }[] }> = ({
  cards,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [sectionInView, setSectionInView] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Observe section visibility
  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;
    const obs = new IntersectionObserver(
      ([entry]) => setSectionInView(entry.isIntersecting),
      { threshold: 0.4 }
    );
    obs.observe(sec);
    return () => obs.disconnect();
  }, []);

  // Find center card on scroll
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const onScroll = () => {
      if (!sectionInView) {
        setActiveIndex(null);
        return;
      }
      const sliderRect = slider.getBoundingClientRect();
      const centerX = sliderRect.left + sliderRect.width / 2;

      let closest = -1;
      let minDist = Infinity;

      slider.querySelectorAll<HTMLElement>(".card-item").forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const dist = Math.abs(cardCenter - centerX);
        if (dist < minDist) {
          minDist = dist;
          closest = idx;
        }
      });
      setActiveIndex(closest);
    };

    slider.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => slider.removeEventListener("scroll", onScroll);
  }, [sectionInView]);

  // Pagination click scroll
  const handlePaginationClick = (index: number) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const card = slider.children[index] as HTMLElement;
    const cardLeft = card.offsetLeft;
    const cardWidth = card.offsetWidth;
    const sliderWidth = slider.offsetWidth;
    const scrollTo = cardLeft - sliderWidth / 2 + cardWidth / 2;

    slider.scrollTo({
      left: scrollTo,
      behavior: "smooth",
    });
  };

  return (
    <div ref={sectionRef} className="md:hidden">
      {/* Pagination buttons */}
      <div className="flex justify-center mb-4">
        {cards.map((card, index) => (
          <React.Fragment key={index}>
            <button
              onClick={() => handlePaginationClick(index)}
              className={`w-12 h-12 rounded-full overflow-hidden border-2
                ${activeIndex === index ? "border-[#FAB31E]" : "border-gray-300"}`}
            >
              <img
                src={card.img}
                alt={`Card ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
            {index !== cards.length - 1 && (
              <div className="w-5 h-[2px] bg-black self-center mx-2" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="overflow-x-auto flex space-x-20 snap-x snap-mandatory px-6 scrollbar-none"
      >
        {cards.map((card, i) => (
          <div key={i} className="card-item flex-shrink-0 w-[70%] snap-center">
            <Card
              imgSrc={card.img}
              videoSrc={card.video}
              isActive={sectionInView && activeIndex === i}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

/* -------------------- Main Section -------------------- */
const FourthSection: React.FC = () => {
  const cards = [
    { img: "/images/man1.png", video: "/video/cardvideo-1.mp4", tag: "More About Cabin" },
    { img: "/images/man2.png", video: "/video/cardvideo-1.mp4", tag: "More About Crew" },
    { img: "/images/man3.png", video: "/video/cardvideo-1.mp4", tag: "More About Journey" },
    { img: "/images/man4.png", video: "/video/cardvideo-1.mp4", tag: "More About Vision" },
  ];

  return (
    <section className="py-16 container mx-auto">
      <div className="text-center">
        <h2 className="text-[#1D1D1D] font-[Miso] text-[40px] sm:text-[60px] md:text-[70px] lg:text-[80px]
                       font-normal leading-[44px] sm:leading-[64px] md:leading-[74px] lg:leading-[82px]
                       tracking-[-2.4px] capitalize mb-8">
          Our Story, In <span className="text-[#FAB31E]">Our Words</span>
        </h2>

        {/* Desktop */}
        <div className="hidden md:flex justify-center -space-x-10">
          {cards.map((c, i) => (
            <div
              key={i}
              className={`md:transform ${i % 2 === 0 ? "md:-rotate-5" : "md:rotate-5"}`}
            >
              <Card imgSrc={c.img} videoSrc={c.video} tag={c.tag} desktopMode />
            </div>
          ))}
        </div>

        {/* Mobile with pagination */}
        <MobileSlider cards={cards} />
      </div>
    </section>
  );
};

export default FourthSection;
