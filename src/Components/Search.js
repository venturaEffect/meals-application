import React, {useState} from "react";
import { useGlobalContext } from "../context";

const Search = () => {

  const [text, setText] = useState("");
  const {setSearchTerm, fetchRandomMeal} = useGlobalContext();

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(text) {
      setSearchTerm(text);
    }
  }

  function handleRandomMeal() {
    fetchRandomMeal();
    setSearchTerm("");
  }


  return (
    <header className="search-container">
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={text} type="text" placeholder="type favorite meal" className="form-input" />
        <button className="btn" type="submit">search</button>
        <button className="btn btn-hipster" type="button" onClick={handleRandomMeal}>Surprise me!</button>
      </form>
    </header>
    )
}

export default Search;