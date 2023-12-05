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
    finalItem = new PantryItem(newItem.newTitle, newItem.nutritionFacts, new Date(newItem.expirationDate), newItem.quantity);
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
  newItem.expirationDate = new Date(newItem.expirationDate);
  pantryList.push(newItem);
  updatePantryFile('pantryItems.txt', pantryList);    //update the text file
  mainWindow.webContents.send('newPantryData', pantryList); //send new data to html
  console.log(`Pantry item '${newItem.title}' added successfully.`);
}

function read_Pantry_List(filePath) {
  try {
    fs.readFile(filePath, 'utf8', (err, data) => {  //open the file and read it
      if (err) {
        console.error(err);
        return;
      }

      const lines = data.split('\n').filter(line => line.trim() !== '');
      const pantryItems = [];

      for (let i = 0; i < lines.length; i += 4) {   //for every 4 elements = 1 pantry item
        const title = lines[i] ? lines[i].trim() : '';
        const nutritionFacts = lines[i + 1] ? lines[i + 1].trim() : '';
        const expirationDate = lines[i + 2] ? lines[i + 2].trim() : '';

        // Check if quantity is a valid number before parsing
        const quantity = lines[i + 3] && !isNaN(lines[i + 3]) ? parseInt(lines[i + 3].trim()) : 0;

        const pantryItem = new PantryItem(title, nutritionFacts, new Date(expirationDate), quantity);
        pantryItems.push(pantryItem);
      }

      pantryList = pantryItems;   //set global arr = to the retrieved data
      mainWindow.webContents.send('newPantryData', pantryItems); //send new data to HTML
    });
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

function updatePantryFile(filePath, pantryList) {
  const lines = [];
  pantryList.forEach(item => {  //put everything into an array
    lines.push(item.title);
    lines.push(item.nutritionFacts);
    item.expirationDate.setUTCHours(12, 0, 0, 0);
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



var groceryList = []; // store all grocery items

class GroceryItem {
  constructor(title, quantity) {
    this.title = title;
    this.quantity = quantity;
  }
}

function edit_Grocery_item(newItem) {
  const index = groceryList.findIndex(item => item.title === newItem.oldTitle); //find the index
  if (index !== -1) {
    finalItem = new GroceryItem(newItem.newTitle, newItem.quantity);
    groceryList[index] = finalItem;  //edit it in the array
    updateGroceryFile('groceryListData.txt', groceryList);  //update the textfile
    mainWindow.webContents.send('newGroceryData', groceryList); //send new data to html
  } else {
    console.log(`Grocery item '${newItem.title}' not found.`);
  }
}

function delete_Grocery_item(name) {
  const index = groceryList.findIndex(item => item.title === name);  //find the index
  if (index !== -1) {
    groceryList.splice(index, 1);  //remove it from array
    updateGroceryFile('groceryListData.txt', groceryList);  //update the textfile
    mainWindow.webContents.send('newGroceryData', groceryList); //send new data to html
  } else {
    console.log(`Grocery item '${name}' not found.`);
  }
}

function add_Grocery_item(newItem) {
  groceryList.push(newItem);
  updateGroceryFile('groceryListData.txt', groceryList);  //update the textfile
  mainWindow.webContents.send('newGroceryData', groceryList); //send new data to html
  console.log(`Grocery item '${newItem.title}' added successfully.`);
}

function read_weekly_meals(){
 // this function will read the weekly meal list and add ingrediants to the grocery list that are:
 //     1. In the meal list and not in the grocery list or the pantry
 //     2. low quantity items in pantry will also be added.
  change = 0;
  for (let i = 0; i < recipeArray.length; i += 1) {
    for (let j = 0; j < recipeArray[i].ingredients.length; j += 1) {
      const index = groceryList.findIndex(item => item.title === recipeArray[i].ingredients[j]);  //find the index
      if (index === -1) {
        const indexSec = pantryList.findIndex(item => item.title === recipeArray[i].ingredients[j]);  //find the index
        if (indexSec === -1 || pantryList[indexSec].quantity === 0) {
          newItem = new GroceryItem(recipeArray[i].ingredients[j], 1);
          groceryList.push(newItem);
          change = 1;
        }
      }
    }
  }
  for (let i = 0; i < groceryList.length; i += 1) {
    if (groceryList[i].quantity <= 1) {
      groceryList[i].quantity = 2;
      change = 1;
    }
  }
  if (change == 1){
    updateGroceryFile('groceryListData.txt', groceryList);  //update the textfile
  }
}

function read_Grocery_List(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    try {
      if (err) {
        throw err; // Throw the error to the catch block
      }

      const lines = data.split('\n').filter(line => line.trim() !== '');
      const groceryItems = [];

      for (let i = 0; i < lines.length; i += 2) {
        const title = lines[i] ? lines[i].trim() : '';
        
        // Check if quantity is a valid number before parsing
        const quantity = lines[i + 1] && !isNaN(lines[i + 1]) ? parseInt(lines[i + 1].trim()) : 0;

        const groceryItem = new GroceryItem(title, quantity);
        groceryItems.push(groceryItem);
      }

      groceryList = groceryItems;

      read_weekly_meals();

      mainWindow.webContents.send('newGroceryData', groceryList);
    } catch (error) {
      console.error('Error reading grocery list file:', error);
    }
  });
}
function updateGroceryFile(filePath, groceryList) {
  const lines = [];
  groceryList.forEach(item => {  //put everything into an array
    lines.push(item.title);
    lines.push(item.quantity.toString());
  });

  const data = lines.join('\n');

  fs.writeFile(filePath, data, 'utf8', (err) => {   //write the data to the file
    if (err) {
      console.error(err);
    } else {
      console.log('grocery file updated successfully.');
    }
  });
}






var mealList = []; // store all grocery items

class MealDate {
  constructor(date, items) {
    this.date = new Date(date);
    this.items = items; //Array of elements, each element has (name, time, servings)
  }
}

function delete_meal_item(date, name, time, servings) {
  let tempDate = new Date(date);
  const mealDateIndex = mealList.findIndex(mealDate => mealDate.date.getTime() === tempDate.getTime());

  if (mealDateIndex !== -1) {
    const mealItemIndex = mealList[mealDateIndex].items.findIndex(item =>
      item.name === name && item.time === time && item.servings === servings
    );

    if (mealItemIndex !== -1) {
      mealList[mealDateIndex].items.splice(mealItemIndex, 1);

      if (mealList[mealDateIndex].items.length === 0) {
        mealList.splice(mealDateIndex, 1);
      }
      updateMealFile("meals.txt", mealList);
      mealList.sort((a, b) => a.date - b.date);
      mainWindow.webContents.send('newMealData', mealList);
    }
  }
}

function add_meal_item(date, time, name, servings) {
  const tempDate = new Date(date);
  tempDate.setUTCHours(12, 0, 0, 0);
  const existingMeal = mealList.find(mealDate => {
    const mealDateObj = mealDate.date;
    return (
      mealDateObj.getFullYear() === tempDate.getFullYear() &&
      mealDateObj.getMonth() === tempDate.getMonth() &&
      mealDateObj.getDate() === tempDate.getDate()
    );
  });

  if (existingMeal) {
    existingMeal.items.push({ name, time, servings });

    existingMeal.items.sort((a, b) => {
      // Convert time to 24-hour format for correct comparison
      const timeA = convertTo24HourFormat(a.time);
      const timeB = convertTo24HourFormat(b.time);
      return timeA - timeB;
    });
  } else {
    const newMealDate = new MealDate(date, [{ name, time, servings }]);
    mealList.push(newMealDate);
  }
  mealList.sort((a, b) => a.date - b.date);

  updateMealFile("meals.txt", mealList);
  mainWindow.webContents.send('newMealData', mealList);
}

function convertTo24HourFormat(time) {
  const match = time.match(/(\d+):(\d+)([APMapm]{2})/);

  if (!match) {
    console.error('Invalid time format:', time);
    return time;
  }

  const [, hours, minutes, period] = match;
  let hours24 = parseInt(hours, 10);
  
  if (period.toUpperCase() === 'PM' && hours24 < 12) {
    hours24 += 12;
  } else if (period.toUpperCase() === 'AM' && hours24 === 12) {
    hours24 = 0;
  }

  return `${hours24.toString().padStart(2, '0')}:${minutes}`;
}

function read_Meal_List(filePath) {
  mealList = [];
  fs.readFile(filePath, 'utf8', (err, data) => {
    try {
      if (err) {
        throw err; // Throw the error to the catch block
      }

      const lines = data.split('\n').filter(line => line.trim() !== '');

      for (let i = 0; i < lines.length; i += 2) {
        const date = lines[i].trim();
        const itemsText = lines[i + 1].trim().slice(1, -1); // Remove parentheses
        const items = itemsText.split('), (').map(item => {
          const [name, time, servings] = item.split(', ');
          return { name, time, servings };
        });

        const mealDate = new MealDate(date, items);
        mealList.push(mealDate);
      }
      mealList.sort((a, b) => a.date - b.date);
      mainWindow.webContents.send('newMealData', mealList);

    } catch (error) {
      console.error('Error reading meal list file:', error);
    }
  });
}

function updateMealFile(filePath, mealList) {
  const uniqueDates = new Set();
  const lines = [];

  mealList.forEach(mealDate => {
    mealDate.date.setUTCHours(12, 0, 0, 0);

    const dateLine = mealDate.date.toISOString(); // Format date as string
    if (!uniqueDates.has(dateLine)) {
      uniqueDates.add(dateLine);
      lines.push(dateLine);

      const itemsLines = mealDate.items.map(item => {
        return `(${item.name}, ${item.time}, ${item.servings})`;
      });

      lines.push(itemsLines.join(', '));
    }
  });

  const data = lines.join('\n');

  fs.writeFile(filePath, data, 'utf8', (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Meal file updated successfully.');
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
  ipcMain.on('groceryPageReady', () => {
    read_Grocery_List("groceryListData.txt");
  });
  ipcMain.on('mealPageReady', () => {
    read_Meal_List("meals.txt");
  });

  //for pantry methods
  ipcMain.on('deletion', (event, name) => {
    delete_pantry_item(name);
  });
  ipcMain.on('updateItem', (event, newItem) => {
    edit_pantry_item(newItem);
  });
  ipcMain.on('createNewItem', (event, data) => {
    add_pantry_item(data);
  });
  //for Grocery methods
  ipcMain.on('deletionGrocery', (event, name) => {
    delete_Grocery_item(name);
  });
  ipcMain.on('updateGroceryItem', (event, newItem) => {
    edit_Grocery_item(newItem);
  });
  ipcMain.on('createNewGroceryItem', (event, data) => {
    add_Grocery_item(data);
  });
  //for Meals methods
  ipcMain.on('deletionMeals', (event, name) => {
    delete_meal_item(name.date, name.name, name.time, name.servings);
  });
  ipcMain.on('createNewMealItem', (event, data) => {
    add_meal_item(data.date, data.time, data.name, data.servings);
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
