const Persons = ({filteredNames, onClick}) => {
    const displayNames = filteredNames.map(person =>  {
      return (
      <div key={person.id}>
        {`${person.name} ${person.number}`}{" "}
        <button onClick={onClick(person.id)}>Delete</button>
      </div>
    )})
    return (
      <>
        <h2>Numbers</h2>
        {displayNames}
      </>
    )
}

export default Persons
