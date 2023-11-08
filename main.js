const { app, BrowserWindow } = require('electron');

//Mark
//ALL Constructors
class Recipe {
  constructor() {
    this.instructions = [];
    this.image = 'path';
    this.ingredients = [];
    this.description = '';
    this.nutrition_facts = [];
    this.cuisine = '';
    this.favorite = false;
    this.restrictions = [];
    this.difficulty = 0;
    this.review = '';
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
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})
