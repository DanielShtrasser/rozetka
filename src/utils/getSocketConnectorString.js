export default function getSocketConnectorString(status) {
  switch (status) {
    case 0:
      return "Socket";
    case 1:
      return "Type1";
    case 2:
      return "Type2";
    case 3:
      return "CCS2";
    case 4:
      return "CHAdeMO";
    case 5:
      return "Тип не указан";
  }
}
