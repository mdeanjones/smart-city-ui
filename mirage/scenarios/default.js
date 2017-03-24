export default function(server) {
  server.loadFixtures('ev-station-locations');
  server.loadFixtures('existing-charging-stations');
  server.loadFixtures('gas-station-locations');
  server.loadFixtures('bus-stops');
  server.loadFixtures('schools');
  server.loadFixtures('grid-cells');
  server.loadFixtures('zone-class-cords');
}
