const calculate = (startTime, endTime) => {
  const startTimeParts = startTime.split(":").map(parseFloat);
  const endTimeParts = endTime.split(":").map(parseFloat);

  const startMilliseconds =
    startTimeParts[0] * 3600000 +
    startTimeParts[1] * 60000 +
    startTimeParts[2] * 1000;
  const endMilliseconds =
    endTimeParts[0] * 3600000 +
    endTimeParts[1] * 60000 +
    endTimeParts[2] * 1000;

  const timeDifferenceMilliseconds = endMilliseconds - startMilliseconds;
  const minutes = Math.floor(timeDifferenceMilliseconds / 60000);
  const seconds = Math.floor((timeDifferenceMilliseconds % 60000) / 1000);

  if (minutes < 1) {
    return `${seconds}s`;
  } else {
    return `${minutes}m ${seconds}s`;
  }
};

export default calculate;
