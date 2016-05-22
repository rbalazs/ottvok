requirejs.config({
    shim: {
        "bootstrap": {"deps": ['jquery']}
    },
    paths: {
        'knockout-3.4.0': 'https://cdnjs.cloudflare.com/ajax/libs/knockout/3.4.0/knockout-min',
        'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min',
        'TripModel': 'scripts/model/TripModel',
        'bootstrap': 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min'
    }
});

require(['knockout-3.4.0', 'jquery', 'TripModel'],
    function (ko, $, TripModel) {
        $(document).ready(function () {
            /**
             * Visszad egy timestamp-et, a kapott mennyisegu percel eltolva.
             * @param minutes
             * @return {Date}
             */
            var getTimestampWithAdditionalMinutes = function (minutes) {
                var timestampTenMinutesLater = new Date();
                timestampTenMinutesLater.setMinutes(timestampTenMinutesLater.getMinutes() + minutes);
                timestampTenMinutesLater = Math.floor(timestampTenMinutesLater / 1000);
                return timestampTenMinutesLater;
            };
            var timestampTenMinutesLater = getTimestampWithAdditionalMinutes(10);
            var timestampTwentyMinutesLater = getTimestampWithAdditionalMinutes(20);
            var timestampThirtyMinutesLater = getTimestampWithAdditionalMinutes(30);
            var timestampFourtyFiveMinutesLater = getTimestampWithAdditionalMinutes(45);
            var timestampSixtyMinutesLater = getTimestampWithAdditionalMinutes(60);
            var timestampNintyMinutesLater = getTimestampWithAdditionalMinutes(90);
            var timestampNow = Math.floor(Date.now() / 1000);

            var trip = new TripModel();

            ko.applyBindings(trip);

            // Fetch google api datas from a backend proxy, to avoid cross-origin.
            $.getJSON('distancematrix/getJSONWithProxy/' + timestampNow, function (data) {
                trip.destinationAddresses(data.destination_addresses);
                trip.originAddresses(data.origin_addresses);
                trip.distance(data.rows[0].elements[0].distance.text);
                trip.status(data.status);
                trip.durationInTraffic(data.rows[0].elements[0].duration_in_traffic.text);
            });

            $.getJSON('distancematrix/getJSONWithProxy/' + timestampTenMinutesLater, function (data) {
                trip.durationInTrafficTenMinutesLater(data.rows[0].elements[0].duration_in_traffic.text);
            });

            $.getJSON('distancematrix/getJSONWithProxy/' + timestampTwentyMinutesLater, function (data) {
                trip.durationInTrafficTwentyMinutesLater(data.rows[0].elements[0].duration_in_traffic.text);
            });

            $.getJSON('distancematrix/getJSONWithProxy/' + timestampThirtyMinutesLater, function (data) {
                trip.durationInTrafficThirtyMinutesLater(data.rows[0].elements[0].duration_in_traffic.text);
            });

            $.getJSON('distancematrix/getJSONWithProxy/' + timestampFourtyFiveMinutesLater, function (data) {
                trip.durationInTrafficFourtyFiveMinutesLater(data.rows[0].elements[0].duration_in_traffic.text);
            });

            $.getJSON('distancematrix/getJSONWithProxy/' + timestampSixtyMinutesLater, function (data) {
                trip.durationInTrafficSixtyMinutesLater(data.rows[0].elements[0].duration_in_traffic.text);
            });

            $.getJSON('distancematrix/getJSONWithProxy/' + timestampNintyMinutesLater, function (data) {
                trip.durationInTrafficNintyMinutesLater(data.rows[0].elements[0].duration_in_traffic.text);
            });
        });
    }
);
