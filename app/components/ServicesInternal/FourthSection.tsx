'use client';
import React, { useEffect } from 'react';

const textBlock1 = [
  'Branding is more than just a logo or a name',
  'a journey that shapes how the world',
  'sees and connects with your business',
  'It begins with insight, where we uncover the values',
  'vision, and audience that define your brand’s foundation',
  '',
//   'But one of the ways that I believe',
//   'people express their appreciation',
//   'to the rest of humanity is to',
//   'make something wonderful and',
//   'put it out there.',
//   '',
//   'And you never meet the people.',
//   'You never shake their hands.',
//   'You never hear their story or tell yours.',
//   'But somehow, in the act of making',
//   'something with a great deal of care',
//   'and love, something’s transmitted there.',
//   '',
//   'And it’s a way of expressing to the rest',
//   'of our species our deep appreciation.',
//   'So we need to be true to who we are and',
//   'remember what’s really important to us.',
//   '',
//   '—Steve Jobs, 2007',
];

const FourthSection = () => {
  useEffect(() => {
    const handleScroll = () => {
      const allDivs = document.querySelectorAll('.textDiv');
      const viewportHeight = window.innerHeight;
      const centerY = viewportHeight / 2;

      allDivs.forEach((div) => {
        const htmlDiv = div as HTMLElement;
        const rect = htmlDiv.getBoundingClientRect();
        const divCenterY = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(divCenterY - centerY);

        const nearCenter = distanceFromCenter < 100; // within 100px of center

        // Text effects
        const opacity = Math.max(0, 1 - distanceFromCenter / centerY);
        const weight = 100 + (1 - distanceFromCenter / centerY) * 800;
        const size = 3 + (1 - distanceFromCenter / centerY); // 3vw → 4vw

        htmlDiv.style.opacity = opacity.toFixed(2);
        htmlDiv.style.fontWeight = weight.toFixed(0);
        htmlDiv.style.fontSize = `${size.toFixed(2)}vw`;

        // 👇 Color logic
        htmlDiv.style.color = nearCenter ? 'var(--color-highlight)' : 'var(--color-text-primary)';
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.dispatchEvent(new Event('scroll'));
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="text-center black-text single-title py-[30vw] space-y-6 ">
      {textBlock1.map((line, index) =>
        line === '' ? (
          <br key={`b1-${index}`} />
        ) : (
          <div
            key={`t1-${index}`}
            className="textDiv transition-transform duration-150 px-[7vw] whitespace-nowrap cursor-default capitalize"
          >
            {line}
          </div>
        )
      )}
    </div>
  );
};

export default FourthSection;
