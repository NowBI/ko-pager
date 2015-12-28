"use strict"

var BasicSampleViewModel = function () {
    var self = this;
    self.sampleData = ko.observableArray([
  {
    "index": 1,
    "firstName": "Leticia",
    "lastName": "Zamora",
    "age": 44,
    "gender": "female",
    "company": "RODEOLOGY"
  },
  {
    "index": 2,
    "firstName": "Nicholson",
    "lastName": "Lowery",
    "age": 69,
    "gender": "male",
    "company": "GINK"
  },
  {
    "index": 3,
    "firstName": "Talley",
    "lastName": "Norton",
    "age": 31,
    "gender": "male",
    "company": "NIQUENT"
  },
  {
    "index": 4,
    "firstName": "Morton",
    "lastName": "Long",
    "age": 77,
    "gender": "male",
    "company": "DRAGBOT"
  },
  {
    "index": 5,
    "firstName": "Myra",
    "lastName": "Byrd",
    "age": 67,
    "gender": "female",
    "company": "CYTREX"
  },
  {
    "index": 6,
    "firstName": "Nixon",
    "lastName": "Alston",
    "age": 77,
    "gender": "male",
    "company": "BISBA"
  },
  {
    "index": 7,
    "firstName": "Hattie",
    "lastName": "Gaines",
    "age": 53,
    "gender": "female",
    "company": "INSURESYS"
  },
  {
    "index": 8,
    "firstName": "Joann",
    "lastName": "Noble",
    "age": 50,
    "gender": "female",
    "company": "EURON"
  },
  {
    "index": 9,
    "firstName": "Valenzuela",
    "lastName": "Brock",
    "age": 49,
    "gender": "male",
    "company": "TURNLING"
  },
  {
    "index": 10,
    "firstName": "Rachael",
    "lastName": "Justice",
    "age": 54,
    "gender": "female",
    "company": "SCHOOLIO"
  },
  {
    "index": 11,
    "firstName": "Tamera",
    "lastName": "Le",
    "age": 49,
    "gender": "female",
    "company": "MUSANPOLY"
  },
  {
    "index": 12,
    "firstName": "Bonner",
    "lastName": "Stuart",
    "age": 45,
    "gender": "male",
    "company": "PYRAMI"
  },
  {
    "index": 13,
    "firstName": "Rodriquez",
    "lastName": "Freeman",
    "age": 74,
    "gender": "male",
    "company": "ERSUM"
  },
  {
    "index": 14,
    "firstName": "Hawkins",
    "lastName": "Wilcox",
    "age": 28,
    "gender": "male",
    "company": "ZENTRY"
  },
  {
    "index": 15,
    "firstName": "Hamilton",
    "lastName": "Pace",
    "age": 50,
    "gender": "male",
    "company": "MINGA"
  },
  {
    "index": 16,
    "firstName": "Blackwell",
    "lastName": "Petty",
    "age": 51,
    "gender": "male",
    "company": "VALREDA"
  },
  {
    "index": 17,
    "firstName": "Mcdaniel",
    "lastName": "Horne",
    "age": 69,
    "gender": "male",
    "company": "BULLJUICE"
  },
  {
    "index": 18,
    "firstName": "Hubbard",
    "lastName": "Melendez",
    "age": 37,
    "gender": "male",
    "company": "BESTO"
  },
  {
    "index": 19,
    "firstName": "Trina",
    "lastName": "Pollard",
    "age": 27,
    "gender": "female",
    "company": "DIGIPRINT"
  },
  {
    "index": 20,
    "firstName": "Stacy",
    "lastName": "Simpson",
    "age": 39,
    "gender": "female",
    "company": "TETAK"
  },
  {
    "index": 21,
    "firstName": "Kristen",
    "lastName": "Estes",
    "age": 62,
    "gender": "female",
    "company": "XLEEN"
  },
  {
    "index": 22,
    "firstName": "Estela",
    "lastName": "Vega",
    "age": 33,
    "gender": "female",
    "company": "CALLFLEX"
  },
  {
    "index": 23,
    "firstName": "Lindsey",
    "lastName": "Avery",
    "age": 60,
    "gender": "female",
    "company": "ORBIXTAR"
  },
  {
    "index": 24,
    "firstName": "Gamble",
    "lastName": "Kelley",
    "age": 38,
    "gender": "male",
    "company": "POLARIUM"
  },
  {
    "index": 25,
    "firstName": "Jennifer",
    "lastName": "Mercado",
    "age": 68,
    "gender": "female",
    "company": "CINASTER"
  },
  {
    "index": 26,
    "firstName": "Price",
    "lastName": "Kramer",
    "age": 44,
    "gender": "male",
    "company": "TALAE"
  },
  {
    "index": 27,
    "firstName": "Whitaker",
    "lastName": "Tate",
    "age": 24,
    "gender": "male",
    "company": "APEX"
  },
  {
    "index": 28,
    "firstName": "Hines",
    "lastName": "Salinas",
    "age": 41,
    "gender": "male",
    "company": "SCENTY"
  },
  {
    "index": 29,
    "firstName": "Vanessa",
    "lastName": "Marsh",
    "age": 45,
    "gender": "female",
    "company": "GOGOL"
  },
  {
    "index": 30,
    "firstName": "Lori",
    "lastName": "Montgomery",
    "age": 58,
    "gender": "female",
    "company": "CUBICIDE"
  },
  {
    "index": 31,
    "firstName": "Meyers",
    "lastName": "Henson",
    "age": 29,
    "gender": "male",
    "company": "EVIDENDS"
  },
  {
    "index": 32,
    "firstName": "Carr",
    "lastName": "Bailey",
    "age": 39,
    "gender": "male",
    "company": "FISHLAND"
  },
  {
    "index": 33,
    "firstName": "Michael",
    "lastName": "Rosa",
    "age": 57,
    "gender": "male",
    "company": "MEDCOM"
  },
  {
    "index": 34,
    "firstName": "Olsen",
    "lastName": "Frederick",
    "age": 38,
    "gender": "male",
    "company": "ZAGGLES"
  },
  {
    "index": 35,
    "firstName": "Barker",
    "lastName": "Stout",
    "age": 78,
    "gender": "male",
    "company": "KAGGLE"
  },
  {
    "index": 36,
    "firstName": "Helena",
    "lastName": "Rowland",
    "age": 45,
    "gender": "female",
    "company": "PERKLE"
  },
  {
    "index": 37,
    "firstName": "Kathy",
    "lastName": "Calderon",
    "age": 27,
    "gender": "female",
    "company": "CONCILITY"
  },
  {
    "index": 38,
    "firstName": "Jaime",
    "lastName": "Keith",
    "age": 78,
    "gender": "female",
    "company": "HOTCAKES"
  },
  {
    "index": 39,
    "firstName": "Odom",
    "lastName": "Dudley",
    "age": 22,
    "gender": "male",
    "company": "TECHMANIA"
  },
  {
    "index": 40,
    "firstName": "Jewel",
    "lastName": "Neal",
    "age": 42,
    "gender": "female",
    "company": "COMTEXT"
  },
  {
    "index": 41,
    "firstName": "Farrell",
    "lastName": "Norman",
    "age": 47,
    "gender": "male",
    "company": "SATIANCE"
  },
  {
    "index": 42,
    "firstName": "Ingram",
    "lastName": "Kennedy",
    "age": 61,
    "gender": "male",
    "company": "VELOS"
  },
  {
    "index": 43,
    "firstName": "Christian",
    "lastName": "Gibson",
    "age": 37,
    "gender": "female",
    "company": "LUNCHPOD"
  },
  {
    "index": 44,
    "firstName": "Casey",
    "lastName": "Pena",
    "age": 22,
    "gender": "male",
    "company": "PARLEYNET"
  },
  {
    "index": 45,
    "firstName": "Heath",
    "lastName": "Cotton",
    "age": 74,
    "gender": "male",
    "company": "JIMBIES"
  },
  {
    "index": 46,
    "firstName": "Lea",
    "lastName": "Bishop",
    "age": 51,
    "gender": "female",
    "company": "ZILLAN"
  },
  {
    "index": 47,
    "firstName": "Lucas",
    "lastName": "Haley",
    "age": 56,
    "gender": "male",
    "company": "WAAB"
  },
  {
    "index": 48,
    "firstName": "Bertha",
    "lastName": "Wilson",
    "age": 21,
    "gender": "female",
    "company": "PROVIDCO"
  },
  {
    "index": 49,
    "firstName": "Dominique",
    "lastName": "Campos",
    "age": 43,
    "gender": "female",
    "company": "ZAJ"
  },
  {
    "index": 50,
    "firstName": "Lily",
    "lastName": "Mcdonald",
    "age": 62,
    "gender": "female",
    "company": "SIGNIDYNE"
  },
  {
    "index": 51,
    "firstName": "Alisa",
    "lastName": "Shelton",
    "age": 39,
    "gender": "female",
    "company": "ZYPLE"
  },
  {
    "index": 52,
    "firstName": "Thomas",
    "lastName": "Thompson",
    "age": 61,
    "gender": "male",
    "company": "GLUKGLUK"
  },
  {
    "index": 53,
    "firstName": "Dorothea",
    "lastName": "Mason",
    "age": 58,
    "gender": "female",
    "company": "BYTREX"
  },
  {
    "index": 54,
    "firstName": "Francis",
    "lastName": "Pierce",
    "age": 19,
    "gender": "male",
    "company": "SOPRANO"
  },
  {
    "index": 55,
    "firstName": "Camacho",
    "lastName": "Ayala",
    "age": 50,
    "gender": "male",
    "company": "LIQUICOM"
  },
  {
    "index": 56,
    "firstName": "Byrd",
    "lastName": "Lambert",
    "age": 77,
    "gender": "male",
    "company": "OVATION"
  },
  {
    "index": 57,
    "firstName": "Deborah",
    "lastName": "Rojas",
    "age": 26,
    "gender": "female",
    "company": "ULTRASURE"
  },
  {
    "index": 58,
    "firstName": "Carole",
    "lastName": "Sanchez",
    "age": 67,
    "gender": "female",
    "company": "BUZZWORKS"
  },
  {
    "index": 59,
    "firstName": "Montgomery",
    "lastName": "Glenn",
    "age": 20,
    "gender": "male",
    "company": "PERMADYNE"
  },
  {
    "index": 60,
    "firstName": "Logan",
    "lastName": "Vang",
    "age": 60,
    "gender": "male",
    "company": "ROCKLOGIC"
  },
  {
    "index": 61,
    "firstName": "Thompson",
    "lastName": "Walton",
    "age": 48,
    "gender": "male",
    "company": "INTERODEO"
  },
  {
    "index": 62,
    "firstName": "Dean",
    "lastName": "Lane",
    "age": 41,
    "gender": "male",
    "company": "ZOLAVO"
  },
  {
    "index": 63,
    "firstName": "Burke",
    "lastName": "Velazquez",
    "age": 26,
    "gender": "male",
    "company": "CENTREE"
  },
  {
    "index": 64,
    "firstName": "Campbell",
    "lastName": "Green",
    "age": 45,
    "gender": "male",
    "company": "DYNO"
  },
  {
    "index": 65,
    "firstName": "Bethany",
    "lastName": "Gordon",
    "age": 70,
    "gender": "female",
    "company": "VORATAK"
  }
]);
    self.sampleFields = [
    {
        field: "firstName",
        title: "First Name"
    }, {
        field: "lastName",
        title: "Last Name"
    }, {
        field: "gender",
        title: "Sex",
        sortable: false
    }, {
        field: "age",
        title: "Age"
    }, {
        field: "company",
        title: "Company"
    }];
};

ko.applyBindings(new BasicSampleViewModel());