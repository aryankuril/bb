import React from 'react'
import Navbar from '../../../components/Navbar'
import Firstsection from '../../../components/ClientsInternal/Performance/DancingLeaf/Firstsection'
import SecondSection from '@/app/components/ClientsInternal/Performance/DancingLeaf/SecondSection'
import ThirdSection from "@/app/components/ClientsInternal/Performance/DancingLeaf/ThirdSection"
import FourthSection from '../../../components/ClientsInternal/Performance/DancingLeaf/FourthSection'
import SeventhSection from '../../../components/ServicesInternal/WebsiteDesign/SeventhSection'
import Footer from '../../../components/Footer'
// import ClientScripts from '../components/ClientScripts'
import Taxi from '../../../components/Taxi'
import { createPageMetadata } from "@/lib/metadata";
import SmoothScroll from './../../../components/SmoothScroll';


export const metadata = createPageMetadata("Case-Study-Dancing Leaf");
const Index = () => {
  return (
    <div>
      {/* <ClientScripts/> */}
      <SmoothScroll> 
      <Taxi/>
      <Navbar />
      <Firstsection/>
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <SeventhSection />
      <Footer />
      </SmoothScroll>
    </div>
  )
}

export default Index