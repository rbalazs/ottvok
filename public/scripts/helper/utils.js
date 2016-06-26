define('utils', function () {
    return {
        /**
         * Return a timestamp edited by given minutes.
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
