export const formatTime = (time) => {
  const [hours, minutes] = time.split(':');
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  return date.toLocaleTimeString('en-US', options).toString();
};
