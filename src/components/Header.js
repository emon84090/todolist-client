import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, NavLink, useLocation } from 'react-router-dom';
import auth from './Auth/firebaseconfig';





const Header = () => {
    const [user, loading, error] = useAuthState(auth);

    const logout = () => {
        signOut(auth);

    };

    const menuitems =
        <>

            {
                user ?
                    <>
                        <li onClick={() => logout()}><Link to="/" className='btn btn-error font-normal capitalize text-white'>logout</Link></li>
                    </> :
                    <>
                        <li><NavLink
                            className={({ isActive }) => (`font-normal text-white btn btn-primary capitalize  ${isActive ? " " : ""}`)}
                            to='/signin'
                        >login</NavLink></li>

                    </>
            }

        </>
    return (
        <>
            <section id="header" className=''>

                <div className="container mx-auto">
                    <div className="navbar bg-base-100 py-6">
                        <div className="navbar-start">
                            <div className="dropdown">
                                <label tabIndex="0" className="btn btn-ghost lg:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-900" fill="gray" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                                </label>
                                <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                    {menuitems}
                                </ul>
                            </div>
                            <Link to="/" className="btn btn-ghost normal-case text-xl text-gray-800">Todos</Link>
                        </div>
                        <div className="navbar-end hidden lg:flex">
                            <ul className="menu menu-horizontal p-0">
                                {menuitems}
                            </ul>
                        </div>



                    </div>
                </div>
            </section>
        </>
    );
};

export default Header;