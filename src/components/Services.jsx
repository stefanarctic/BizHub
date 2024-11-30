
const Services = () => {
    return (
        <section className="titled-section" id="services">
            <h2 className="section-title hidden">Benefits</h2>
            <div className="services-container">
                <div className="service-bx" id="productivity" style={{ '--clr': '#3a86ff' }}>
                    <div className="service">
                        <div className="icon-box">
                            <div className="icon-div" id="productivity-icon">
                                <img src="/images/icons/benefits/productivity/productivity_blue.png" />
                                {/* <svg width="75%" height="75%" viewBox="0 0 396 396">
                                    <path
                                        d="M301.026 37.125H355.608L236.362 173.415L376.645 358.875H266.805L180.774 246.395L82.335 358.875H27.72L155.265 213.098L20.691 37.125H133.32L211.084 139.937L301.026 37.125ZM281.869 326.205H312.114L116.886 68.079H84.4305L281.869 326.205Z"
                                        fill="white"></path>
                                </svg> */}
                            </div>
                        </div>
                        <h3 className="hidden">Boost Productivity</h3>
                        <p className="hidden">Top quality tweets, proven to <span className='highlight'>grow accounts</span>. These
                            vary all the way from long form to threads. Engagement also included :)</p>
                    </div>
                </div>
                <div className="service-bx" id="advice" style={{ '--clr': '#ff006e' }}>
                    <div className="service">
                        <div className="icon-box">
                            <div className="icon-div"><svg width="75%" height="75%" viewBox="0 0 24 24">
                                <path
                                    d="M14.601 21.5c0 1.38-1.116 2.5-2.499 2.5-1.378 0-2.499-1.12-2.499-2.5s1.121-2.5 2.499-2.5c1.383 0 2.499 1.119 2.499 2.5zm-2.42-21.5c-4.029 0-7.06 2.693-7.06 8h3.955c0-2.304.906-4.189 3.024-4.189 1.247 0 2.57.828 2.684 2.411.123 1.666-.767 2.511-1.892 3.582-2.924 2.78-2.816 4.049-2.816 7.196h3.943c0-1.452-.157-2.508 1.838-4.659 1.331-1.436 2.986-3.222 3.021-5.943.047-3.963-2.751-6.398-6.697-6.398z">
                                </path>
                            </svg></div>
                        </div>
                        <h3 className="hidden">Advice</h3>
                        <p className="hidden">Growth on X can't be achieved with just tweets, which is why I give you the <span
                            className='highlight'>best advice</span> to grow to max potential.</p>
                    </div>
                </div>
                <div className="service-bx" id="paid-retweets" style={{ '--clr': '#eb5ae5' }}>
                    <div className="service">
                        <div className="icon-box">
                            <div className="icon-div"><svg width="75%" height="75%" viewBox="0 0 24 24">
                                <path
                                    d="M9 11v2h2.953l1.594 2h-6.547v-4h-2l3-4 3 4h-2zm6 0v-2h-2.922l-1.594-2h6.516v4h2l-3 4-3-4h2zm-3-8c5.514 0 10 3.592 10 8.007 0 4.917-5.145 7.961-9.91 7.961-1.937 0-3.383-.397-4.394-.644-1 .613-1.595 1.037-4.272 1.82.535-1.373.723-2.748.602-4.265-.838-1-2.025-2.4-2.025-4.872-.001-4.415 4.485-8.007 9.999-8.007zm0-2c-6.338 0-12 4.226-12 10.007 0 2.05.738 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 1.418.345 2.775.503 4.059.503 7.084 0 11.91-4.837 11.91-9.961-.001-5.811-5.702-10.006-12.001-10.006z">
                                </path>
                            </svg></div>
                        </div>
                        <h3 className="hidden">Paid Retweets</h3>
                        <p className="hidden">I will pay for your tweets to be retweeted by accounts with over <span
                            className='highlight'>1 million followers</span> total in your niche.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Services;