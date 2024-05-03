import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './scss/styles.scss';

import Navbar from './components/Navbar';
import Main from './components/Main';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Services from './components/Services';
import FAQ from './components/FAQ';
import Call from './components/Call';
import Footer from './components/Footer';
import Auth from './components/Auth';

import initScrollAnimation from './components/Util/ScrollAnimation';
import Chat from './components/Chat';

/* -- Made by Stefan Drosu for infoeducatie.ro -- */

function App() {

  useEffect(() => {
    initScrollAnimation();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={
            <>
              <header id="home">
                <Navbar />
                <Main />
              </header>
              <About />
              <Testimonials />
              <Services />
              <FAQ />
              <Call />
              <Footer />
            </>
          } />
          <Route path='/login' element={
            <>
              <header id="home">
                <Auth />
              </header>
            </>
          } />
          <Route path='/app' element={
            <>
              <header id="home">
                <Chat />
              </header>
            </>
          }></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
