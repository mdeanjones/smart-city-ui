import DS from 'ember-data';

const { RESTSerializer } = DS;


export default RESTSerializer.extend({
  attrs: {
    agricultureOpenSpace: 'aG',

    businessLocal: 'c1',
    businessCampus: 'c1A',
    businessCampusResidential: 'c1A/r',
    businessCentral: 'c2A',
    businessService: 'c2B',
    businessServiceResidential: 'c2B/r',

    busStops: 'busStp',

    commercialResidential: 'c2A/r',
    commercialFringe: 'c3',

    communityConvenienceCenter: 'c1B',

    downtownCore: 'd1',
    downtownInterface: 'd2',

    gasStations: 'gasStn',

    industrialHeavy: 'm2',
    industrialLimited: 'm1',
    industrialLimitedLight: 'm1A',

    lng1: 'long1',
    lng2: 'long2',

    motelHotel: 'r5',

    r1e: 'r1E',

    residentialDualA: 'r2A',
    residentialDualB: 'r2B',
    residentialMobileHomePark: 'r6',
    residentialMultiA: 'r4A',
    residentialMultiB: 'r4B',
    residentialMultiC: 'r4C',
    residentialMultiD: 'r4D',
    residentialSingleA: 'r1A',
    residentialSingleB: 'r1B',
    residentialSingleC: 'r1C',
    residentialSingleD: 'r1D',
    residentialTownhouse: 'r3',

    office: 'o',
    officeResearchLimitedIndustrial: 'oRL',

    parking: 'p',
    publicLand: 'pL',
    plannedUnitDevelopment: 'pUD',

    research: 'rE',

    schools: 'school',

    twp: 'tWP',

    unzoned: 'uNZONED',
  }
});
