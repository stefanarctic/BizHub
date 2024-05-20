import SamSuit from '/images/bizhub_screenshot.png';

const About = () => {
    return (
        <section id="about">
            <div className="hidden" id="about-txt">
                <h2>ABOUT BIZHUB</h2>
                <p>BizHub is a team collaboration platform specifically designed for businessmen that want to get things done good and fast.
<br /><br />
At Bizhub, we understand the challenges faced by today’s busy businessmen: lack of communication, wasting time on repetitive tasks, and finishing a big project can be a big hassle for a team leader.
<br /><br />
<b>That's why we built BizHub.</b>
<br /><br />

Our mission is to empower businesses with a powerful, intuitive collaboration platform that helps them do things faster, and better.</p>
            </div><img className="hidden" id="about-img" src={SamSuit} alt="SAM'S PIC" />
        </section>
    );
}

export default About;