define(['knockout-3.4.0'], function (ko) {
    /**
     * Model class for a trip.
     */
    return function TripModel() {
        this.destinationAddresses = ko.observable();
        this.originAddresses = ko.observable();
        this.distance = ko.observable();
        this.status = ko.observable();
        this.provisions = ko.observableArray();
    };
});
