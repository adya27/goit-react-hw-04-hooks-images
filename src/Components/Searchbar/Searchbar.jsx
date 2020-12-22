import React, { useState } from "react";

function Searchbar({ onSubmit }) {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const { value } = e.currentTarget;

    setSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(search);
  };

  return (
    <header className="Searchbar">
      <form onSubmit={handleSubmit} className="SearchForm">
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          name={"search"}
          onChange={handleChange}
          value={search}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

export default Searchbar;
