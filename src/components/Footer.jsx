import { useEffect } from "react";

const Footer = () => {

    useEffect(() => {
        document.querySelector('#year').textContent = new Date().getUTCFullYear();
    }, []);

    return (
        <footer>
            <h2>Sam's X Management</h2>
            <h4>Copyright &copy;<span id="year"></span> All rights reserved</h4>
        </footer>
    );
}

export default Footer;