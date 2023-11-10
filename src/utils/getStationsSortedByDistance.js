export default function getStationsSortedByDistance(stations, currentPosition) {
  return stations
    .map((stn) => {
      const vectorX = stn.CoordinatesX - currentPosition.coords.latitude;
      const vectorY = stn.CoordinatesY - currentPosition.coords.longitude;

      const distance = Math.sqrt(Math.pow(vectorX, 2) + Math.pow(vectorY, 2));
      return { ...stn, distance };
    })
    .sort((a, b) => {
      return a.distance - b.distance;
    });
}
