import ApplicationSerializer from './application';


export default ApplicationSerializer.extend({
  attrs: ['lat', 'long'],


  serialize(/* response */) {
    const resp = ApplicationSerializer.prototype.serialize.apply(this, arguments);
    return resp.gasStationLocations || resp.gasStationLocation;
  },
});
