const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  const LowerCaseMessage = message.toLowerCase();
  const classChoice = LowerCaseMessage.includes("successfully")
    ? "green"
    : "red";
  return <div className={classChoice}>{message}</div>;
};

export default Notification;
