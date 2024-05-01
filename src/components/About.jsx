import SamSuit from '../images/sam-suit.jpg';

const About = () => {
    return (
        <section id="about">
            <div className="hidden" id="about-txt">
                <h2>ABOUT SAM</h2>
                <p>Hi I'm Sam, I was born on the 21st of June, which is the longest day of the year!<br /><br />Personally,
                    I love striving towards being the best version of myself with work ethic, exercise, mindset and all the
                    rest.<br /><br />Always being respectful and understanding makes me a great person to be around. At all
                    times I'm approachable, being nervous to talk to me is unheard of.<br /><br />Some of my favourite
                    hobbies consist of playing football/soccer, working out and writing.<br /><br />You can contact me on X:
                </p>
                <address> @Wrotebysam</address><br /><br />
                <p>Or via email:</p>
                <address> @sjtcopywriting2106@gmail.com</address>
            </div><img className="hidden" id="about-img" src={SamSuit} alt="SAM'S PIC" />
        </section>
    );
}

export default About;