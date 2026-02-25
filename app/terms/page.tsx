import React from 'react'
import Navbar from '../components/Navbar'
import Firstsection from '@/app/components/Terms/Firstsection'

import Footer from '../components/Footer'
import Taxi from '../components/Taxi'
import SmoothScroll from '../components/SmoothScroll'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Contact Us | Leading Digital Agency in Mumbai ",
  description: "Looking for digital marketing services in Mumbai? Bombay Blokes is reliable and trusted by some leading brands. Connect with us to know more",
};
const Index = () => {
  return (
    <div>
      <SmoothScroll> 
      <Taxi/>
        <Navbar />
        <Firstsection/>
        <Footer />
      </SmoothScroll>
    </div>
  )
}

export default Index