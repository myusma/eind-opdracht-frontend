import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import SubmitButton from "../../components/button/SubmitButton";
import InputField from "../../components/inputField/InputField";
import Footer from "../../components/footer/Footer";

function SignIn() {

    const {login} = useContext(AuthContext);
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    console.log(username)



    async function handleLogin(e) {
        e.preventDefault()



        try {
            const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {

                username: username,
                password: password
            })
            console.log('loginStatus', response)
            login(response.data.accessToken)


        } catch (e) {
            console.error(e)


        }

    }


    return (
        <>
            <h1>Signin</h1>


            <form onSubmit={handleLogin}>
                <div>

                    <InputField
                        label="Username :"
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <InputField
                        label="Password:"
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />


                </div>

                <SubmitButton label="Submit"  />

            </form>

            <p>Don´t you have an account yet? Click on <Link to="/signup">Signup</Link> to register.</p>
            <p>Back to the <Link to="/">Homepage</Link></p>

            <
                Footer />
        </>
    );
}

export default SignIn;