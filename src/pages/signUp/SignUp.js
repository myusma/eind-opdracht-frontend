import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import SubmitButton from "../../components/submitButton/SubmitButton";
import InputField from "../../components/inputField/InputField";
import Footer from "../../components/footer/Footer";

function SignUp() {
    const [username,setUsername]= useState('')
    const [password,setPassword]= useState('')
    const [email,setEmail]= useState('')
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const [errorUsername, setErrorUsername] =useState(false)
    const [errorSignUp, setErrorSignUp] = useState(false)
    const navigate = useNavigate()

    function validateSignUp() {
        let errorCount = 0;

        if(username.length <6){
            setErrorUsername('username should be min. 3 digits')
            errorCount++
        } else {
            setErrorUsername(false);
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setErrorEmail("Email is invalid");
            errorCount++;
        } else {
            setErrorEmail(false);
        }

        if (password.length < 6) {
            setErrorPassword("password should be min. 3 digits");
            errorCount++
        } else {
            setErrorPassword(false);
        }
        if (errorCount > 0) {
            return false
        } else {
            return true
        }
    }
    async function handleSingUp (e){
        e.preventDefault()
        if (!validateSignUp()){
            return
        }
        try{
            const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
                email: email,
                password: password,
                username: username,
                role: ["user"]
            })


            console.log(response)
            navigate('/signin')

        }catch (e){
            console.error(e)
            setErrorSignUp('error')
        }
    }


    return (
        <>
            <h1>Sign up to get started</h1>


            <form onSubmit={handleSingUp}>

                <InputField
                    label="Username :"
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <InputField
                    label="Email :"
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
                />
                <InputField
                    label="Password :"
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={true}
                />

                <SubmitButton label="Submit"  />
                <br/>
                {errorEmail && <h4>{errorEmail}</h4>}
                {errorUsername && <h4>{errorUsername}</h4>}
                {errorPassword && <h4>{errorPassword}</h4>}
                {errorSignUp && <h4>{errorSignUp}</h4>}
            </form>

            <p>Already have an account? Click on <Link to="/signin">Signin</Link> to log in.</p>
            <p>Back to the <Link to="/">Homepage</Link></p>

            <Footer />
        </>
    );
}

export default SignUp;