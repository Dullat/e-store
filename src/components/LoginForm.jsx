import { useContext, useState } from "react";
import { Form } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { supabase } from "../lib/supabaseClient";


const LoginForm = () => {
    const { signUp, signIn } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [mode, setMode] = useState('sign-up')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (mode === 'sign-up') {
            const { data, error } = await signUp(email, pass)
        }

        if (mode === 'sign-in') {
            const { data, error } = await signIn(email, pass)
        }
    }

    return (

        <div className="max-w-[400px] m-auto mt-10">
            <p className="text-2xl font-bold my-10 text-center">
                {
                    mode === 'sign-up' ? 'Create Account' : 'Log in'
                }
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 *:flex *:flex-col *:gap-1">
                <div className="">
                    <label className="opacity-70 text-sm">Email</label>
                    <input name='email' type="text" placeholder='example@gmail.com'
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded py-1 px-2 "
                    />
                </div>
                <div className="">
                    <label className="opacity-70 text-sm">Password</label>
                    <input name='password' type="password" placeholder='Password'
                        onChange={(e) => setPass(e.target.value)}
                        className="rounded py-1 px-2 "
                    />
                </div>
                <div className="">
                    <button type='submit' name='intent' value="sign-in"
                        className="py-2 rounded bg-blue-600 hover:bg-blue-700 cursor-pointer my-2"
                    >{
                            mode === 'sign-up' ? 'Create' : 'Log in'
                        }
                    </button>

                    <div className="text-xs text-center">
                        {
                            mode === 'sign-in' ? (
                                `Don't have account ? `
                            ) :
                                (
                                    `Already a user ? `
                                )
                        }

                        <button onClick={() => setMode((prev) => prev === 'sign-up' ? 'sign-in' : 'sign-up')} type="button"
                            className="text-blue-700 cursor-pointer"
                        >
                            {mode === 'sign-in' ? 'Create Account' : 'Log-in'}
                        </button>
                    </div>

                </div>
            </form>
        </div>
    );
}

export default LoginForm
