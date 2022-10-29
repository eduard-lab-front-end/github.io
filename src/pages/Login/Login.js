import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AppRoutes, redirectRoutes } from "../../components/routing/AppRoutes";

const initialForm = {
    email: "",
    password: ""
}

const Login = ({page}) => {
const navigate = useNavigate();
    const [ form, setForm ] = useState(initialForm)
    const handleChange = (key, value) => {
        setForm({
            ...form,
            [key]: value
        })
    }
    const handleSIgnUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, form.email, form.password)
            setForm(initialForm)
            navigate(AppRoutes.SIGN_IN)

        } catch (e) {
            console.log(e.message)
        } finally {

        }
    };
    const handleSIgnIn = async () => {
        try {
            const authUser = await signInWithEmailAndPassword(auth, form.email, form.password)
            localStorage.setItem("authUser", JSON.stringify(authUser))
            navigate(redirectRoutes.IHOR)
        } catch (e) {
            console.log(e.message)
        } finally {

        }
    };

    return (
        <>
            <h1>{page}</h1>
            <form action="">
                <input type="email" value={form.email} onChange={(e)=> handleChange("email", e.target.value)}/> Email
                <input type="Password" value={form.password} onChange={(e)=> handleChange("password", e.target.value)}/> Pass
            </form>
            <button onClick={()=> page ==="Sign Up" ? handleSIgnUp() : handleSIgnIn() }>{page}</button>
        </>
    )
};

export default Login;