// Extensões react
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Components
import Loading from '../layouts/Loading'
import Container from '../layouts/Container'
import ProjectForm from '../project/ProjectForm';
import Message from '../layouts/Message'

// Css
import styles from './Project.module.css'

function Project() {

    const { id } = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {

        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((resp) => resp.json())
                .then((data) => {
                    setProject(data)
                })
                .catch((err) => console.log(err))
        }, 1000)

    }, [id])

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function editPost(project) {
        setMessage('')
        setType('')
        
        // Budget Validation
        if (project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project),
        }).then((resp) => resp.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto Atualizado!')
            setType('success')
        })
        .catch((err) => console.log(err))
    }

    return <>
        {project.name ? (
            <div className={styles.projectDetails}>
                <Container customClass='column'>
                    {message && <Message type={type} msg={message} />}
                    <div className={styles.detailsContainer}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>
                            {!showProjectForm ? 'Editar Projeto' : 'Fechar Projeto'}
                        </button>
                        {!showProjectForm ? (
                            <div className={styles.projectInfo}>
                                <p>
                                    <span>Categoria:</span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total de Orçamento:</span> R${project.budget}
                                </p>
                                <p>
                                    <span>Total Utilizado:</span> R${project.cost}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.projectInfo}>
                                <ProjectForm handleSubmit={editPost} btnText="Concluir Edição" projectData={project} />
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        )
            : (
                <Loading />
            )}
    </>
}

export default Project;