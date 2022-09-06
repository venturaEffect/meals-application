import React, { useState} from 'react';
import { useGlobalContext } from '../context';
import { BsHandThumbsUp } from 'react-icons/bs';

const Meals = () => {
  const { loading, meals } = useGlobalContext();
  

  if(loading === true) {
    return (
      <section className='section'>
        <h4>loading...</h4>
      </section>)
  }

  return (
    <section className="section-center">
      {meals.map((meal) => (
        <article key={meal.idMeal} className="single-meal">
          <img src={meal.strMealThumb} alt={meal.strMeal} className="img"/>
          <footer>
            <h5>{meal.strMeal}</h5>
            <button className="like-btn"><BsHandThumbsUp /></button>
          </footer>
        </article>
    ))}
    </section>
  )
}

export default Meals;