import DS from 'ember-data';

const { RESTSerializer } = DS;


export default RESTSerializer.extend({
  // Mirage tries to be clever with camelCasing, so this is reversing it all.
  // Most likely temporary.
  attrs: {
    lng1: 'long1',
    lng2: 'long2',
    ag: 'aG',
    busStops: 'busStp',
    schools: 'school',
    c1a: 'c1A',
    c1ar: 'c1A/r',
    c1b: 'c1B',
    c2a: 'c2A',
    c2ar: 'c2A/r',
    pud: 'pUD',
    gasStations: 'gasStn',
    unzoned: 'uNZONED',
    c2br: 'c2B/r',
    c2b: 'c2B',
    twp: 'tWP',
    pl: 'pL',
    orl: 'oRL',
    m1a: 'm1A',
    r4b: 'r4B',
    r1a: 'r1A',
    re: 'rE',
    r1d: 'r1D',
    r1c: 'r1C',
    r1b: 'r1B',
    r4c: 'r4C',
    r4d: 'r4D',
    r2a: 'r2A',
    r4a: 'r4A',
    r1e: 'r1E',
    r2b: 'r2B',
  }
});
