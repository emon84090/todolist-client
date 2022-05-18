import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';

import auth from './firebaseconfig';



const Signup = () => {
    const [signInWithGoogle, guser, gloading, gerror] = useSignInWithGoogle(auth);

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);



    const navigate = useNavigate()
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    if (user || guser) {
        navigate(from, { replace: true });
    }



    let signuperror;

    if (error || gerror) {
        signuperror = <p>{error?.message || gerror?.message}</p>
    }



    const [pshowicon, setpShowicon] = useState(false);
    const [cpshowicon, setcpShowicon] = useState(false);

    const [email, setmail] = useState({
        value: '',
        error: ''
    });

    const [password, setpassword] = useState({
        value: '',
        error: ''
    });

    const [confirmpass, setconfirmpass] = useState({
        value: '',
        error: ''
    });

    const [name, setName] = useState({
        value: '',
        error: ''
    });




    const handlemail = (event) => {
        const emailInput = event.target.value;
        if (/\S+@\S+\.\S+/.test(emailInput)) {
            setmail({ value: emailInput, error: "" });
        } else {
            setmail({ value: "", error: "Please Provide a valid Email" });
        }

    }
    const handlpassword = (event) => {
        const passwordInput = event.target.value;
        if (passwordInput.length < 7) {
            setpassword({
                value: '',
                error: "password must be 6 letter"
            })
        } else if (!/(?=.*[A-Z])/.test(passwordInput)) {
            setpassword({
                value: '',
                error: "password must contain capital letter"
            })
        } else {
            setpassword({
                value: passwordInput,
                error: ""
            })

        }

    }

    const handlconfirmpassword = (event) => {
        const confirmpasswordInput = event.target.value;
        if (confirmpasswordInput !== password.value) {
            setconfirmpass({
                error: 'password not matched',
                value: ''
            })

        } else {
            setconfirmpass({
                error: '',
                value: confirmpasswordInput
            })
        }

    }


    const signupForm = async (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(email.value, password.value);


    }


    return (
        <>
            <section className=' min-h-screen  flex justify-center items-center'>

                <div className="card mt-16 max-w-md mx-auto w-full bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title justify-center text-gray-500 font-bold">Registration</h2>

                        <div className="registration-content  flex items-center justify-center flex-col ">

                            <form className='w-full p-5 px-1 ' onSubmit={signupForm}>


                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className=' text-gray-500'>Email</span>
                                    </label>
                                    <input onChange={handlemail} placeholder='Email' name='email' type="email" className="input text-gray-500 border-gray-300 input-bordered w-full "
                                        required />

                                    <div className="label pb-0">
                                        {email.error && (<p className='text-sm font-semibold text-red-500'>{email.error}</p>)}
                                    </div>
                                </div>

                                <div className="form-control w-full relative">
                                    <label className="label">
                                        <span className=' text-gray-500'>Password</span>
                                    </label>
                                    <input onChange={handlpassword} placeholder='password' className='input text-gray-500 border-gray-300 input-bordered w-full' type={`${pshowicon ? "text" : "password"}`} name="" required />
                                    <div onClick={() => setpShowicon(!pshowicon)} className="password-icon cursor-pointer absolute right-5 text-gray-600 top-16 -translate-y-1/2">
                                        <i className={`bx ${!pshowicon ? 'bx-show' : 'bx-hide'} text-xl`}></i>
                                    </div>
                                    <div className="label pb-0">
                                        {password.error && (<p className='text-sm font-semibold text-red-500'>{password.error}</p>)}
                                    </div>
                                </div>

                                <div className="form-control w-full relative">
                                    <label className="label">
                                        <span className=' text-gray-500'>Confirm Password</span>
                                    </label>
                                    <input onChange={handlconfirmpassword} placeholder='confirm password' className='input text-gray-500 border-gray-300 input-bordered w-full' type={`${cpshowicon ? "text" : "password"}`} name="" required />
                                    <div onClick={() => setcpShowicon(!cpshowicon)} className="password-icon cursor-pointer absolute right-5 text-gray-600 top-16 -translate-y-1/2">
                                        <i className={`bx ${!cpshowicon ? 'bx-show' : 'bx-hide'} text-xl`}></i>
                                    </div>
                                    <div className="label pb-0">
                                        {confirmpass.error && (<p className='text-sm font-semibold text-red-500'>{confirmpass.error}</p>)}
                                    </div>
                                </div>

                                <p className='text-sm text-center font-semibold text-red-500 mt-3'>{signuperror}</p>
                                <div className="input-field">

                                    <button type='submit' className='mt-2 btn btn-primary w-full text-white font-semibold'>{loading ? <i className='bx bx-loader-alt font-semibold animate-spin text-xl'></i> : 'Sign Up'}</button>
                                </div>


                            </form>

                            <p className='text-gray-500 mt-2'>Already acount <Link className='text-primary underline' to="/signin">Login now</Link></p>

                            <div className="flex flex-col w-full  ">

                                <div className="divider after:bg-gray-200 before:bg-gray-200">OR</div>
                            </div>

                        </div>

                        <div className="social-login-system w-full">
                            <button onClick={() => signInWithGoogle()} className="btn btn-outline btn-gray-500 w-full">sign in with google</button>
                        </div>

                    </div>
                </div>



            </section>
        </>
    );
};

export default Signup;