import React, {useContext, useEffect, useState } from "react";
import axios from "axios";


const AppContext = React.createContext();

const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s="
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php"


const AppProvider = ({children}) => {

    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || []);

    const searchMeals = allMealsUrl + searchTerm;

    const fetchMeals = async (url) => {
        setLoading(true);
        try {
            const {data} = await axios(url);
            if(data.meals) {
                setMeals(data.meals);
            } else {
                setMeals([]);
            }
            
        } catch (error) {
            console.log(error.response);
        }
        setLoading(false);
    }

    const selectMeal = (idMeal, favoriteMeal) => {
        let meal
        if(favoriteMeal) {
            meal = favorites.find((item) => item.idMeal === idMeal);
        } else {
            meal = meals.find((meal) => meal.idMeal === idMeal);
        }
        setSelectedMeal(meal);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const addFavorites = (idMeal) => {
        const meal = meals.find((meal) => meal.idMeal === idMeal);
        const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal);
        if(alreadyFavorite) return;
        const updateFavorites = [...favorites, meal];
        setFavorites(updateFavorites);
        localStorage.setItem("favorites", JSON.stringify(updateFavorites));
    }

    const removeFavorites = (idMeal) => {
        const updateFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
        setFavorites(updateFavorites);
        localStorage.setItem("favorites", JSON.stringify(updateFavorites));
    }

    useEffect(() => {
        fetchMeals(searchMeals);
    }, [])

    useEffect(() => {
        if(!searchTerm) return;
        fetchMeals(searchMeals);      
    }, [searchTerm]) 

    const fetchRandomMeal = () => {
        fetchMeals(randomMealUrl);
    }

    return (
        <AppContext.Provider value={{meals, loading, setSearchTerm, fetchRandomMeal, showModal, selectMeal, selectedMeal, closeModal, addFavorites, removeFavorites, favorites}} >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider};