import { useEffect } from 'react';

import './scss/styles.scss';

import Header from './components/Header';
import About from './components/About';
import Testimonials from './components/Testimonials';

import * as DebugTools from './components/Util/DebugTools';
import openURL from './components/Util/HideUrl';
import initScrollAnimation from './components/Util/ScrollAnimation';
import Services from './components/Services';
import FAQ from './components/FAQ';
import Call from './components/Call';
import Footer from './components/Footer';


function App() {

  useEffect(() => {
    initScrollAnimation();
  }, []);

  return (
    <div className="App">
      <Header />
      <About />
      <Testimonials />
      <Services />
      <FAQ />
      <Call />
      <Footer />
    </div>
  );
}

export default App;
