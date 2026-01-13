import React from 'react'
import Navbar from '../components/Navbar';
import Firstsection from '../components/Calculator/Firstsection';
import PreviewPage from "./PreviewPage";
import SeventhSection from '../components/ServicesInternal/WebsiteDesign/SeventhSection';
import Footer from '../components/Footer'

const Preview = () => {
  return (
    <div>

              <Navbar/>
<Firstsection/>
<PreviewPage/>
<SeventhSection/>
  <Footer />
    </div>
  )
}

export default Preview