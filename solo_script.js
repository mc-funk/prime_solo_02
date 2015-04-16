// ! ! !
// Three Bugs

var arrayAtticus = ["Atticus", "2405", "47000", 3];
var arrayJem = ["Jem", "62347", "63500", 4];
var arrayBoo = ["Boo", "11435", "54000", 3];
var arrayScout = ["Scout", "6243", "74750", 5];

var array = [arrayAtticus, arrayJem, arrayBoo, arrayScout];

//Create variables used to write to the DOM
var newEl, newText, position;

//Capture the position of insertion into the DOM
position = document.getElementById('content');

//Loop the array, extracting each array and writing information to the DOM
//Note that the information is not 'clean'
for(var i = 0; i < array.length; i++){
	var newerArray = []
  newerArray[i] = calculateSTI(array[i]);
 	newEl = document.createElement('li'); //create a bullet point
	newText = document.createTextNode(newerArray[i]); //[array] was sending the entire array of arrays to the function.
	newEl.appendChild(newText);
	position.appendChild(newEl);
}

function calculateSTI(array){
  var newArray = [];
  newArray[0] = array[0];

  var employeeNumber = array[1];
  var baseSalary = array[2];
  var reviewScore = array[3];
  console.log("getBaseSTI: " + getBaseSTI(reviewScore), "getYearAdjustment: " + getYearAdjustment(employeeNumber), "getIncomeAdjustment: " + getIncomeAdjustment(baseSalary));
  var bonus = getBaseSTI(reviewScore) + getYearAdjustment(employeeNumber) - getIncomeAdjustment(baseSalary);

  if(bonus > 0.13){
    bonus = 0.13;
  }

  newArray[1] = bonus;
  newArray[2] = Math.round(baseSalary * (1.0 + bonus));//Not technically a bug but makes no sense to display salary as a float
  newArray[3] = Math.round(baseSalary * bonus);//Column 4, bonus in money should be rounded to nearest dollar
  console.log(newArray[0],  + "base + sti: " + newArray[1], "money bonus" + newArray[2],  "Total income" + newArray[3]);
  console.log("Testing math.round - 100.04:", Math.round(100.4), "Testing math.round - array[3]", newArray[3], Math.round(newArray[3]) );
  return newArray;
}

function getBaseSTI(reviewScore){
  var basePercent;
  switch(reviewScore){
    case 1:
      basePercent = 0;
      break;
    case 2:
      basePercent = 0;
      break;
    case 3:
      basePercent = 0.04;
      break;
    case 4:
      basePercent = 0.06;
      break;
    case 5:
      basePercent = 0.10;
      break;
  }
  return basePercent; //returning basePercent - 1 does not yield the appropriate base percent
}

function getYearAdjustment(employeeNumber){
  var yearAdjustment = 0;
  if(employeeNumber.length == 4){
    yearAdjustment = 0.05;
  }
  return yearAdjustment;
}

function getIncomeAdjustment(salary){
  var incomeAdjustment = 0;
  salary = parseInt(salary);
  if(salary > 65000){
    incomeAdjustment = 0.01;
  }
  return incomeAdjustment;
}