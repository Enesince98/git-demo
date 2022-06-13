import React from 'react'
const Search = () => {
  return (
    <div><form>
    <label for="search">Search</label>
    <input id="search" type="search" pattern=".*\S.*" required/>
    <span class="caret"></span>
  </form></div>
  )
}

export default Search