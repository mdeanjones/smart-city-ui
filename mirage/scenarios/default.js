export default function(server) {
  server.loadFixtures('ev-station-locations');
  server.loadFixtures('existing-charging-stations');
  server.loadFixtures('gas-station-locations');
  server.loadFixtures('grid-attributes');
  server.loadFixtures('zone-class-cords');
}
