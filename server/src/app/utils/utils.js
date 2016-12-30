;(function() {

  'use strict';

  // public
  module.exports = {
    sendJSONresponse,
    parseDate,
  };

  /// definitions

  /**
   * Response formatter
   */
  function sendJSONresponse(res, status, content, url, pagination) {
    var response = {};

    // structure response
    var isError = [400, 401, 403, 404, 500].indexOf(status) > -1;
    var type = content.error || content.status == 500 || isError ? 'error' : 'data';
    if (content.docs) {
      response[type] = content.docs;
    } else {
      response[type] = content;

      if (content.type)
        response[type].type = content.type;

      if (url)
        response.url = url;
    }

    // append links
    response.links = pagination;

    res.status(status).send(response);
  }

  /**
   * Parse date
   * @param  {date} date new Date() formate
   * @return {object}    day, month, year
   */
  function parseDate(date) {
    if (new Date(date) == 'Invalid Date') return 'Invalid Date';

    var day = date.getUTCDate();
    var month = date.getUTCMonth() + 1;
    month = month < 10 ? '0' + month : month;
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var millis = date.getMilliseconds();

    var parsedDate = {
      day,
      month,
      year,
      hours,
      minutes,
      millis,
    };

    return parsedDate;
  }


})();
