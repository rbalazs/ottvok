define(['knockout-3.4.0'], function (ko) {
  /**
   * Model class for a trip.
   */
  return function TripModel() {
    var self = this;
    self.destinationAddresses = ko.observable();
    self.originAddresses = ko.observable();
    self.distance = ko.observable();
    self.status = ko.observable();
    self.provisions = ko.observableArray();
    self.fastestProvision = ko.pureComputed(function () {
      if (self.provisions().length == 0) {
        return {};
      }
      return self.provisions().reduce(function (
        previousValue,
        currentValue,
        currentIndex,
        array
      ) {
        return parseInt(currentValue.durationInTraffic()) <
          parseInt(previousValue.durationInTraffic()) ?
          currentValue :
          previousValue;
      });
    })
  };
});
