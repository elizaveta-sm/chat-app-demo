import './App.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import PrivateRoutes from './utils/private-routes';

import Chat from './pages/main-chat';
import Login from './pages/login';

import Navbar from './components/navbar';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './config/firebase';
import { setCurrentUser, setIsLoggedIn } from './features/auth/auth.slice';
import { getMessagesList } from './features/messages/messages.actions';
import { setMessagesList } from './features/messages/messages.slice';
import { collection, onSnapshot } from 'firebase/firestore';

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

  const { loading, currentUser, error, loginSuccess, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(`there's user: `, user)
        dispatch(setCurrentUser(user));
        // console.log('setting isloggedin to true')
        dispatch(setIsLoggedIn(true));
      } else {
        // console.log('theres no user: ', user, 'setting isloggedin to false')
        dispatch(setCurrentUser(null));
        dispatch(setIsLoggedIn(false));
      }
    });

    return unsubscribe;
  }, []);


  useEffect(() => {
    if (isLoggedIn) {
      // console.log('getting messages in the app if loggedIn');
      dispatch(getMessagesList());
    } else {
      dispatch(setMessagesList(null));
    }

  }, [currentUser, isLoggedIn])

  // const messagesCollectionRef = collection(db, 'messages');
  
  // onSnapshot(messagesCollectionRef, (snapshot) => {
  //   let messages = [];
  //   snapshot.docs.forEach(doc => {
  //     console.log('the doc: ', doc)
  //     messages.push({...doc.data, id: doc.id})
  //   });

  //   console.log('messages in the onsnapshot listener: ', messages)
  // })


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
