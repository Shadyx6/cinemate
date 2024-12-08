import React from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

function AboutUs() {

    const navigate = useNavigate()


  return (
    <div className="min-h-screen bg-[#17181C] text-[#D1D1D1] flex flex-col items-center px-6 py-10">
     
    
      <header className="w-full text-center mb-10">
      <FaArrowLeftLong
            onClick={() => navigate(-1)}
            className="hover:text-[#00F5D4]"
          />
        <h1 className="text-5xl font-bold text-[#00F5D4]">About CineMate</h1>
        <p className="text-xl mt-4">
          A one-stop destination for discovering, watching, and enjoying your favorite movies and TV shows.
        </p>
      </header>

     
      <section className="w-full lg:w-2/3 bg-[#1F1F1F] p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-[#00F5D4]">About Me</h2>
        <p className="mt-4 text-lg leading-relaxed">
          Hi, I'm <span className="text-[#00F5D4] font-semibold">Shad</span>, a passionate full-stack web developer and
          designer with expertise in crafting next-level animations and UI/UX designs. With a deep love for technology
          and creativity, I have built this platform to bring a seamless streaming experience to users. My journey
          includes developing sleek, responsive websites that stand out in both performance and aesthetics.
        </p>
        <p className="mt-4 text-lg">
          Follow my work or reach out for collaborations—I’m always excited to work on projects that push creative and
          technical boundaries!
        </p>
      </section>

      
      <section className="w-full lg:w-2/3 bg-[#1F1F1F] p-8 mt-10 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-[#00F5D4]">Credits</h2>
        <p className="mt-4 text-lg leading-relaxed">
          CineMate proudly uses data and resources provided by{' '}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00F5D4] hover:underline"
          >
            The Movie Database (TMDB)
          </a>
          . We acknowledge and appreciate their incredible contribution to the world of entertainment.
        </p>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-center text-sm text-zinc-400">
        <p>© {new Date().getFullYear()} CineMate. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AboutUs;
