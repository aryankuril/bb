import React from 'react'
import Navbar from '../components/Navbar'
import SecondSection from '@/app/components/Terms-of-engagement/SecondSection'
import Footer from '../components/Footer'
import Taxi from '../components/Taxi'
import SmoothScroll from '../components/SmoothScroll'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Terms & Engagement | Bombay Blokes Digital Solutions LLP",
  description:
    "Read the Terms & Engagement of Bombay Blokes Digital Solutions LLP to understand the rules, responsibilities, and legal obligations governing the use of our services and website.",
};
const Index = () => {
  return (
    <div>
      <SmoothScroll> 
        <Taxi/>
        <Navbar />

        <SecondSection/>
        <Footer />
      </SmoothScroll>
    </div>
  )
}

export default Index