'use strict'

var codes = {

    /* Discovery */

    "DISCOVERY_REQUEST" : 0,
    "DISCOVERY_RESPONSE" : 1,

    /* Persistent Settings */

    /* Volatile Status - 상태 */

    /* Event Types */

    "EVT_CONNECT" : 0,  /* 옴니드라이브가 연결되었을 때 발생 */
    "EVT_DISCONNECT" : 1,  /* 옴니드라이브 연결이 끊겼을 때 발생 */
    "EVT_ERROR" : 2,  /* 오류 발생 이벤트 */
    "EVT_ALARM" : 3,  /* 경고 발생 이벤트 */

    /* Alarm Code */

    /* Error Code */

    /* Commands */

    "CMD_START_SENDING" : 1,
    "CMD_STOP_SENDING" : 2,

    /* File */

    "FILE_GET_LIST" : 0,	/* 파일리스트 요청 */
    "FILE_LIST" : 1,	/* 파일리스트 정보 */
    "FILE_GET" : 2,	/* 부분 파일 내용 요청 */
    "FILE" : 3,	/* 부분 파일 내용 */
    "FILE_DELETE" : 4,	/* 파일 삭제 요청 */

    /* Stream */
    "STREAM" : 0,	/* Stream 데이타 */
    "STREAM_PLAYBACK" : 1,	/* Stream 데이타 */

    "MOVIE_GET_INFO" : 0,
    "MOVIE_INFO" : 1,
    "MOVIE_COMMAND_START" : 2,
    "MOVIE_COMMAND_STOP" : 3,
    "MOVIE_COMMAND_RESUME" : 4,
    "MOVIE_COMMAND_PAUSE" : 5,
    "MOVIE_FRAME" : 6,
};

function Code() {
};

for(let code in codes) {
  Object.defineProperty(Code, code, {
    get: function() {
      return codes[code];
    }
  });
}

module.exports = Code;

