import './App.css';
import Cards from './components/Cards/Cards.jsx'
import axios from 'axios';
import style from './App.css';
import NavBar from './components/NavBar/NavBar';
import { useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import About from './components/About.jsx'
import Detail from './components/Detail/Detail.jsx';
import Forms from './components/Forms/Forms';
import Favorites from './components/Favorites';
const EMAIL = 'padillajuanmanuel96@gmail.com';
const PASSWORD = 'asd123';



const URL = 'http://localhost:3001/rickandmorty/login/';

function App() {

  const [characters, setCharacters] = useState([])
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const [access, setAccess] = useState(false);


  const login = async (userData) => {

    try {
      const { email, password } = userData;
      const { data } = await axios(URL + `?email=${email}&password=${password}`)
      const { access } = data;
      setAccess(access);
      access && navigate('/home');


    } catch (error) {

    }

  }

  useEffect(() => {

    !access && navigate('/')
  }, [access])


  const onSearch = async (id) => {

    try {
      const { data } = await axios(`http://localhost:3001/rickandmorty/character/${id}`)

      if (data.name) {
        setCharacters((oldChars) => [...oldChars, data]);
      };

    } catch (error) {
      alert('¡No hay personajes con este ID!');

    }

  };

  const onClose = (id) => {
    setCharacters(
      characters.filter((cha) => {
        return cha.id !== Number(id)
      })
    )
  };

  return (

    <div className={style.App}>
      {pathname !== '/' && <NavBar onSearch={onSearch} />}

      <Routes>
        <Route path='/' element={<Forms login={login} />} />

        <Route path='/home' element={<Cards characters=
          {characters} onClose={onClose} />} />
        <Route path='/about' element={<About />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/favorites' element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
