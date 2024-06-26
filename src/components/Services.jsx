
const Services = () => {
    return (
        <section className="titled-section" id="services">
            <h2 className="section-title hidden">Services</h2>
            <div className="services-container">
                <div className="service-bx" id="tweets" style={{ '--clr': '#3a86ff' }}>
                    <div className="service">
                        <div className="icon-box">
                            <div className="icon-div"><svg width="75%" height="75%" viewBox="0 0 396 396">
                                <path
                                    d="M301.026 37.125H355.608L236.362 173.415L376.645 358.875H266.805L180.774 246.395L82.335 358.875H27.72L155.265 213.098L20.691 37.125H133.32L211.084 139.937L301.026 37.125ZM281.869 326.205H312.114L116.886 68.079H84.4305L281.869 326.205Z"
                                    fill="white"></path>
                            </svg></div>
                        </div>
                        <h3 className="hidden">Tweets</h3>
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
                <div className="service-bx" id="giveaways" style={{ '--clr': '#89ec5b' }}>
                    <div className="service">
                        <div className="icon-box">
                            <div className="icon-div"><svg width="75%" height="75%" viewBox="0 0 24 24">
                                <path
                                    d="M11 24h-9v-12h9v12zm0-18h-11v4h11v-4zm2 18h9v-12h-9v12zm0-18v4h11v-4h-11zm4.369-6c-2.947 0-4.671 3.477-5.369 5h5.345c3.493 0 3.53-5 .024-5zm-.796 3.621h-2.043c.739-1.121 1.439-1.966 2.342-1.966 1.172 0 1.228 1.966-.299 1.966zm-9.918 1.379h5.345c-.698-1.523-2.422-5-5.369-5-3.506 0-3.469 5 .024 5zm.473-3.345c.903 0 1.603.845 2.342 1.966h-2.043c-1.527 0-1.471-1.966-.299-1.966z">
                                </path>
                            </svg></div>
                        </div>
                        <h3 className="hidden">Giveaways</h3>
                        <p className="hidden">I will write giveaways and supply the <span className='highlight'>prize</span> myself.
                        </p>
                    </div>
                </div>
                <div className="service-bx" id="profile-optimization" style={{ '--clr': '#fdc500' }}>
                    <div className="service">
                        <div className="icon-box">
                            <div className="icon-div"><svg width="75%" height="75%" viewBox="0 0 24 24">
                                <path
                                    d="M23.948.042c-.413-.028-.817-.042-1.214-.042-8.6 0-13.497 6.557-15.278 11.833l4.727 4.727c5.428-1.944 11.817-6.66 11.817-15.168 0-.44-.017-.89-.052-1.35zm-11.277 14.178l-2.883-2.883c1.221-2.859 4.691-8.945 12.199-9.32-.251 5.775-4.041 9.932-9.316 12.203zm5.471 1.538c-.547.373-1.09.71-1.628 1.011-.187.891-.662 1.842-1.351 2.652-.002-.576-.162-1.156-.443-1.738-.495.225-.966.418-1.414.588.66 1.709-.012 2.971-.915 4.154 1.296-.098 2.656-.732 3.728-1.805 1.155-1.155 1.967-2.823 2.023-4.862zm-11.82-6.469c-.579-.28-1.158-.438-1.732-.441.803-.681 1.744-1.153 2.626-1.345.314-.552.667-1.097 1.039-1.633-2.039.055-3.708.867-4.864 2.023-1.071 1.071-1.706 2.433-1.804 3.728 1.184-.904 2.446-1.576 4.155-.914.173-.471.366-.944.58-1.418zm7.738.663c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0c.391.392.391 1.024 0 1.415s-1.024.39-1.414-.001zm4.949-4.951c-.78-.78-2.047-.78-2.828 0-.781.781-.781 2.049 0 2.829.781.781 2.048.781 2.829 0 .78-.78.78-2.047-.001-2.829zm-1.908 1.911c-.273-.273-.273-.718 0-.99.271-.273.717-.273.99 0 .272.272.271.717 0 .99-.274.272-.718.272-.99 0zm-6.747 10.65c-1.492 3.81-5.803 6.208-10.354 6.438.219-4.289 2.657-8.676 6.64-10.153l.805.806c-4.331 2.755-4.653 5.346-4.665 6.575 1.268-.015 4.054-.344 6.778-4.464l.796.798z">
                                </path>
                            </svg></div>
                        </div>
                        <h3 className="hidden">Profile Optimisation</h3>
                        <p className="hidden">I make sure your profile is crisp and <span className='highlight'>perfect</span> for
                            followers to look at and love.</p>
                    </div>
                </div>
                <div className="service-bx" id="meetings" style={{ '--clr': '#e84855' }}>
                    <div className="service">
                        <div className="icon-box">
                            <div className="icon-div"><svg width="85%" height="85%" viewBox="0 0 24 24">
                                <path
                                    d="M7,10H9A1,1,0,0,0,9,8H7a1,1,0,0,0,0,2ZM21,4H13V3a1,1,0,0,0-2,0V4H3A1,1,0,0,0,2,5V15a3,3,0,0,0,3,3H9.59l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L11,19.41V21a1,1,0,0,0,2,0V19.41l2.29,2.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L14.41,18H19a3,3,0,0,0,3-3V5A1,1,0,0,0,21,4ZM20,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V6H20ZM7,14h6a1,1,0,0,0,0-2H7a1,1,0,0,0,0,2Z">
                                </path>
                            </svg></div>
                        </div>
                        <h3 className="hidden">Meetings</h3>
                        <p className="hidden">I will have meetings with you <span className='highlight'>weekly</span> to make sure
                            you're happy. Also, you're free to DM me anytime :)</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Services;