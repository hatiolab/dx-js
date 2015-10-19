'use strict'

var dataTypes = {
  /* Predefined Data Types */

  "NONE" :       0,    /* Empty Data */
  "PRIMITIVE" :   1,    /* Primitive Data */
  "U8_ARRAY" :   2,    /* U8 Array */
  "S8_ARRAY" :   3,    /* S8 Array */
  "U16_ARRAY" :   4,    /* U16 Array */
  "S16_ARRAY" :   5,    /* S16 Array */
  "U32_ARRAY" :   6,    /* U32 Array */
  "S32_ARRAY" :   7,    /* S32 Array */
  "F32_ARRAY" :   8,    /* F32 Array */
  "STRING" :   9,    /* String */

  "FILEINFO" :   21,   /* File Info Data */
  "FILEINFO_ARRAY" : 22,   /* File Info Array */
  "FILE_PARTIAL_QUERY" : 23,   /* File Partial Query */
  "FILE_PARTIAL" : 24,   /* File Partial */

  "STREAM" :   41,   /* Streaming Data */

  "MOVIE_GET_INFO" : 51,   /* Playback - Movie Get Info */
  "MOVIE_INFO" : 52,   /* Playback - Movie Info */
  "MOVIE_COMMAND_I" : 53,   /* Playback - Command : Start, Resume */
  "MOVIE_COMMAND_II" : 54,   /* Playback - Command : Stop, Pause */
  "MOVIE_FRAME" : 55,   /* Playback - Frame for Stream */
}

function DataType() {
};

for(let type in dataTypes) {
  Object.defineProperty(DataType, type, {
    get: function() {
      return dataTypes[type];
    }
  });
}

module.exports = DataType;
