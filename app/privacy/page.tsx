import React from 'react'
import Navbar from '../components/Navbar'
import Firstsection from '@/app/components/Privacy/Firstsection'
import SecondSection from '@/app/components/Privacy/SecondSection'
import Footer from '../components/Footer'
import Taxi from '../components/Taxi'
import SmoothScroll from '../components/SmoothScroll'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Privacy Policy | Bombay Blokes Digital Solutions LLP",
  description:
    "Read the Privacy Policy of Bombay Blokes Digital Solutions LLP to understand how we collect, use, store, and protect your personal information in compliance with applicable data protection laws.",
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