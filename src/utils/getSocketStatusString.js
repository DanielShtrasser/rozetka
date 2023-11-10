export default function getSocketStatusString(status) {
  switch (status) {
    case 0:
      return "обслуживание";
    case 1:
      return "доступна";
    case 2:
      return "занята";
    case 3:
      return "ошибка";
    case 4:
      return "не-в-сети";
  }
}
