const PersonForm = ({onSubmit, handleNameChange, handleNewNumber}) => {
  // eslint-disable-next-line no-multi-str
  const input = "block w-full rounded-md border-0 py-2 px-3.5 text-md leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 \
  placeholder:text-gray-400 focus:ring-2 focus:ring-inset mb-2"
  return (
      <div className="p-2">
        <h2 className="text-lg mb-2">Add a new number</h2>
        <form  onSubmit={onSubmit}>
          <div>
            <input className={input} placeholder="name" onChange={handleNameChange}/>
          </div>
          <div>
            <input className={input} placeholder="number" onChange={handleNewNumber}/>
          </div>
          <div>
            <button className="transition duration-500 ease-in-out border-2 border-gray-500 text-md bg-blue-200 rounded-lg mt-1 px-2 hover:bg-red-200" type="submit">Add</button>
          </div>
         </form>
      </div>
  
    )
}

export default PersonForm