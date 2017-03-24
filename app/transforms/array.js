import Ember from 'ember';
import DS from 'ember-data';

const {
  Transform,
} = DS;

const {
  typeOf,
  $,
} = Ember;


export default Transform.extend({
  deserialize: function(serialized) {
    return (typeOf(serialized) == "array") ? serialized : [];
  },

  serialize: function(deserialized) {
    const type = typeOf(deserialized);

    if (type === 'array') {
      return deserialized
    }
    else if (type === 'string') {
      return deserialized.split(',').map(function(item) {
        return $.trim(item);
      });
    }
    else {
      return [];
    }
  }
})
