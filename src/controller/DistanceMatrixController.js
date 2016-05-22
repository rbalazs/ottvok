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
     * @param req
     * @param res
     * @param {APIKeyService} apiKeyService
     * @param {DistanceMatrixProxy} distanceMatrixProxy
     */
    this.execute = function (req, res, apiKeyService, distanceMatrixProxy) {
        apiKeyService.getKey().then(function (key) {
            distanceMatrixProxy.downloadData(key, 'rákosfalva park', 'mészáros utca', 'now').then(function (data) {
                res.json(JSON.parse(data));
            });
        });
    };
};

module.exports = DistanceMatrixProxyController;
