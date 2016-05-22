define('utils', function () {
    return {
        /**
         * Visszad egy timestamp-et, a kapott mennyisegu percel eltolva.
         *
         * @param minutes
         *
         * @return {Date}
         */
        getTimestampWithAdditionalMinutes: function (minutes) {
            var timestampTenMinutesLater = new Date();
            timestampTenMinutesLater.setMinutes(timestampTenMinutesLater.getMinutes() + minutes);
            timestampTenMinutesLater = Math.floor(timestampTenMinutesLater / 1000);
            return timestampTenMinutesLater;
        }
    };
});
