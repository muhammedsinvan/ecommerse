import React from 'react'
import NavBar from '../component/navbar/NavBar'
import Banner from '../component/banner/Banner'
import Catagories from '../component/catagories/Catagories'
import Footer from '../component/footer/Footer'
import Homeproducts from '../component/homeproductlisting/Homeproducts'

const Home = () => {
  return (
    <div>
        <NavBar />
        <Banner />
        <Catagories />
        <Homeproducts />
        <Footer />
    </div>
  )
}

export default Home