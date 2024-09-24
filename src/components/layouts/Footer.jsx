// Extensões react
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

// Css e imagens
import styles from './Footer.module.css'

function Footer() {
    return (
        <footer className={styles.footer}>
            <ul className={styles.socialList}>
                <li><FaFacebook /></li>
                <li><FaInstagram /></li>
                <li><FaLinkedin /></li>
            </ul>
            <p className={styles.copyRight}>
                <span>Cots</span> &copy; 2024
            </p>
        </footer>
    );
}

export default Footer;