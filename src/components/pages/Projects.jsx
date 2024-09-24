// Extensões do react
import { useLocation } from "react-router-dom";

// Components
import Message from "../layouts/Message";

function Projects() {

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    return (
        <div>
            <h1>Meus Projetos</h1>
            {message && <Message type='sucess' msg={message}  />}
        </div>
    );  
}

export default Projects;