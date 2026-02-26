import React from 'react';
import PageTransition from '../../components/PageTransition';
import HeroSection from './sections/HeroSection';
import FeaturedWork from './sections/FeaturedWork';
import AboutPreview from './sections/AboutPreview';
import ServicesPreview from './sections/ServicesPreview';
import TestimonialSlider from './sections/TestimonialSlider';
import SectionCTA from '../../components/SectionCTA/SectionCTA';

const Home = () => {
  return (
    <PageTransition>
      <HeroSection />
      <FeaturedWork />
      <AboutPreview />
      <ServicesPreview />
      <TestimonialSlider />
      <SectionCTA />
    </PageTransition>
  );
};

export default Home;
