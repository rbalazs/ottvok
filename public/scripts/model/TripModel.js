define(['knockout-3.4.0'], function (ko) {
    /**
     * Model class for a trip.
     */
    return function TripModel() {
        this.destinationAddresses = ko.observable();
        this.originAddresses = ko.observable();
        this.distance = ko.observable();
        this.status = ko.observable();
        this.durationInTraffic = ko.observable();
        this.durationInTrafficTenMinutesLater = ko.observable();
        this.durationInTrafficTwentyMinutesLater = ko.observable();
        this.durationInTrafficThirtyMinutesLater = ko.observable();
        this.durationInTrafficFourtyFiveMinutesLater = ko.observable();
        this.durationInTrafficSixtyMinutesLater = ko.observable();
        this.durationInTrafficNintyMinutesLater = ko.observable();
        this.durationInTrafficOneHundredTwentyMinutesLater = ko.observable();
    };
});
