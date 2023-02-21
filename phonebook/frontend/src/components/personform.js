const PersonForm = ({onSubmit, handleNameChange, handleNewNumber}) => {
    return (
      <>
        <h2>add a new</h2>
        <form onSubmit={onSubmit}>
          <div>
            name: <input onChange={handleNameChange}/>
          </div>
          <div>
            number <input onChange={handleNewNumber}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
         </form>
      </>
  
    )
}

export default PersonForm