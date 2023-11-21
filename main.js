const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');

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

// Mark ALL Constructors
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







var pantryList = []; // store all pantry items

class PantryItem {
  constructor(title, nutritionFacts, expirationDate, quantity) {
    this.title = title;
    this.nutritionFacts = nutritionFacts;
    this.expirationDate = expirationDate;
    this.quantity = quantity;
  }
}

function edit_pantry_item(newItem) {
  const index = pantryList.findIndex(item => item.title === newItem.oldTitle); //find the index
  if (index !== -1) {
    finalItem = new PantryItem(newItem.newTitle, newItem.nutritionFacts, newItem.expirationDate, newItem.quantity);
    pantryList[index] = finalItem;  //edit it in the array
    updatePantryFile('pantryItems.txt', pantryList);  //update the textfile
    mainWindow.webContents.send('newPantryData', pantryList); //send new data to html
  } else {
    console.log(`Pantry item '${newItem.title}' not found.`);
  }
}

function delete_pantry_item(name) {
  const index = pantryList.findIndex(item => item.title === name);  //find the index
  if (index !== -1) {
    pantryList.splice(index, 1);  //remove it from array
    updatePantryFile('pantryItems.txt', pantryList);  //update the textfile
    mainWindow.webContents.send('newPantryData', pantryList); //send new data to html
    console.log(`Pantry item '${name}' removed successfully.`);
  } else {
    console.log(`Pantry item '${name}' not found.`);
  }
}

function add_pantry_item(newItem) {
  pantryList.push(newItem);
  updatePantryFile('pantryItems.txt', pantryList);    //update the text file
  mainWindow.webContents.send('newPantryData', pantryList); //send new data to html
  console.log(`Pantry item '${newItem.title}' added successfully.`);
}

function read_Pantry_List(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {  //open the file and read it
    if (err) {
      console.error(err);
      return;
    }

    const lines = data.split('\n');   //create an array
    const pantryItems = [];

    for (let i = 0; i < lines.length; i += 4) {   //for every 4 elements = 1 pantry item
      const title = lines[i].trim();
      const nutritionFacts = lines[i + 1].trim();
      const expirationDate = lines[i + 2].trim();
      const quantity = parseInt(lines[i + 3].trim(), 10);

      const pantryItem = new PantryItem(title, nutritionFacts, new Date(expirationDate), quantity);
      pantryItems.push(pantryItem);
    }

    pantryList = pantryItems;   //set global arr = to the retrived data
    mainWindow.webContents.send('newPantryData', pantryItems); //send new data to html
  });
}

function updatePantryFile(filePath, pantryList) {
  const lines = [];
  pantryList.forEach(item => {  //put everything into an array
    lines.push(item.title);
    lines.push(item.nutritionFacts);
    lines.push(item.expirationDate); // format date as 'YYYY-MM-DD'
    lines.push(item.quantity.toString());
  });

  const data = lines.join('\n');

  fs.writeFile(filePath, data, 'utf8', (err) => {   //write the data to the file
    if (err) {
      console.error(err);
    } else {
      console.log('Pantry file updated successfully.');
    }
  });
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

var recipeArray = []; // store all recipes

function read_file(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const lines = data.split('\n');
    const recipe = new Recipe();
    // I trim all of them to get rid of whitespaces around
    recipe.description = lines[0].trim();
    recipe.ingredients = lines[1].split(',').map(item => item.trim());
    recipe.image = lines[2].trim();
    recipe.nutrition_facts = lines[3].trim().split(',').map(item => item.trim());
    recipe.cuisine = lines[4].trim();
    recipe.favorite = lines[5].trim() === 'true'; // check to make sure type right and equal to true if not its auto gonna be false
    recipe.restrictions = lines[6].split(',').map(item => item.trim());
    recipe.difficulty = parseInt(lines[7].trim(), 10);
    recipe.review = lines[8].trim(); // should this be int like 8/10 or string?

    // instructions can be any length starting from the 9th line
    for (let i = 9; i < lines.length; i++) {
      recipe.instructions.push(lines[i].trim());
    }
    recipeArray.push(recipe);

    // Send the parsed recipe to the renderer process
    mainWindow.webContents.send('recipeData', recipe);
  });
}

function populateRecipies(fileName) {
  const filePath = __dirname + '/' + fileName;
  read_file(filePath);
}

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile('index.html');

  mainWindow.webContents.once('dom-ready', () => {

  });

  ipcMain.on('recipePageReady', () => {
    populateRecipies('testRecipe.txt');
  });

  ipcMain.on('pantryPageReady', () => {
    read_Pantry_List("pantryItems.txt");
  });

  ipcMain.on('deletion', (event, name) => {
    delete_pantry_item(name);
  });

  ipcMain.on('updateItem', (event, newItem) => {
    edit_pantry_item(newItem);
  });

  ipcMain.on('createNewItem', (event, data) => {
      add_pantry_item(data);
  });
};

app.whenReady().then(() => {
  createWindow();
});

// Quit the app when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Create a new window when the app is activated (on macOS)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
