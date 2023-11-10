export default function getSocketStatusColor(status) {
  switch (status) {
    case 0:
      return "#FF0000";
    case 1:
      return "#89BD21";
    case 2:
      return "#FFD600";
    case 3:
      return "#FF0000";
    case 4:
      return "#f7ca43";
    default:
      throw new Error("");
  }
}
