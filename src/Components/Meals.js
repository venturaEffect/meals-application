import React, { useState} from 'react';
import { useGlobalContext } from '../context';
import { BsHandThumbsUp } from 'react-icons/bs';

const Meals = () => {
  const { loading, meals, selectMeal, addFavorites } = useGlobalContext();
  

  if(loading) {
    return (
      <section className='section'>
        <h4>loading...</h4>
      </section>)
  }

  if(meals.length < 1) {
    return (
      <section className='section'>
        <h4>no meals matched your search criteria</h4>
      </section>)
  }

  return (
    <section className="section-center">
      {meals.map((meal) => (
        <article key={meal.idMeal} className="single-meal">
          <img src={meal.strMealThumb} alt={meal.strMeal} onClick={() => selectMeal(meal.idMeal)} className="img"/>
          <footer>
            <h5>{meal.strMeal}</h5>
            <button className="like-btn" onClick={() => addFavorites(meal.idMeal)}><BsHandThumbsUp /></button>
          </footer>
        </article>
    ))}
    </section>
  )
}

export default Meals;