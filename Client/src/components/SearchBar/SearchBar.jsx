import style from './SearchBar.module.css'
import {useState} from 'react';

const SearchBar=({onSearch})=> {

   const [id, setId] = useState('');

   const handleChange = (event) => {

         setId(event.target.value)

   }
   return (
      <div className={style.container}>
        <input type='text' onChange={handleChange} value={id} />
        <button onClick={()=>{onSearch(id)}} >agregar</button>
      </div>
   );
}
export default SearchBar;
