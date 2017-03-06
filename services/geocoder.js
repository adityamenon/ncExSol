// the driver methods called in this class define the public interface for geocoder drivers

class Geocoder {
  constructor(driver) {
    this.driver = driver;
  }
}

module.exports = Geocoder;