// Componets
import LinkButton from '../layouts/LinkButton';

// Css e imagens
import styles from './Home.module.css'
import savings from '../../assets/images/savings.svg'

function Home() {
    return (
        <section className={styles.homeContainer}>
            <h1>Bem-vindo ao <span>Cots</span></h1>
            <p>Comece a gerenciar seus projetos agora mesmo!</p>
            <LinkButton to='/newproject' text='Criar Projeto' />
            <img src={savings} alt="Costs" />
        </section>
    );
}

export default Home;