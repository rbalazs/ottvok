requirejs.config({
    shim: {
        "bootstrap": {"deps": ['jquery']}
    },
    paths: {
        'async': 'https://cdnjs.cloudflare.com/ajax/libs/requirejs-async/0.1.1/async',
        'knockout-3.4.0': 'https://cdnjs.cloudflare.com/ajax/libs/knockout/3.4.0/knockout-min',
        'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min',
        'moment': 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.13.0/moment.min',
        'TripModel': 'scripts/model/TripModel',
        'ProvisionModel': 'scripts/model/ProvisionModel',
        'bootstrap': 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min',
        'utils': 'scripts/helper/utils'
    }
});

require(['knockout-3.4.0', 'jquery', 'TripModel', 'ProvisionModel', 'utils', 'moment', 'async!https://maps.googleapis.com/maps/api/js?key=AIzaSyC_ZRibN_wYmc-bhLP7L8saRMoitVuUVFU&libraries=places'],
    function (ko, $, TripModel, ProvisionModel, utils, moment) {
        function doProvision(trip, minutesFromNowArg) {
            var minutesFromNow = minutesFromNowArg || 0;
            var baseUrl = 'distancematrix/getJSONWithProxy/';
            var url = baseUrl + trip.originAddresses() + '/' + trip.destinationAddresses() + '/';
            var timestamp = utils.getTimestampWithAdditionalMinutes(minutesFromNow);
            var provision = new ProvisionModel();

            // Fetch google api datas from a backend proxy, to avoid cross-origin.
            $.getJSON(url + timestamp, function (data) {
                trip.originAddresses(data.origin_addresses);
                trip.distance(data.rows[0].elements[0].distance.text);
                trip.status(data.status);
                provision.durationInTraffic(data.rows[0].elements[0].duration_in_traffic.text);
                provision.timestampVerbose(moment.unix(timestamp).fromNow() + " (" + moment.unix(timestamp).format('H:mm') + ")");
                provision.timestamp(timestamp);
            });

            trip.provisions.push(provision);
        }

        $(document).ready(function () {
            var trip = new TripModel();
            var optionsAS = {
                types: ['address'],
                componentRestrictions: {
                    country: 'hu'
                }
            };

            var minutesAddedList = [5, 15, 30, 45, 60, 90, 120, 150, 180];

            var originAddressesAS = new google.maps.places.Autocomplete(
                document.getElementById('originAddresses'),
                optionsAS
            );

            var destinationAddressesAS = new google.maps.places.Autocomplete(
                document.getElementById('destinationAddresses'),
                optionsAS
            );

            google.maps.event.addListener(originAddressesAS, 'place_changed', function () {
                trip.originAddresses(originAddressesAS.getPlace().formatted_address);
            });

            google.maps.event.addListener(destinationAddressesAS, 'place_changed', function () {
                trip.destinationAddresses(destinationAddressesAS.getPlace().formatted_address);
            });

            ko.applyBindings(trip);

            $('.do-provision').click(function () {
                if (typeof trip.originAddresses() === 'undefined') {
                    trip.originAddresses('rákosfalva park');
                }
                if (typeof trip.destinationAddresses() === 'undefined') {
                    trip.destinationAddresses('mészáros utca');
                }
                for (minutesAddedIndex in minutesAddedList) {
                    if (minutesAddedList.hasOwnProperty(minutesAddedIndex)) {
                      doProvision(trip, minutesAddedList[minutesAddedIndex]);
                    }
                }
            });
        });
    }
);
