type LocationLike = {
     building: string,
     floor: number,
     name: string,
}

export class Location {
     constructor(
          public building: string,
          public floor: number,
          public name: string
     ) {}

     public static from(locationLike: LocationLike) {
          return new Location(
               locationLike.building,
               locationLike.floor,
               locationLike.name,
          )
     }

     public equals(other: Location) {
          return this.building === other.building &&
               this.floor === other.floor &&
               this.name === other.name;
     }
}    