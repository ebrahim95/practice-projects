
const Persons = ({filteredNames, onClick}) => {
    const displayNames = filteredNames.map(person =>  {
      return (
      <div className="border-2 border-gray-500 p-2 rounded-lg mb-3" key={person.id}>
        <span alt="person name">
          {person.name}
        </span> 
        <span alt="person number">
          <br/>{person.number}
        </span>
        <br/> 
        <button className="transition duration-500 ease-in-out border-2 border-gray-500 text-md bg-blue-200 rounded-lg mt-1 px-2 hover:bg-red-200" onClick={onClick(person.id)}>Delete</button>
      </div>
    )})



    return (
      <>
        <h2 className="text-lg p-2">Numbers</h2>
        {displayNames}
      </>
    )
}

export default Persons
