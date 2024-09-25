// Extensões do react
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// Components
import Message from "../layouts/Message";
import Container from "../layouts/Container";
import LinkButton from "../layouts/LinkButton";
import ProjectCard from "../project/ProjectCard";

// Css
import styles from './Projects.module.css'

function Projects() {
    const [projects, setProjects] = useState([])

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(()=>{
        fetch("http://localhost:5000/projects", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp)=> resp.json())
        .then((data)=> {
            console.log(data)
            setProjects(data)
        })
        .catch((err)=> console.log(err))
    }, [])

    return (
        <div className={styles.projectContainer}>
            <div className={styles.titleContainer}>
                <h1>Meus Projetos</h1>
                <LinkButton to='/newproject' text='Criar Projeto' />
            </div>
            {message && <Message type='sucess' msg={message}  />}
            <Container customClass='start'>
                {projects.length > 0 && projects.map((project)=> (
                    <ProjectCard name={project.name} id={project.id} budget={project.budget} category={project.category.name} key={project.id} />
                ))}
            </Container>
        </div>
    );  
}

export default Projects;