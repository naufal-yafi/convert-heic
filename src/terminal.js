export class Terminal {
  static help() {
    console.log(
      '\n------------------------------------------------------------',
    );
    console.log('                    AVAILABLE COMMANDS');
    console.log('------------------------------------------------------------');
    console.log('node app <...commands>');

    console.log(
      `${this.color(
        'yellow',
        '-h   help   --help',
      )}                        : show available commands`,
    );

    console.log(
      `${Terminal.color(
        'green',
        'duplicate',
      )} <..ext> <..count>      : duplicate files`,
    );
    console.log('------------------------------------------------------------');
  }

  static color(color, text) {
    if (color === 'red') {
      return `\x1b[31m${text}\x1b[0m`;
    } else if (color === 'green') {
      return `\x1b[32m${text}\x1b[0m`;
    } else if (color === 'yellow') {
      return `\x1b[33m${text}\x1b[0m`;
    } else {
      return text;
    }
  }

  static info(text) {
    console.info(text);
  }

  static log(text) {
    console.log(text);
  }

  static error(message) {
    console.error(`${this.color('red', 'Err')}: ${message}`);
    console.info(
      `Type ${this.color('green', '-h')} or ${this.color(
        'green',
        '--help',
      )} to show available commands\n`,
    );
  }

  static exit() {
    process.exit(0);
  }
}
