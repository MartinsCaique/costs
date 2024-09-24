// Extensões react
import { Link } from 'react-router-dom';

// Layouts
import Container from './Container'

// Css e imagens
import styles from './NavBar.module.css'
import logo from '../../assets/images/costs_logo.png'

function NavBar() {
    return (
        <nav className={styles.navbar}>
            <Container>
                <Link to={'/'}><img src={logo} alt="Logo Costs" /></Link>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to={'/'}>Home</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to={'/projects'}>Projetos</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to={'/company'}>Empresa</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to={'/contact'}>Contato</Link>
                    </li>
                </ul>
            </Container>
        </nav>
    );
}

export default NavBar;