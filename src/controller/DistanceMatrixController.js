"use strict";

/**
 * Servers Google Distance Matrix API datas.
 *
 * @constructor
 */
var DistanceMatrixProxyController = function () {
    /**
     * Provides the response.
     *
     * @param response
     * @param time
     * @param {APIKeyService} apiKeyService
     * @param {DistanceMatrixProxy} distanceMatrixProxy
     */
    this.execute = function (response, time, apiKeyService, distanceMatrixProxy) {
        apiKeyService.getKey().then(function (key) {
            distanceMatrixProxy.downloadData(key, 'rákosfalva park', 'mészáros utca', time).then(function (data) {
                response.json(JSON.parse(data));
            });
        });
    };
};

module.exports = DistanceMatrixProxyController;
