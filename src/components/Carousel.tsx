import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Images from public/carrosel
const images = [
  `${import.meta.env.BASE_URL}carrosel/20250603_214720.jpg`,
  `${import.meta.env.BASE_URL}carrosel/20250603_214749.jpg`,
  `${import.meta.env.BASE_URL}carrosel/20250615_211133.jpg`,
  `${import.meta.env.BASE_URL}carrosel/20250708_230350.jpg`,
  `${import.meta.env.BASE_URL}carrosel/20250708_230354.jpg`,
  `${import.meta.env.BASE_URL}carrosel/20250830_232303.jpg`,
  `${import.meta.env.BASE_URL}carrosel/20250830_233302.jpg`,
  `${import.meta.env.BASE_URL}carrosel/20250921_200110.jpg`,
  `${import.meta.env.BASE_URL}carrosel/20250921_200206.jpg`,
  `${import.meta.env.BASE_URL}carrosel/20250927_121746.jpg`,
  `${import.meta.env.BASE_URL}carrosel/20251005_215111.jpg`,
  `${import.meta.env.BASE_URL}carrosel/IMG-20251006-WA0217.jpg`,
  `${import.meta.env.BASE_URL}carrosel/IMG-20251006-WA0237.jpg`,
  `${import.meta.env.BASE_URL}carrosel/IMG-20251006-WA0241.jpg`,
  `${import.meta.env.BASE_URL}carrosel/IMG_20251022_003732258_HDR_PCT.jpg`,
  `${import.meta.env.BASE_URL}carrosel/IMG_20251104_215030136_HDR.jpg`
];

export function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="max-w-[600px] h-[350px] w-full m-auto py-8 px-4 relative group">

      {/* Image */}
      <div
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500 shadow-lg shadow-purple-900/50"
      ></div>

      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-purple-600 transition">
        <button onClick={prevSlide} className='flex items-center justify-center'>
          <ChevronLeft size={30} />
        </button>
      </div>

      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-purple-600 transition">
        <button onClick={nextSlide} className='flex items-center justify-center'>
          <ChevronRight size={30} />
        </button>
      </div>

      {/* Indicators */}
      <div className='flex top-4 justify-center py-2'>
        {images.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => setCurrentIndex(slideIndex)}
            className={`text-2xl cursor-pointer mx-1 ${currentIndex === slideIndex ? 'text-purple-500' : 'text-gray-500'}`}
          >
            •
          </div>
        ))}
      </div>
    </div>
  );
}
