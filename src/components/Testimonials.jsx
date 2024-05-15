
import { useEffect } from 'react';

import Avatar1 from '/images/avatars/1.png';
import Avatar2 from '/images/avatars/2.png';
import Avatar3 from '/images/avatars/3.png';
import Avatar4 from '/images/avatars/4.png';
import Avatar5 from '/images/avatars/5.png';

const Testimonials = () => {

    useEffect(() => {
        const btns = document.querySelectorAll(".btn")
        const slideRow = document.querySelector(".slide-row")
        const slider = document.querySelector(".slider")

        let currentIndex = 0

        const updateSlide = (_) => {
            slideRow.style.transform = `translateX(${currentIndex * -slider.offsetWidth}px)`

            btns.forEach((btn, index) => {
                btn.classList.toggle("active", index === currentIndex)
            })
        }

        btns.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                currentIndex = index
                updateSlide()
            })
        })

        window.addEventListener("resize", () => {
            updateSlide()
        })
    }, []);

    return (
        <section className="titled-section" id="testimonials">
            <h2 className="section-title hidden">Testimonials</h2>
            <div className="slide-container">
                <div className="slider">
                    <div className="slide-row hidden" id="slide-row-element" style={{ '--slides-num': '5' }}>
                        <div className="slide-col">
                            <div className="content">
                                <p>Sam's talent as a ghostwriter is unparalleled, and his contribution to my project was
                                    nothing short of transformative. If you're in search of a skilled wordsmith who can
                                    elevate your ideas to new heights, look no further than Sam. Their expertise is truly
                                    remarkable, and I wholeheartedly recommend his services to anyone in need of a literal
                                    ally.</p>
                                <h3>@Alfred_Smith67</h3>
                            </div>
                            <div className="hero"><img src={Avatar1.avif} alt="avatar" /></div>
                        </div>
                        <div className="slide-col">
                            <div className="content">
                                <p>Sams's a great ghostwriter. He delivered my tweets the same day as I requested. On top of
                                    that the tweets are really high quality.<br />Definetenly recommend his services to anyone
                                    that's looking to grown on X!.</p>
                                <h3>@William_MG30C</h3>
                            </div>
                            <div className="hero"><img src={Avatar2.avif} alt="avatar" /></div>
                        </div>
                        <div className="slide-col">
                            <div className="content">
                                <p>Sam provided me with 10 tweets for the week and they were well written. Sam has a
                                    powerful and unique way of writing, something I wouldn't have been able to come with
                                    myself. He knows how to write engaging content, and is very knowledgeable with words.
                                </p>
                                <h3>@Sarah070Schnider</h3>
                            </div>
                            <div className="hero"><img src={Avatar3.avif} alt="avatar" /></div>
                        </div>
                        <div className="slide-col">
                            <div className="content">
                                <p>So I've posten Sam's tweets. I knew they would hit since I saw how well he understood how
                                    I write and managed to make it better.The posts got more impressions than what they
                                    would usually get on average. Let alone engagement, it DOUBLED.If you are looking for
                                    somebody to write your tweets with speed and efficency? Sam is the way to go.</p>
                                <h3>@MaxGT97</h3>
                            </div>
                            <div className="hero"><img src={Avatar4.avif} alt="avatar" /></div>
                        </div>
                        <div className="slide-col">
                            <div className="content">
                                <p>Sam's an amazing ghostwriter! He really transformed my project with his unique talent. If
                                    you need someone to make your ideas shine, Sam is the one. I highly recommend his
                                    services to anyone who needs help with writing</p>
                                <h3>@AnJaj99</h3>
                            </div>
                            <div className="hero"><img src={Avatar5.avif} alt="avatar" /></div>
                        </div>
                    </div>
                    <div className="indicator"><span className="btn active"></span><span className="btn"></span><span
                        className="btn"></span><span className="btn"></span><span className="btn"></span></div>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;