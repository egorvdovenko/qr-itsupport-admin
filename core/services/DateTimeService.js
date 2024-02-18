export default class DateTimeService {
  static clearTime (dateTime) {
    return dateTime.startOf('date').format('YYYY-MM-DDTHH:mm:ss')
  }
}
