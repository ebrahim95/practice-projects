const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  const red = "text-red-50 font-md px-2 py-1 m-2 border-2 border-black rounded bg-red-500"
  const green = "text-green-50 font-md px-2 py-1 m-2 border-2 border-black rounded bg-green-500" 
  const LowerCaseMessage = message.toLowerCase();
  const classChoice = LowerCaseMessage.includes("successfully")
    ? green
    : red;
  return <div className={classChoice}>{message}</div>;
};

export default Notification;
