// Extensões do react
import { useLocation } from "react-router-dom";

// Components
import Message from "../layouts/Message";
import Container from "../layouts/Container";
import LinkButton from "../layouts/LinkButton";

// Css
import styles from './Projects.module.css'

function Projects() {

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    return (
        <div className={styles.projectContainer}>
            <div className={styles.titleContainer}>
                <h1>Meus Projetos</h1>
                <LinkButton to='/newproject' text='Criar Projeto' />
            </div>
            {message && <Message type='sucess' msg={message}  />}
            <Container customClass='start'>
                <p>Projetos...</p>
            </Container>
        </div>
    );  
}

export default Projects;