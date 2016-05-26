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
     * @param {Object} response
     * @param {Object} params
     * @param {APIKeyService} apiKeyService
     * @param {DistanceMatrixProxy} distanceMatrixProxy
     */
    this.execute = function (response, params, apiKeyService, distanceMatrixProxy) {
        apiKeyService.getKey().then(function (key) {
            distanceMatrixProxy.downloadData(
                key,
                params.originAddresses,
                params.destinationAddresses,
                params.time
            ).then(function (data) {
                response.json(JSON.parse(data));
            });
        });
    };
};

module.exports = DistanceMatrixProxyController;
