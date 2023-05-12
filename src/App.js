import './App.css';
import Cards from './components/Cards/Cards.jsx'
import axios from 'axios';
import style from './App.css';
import NavBar from './components/NavBar/NavBar';
import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import About from './components/About.jsx'
import Detail from './components/Detail/Detail.jsx';
import Forms from './components/Forms/Forms';
import Favorites from './components/Favorites';

const example = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  origin: {
    name: 'Earth (C-137)',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
};


function App() {


  const [characters, setCharacters] = useState([])
  const {pathname} = useLocation();
  

  function onSearch(id) {
    axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
      if (data.name) {
        setCharacters((oldChars) => [...oldChars, data]);
      } else {
        window.alert('¡No hay personajes con este ID!');
      }
    });
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
     {pathname !=='/' && <NavBar onSearch={onSearch} />}

      <Routes>
        <Route path='/' element={<Forms />} />

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
