const Filter = ({handleSearch}) => {
    // eslint-disable-next-line no-multi-str
    const input = 'block w-full rounded-md border-0 py-2 px-3.5 text-md leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 \
    placeholder:text-gray-400 focus:ring-2 focus:ring-inset mb-2'
    return (
      <div className="p-2">
       <input placeholder="search" className={input} onChange={handleSearch} />
      </div> 
    )
  }

export default Filter