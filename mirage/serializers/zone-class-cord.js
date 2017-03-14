import ApplicationSerializer from './application';


export default ApplicationSerializer.extend({
  serialize(response) {
    const resp = ApplicationSerializer.prototype.serialize.apply(this, arguments);
    return resp.zoneClassCords || resp.zoneClassCord;
  },
});