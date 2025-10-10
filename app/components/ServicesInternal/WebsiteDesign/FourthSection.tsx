"use client";
import React, { useEffect } from "react";

const textBlock1 = [
  "Branding is more than just a logo or a name",
  "a journey that shapes how the world",
  "sees and connects with your business",
  "It begins with insight",
  "where we uncover the values",
  "vision, and audience that define your",
  "brand’s foundation",
  "",
];

const FourthSection = () => {
  useEffect(() => {
    const handleScroll = () => {
      const allDivs = document.querySelectorAll(".textDiv");
      const viewportHeight = window.innerHeight;
      const centerY = viewportHeight / 2;

      allDivs.forEach((div) => {
        const htmlDiv = div as HTMLElement;
        const rect = htmlDiv.getBoundingClientRect();
        const divCenterY = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(divCenterY - centerY);

        const nearCenter = distanceFromCenter < 100;
        const opacity = Math.max(0, 1 - distanceFromCenter / centerY);
        const weight = 100 + (1 - distanceFromCenter / centerY) * 400;
        const size = 3 + (1 - distanceFromCenter / centerY);

        htmlDiv.style.opacity = opacity.toFixed(2);
        htmlDiv.style.fontWeight = weight.toFixed(0);
        htmlDiv.style.fontSize = `${size.toFixed(2)}vw`;
        htmlDiv.style.color = nearCenter
          ? "var(--color-highlight)"
          : "var(--color-text-primary)";
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.dispatchEvent(new Event("scroll"));
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="container mx-auto text-center black-text single-title  py-0 sm:py-15 lg:py-20  space-y-6 px-4 sm:px-8 md:px-16">
      <h1>
        {textBlock1.map((line, index) =>
          line === "" ? (
            <br key={`b1-${index}`} />
          ) : (
            <div
              key={`t1-${index}`}
              className="textDiv transition-transform duration-150 cursor-default capitalize break-words"
            >
              {line}
            </div>
          )
        )}
      </h1>
    </div>
  );
};

export default FourthSection;
