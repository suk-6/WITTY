export class Teacher {
    name;
    subjects;
    location;
    url;
    constructor(name, subjects, location, url) {
        this.name = name;
        this.subjects = subjects;
        this.location = location;
        this.url = url;
    }
    static from(teacher) {
        return new Teacher(teacher.name, teacher.subjects, teacher.location, teacher.url);
    }
}
