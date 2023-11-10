export default function getSocketStatusIcon(status) {
  switch (status) {
    case 0:
      return require("../../assets/statusorange.png");
    case 1:
      return require("../../assets/statusgreen.png");
    case 2:
      return require("../../assets/statusorange.png");
    case 3:
      return require("../../assets/statusorange.png");
    case 4:
      return require("../../assets/statusorange.png");
  }
}
