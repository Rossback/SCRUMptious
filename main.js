const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const directory = './recipes/';

//Mark
//ALL Constructors
class Recipe {
  constructor() {
    this.title = '';
    this.ingredients = [];
    this.image = 'path';    
    this.nutrition_facts = [];
    this.cuisine = '';
    this.favorite = 0;
    this.restrictions = [];
    this.difficulty = 0;
    this.review = '';
    this.instructions = [];
  }
}

class Ingredient {
  constructor() {
    this.name = '';
    this.restriction = [];
    this.expiration_date = '';
    this.quantity = 0.0;
    this.measurement = '';
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

const ingredientArray = [];  //store all ingredients
let currentAccount = null;  //store current account
var currentDay = null;  //store the current day
var recipeArray = []; //store all reciepies

//example to create a new ingredient will look similar to all constructors
//const ingredient1 = new Ingredient();
//ingredient1.name = 'Flour';
//ingredientArray.push(ingredient1);


// RECIPE STUFF

function readToDisplay(file, m){ 
  try {
    const filePath = directory + file;
    const data = fs.readFileSync(filePath, 'utf8'); //syncronously read da file
    arr = data.split("\n"); // split the data into each section 
    let recipe = new Recipe();

    recipe.title = arr[0];
    recipe.ingredients = createIngredient(arr[1]);
    recipe.image = arr[2];    
    recipe.nutrition_facts = arr[3].split(",");
    recipe.cuisine = arr[4];
    recipe.favorite = parseInt(arr[5]);
    recipe.restrictions = arr[6].split(",");
    recipe.difficulty = parseInt(arr[7]);
    recipe.review = arr[8];

    for (let i = 9; i < arr.length; i++) {
      recipe.instructions.push(arr[i].trim());
    }
    if (m == 1) {
      mainWindow.webContents.send('recipeDisplay', recipe);
    }else {
      mainWindow.webContents.send('recipeToEdit', recipe);
    }

  } catch (err) {
    console.error(err);
  }
}  


// reads a file string and turns it into a recipe struct 
function read_file(file){ 
  try {
    const filePath = directory + file;
    const data = fs.readFileSync(filePath, 'utf8'); //syncronously read da file
    arr = data.split("\n"); // split the data into each section 
    let recipe = new Recipe();

    recipe.title = arr[0];
    recipe.ingredients = createIngredient(arr[1]);
    recipe.image = arr[2];    
    recipe.nutrition_facts = arr[3].split(",");
    recipe.cuisine = arr[4];
    recipe.favorite = parseInt(arr[5]);
    recipe.restrictions = arr[6].split(",");
    recipe.difficulty = parseFloat(arr[7]);
    recipe.review = arr[8];
    
    for (let i = 9; i < arr.length; i++) {
      recipe.instructions.push(arr[i].trim());
    }
    recipeArray.push(recipe);
    mainWindow.webContents.send('recipeData', recipe);
  } catch (err) {
    console.error(err);
  }
}  

function readToDisplay(file, m){ 
  try {
    const filePath = directory + file;
    const data = fs.readFileSync(filePath, 'utf8'); //syncronously read da file
    arr = data.split("\n"); // split the data into each section 
    let recipe = new Recipe();

    recipe.title = arr[0];
    recipe.ingredients = createIngredient(arr[1]);
    recipe.image = arr[2];    
    recipe.nutrition_facts = arr[3].split(",");
    recipe.cuisine = arr[4];
    recipe.favorite = parseInt(arr[5]);
    recipe.restrictions = arr[6].split(",");
    recipe.difficulty = parseInt(arr[7]);
    recipe.review = arr[8];
    
    for (let i = 9; i < arr.length; i++) {
      recipe.instructions.push(arr[i].trim());
    }
    if (m == 1) {
      mainWindow.webContents.send('recipeDisplay', recipe);
    }else {
      mainWindow.webContents.send('recipeToEdit', recipe);
    }
    
  } catch (err) {
    console.error(err);
  }
}  

function populateRecipies() {
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

function setCurrentAccount() {
  const userAccount = new Account();
  userAccount.username = 'TestUser';
  userAccount.picture = 'testpfp.jpg';
  self.currentAccount = userAccount;
}

function createIngredient(data) {
  let list = data.split(",");
  let temp = [];
  let arr = [];
  for (i = 0; i < list.length; i++) {
    temp = list[i].split("$");
    let ingredient = new Ingredient();
    ingredient.name = temp[0];
    ingredient.restrictions = temp[1];
    ingredient.expiration_date = temp[2];
    ingredient.quantity = parseFloat(temp[3]);
    ingredient.measurement = temp[4];
    arr.push(ingredient);
  }
  return arr;
}




// PANTRY STUFF

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
    read_Pantry_List("pantryItems.txt"); //send new data to html
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
      const quantity = parseInt(lines[i + 3].trim());

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





// WINDOWS AND LISTENERS

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 960,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile('index.html');

  mainWindow.webContents.once('dom-ready', () => {

  });

  ipcMain.on('editRecipe', (event, name) => {
    readToDisplay(name, 0);
  })

  ipcMain.on('displayRecipe', (event, file) => {
    readToDisplay(file, 1);
  })
  
  //init html files

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
