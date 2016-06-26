define(['knockout-3.4.0'], function (ko) {
    /**
     * Model class for a provision.
     */
    return function ProvisionModel() {
        this.durationInTraffic = ko.observable();
        this.timestamp = ko.observable();
        this.timestampVerbose = ko.observable();
    };
});
