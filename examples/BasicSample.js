"use strict"

var BasicSampleViewModel = function () {
    var self = this;
    self.sampleData = ko.observableArray([
      {
          "id": 1,
          "firstName": "Leticia",
          "lastName": "Zamora",
          "age": 44,
          "gender": "female",
          "company": "RODEOLOGY"
      },
      {
          "id": 2,
          "firstName": "Nicholson",
          "lastName": "Lowery",
          "age": 69,
          "gender": "male",
          "company": "GINK"
      },
      {
          "id": 3,
          "firstName": "Talley",
          "lastName": "Norton",
          "age": 31,
          "gender": "male",
          "company": "NIQUENT"
      },
      {
          "id": 4,
          "firstName": "Morton",
          "lastName": "Long",
          "age": 77,
          "gender": "male",
          "company": "DRAGBOT"
      },
      {
          "id": 5,
          "firstName": "Myra",
          "lastName": "Byrd",
          "age": 67,
          "gender": "female",
          "company": "CYTREX"
      },
      {
          "id": 6,
          "firstName": "Nixon",
          "lastName": "Alston",
          "age": 77,
          "gender": "male",
          "company": "BISBA"
      },
      {
          "id": 7,
          "firstName": "Hattie",
          "lastName": "Gaines",
          "age": 53,
          "gender": "female",
          "company": "INSURESYS"
      },
      {
          "id": 8,
          "firstName": "Joann",
          "lastName": "Noble",
          "age": 50,
          "gender": "female",
          "company": "EURON"
      },
      {
          "id": 9,
          "firstName": "Valenzuela",
          "lastName": "Brock",
          "age": 49,
          "gender": "male",
          "company": "TURNLING"
      },
      {
          "id": 10,
          "firstName": "Rachael",
          "lastName": "Justice",
          "age": 54,
          "gender": "female",
          "company": "SCHOOLIO"
      },
      {
          "id": 11,
          "firstName": "Tamera",
          "lastName": "Le",
          "age": 49,
          "gender": "female",
          "company": "MUSANPOLY"
      },
      {
          "id": 12,
          "firstName": "Bonner",
          "lastName": "Stuart",
          "age": 45,
          "gender": "male",
          "company": "PYRAMI"
      },
      {
          "id": 13,
          "firstName": "Rodriquez",
          "lastName": "Freeman",
          "age": 74,
          "gender": "male",
          "company": "ERSUM"
      },
      {
          "id": 14,
          "firstName": "Hawkins",
          "lastName": "Wilcox",
          "age": 28,
          "gender": "male",
          "company": "ZENTRY"
      },
      {
          "id": 15,
          "firstName": "Hamilton",
          "lastName": "Pace",
          "age": 50,
          "gender": "male",
          "company": "MINGA"
      },
      {
          "id": 16,
          "firstName": "Blackwell",
          "lastName": "Petty",
          "age": 51,
          "gender": "male",
          "company": "VALREDA"
      },
      {
          "id": 17,
          "firstName": "Mcdaniel",
          "lastName": "Horne",
          "age": 69,
          "gender": "male",
          "company": "BULLJUICE"
      },
      {
          "id": 18,
          "firstName": "Hubbard",
          "lastName": "Melendez",
          "age": 37,
          "gender": "male",
          "company": "BESTO"
      },
      {
          "id": 19,
          "firstName": "Trina",
          "lastName": "Pollard",
          "age": 27,
          "gender": "female",
          "company": "DIGIPRINT"
      },
      {
          "id": 20,
          "firstName": "Stacy",
          "lastName": "Simpson",
          "age": 39,
          "gender": "female",
          "company": "TETAK"
      },
      {
          "id": 21,
          "firstName": "Kristen",
          "lastName": "Estes",
          "age": 62,
          "gender": "female",
          "company": "XLEEN"
      },
      {
          "id": 22,
          "firstName": "Estela",
          "lastName": "Vega",
          "age": 33,
          "gender": "female",
          "company": "CALLFLEX"
      },
      {
          "id": 23,
          "firstName": "Lindsey",
          "lastName": "Avery",
          "age": 60,
          "gender": "female",
          "company": "ORBIXTAR"
      },
      {
          "id": 24,
          "firstName": "Gamble",
          "lastName": "Kelley",
          "age": 38,
          "gender": "male",
          "company": "POLARIUM"
      },
      {
          "id": 25,
          "firstName": "Jennifer",
          "lastName": "Mercado",
          "age": 68,
          "gender": "female",
          "company": "CINASTER"
      },
      {
          "id": 26,
          "firstName": "Price",
          "lastName": "Kramer",
          "age": 44,
          "gender": "male",
          "company": "TALAE"
      },
      {
          "id": 27,
          "firstName": "Whitaker",
          "lastName": "Tate",
          "age": 24,
          "gender": "male",
          "company": "APEX"
      },
      {
          "id": 28,
          "firstName": "Hines",
          "lastName": "Salinas",
          "age": 41,
          "gender": "male",
          "company": "SCENTY"
      },
      {
          "id": 29,
          "firstName": "Vanessa",
          "lastName": "Marsh",
          "age": 45,
          "gender": "female",
          "company": "GOGOL"
      },
      {
          "id": 30,
          "firstName": "Lori",
          "lastName": "Montgomery",
          "age": 58,
          "gender": "female",
          "company": "CUBICIDE"
      },
      {
          "id": 31,
          "firstName": "Meyers",
          "lastName": "Henson",
          "age": 29,
          "gender": "male",
          "company": "EVIDENDS"
      },
      {
          "id": 32,
          "firstName": "Carr",
          "lastName": "Bailey",
          "age": 39,
          "gender": "male",
          "company": "FISHLAND"
      },
      {
          "id": 33,
          "firstName": "Michael",
          "lastName": "Rosa",
          "age": 57,
          "gender": "male",
          "company": "MEDCOM"
      },
      {
          "id": 34,
          "firstName": "Olsen",
          "lastName": "Frederick",
          "age": 38,
          "gender": "male",
          "company": "ZAGGLES"
      },
      {
          "id": 35,
          "firstName": "Barker",
          "lastName": "Stout",
          "age": 78,
          "gender": "male",
          "company": "KAGGLE"
      },
      {
          "id": 36,
          "firstName": "Helena",
          "lastName": "Rowland",
          "age": 45,
          "gender": "female",
          "company": "PERKLE"
      },
      {
          "id": 37,
          "firstName": "Kathy",
          "lastName": "Calderon",
          "age": 27,
          "gender": "female",
          "company": "CONCILITY"
      },
      {
          "id": 38,
          "firstName": "Jaime",
          "lastName": "Keith",
          "age": 78,
          "gender": "female",
          "company": "HOTCAKES"
      },
      {
          "id": 39,
          "firstName": "Odom",
          "lastName": "Dudley",
          "age": 22,
          "gender": "male",
          "company": "TECHMANIA"
      },
      {
          "id": 40,
          "firstName": "Jewel",
          "lastName": "Neal",
          "age": 42,
          "gender": "female",
          "company": "COMTEXT"
      },
      {
          "id": 41,
          "firstName": "Farrell",
          "lastName": "Norman",
          "age": 47,
          "gender": "male",
          "company": "SATIANCE"
      },
      {
          "id": 42,
          "firstName": "Ingram",
          "lastName": "Kennedy",
          "age": 61,
          "gender": "male",
          "company": "VELOS"
      },
      {
          "id": 43,
          "firstName": "Christian",
          "lastName": "Gibson",
          "age": 37,
          "gender": "female",
          "company": "LUNCHPOD"
      },
      {
          "id": 44,
          "firstName": "Casey",
          "lastName": "Pena",
          "age": 22,
          "gender": "male",
          "company": "PARLEYNET"
      },
      {
          "id": 45,
          "firstName": "Heath",
          "lastName": "Cotton",
          "age": 74,
          "gender": "male",
          "company": "JIMBIES"
      },
      {
          "id": 46,
          "firstName": "Lea",
          "lastName": "Bishop",
          "age": 51,
          "gender": "female",
          "company": "ZILLAN"
      },
      {
          "id": 47,
          "firstName": "Lucas",
          "lastName": "Haley",
          "age": 56,
          "gender": "male",
          "company": "WAAB"
      },
      {
          "id": 48,
          "firstName": "Bertha",
          "lastName": "Wilson",
          "age": 21,
          "gender": "female",
          "company": "PROVIDCO"
      },
      {
          "id": 49,
          "firstName": "Dominique",
          "lastName": "Campos",
          "age": 43,
          "gender": "female",
          "company": "ZAJ"
      },
      {
          "id": 50,
          "firstName": "Lily",
          "lastName": "Mcdonald",
          "age": 62,
          "gender": "female",
          "company": "SIGNIDYNE"
      },
      {
          "id": 51,
          "firstName": "Alisa",
          "lastName": "Shelton",
          "age": 39,
          "gender": "female",
          "company": "ZYPLE"
      },
      {
          "id": 52,
          "firstName": "Thomas",
          "lastName": "Thompson",
          "age": 61,
          "gender": "male",
          "company": "GLUKGLUK"
      },
      {
          "id": 53,
          "firstName": "Dorothea",
          "lastName": "Mason",
          "age": 58,
          "gender": "female",
          "company": "BYTREX"
      },
      {
          "id": 54,
          "firstName": "Francis",
          "lastName": "Pierce",
          "age": 19,
          "gender": "male",
          "company": "SOPRANO"
      },
      {
          "id": 55,
          "firstName": "Camacho",
          "lastName": "Ayala",
          "age": 50,
          "gender": "male",
          "company": "LIQUICOM"
      },
      {
          "id": 56,
          "firstName": "Byrd",
          "lastName": "Lambert",
          "age": 77,
          "gender": "male",
          "company": "OVATION"
      },
      {
          "id": 57,
          "firstName": "Deborah",
          "lastName": "Rojas",
          "age": 26,
          "gender": "female",
          "company": "ULTRASURE"
      },
      {
          "id": 58,
          "firstName": "Carole",
          "lastName": "Sanchez",
          "age": 67,
          "gender": "female",
          "company": "BUZZWORKS"
      },
      {
          "id": 59,
          "firstName": "Montgomery",
          "lastName": "Glenn",
          "age": 20,
          "gender": "male",
          "company": "PERMADYNE"
      },
      {
          "id": 60,
          "firstName": "Logan",
          "lastName": "Vang",
          "age": 60,
          "gender": "male",
          "company": "ROCKLOGIC"
      },
      {
          "id": 61,
          "firstName": "Thompson",
          "lastName": "Walton",
          "age": 48,
          "gender": "male",
          "company": "INTERODEO"
      },
      {
          "id": 62,
          "firstName": "Dean",
          "lastName": "Lane",
          "age": 41,
          "gender": "male",
          "company": "ZOLAVO"
      },
      {
          "id": 63,
          "firstName": "Burke",
          "lastName": "Velazquez",
          "age": 26,
          "gender": "male",
          "company": "CENTREE"
      },
      {
          "id": 64,
          "firstName": "Campbell",
          "lastName": "Green",
          "age": 45,
          "gender": "male",
          "company": "DYNO"
      },
      {
          "id": 65,
          "firstName": "Bethany",
          "lastName": "Gordon",
          "age": 70,
          "gender": "female",
          "company": "VORATAK"
      }
    ]);
    self.sampleData.extend({ pagination: {} });
};

ko.applyBindings(new BasicSampleViewModel());