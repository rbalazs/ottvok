requirejs.config({
    paths: {
        'knockout-3.4.0': 'https://cdnjs.cloudflare.com/ajax/libs/knockout/3.4.0/knockout-min',
        'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min',
        'tripModel': 'scripts/model/tripModel'
    }
});

require(['knockout-3.4.0', 'jquery', 'tripModel'], function (ko, $, tripModel) {
    $(document).ready(function () {
        var trip = new tripModel();

        ko.applyBindings(trip);

        $.getJSON('distancematrix/getJSONWithProxy', function (data) {
            trip.destinationAddresses(data.destination_addresses);
            trip.originAddresses(data.origin_addresses);
            trip.distance(data.rows[0].elements[0].distance.text);
            trip.duration(data.rows[0].elements[0].duration.text);
            trip.status(data.status);
        });
    });
});