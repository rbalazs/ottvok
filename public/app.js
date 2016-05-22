requirejs.config({
    shim : {
        "bootstrap" : { "deps" :['jquery'] }
    },
    paths: {
        'knockout-3.4.0': 'https://cdnjs.cloudflare.com/ajax/libs/knockout/3.4.0/knockout-min',
        'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min',
        'TripModel': 'scripts/model/TripModel',
        'bootstrap' :  'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min'
    }
});

require(['knockout-3.4.0', 'jquery', 'TripModel'],
    function (ko, $, TripModel) {
        $(document).ready(function () {
            var trip = new TripModel();

            ko.applyBindings(trip);

            $.getJSON('distancematrix/getJSONWithProxy', function (data) {
                trip.destinationAddresses(data.destination_addresses);
                trip.originAddresses(data.origin_addresses);
                trip.distance(data.rows[0].elements[0].distance.text);
                trip.duration(data.rows[0].elements[0].duration.text);
                trip.status(data.status);
                trip.durationInTraffic(data.rows[0].elements[0].duration_in_traffic.text);
            });
        });
    });