import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/auth.actions";
import logo from '../assets/logo-9.png';

const Navbar = () => {
    const dispatch = useDispatch();
    const { isLoggedIn, currentUser } = useSelector((state) => state.auth);

    const logout = () => {
        dispatch(logoutUser());
    };

    return (
        <header className='absolute top-0 w-full px-4 py-2 bg-neutral-700 text-gray-100 drop-shadow-md border-b border-neutral-800 xl:text-base'>
            <div className="w-full h-full flex justify-between items-center md:grid md:grid-cols-8 xl:pr-8 xl:pl-4">
                <img src={logo} alt="logo" className="w-10 md:w-12 xl:w-16 md:col-start-2 md:col-span-2 xl:col-start-3 xl:col-span-1" />

                { isLoggedIn && (
                    <>
                        <div id="current-user" className="flex items-center gap-x-2 md:gap-x-3 md:col-start-4 md:col-span-2 md:justify-center">
                            <img src={currentUser.photoURL} alt="logo" className="w-8 rounded-full md:w-10 xl:w-12" />

                            <p>{currentUser.displayName}</p>
                        </div>

                        <div className="md:col-start-6 md:col-span-2 md:justify-self-end xl:col-start-6 xl:col-span-1">

                            <button type="button" onClick={logout} className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:ring focus:ring-gray-100 disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400 xl:text-base xl:gap-3">
                                Log out
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 xl:h-6 xl:w-6">
                                <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z" clipRule="evenodd" />
                                </svg>
                            </button>
                
                        </div>
                    </>
                ) }

            </div>
        </header>
    )
}

export default Navbar;