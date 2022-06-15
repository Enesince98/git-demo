import React from 'react'
import Table from './Table'
import Search from './Search'
const ContentTypeManager = () => {
  return (
    <div>
      <Search />
      <Table url = 'https://62a492ef47e6e40063951ec5.mockapi.io/api/contentTypes' isParent = {true} whoseParent = "contents"/>
      </div>
  )
}

export default ContentTypeManager