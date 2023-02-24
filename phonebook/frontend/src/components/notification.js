const Notification = ({message}) => {
    if (message === null) return null 

    
    const error = "text-red-50 font-md px-2 py-1 m-2 border-2 border-black rounded bg-red-500"
    const success = "text-green-50 font-md px-2 py-1 m-2 border-2 border-black rounded bg-green-500" 
    const messageErrOrSucc = message.toLowerCase().includes("failed") 
    || message.toLowerCase().includes("removed")
    || message.toLowerCase().includes("missing")
    const messageColor = messageErrOrSucc ? error : success
    return (
      <div className={messageColor}>
        {message}
      </div>
    )
  } 

export default Notification