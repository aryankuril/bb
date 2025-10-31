import React from 'react'
import Navbar from '../components/Navbar'
import Firstsection from '../components/EstimatesCalculator/Firstsection'
import SecondSection from '../components/EstimatesCalculator/SecondSection'
import Footer from '../components/Footer'
import SmoothScroll from '@/app/components/SmoothScroll';
import Taxi from '../components/Taxi'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Estimates Calculator - Bombay Blokes",
  description: "Get a Quick Project Estimate Instantly calculate pricing for our services no guesswork, no delays. Just clear, quick estimates tailored to your needs. Get started now! Website Development Get a quick quote for custom, responsive websites. Get Quote SEO Estimate your cost for boosting Google rankings. Get Quote Performance Marketing Know your budget for high-ROI. Get Quote",
};
const Index = () => {
  return (
    <div>
    <SmoothScroll>
        <Taxi/> 
        <Navbar />
        <Firstsection/>
        <SecondSection/>
        <Footer />
    </SmoothScroll>
    </div>
  )
}

export default Index