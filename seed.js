var db = require('./server/db');
var User = db.model('user');
var Uni = db.model('university');
var Club = db.model('club');
var Class = db.model('class');

var Promise = require('sequelize').Promise;

var seedUnis = function () {
    var unis = [
        { name: "City College of New York" },
        { name: "Baruch College" },
        { name: "Brooklyn College" },
        { name: "College of Staten Island" },
        { name: "Hunter College" },
        { name: "John Jay College of Criminal Justice" },
        { name: "Lehman College" },
        { name: "Macaulay Honors College" },
        { name: "Medgar Evers College" },
        { name: "New York City College of Technology" },
        { name: "Queens College" },
        { name: "School of Professional Studies" },
        { name: "York College" },
        { name: "Borough of Manhattan Community College" },
        { name: "Bronx Community College" },
        { name: "Guttman Community College" },
        { name: "Hostos Community College" },
        { name: "Kingsborough Community College" },
        { name: "LaGuardia Community College" },
        { name: "Queensborough Community College" }
    ]

    var creatingUnis = unis.map(function (uni) {
        return Uni.create(uni);
    });

    return Promise.all(creatingUnis);
}

var seedClasses = function () {
    var classes = [
        { name: 'ART 10100-3GJ',
        type: 'LEC (17190)',
        firstDate: 'We',
        secondDate: null,
        startTime: '6:15PM',
        endTime: '9:05PM',
        location: 'Comp Goeth CG236',
        universityId: 1 },
        { name: 'CSC 11300-2B',
        type: 'LEC (58940)',
        firstDate: 'Tu',
        secondDate: null,
        startTime: '9:30AM',
        endTime: '10:45AM',
        location: 'Marshak 417N',
        universityId: 1 },
        { name: 'CSC 21700-P2',
        type: 'LEC (34624)',
        firstDate: 'Tu',
        secondDate: 'Th',
        startTime: '2:00PM',
        endTime: '3:15PM',
        location: 'Marshak 1026',
        universityId: 1 },
        { name: 'CSC 22000-M',
        type: 'LEC (34595)',
        firstDate: 'Tu',
        secondDate: 'Th',
        startTime: '11:00AM',
        endTime: '12:15PM',
        location: 'NAC 4/222',
        universityId: 1 },
        { name: 'CSC 22100-R',
        type: 'LEC (34597)',
        firstDate: 'Tu',
        secondDate: 'Th',
        startTime: '3:30PM',
        endTime: '4:45PM',
        location: 'NAC 6/314',
        universityId: 1 }
    ]

    var creatingClasses = classes.map(function (course) {
        return Class.create(course);
    });

    return Promise.all(creatingClasses);
}

var seedClubs = function () {
    var clubs = [
        {
            name: "Hackathon Club",
            desc: "We hack.",
            type: "Engineering",
            universityId: "1"
        },
        {
            name: "ACM",
            desc: "The association for Computing Machinery (ACM) is an internation learned society for computing. It was ounded in 1947 and is the world's largest education computing society.",
            type: "Engineering",
            universityId: "1"
        },
        {
            name: "EDM Club",
            desc: "WUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUB",
            type: "Art",
            universityId: "1"
        },
        {
            name: "The Acronym Club",
            desc: "The Random Acronym Club (RAC_ is a club designed specifically to fit the world's acronym needs. Our top 5 favorite acronyms are CUNY, ABBA, FUBAR, Laser, and YOLO.",
            type: "Entertainment",
            universityId: "1"
        },
        {
            name: "Space Pirates",
            desc: "We like space and we like to pirate. But not hte cool pirates from a couple hundred years ago. No, we just downlaod torrented TV shows about space and then talk about it in excrutiating detail.",
            type: "Entertainment",
            universityId: "1"
        }
    ]

    var creatingClubs = clubs.map(function (club) {
        return Club.create(club);
    });

    return Promise.all(creatingClubs);
}

var seedEvents = function () {
    var clubs = [
        {
            name: "Hackathon Club",
            desc: "We hack.",
            type: "Engineering",
            universityId: "1"
        },
        {
            name: "ACM",
            desc: "The association for Computing Machinery (ACM) is an internation learned society for computing. It was ounded in 1947 and is the world's largest education computing society.",
            type: "Engineering",
            universityId: "1"
        },
        {
            name: "EDM Club",
            desc: "WUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUBWUB",
            type: "Art",
            universityId: "1"
        },
        {
            name: "The Acronym Club",
            desc: "The Random Acronym Club (RAC_ is a club designed specifically to fit the world's acronym needs. Our top 5 favorite acronyms are CUNY, ABBA, FUBAR, Laser, and YOLO.",
            type: "Entertainment",
            universityId: "1"
        },
        {
            name: "Space Pirates",
            desc: "We like space and we like to pirate. But not hte cool pirates from a couple hundred years ago. No, we just downlaod torrented TV shows about space and then talk about it in excrutiating detail.",
            type: "Entertainment",
            universityId: "1"
        }
    ]

    var creatingClubs = clubs.map(function (club) {
        return Club.create(club);
    });

    return Promise.all(creatingClubs);
}

db.sync({force:true})
.then(function () {
    return seedUnis();
})
.then(function() {
    return seedClasses();
})
.then(function () {
    return seedClubs();
})
.then(function () {
    return User.create({
        username: 'Betty',
        email: 'betty@gmail.com',
        password: 'betty',
        isAdmin: true
    })
})
.then(function (user) {
    return user.setClasses([3,4,5]);
})
.then(function () {
    return User.create({
        username: 'Pat',
        email: 'pat@gmail.com',
        password: 'pat',
        isAdmin: true
    })
})
.then(function(user) {
    return user.setClasses([1,2,3]);
})
.then(function () {
    console.log("Seed Successful!");
    process.exit(0);
})
.catch(function (err) {
    console.log(err);
    process.exit(1);
})