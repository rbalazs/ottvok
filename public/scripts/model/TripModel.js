define(['knockout-3.4.0'], function (ko) {
    return function () {
        this.destinationAddresses = ko.observable();
        this.originAddresses = ko.observable();
        this.distance = ko.observable();
        this.duration = ko.observable();
        this.status = ko.observable();
        this.durationInTraffic = ko.observable();
    };
});
