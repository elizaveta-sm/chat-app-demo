import './App.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import PrivateRoutes from './utils/private-routes';

import Chat from './pages/main-chat';
import Login from './pages/login';

import Navbar from './components/navbar';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { setCurrentUser, setIsLoggedIn } from './features/auth/auth.slice';
import { getMessagesList } from './features/messages/messages.actions';
import { setMessagesList } from './features/messages/messages.slice';

const Root = () => {
  return (
    <div id='App' className='w-full h-full'>
      <Navbar />
      <main className='h-full w-full bg-neutral-900 flex items-center justify-center'>
        <Outlet />
      </main>
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch();

  const { currentUser, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setCurrentUser(user));
        dispatch(setIsLoggedIn(true));
      } else {
        dispatch(setCurrentUser(null));
        dispatch(setIsLoggedIn(false));
      }
    });

    return unsubscribe;
  }, []);


  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getMessagesList());
    } else {
      dispatch(setMessagesList(null));
    }

  }, [currentUser, isLoggedIn])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Root />}>

          <Route path='/' element={<PrivateRoutes />} >
            <Route path='/' element={<Chat />} />
          </Route>

          <Route path='/login' element={<Login />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
