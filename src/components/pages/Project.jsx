// Extensões react
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { parse, v4 as uuidv4 } from 'uuid';

// Components
import Loading from '../layouts/Loading'
import Container from '../layouts/Container'
import ProjectForm from '../project/ProjectForm';
import Message from '../layouts/Message'
import ServiceForm from '../services/ServiceForm';

// Css
import styles from './Project.module.css'

function Project() {

    const { id } = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
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

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    function editPost(project) {
        setMessage('')

        // Budget Validation
        if (project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            setTimeout(() => { setMessage(''); }, 3000)
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
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

    function createService(project) {
        setMessage('')

        // Last Service
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        // Maximum value validation
        if (newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            project.services.pop()
            setTimeout(() => { setMessage(''); }, 3000);
            return false
        }

        // Add service cost to project total cost
        project.cost = newCost

        // Update project
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then((resp) => resp.json())
        .then((data) =>{
            // Exibir os serviços
            console.log(data)
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
                    <div className={styles.serviceFormContainer}>
                        <h2>Adicione um serviço</h2>
                        <button className={styles.btn} onClick={toggleServiceForm}>
                            {!showServiceForm ? 'Adicionar serviços' : 'Fechar'}
                        </button>
                        <div className={styles.projectInfo}>
                            {showServiceForm && (
                                <ServiceForm handleSubmit={createService} btnText='Adicionar serviço' projectData={project} />
                            )}
                        </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass='start'>
                        <p>Itens de Serviços</p>
                    </Container>
                </Container>
            </div>
        )
            : (
                <Loading />
            )}
    </>
}

export default Project;