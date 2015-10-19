'use strict'

var types = {
    /* Packet Type for Broadcast */

    "DISCOVERY"        : 0,    /* Discovery */

    /* Packet Type for P2P */

    "HB"               : 0,    /* Heart Beat */
    "GET_SETTING"      : 1,    /* Get Setting */
    "SET_SETTING"      : 2,    /* Set Setting */
    "GET_STATE"        : 3,    /* Get State */
    "SET_STATE"        : 4,    /* Set State */
    "EVENT"            : 5,    /* Event */
    "COMMAND"          : 6,    /* Command */
    "FILE"             : 7,    /* File Related */
    "STREAM"           : 8,    /* Streaming Data */
    "MOVIE"            : 9,    /* Movie Playback */
};

function Type() {
};

for(let type in types) {
  Object.defineProperty(Type, type, {
    get: function() {
      return types[type];
    }
  });
}

module.exports = Type;


