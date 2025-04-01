import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Banner from '../components/common/Banner'
import '../App.css'; 

const Home = () => {
    return (
        <div style={{ backgroundColor: 'var(--background-color)', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <Banner />
          <Footer />
        </div> 
      );
    };

export default Home;
