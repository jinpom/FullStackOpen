const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  const className = notification.type === 'success' ? 'success' : 'error';

  return <div className={className}>{notification.message}</div>;
};
export default Notification;
