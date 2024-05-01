import { useEffect } from "react";

const Call = () => {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        document.body.appendChild(script);
    }, []);

    return (
        <section className="titled-section" id="call">
            <h2 className="section-title hidden">Book A Call</h2>
            <div className="call-desc-box">
                <div className="calendly-inline-widget" data-url="https://calendly.com/wrotebysam/discovery-call-1"
                    style={{ minWidth: 320 + 'px', height: 700 + 'px' }}>
                </div>
            </div>
        </section>
    );
}

export default Call;