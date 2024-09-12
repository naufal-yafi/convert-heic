export class Utils {
  static convertToMB(bytes) {
    const calculate = bytes / (1024 * 1024);
    return `${calculate.toFixed(2)} MB`;
  }

  static percentageCompression(beforeBytes, afterBytes) {
    const calculate = ((beforeBytes - afterBytes) / beforeBytes) * 100;
    return `${calculate.toFixed(2)}%`;
  }
}
