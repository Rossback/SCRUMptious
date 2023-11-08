const { app, BrowserWindow } = require('electron');

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
