import React from "react";
import { useGlobalContext } from "../context";

const Favorites = () => {

  const {favorites, selectMeal, removeFavorites} = useGlobalContext();
  return (
    <section className="favorites">
      <div className="favorites-content">
        <h5>Favorites</h5>
        <div className="favorites-container">
          {favorites.map((item) => {
            const {idMeal, strMealThumb: image} = item;
            return (
              <div key={idMeal} className="favorite-item">
                <img src={image} alt={idMeal} onClick={() => selectMeal(idMeal, true)} className="favorites-img img"/>
                <button className="remove-btn" onClick={() => removeFavorites(idMeal)}>remove</button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
    )
}

export default Favorites;