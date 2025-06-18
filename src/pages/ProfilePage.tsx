import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "../components/NavBar";
import { Col, Container } from "react-bootstrap";

const ProfilePage: React.FC = () =>{

    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    if(!isAuthenticated){
        return <div>Not authenticated</div>
    }

    if(!user){
        return <div>No user profile</div>
    }

    getAccessTokenSilently().then(token => console.log('token', token))

    return(
        <div>
            <NavBar/>
                <Container fluid className="d-flex flex-column justify-content-center align-items-center p-5">
                    <Col className="text-center">
                        <h1>Profile Page</h1>
                        {user?.picture && <img src={user.picture} alt={user.name} />}
                        <h3>{user.name}</h3>
                        <div>
                            {
                                Object.keys(user).map((objKey, index) => 
                                    <p key={index}><b>{objKey}</b>: {user[objKey]}</p>                            
                                )
                            }
                        </div>
                    </Col>
                </Container> 
        </div>
    )
}

export default ProfilePage;