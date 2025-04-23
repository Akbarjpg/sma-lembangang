import React from 'react';
import Navbar from './components/navbar';
import Hero from './components/hero';
import Features from './components/feature';

export default function Home() {
  return (
    <>
        <Navbar />
        <Hero />
        <Features />
    </>
  );
}