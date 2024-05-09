import Express from 'express';
import { readFileSync } from 'fs';
import { Teacher, TeacherLike } from './utils/teacher.js';
import { Subject } from './utils/subject.js';
import { randomBytes } from 'crypto';
import { off } from 'process';

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
        acc.push({locationName: cur.location.name, teacherInformation: [cur]});
    } else {
        acc[categoryIndex].teacherInformation.push(cur);
    }
    return acc;
}, []);
locationNameCategoryJsonData.sort((a : any, b : any) => (a.locationName < b.locationName)? -1 : 1 );

const port = 5000;
app.listen(port, () => {
    console.log(`localhost:${port}에 서버 열림`)
});

app.get('/', (req, res) => {
    res.render("main.ejs", {teacherJsonEjs : teacherJsonData, locationNameCategoryJsonData : locationNameCategoryJsonData ,Subject})
})

const emoji = ["🥵", "🥲", "😫", "🐶", "😎", "🫠", "😶‍🌫️", "🤪", "🤬", "🥹", "🥺", "👺", "🤓", "🎻", "😿"];
function RandomEmoji() {
    return emoji[Math.floor(Math.random() * emoji.length)];
}

function searchResultJsonGen(query: any){
    const searchResult = locationNameCategoryJsonData.filter((office: any) => office.teacherInformation.some((teacher: any) => teacher.name.includes(query)))
                .map((office: any) => {
                    return {
                        locationName: office.locationName,
                        teacherInformation: office.teacherInformation.filter((teacher: any) => teacher.name.includes(query))
                    }
                })
    return searchResult
}

function filteResultJsonGen(query: any){
    let filterResult;
    if (typeof(query) === "object") {filterResult = locationNameCategoryJsonData.filter((office: any) => query.some((queryOffice: any) => office.locationName.includes(queryOffice)))
                .map((office: any) => {
                    return {
                        locationName: office.locationName,
                        teacherInformation: office.teacherInformation
                    }
                })
            }else{
                filterResult = locationNameCategoryJsonData.filter((office: any) => office.locationName.includes(query))
                .map((office: any) => {
                    return {
                        locationName: office.locationName,
                        teacherInformation: office.teacherInformation
                    }
                })
            }
    return filterResult;
}


app.get("/search", (req, res) => {
    const newRandomEmoji = RandomEmoji();
    if((req.query.search) || (req.query.filter)){
        if(req.query.search){
            const searchResultJsonData = searchResultJsonGen(req.query.search);
            res.render("search-result.ejs", {locationNameCategoryJsonData : searchResultJsonData, randomEmoji : newRandomEmoji, originLocationNameCategoryJsonData : locationNameCategoryJsonData, Subject})
        }
        if(req.query.filter){
            const filterResultJsonData = filteResultJsonGen(req.query.filter);
            res.render("search-result.ejs", {locationNameCategoryJsonData : filterResultJsonData, randomEmoji : newRandomEmoji, originLocationNameCategoryJsonData : locationNameCategoryJsonData, Subject})
        }
    }else{
        res.render("main.ejs", {teacherJsonEjs : teacherJsonData, locationNameCategoryJsonData : locationNameCategoryJsonData, Subject});
    }

    // if(req.query.search){
    //     const teacherNameQuery = req.query.search;
        
    //     if(!teacherNameQuery.length){
    //         res.render("main.ejs", {teacherJsonEjs : teacherJsonData, locationNameCategoryJsonData : locationNameCategoryJsonData, Subject});
    //     }else{
    //         const searchResultJsonData = searchResultJsonGen(teacherNameQuery);
    //         res.render("search-result.ejs", {locationNameCategoryJsonData : searchResultJsonData, randomEmoji : newRandomEmoji, originLocationNameCategoryJsonData : locationNameCategoryJsonData, Subject})
    //     }
    // }
    // if(req.query.filter){
    //     const officeFilterQuery = req.query.filter;
        
    //     if(!officeFilterQuery){
    //         res.render("main.ejs", {teacherJsonEjs : teacherJsonData, locationNameCategoryJsonData : locationNameCategoryJsonData, Subject});
    //     }else{
    //         const filterResultJsonData = filteResultJsonGen(officeFilterQuery);
    //         res.render("search-result.ejs", {locationNameCategoryJsonData : filterResultJsonData, randomEmoji : newRandomEmoji, originLocationNameCategoryJsonData : locationNameCategoryJsonData, Subject})
    //     }
    // }
});

app.use((req, res) => {
    const newRandomEmoji = RandomEmoji()
    res.status(404);
    res.render("not-found.ejs", { randomEmoji : newRandomEmoji })
});
