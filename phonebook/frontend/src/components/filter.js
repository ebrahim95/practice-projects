const Filter = ({handleSearch}) => {
    return (
      <div>
       search: <input onChange={handleSearch} />
      </div> 
    )
  }

export default Filter