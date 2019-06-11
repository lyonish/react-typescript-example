class Common {
  static log(message) {
    const log = "[[" + Date().substring(0, 24) + "]] " + message;
    console.log(log);
  }
  static getDatetime(date) {
    const datestr = date.toISOString();
    const datetime = datestr.replace("T", " ").substring(0, datestr.length - 5);
    return datetime;
  }
}

module.exports = Common;
