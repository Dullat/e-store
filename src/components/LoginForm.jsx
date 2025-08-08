import { useContext, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { supabase } from "../lib/supabaseClient";


const LoginForm = () => {
    const { signUp, signIn, user } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [mode, setMode] = useState('sign-in')
    const [error, setError] = useState(null)
    const [conformation, setConformation] = useState(null)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (mode === 'sign-up') {
            const { data, error } = await signUp(email, pass)
            console.log(data, error)
            if (data?.user && !data.session && data.user.identities?.length === 0) {
                setError('Already a user : Try log-in')
            }

            if (data?.user && data.session === null && data.user.identities.length > 0 && data.user.confirmation_sent_at) {
                setConformation("Email sent, Check your mail and Click the link")
            }

            if (data?.user && data.session) {
                navigate("/user")
            }

            if (error) {
                setError(error)
            }
        }

        if (mode === 'sign-in') {
            const { data, error } = await signIn(email, pass)
            console.log(data, error)
            if (!error) {
                navigate('/')
            }

            if (error) {
                setError(error)
            }
        }
    }

    const handleMode = () => {
        setError(null)
        setMode((prev) => prev === 'sign-up' ? 'sign-in' : 'sign-up')
    }

    if(user) return <p className="text-2xl font-bold text-center mt-10">don't be too smart bro..... <br /><br /><br />You are Already an user <br />So, go back to Home </p>

    return (

        <div className="max-w-[400px] m-auto mt-10 p-4">
            <p className="text-2xl font-bold my-10 text-center">
                {
                    mode === 'sign-up' ? 'Create Account' : 'Log in'
                }
            </p>
            {
                error && (
                    <div className="py-1 px-2 bg-red-500 text-white rounded w-full my-2 mb-6 opacity-80 text-sm">
                        {`⚠️ ${error}`}
                    </div>
                )
            }
            {
                conformation ? (
                    <p className="m-auto mt-8">{conformation}</p>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-8 *:flex *:flex-col *:gap-1">
                        <div className="">
                            <label className="opacity-70 text-sm">Email</label>
                            <input name='email' type="text" placeholder='example@gmail.com'
                                onChange={(e) => setEmail(e.target.value)}
                                className="rounded py-1 px-2 "
                            />
                        </div >
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

                                <button onClick={handleMode} type="button"
                                    className="text-blue-700 cursor-pointer"
                                >
                                    {mode === 'sign-in' ? 'Create Account' : 'Log-in'}
                                </button>
                            </div>

                        </div>
                    </form >
                )
            }

            <DummyAccount />
        </div >
    );
}

export default LoginForm

const DummyAccount = () => {
  const email = 'lzb4jjunj2@mrotzis.com';
  const password = 'lzb4jjunj2@mrotzis.com';
  const [copied, setCopied] = useState(null);

  const handleCopy = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 1500);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="text-center text-green-600 text-sm mt-5">
      <p>if don't want to create an account, use this dummy account..</p>
      <div className="mt-2 flex items-center justify-center gap-2">
        <span>Email: {email}</span>
        <button
          className="text-blue-600 hover:underline text-xs cursor-pointer"
          onClick={() => handleCopy(email, 'email')}
        >
          📋 {copied === 'email' ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="mt-1 flex items-center justify-center gap-2">
        <span>Pass: {password}</span>
      </div>
    </div>
  );
};

