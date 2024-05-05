import { Location } from "./location.js";
import { Subject } from "./subject.js";

export type TeacherLike = {
    name: string,
    subjects: Subject[],
    location: Location,
    url: string
};

export class Teacher {
    constructor(
        public name: string,
        public subjects: Subject[],
        public location: Location,
        public url: string 
    ) {}

    public static from(teacher: TeacherLike) {
        return new Teacher(
            teacher.name,
            teacher.subjects,
            teacher.location,
            teacher.url
        )
    }
}
