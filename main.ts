import Express from 'express';
import { readFileSync } from 'fs';
import { Teacher, TeacherLike } from './utils/teacher.js';
import { Subject } from './utils/subject.js';

const app = Express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(Express.static('static'))

const teacherJsonFile = readFileSync('./teachers.json', 'utf-8');
const teacherJsonData = JSON.parse(teacherJsonFile)
teacherJsonData.teachers.sort((a : any, b : any) => (a.name < b.name)? -1 : 1 );
const locationNameCategoryJsonData = teacherJsonData.teachers.reduce((acc : any, cur : any) => {
    const categoryIndex = acc.findIndex((item : any) => item.locationName === cur.location.name);
    if (categoryIndex === -1) {
            acc.push({locationName: cur.location.name, teacherInfomation: [cur]});
    } else {
    acc[categoryIndex].teacherInfomation.push(cur);
    }
        return acc;
}, []);

const port = 5000;
app.listen(port, () => {
    console.log(`localhost:${port}에 서버 열림`)
});

app.get('/', (req, res) => {
    res.render("main.ejs", {teacherJsonEjs : teacherJsonData,locationNameCategoryJsonData : locationNameCategoryJsonData ,Subject})
})

const emoji = ["🥵", "🥲", "😫", "🐶", "😎", "🫠", "😶‍🌫️", "🤪", "🤬", "🥹", "🥺", "👺", "🤓"];
function RandomEmoji() {
    return emoji[Math.floor(Math.random() * emoji.length)];
}

app.get("/search", (req, res) => {
    
    if(req.query.search){
        const TeacherNameQuary = req.query.search;
        const newRandomEmoji = RandomEmoji()
        const searchResultJsonData = teacherJsonData.teachers.filter((teacher : any) => teacher.name.includes(TeacherNameQuary));
            
        if(!TeacherNameQuary){
            res.render("main.ejs", {teacherJsonEjs : teacherJsonData, Subject})
        }else{
            res.render("search-result.ejs", {teacherJsonEjs : searchResultJsonData, randomEmoji : newRandomEmoji, Subject})
        }
    }
});

app.use((req, res) => {
    const newRandomEmoji = RandomEmoji()
    res.status(404);
    res.render("not-found.ejs", { randomEmoji : newRandomEmoji })
});
