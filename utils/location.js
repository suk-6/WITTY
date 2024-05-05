export class Location {
    building;
    floor;
    name;
    constructor(building, floor, name) {
        this.building = building;
        this.floor = floor;
        this.name = name;
    }
    static from(locationLike) {
        return new Location(locationLike.building, locationLike.floor, locationLike.name);
    }
    equals(other) {
        return this.building === other.building &&
            this.floor === other.floor &&
            this.name === other.name;
    }
}
