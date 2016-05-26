requirejs.config({
    shim: {
        "bootstrap": {"deps": ['jquery']}
    },
    paths: {
        'knockout-3.4.0': 'https://cdnjs.cloudflare.com/ajax/libs/knockout/3.4.0/knockout-min',
        'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min',
        'TripModel': 'scripts/model/TripModel',
        'bootstrap': 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min',
        'utils' : 'scripts/helper/utils'
    }
});

require(['knockout-3.4.0', 'jquery', 'TripModel', 'utils'],
    function (ko, $, TripModel, utils) {

        function doProvision(trip) {
            var baseUrl = 'distancematrix/getJSONWithProxy/';
            var url = baseUrl + trip.originAddresses() + '/' + trip.destinationAddresses() + '/';
            var timestampNow = Math.floor(Date.now() / 1000);

            // Fetch google api datas from a backend proxy, to avoid cross-origin.
            $.getJSON(url + timestampNow, function (data) {
                trip.destinationAddresses(data.destination_addresses);
                trip.originAddresses(data.origin_addresses);
                trip.distance(data.rows[0].elements[0].distance.text);
                trip.status(data.status);
                trip.durationInTraffic(data.rows[0].elements[0].duration_in_traffic.text);
            });

            $.getJSON(url + utils.getTimestampWithAdditionalMinutes(10), function (data) {
                trip.durationInTrafficTenMinutesLater(data.rows[0].elements[0].duration_in_traffic.text);
            });

            $.getJSON(url + utils.getTimestampWithAdditionalMinutes(20), function (data) {
                trip.durationInTrafficTwentyMinutesLater(data.rows[0].elements[0].duration_in_traffic.text);
            });

            $.getJSON(url + utils.getTimestampWithAdditionalMinutes(30), function (data) {
                trip.durationInTrafficThirtyMinutesLater(data.rows[0].elements[0].duration_in_traffic.text);
            });

            $.getJSON(url + utils.getTimestampWithAdditionalMinutes(45), function (data) {
                trip.durationInTrafficFourtyFiveMinutesLater(data.rows[0].elements[0].duration_in_traffic.text);
            });

            $.getJSON(url + utils.getTimestampWithAdditionalMinutes(60), function (data) {
                trip.durationInTrafficSixtyMinutesLater(data.rows[0].elements[0].duration_in_traffic.text);
            });

            $.getJSON(url + utils.getTimestampWithAdditionalMinutes(90), function (data) {
                trip.durationInTrafficNintyMinutesLater(data.rows[0].elements[0].duration_in_traffic.text);
            });

            $.getJSON(url + utils.getTimestampWithAdditionalMinutes(120), function (data) {
                trip.durationInTrafficOneHundredTwentyMinutesLater(data.rows[0].elements[0].duration_in_traffic.text);
            });
        }

        $(document).ready(function () {
            var trip = new TripModel();
            ko.applyBindings(trip);
            $('.do-provision').click(function () {
                doProvision(trip);
            });
        });
    }
);
