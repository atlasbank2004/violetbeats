/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from './firebase';
import { bestSongs, Song } from './data';
import AuthModal from './components/AuthModal';
import Player from './components/Player';
import FaqSection from './components/FaqSection';
import { Music, LogOut, Code, User as UserIcon, Play, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    let scriptTag = document.getElementById('youtube-api-script');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'youtube-api-script';
      (scriptTag as HTMLScriptElement).src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(scriptTag, firstScriptTag);
    }
    
    const initPlayer = () => {
      if (!(window as any).YT || !(window as any).YT.Player) return;
      playerRef.current = new (window as any).YT.Player('hero-video', {
        events: {
          onReady: (event: any) => {
             if (!isMuted) {
               event.target.unMute();
               event.target.setVolume(100);
             }
          }
        }
      });
    };

    if ((window as any).YT && (window as any).YT.Player) {
      initPlayer();
    } else {
      (window as any).onYouTubeIframeAPIReady = initPlayer;
    }
  }, []);

  const toggleMute = () => {
    if (playerRef.current && playerRef.current.mute) {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    } else {
      setIsMuted(!isMuted);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setAuthModalOpen(false);
  };

  const handlePlaySong = (index: number) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    setCurrentSongIndex(index);
  };

  const handleNext = () => {
    if (currentSongIndex === null) return;
    setCurrentSongIndex((currentSongIndex + 1) % bestSongs.length);
  };

  const handlePrev = () => {
    if (currentSongIndex === null) return;
    setCurrentSongIndex((currentSongIndex - 1 + bestSongs.length) % bestSongs.length);
  };

  return (
    <div className="min-h-screen bg-[#09090b] font-sans text-zinc-50 selection:bg-violet-500/30">
      {/* Navbar */}
      <nav className="fixed left-0 right-0 top-0 z-40 bg-transparent pt-4">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center bg-transparent drop-shadow-md">
              <Music size={28} className="text-white/90" />
            </div>
            <span className="font-heading text-2xl font-bold tracking-tight text-white/90 drop-shadow-md">Violet Beats</span>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="hidden text-sm text-zinc-400 sm:block">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-800"
                >
                  <LogOut size={16} /> Sair
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-violet-500 neon-glow"
              >
                <UserIcon size={16} /> Entrar
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pb-32">
        {/* Full-width background Hero Section */}
        <section className="relative w-full h-screen overflow-hidden bg-black">
          <iframe
            id="hero-video"
            className="absolute top-1/2 left-1/2 w-[300vw] sm:w-[150vw] min-h-[150%] min-w-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            src="https://www.youtube.com/embed/ULttZuceIDo?autoplay=1&mute=0&controls=0&playsinline=1&loop=1&playlist=ULttZuceIDo&showinfo=0&modestbranding=1&rel=0&disablekb=1&enablejsapi=1"
            title="Hero Background"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#09090b] pointer-events-none"></div>
          
          <div className="absolute bottom-10 right-10 z-30">
            <button
              onClick={toggleMute}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition-all hover:bg-black/50 hover:scale-110 border border-white/10"
              title={isMuted ? "Desmutar vídeo" : "Mutar vídeo"}
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
          </div>
        </section>

        {/* Carousel / Tracklist Section */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-heading text-3xl font-bold">Trending Now</h2>
              <p className="text-zinc-400 mt-2">Músicas selecionadas a dedo para você</p>
            </div>
          </div>
          
          <div className="group relative">
            <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
              {bestSongs.map((song, idx) => (
                <div 
                  key={song.id} 
                  className="group/card relative w-64 flex-none shrink-0 snap-start overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 transition-all hover:bg-zinc-800"
                >
                  <div className="aspect-square w-full overflow-hidden">
                    <img 
                      src={song.cover} 
                      alt={song.title} 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 flex items-center justify-center">
                      <button
                        onClick={() => handlePlaySong(idx)}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg hover:scale-110 transition-transform neon-glow"
                      >
                        <Play fill="white" className="ml-1" size={24} />
                      </button>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-bold truncate">{song.title}</h3>
                    <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <FaqSection />
      </main>

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

      {/* Player Sticky Bar */}
      {currentSongIndex !== null && (
        <Player 
          currentSong={bestSongs[currentSongIndex]} 
          onNext={handleNext}
          onPrev={handlePrev}
          userId={user?.uid}
        />
      )}
    </div>
  );
}

