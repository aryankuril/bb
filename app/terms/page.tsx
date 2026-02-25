import React from 'react'
import Navbar from '../components/Navbar'
import Firstsection from '@/app/components/Terms/Firstsection'
import SecondSection from '@/app/components/Terms/SecondSection'
import Footer from '../components/Footer'
import Taxi from '../components/Taxi'
import SmoothScroll from '../components/SmoothScroll'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Terms & Conditions | Bombay Blokes Digital Solutions LLP",
  description:
    "Read the Terms & Conditions of Bombay Blokes Digital Solutions LLP to understand the rules, responsibilities, and legal obligations governing the use of our services and website.",
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