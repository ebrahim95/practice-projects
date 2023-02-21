const Notification = ({message}) => {
    if (message === null) return null 
    
    const messageErrOrSucc = message.toLowerCase().includes("failed") 
    || message.toLowerCase().includes("removed")

    const messageColor = messageErrOrSucc ? "error" : "success"
    return (
      <div className={messageColor}>
        {message}
      </div>
    )
  } 

export default Notification