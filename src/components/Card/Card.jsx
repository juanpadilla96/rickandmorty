import style from "./Card.module.css";
import { Link } from "react-router-dom";
import { addFav, removeFav } from "../../redux/action";
import { connect } from "react-redux";
import { useState, useEffect } from "react";

const Card = ({
  id,
  name,
  status,
  species,
  gender,
  origin,
  image,
  onClose,
  addFav,
  removeFav,
  myFavorites,
}) => {
  const [isFav, setIsFav] = useState(false);

  const handleFavorite = () => {
    isFav
      ? removeFav(id)
      : addFav({ id, name, status, species, gender, origin, image, onClose });
    setIsFav(!isFav);
  };

  useEffect(() => {
    myFavorites.forEach((fav) => {
      if (fav.id === id) {
        setIsFav(true);
      }
    });
  }, [myFavorites]);

  return (
    <div className={style.contenedor}>
      <Link to={`/detail/${id}`}>
        {isFav ? (
          <button onClick={handleFavorite}>{isFav ? "❤️" : "🤍"} </button>
        ) : (
          ""
        )}
        <img src={image} alt="" />
        <p>Name: '{name}'</p>
        <p>Status: '{status}'</p>
        <p>Species: '{species}'</p>
        <p>Gender: '{gender}'</p>
        <p>Origin: '{origin}'</p>
        <button
          onClick={() => {
            onClose(id);
          }}
        >
          X
        </button>
      </Link>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFav: (character) => dispatch(addFav(character)),
    removeFav: (id) => dispatch(removeFav(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    myFavorites: state.myFavorites,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);

//como centrar un
