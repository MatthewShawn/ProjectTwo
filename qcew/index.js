var request = require('request')
var dsv = require('d3-dsv')

// qcewRequestToData : This function takes a url, a callback and an optional format argument
// and returns data. By default, it will return json if `format` is not set.

function qcewRequestToData(urlPath, callback, format) {
    var formatters = {
        json: function (body) {
            return dsv.csvParse(body);
        },
        csv: function (body) {
            return body;
        },
        rows: function (body) {
            var csvLines = body.split('\r\n');
            var dataTable = [];
            for (var i = 0; i < csvLines.length; i += 1) {
                dataTable.push(csvLines[i].split(','));
            }
            return dataTable;
        }
    };
    format = format || 'json';
    request(urlPath, function (err, response, body) {
        var data;
        if (!err && response.statusCode == 200) {
            data = formatters[format](body);
            callback(null, data);
        } else {
            callback(err);
        }
    });
}

// qcewGetIndustryData : This function takes a year, quarter, and industry code
// and returns data containing the associated industry data.
function qcewGetIndustryData(year, qtr, industry, callback, format) {
    var urlPath = `http://www.bls.gov/cew/data/api/${year}/${qtr}/industry/${industry}.csv`;
    qcewRequestToData(urlPath, callback, format);
}

module.exports = {
    getIndustryData: qcewGetIndustryData,
};