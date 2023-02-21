const Filter = ({ setFilter }) => {
    const onChange = (event) => {
        setFilter(event.target.value.toLowerCase().trim())
    }

    return (
        <div >
            find countries <input 
            className="border-2 border-slate-500 rounded p-2 caret-blue-800 focus:bg-blue-100" 
            type="text" 
            onChange={onChange} 
            name="search" /> 
        </div>
        
    )
}

export default Filter