var qcew = require('../index.js'); // Note: Change this to `require('qcew')` when using the module in your own script.

qcew.getIndustryData('2018', 'a', '332312', function (err, autoManufacturing) {
    if (!err) {

        console.log(`Annual Average in Colorado for Metal Manufacturing: $${autoManufacturing[122].avg_annual_pay}`);
    } else {
        console.log(err);
    }
}, 'json');