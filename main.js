const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');
const directory = './';

//Mark
//ALL Constructors
class Recipe {
  constructor() {
    this.title = '';
    this.ingredients = [];
    this.image = 'path';    
    this.nutrition_facts = [];
    this.cuisine = '';
    this.favorite = false;
    this.restrictions = [];
    this.difficulty = 0;
    this.review = '';
    this.instructions = '';
  }
}

class Ingredient {
  constructor() {
    this.name = '';
    this.restriction = [];
    this.expiration_date = '';
    this.image = '';
  }
}

class Day {
  constructor() {
    this.breakfast = new Recipe();
    this.lunch = new Recipe();
    this.dinner = new Recipe();
    this.date = new Date();
  }
}

class Week {
  constructor() {
    this.sunday = new Day();
    this.monday = new Day();
    this.tuesday = new Day();
    this.wednesday = new Day();
    this.thursday = new Day();
    this.friday = new Day();
    this.saturday = new Day();
  }
}

class Calendar {
  constructor() {
    this.weeks = [];
  }
}

class Account {
  constructor() {
    this.username = '';
    this.picture = '';
    this.restrictions = [];
    this.allergies = [];
  }
}

//MARK
//ALL global variables and functions

const ingredientArray = [];  //store all ingrediants
let currentAccount = null;  //store current account
var currentDay = null;  //store the current day
var recipeArray = []; //store all reciepies

//example to create a new ingrediant will look similar to all constructors
//const ingredient1 = new Ingredient();
//ingredient1.name = 'Flour';
//ingredientArray.push(ingredient1);

getAllFiles();

// reads all files in the current directory and sends the text files to the read_file function
function getAllFiles(){
  // use readdir method to read the files of the direcoty 
  fs.readdir(directory, (err, files) => {
  files.forEach(file => {
    // get the details of the file 
    let fileDetails = fs.lstatSync(path.resolve(directory, file));
    // check if the file is directory 
    if (fileDetails.isDirectory()) {
      console.log('Directory: ' + file);
    } else {
      if (file.endsWith('.txt')) {
        read_file(file);
      }
    }
  });
});
}

// reads a file string and turns it into a recipe struct 
function read_file(file){ 
  try {
    const data = fs.readFileSync(file, 'utf8'); //syncronously read da file
    arr = data.split("\n"); // split the data into each section 
  let recipe = new Recipe();

  recipe.title = arr[0];
  recipe.ingredients = arr[1].split(",");
  recipe.image = arr[2];    
  recipe.nutrition_facts = arr[3].split(",");
  recipe.cuisine = arr[4];
  recipe.favorite = false;
  recipe.restrictions = arr[6].split(",");
  recipe.difficulty = 0;
  recipe.review = arr[8];
  recipe.instructions = arr[9];
  recipeArray.push(recipe);
  } catch (err) {
    console.error(err);
  }
  
}  
function populateRecipies() {
  console.log('hi');
}
function populateIngrediants() {
  console.log('hi');
}
function setCurrentAccount() {
  const userAccount = new Account();
  userAccount.username = 'TestUser';
  userAccount.picture = 'https://cdn.vectorstock.com/i/preview-1x/87/59/gamer-esport-logo-vector-45258759.jpg';
  self.currentAccount = userAccount;
}
function deleteRecipe(index) {
  if (index >= 0 && index < recipeArray.length) {
    recipeArray.splice(index, 1); 
  }
}
function createRecipe() {
  console.log('hi');
}
function editRecipe() {
  console.log('hi');
}
function createIngrediant() {
  console.log('hi');
}
function deleteIngrediant(index) {
  if (index >= 0 && index < ingredientArray.length) {
    ingredientArray.splice(index, 1); 
  }
}
function editIngrediant(index) {
  if (index >= 0 && index < ingredientArray.length) {
    //ingredientArray[index].
  }
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 900,
    height: 600
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})
