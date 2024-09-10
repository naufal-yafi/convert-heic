export class Time {
  static dateFormat() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const miliseconds = String(now.getMilliseconds()).padStart(2, '0');

    return `${year}${month}${day}-${hours}.${minutes}.${seconds}.${miliseconds}`;
  }

  static stopwatch() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  }

  static calculate(startTime, endTime) {
    const startTimeParts = startTime.split(':').map(parseFloat);
    const endTimeParts = endTime.split(':').map(parseFloat);

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
  }
}
