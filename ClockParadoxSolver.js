/**
	Clock paradox solver, developed by sohrmann88@hotmail.com
	
	Application to solve the Clock Paradoxes that appear in Square Enix'
	Final Fantasy XIII-2.
*/

function Clock(clockNumbers) {
	// Fields/properties
	this.clockNumbers = clockNumbers;
	this.numberOfNumbers = clockNumbers.length;
	this.pointers = new Array(0,0);
	
	// Methods
	this.getNumbers = getNumbersF;
	this.setNumbers = setNumbersF;
	this.getNumberOfNumbers	= getNumberOfNumbersF;
	this.getPointerPositions = getPointerPositionsF;
	this.isNumberRemovedAt = isNumberRemovedAtF;
	this.getNumberAt = getNumberAtF;
	this.removeNumberAt = removeNumberAtF;
	this.rotate = rotateF;
}

// Copies the array.
function copyArray(originalArray) {
	var newArray = new Array(originalArray.length);
	
	for(var i = 0; i<originalArray.length; i++) {
		newArray[i] = originalArray[i];
	}
	
	return newArray;
}

// ************************************************************************************************
// Functions that are methods for the Clock-object

function getNumbersF() {
	return copyArray(this.clockNumbers);
}

function setNumbersF(numbersArray) {
	this.clockNumbers = copyArray(numbersArray);
}

function getNumberOfNumbersF() {
	return this.numberOfNumbers;
}

function getPointerPositionsF() {
	return copyArray(this.pointers);
}

function isNumberRemovedAtF(index) {
	// Parse to int for proper operations.
	var intIndex = parseInt(index);
	return this.clockNumbers[intIndex] == -1;
}

function getNumberAtF(index) {
	// Parse to int for proper operations.
	var intIndex = parseInt(index);
	return this.clockNumbers[intIndex];
}

function removeNumberAtF(index) {
	// Parse to int for proper operations.
	var intIndex = parseInt(index);
	
	this.pointers[0] = intIndex;
	this.pointers[1] = intIndex;

	// Rotate the pointers.
	this.rotate(this.clockNumbers[intIndex]);

	// Remove the number at the index.
	this.clockNumbers[intIndex] = -1;
}

function rotateF(rotationNumber) {
	// Parse to int for proper operations.
	var intRotationNumber = parseInt(rotationNumber);
	
	// Pointer 0 goes anti-clockwise
	if (this.pointers[0] < intRotationNumber)
	{
		var difference = intRotationNumber - this.pointers[0];
		this.pointers[0] = this.numberOfNumbers - difference;
	}
	else
	{
		this.pointers[0] = this.pointers[0] - intRotationNumber;
	}

	// Pointer 1 goes clockwise
	this.pointers[1] = (this.pointers[1] + intRotationNumber) % this.numberOfNumbers;
}

// ************************************************************************************************








function ParadoxSolver(clockInstance) {
	this.clock = clockInstance;
	
	this.solve = solveF;
	this.isClockSolved = isClockSolvedF;
	this.traverse = traverseF;
}

// ************************************************************************************************
// Functions that are methods for the Clock-object

function solveF() {
	var backupClockNumbers = this.clock.getNumbers();

	for (var i = 0; i < this.clock.getNumberOfNumbers(); i++)
	{
		// The number to be removed at the chosen index.
		var numberToBeRemoved = this.clock.getNumberAt(i);

		// Remove the number
		this.clock.removeNumberAt(i);

		// Compile path string
		var path = "[" + i + "] " + numberToBeRemoved + " -> " + this.traverse(this.clock);

		if (this.isClockSolved(this.clock))
		{
			return path;
		}

		this.clock.setNumbers(backupClockNumbers);
	}

	return "No solution found.";
}

function isClockSolvedF() {
	var solved = true;

	for (var i = 0; i < this.clock.getNumberOfNumbers(); i++)
	{
		solved = solved && this.clock.isNumberRemovedAt(i);
	}

	return solved;
}

function traverseF(clockR) {
	// Save a back-up of the clock for roll-back.
	var backupClockNumbers = this.clock.getNumbers();

	// The positions of the current pointer constellation.
	var pointerPositions = this.clock.getPointerPositions();

	for (var i = 0; i<pointerPositions.length; i++)
	{
		var position = pointerPositions[i];
		
		if (this.clock.isNumberRemovedAt(position))
		{
			continue;
		}

		var numberToBeRemoved = this.clock.getNumberAt(position);

		// Pick the number at the given position.
		this.clock.removeNumberAt(position);

		// Continue picking number at the new positions of the pointers
		var path = "[" + position + "] " + numberToBeRemoved + " -> " + this.traverse(clockR);

		if (this.isClockSolved())
		{
			return path;
		}

		// The clock has not been solved from the chosen
		// position, roll back.
		this.clock.setNumbers(backupClockNumbers);
	}

	if (this.isClockSolved())
	{
		return "solved";
	}

	return "No solution found";
}

// ************************************************************************************************

function solveParadox() {
	// var inputArray = 	
	var inputData = getInput();
	var clockInstance = new Clock(inputData);
	var paradoxInstance = new ParadoxSolver(clockInstance);
	
	form0.output.value = paradoxInstance.solve();
}


function getInput() {
	var inputData = getInputData();
	var numberOfInputNumbers = 0;
	
	for(var i = 0; i<inputData.length; i++) {
		if(inputData[i] === "") {
			break;
		}
		else if(inputData[i].match( /[^1-9]+/ )){
			form0.output.value = "Type only 1-digit numbers in the fields.";
		}
		else {
			numberOfInputNumbers++;
		}
	}
	
	var dataArray = new Array(numberOfInputNumbers);
	
	for(var j = 0; j < dataArray.length; j++) {
		dataArray[j] = inputData[j];
	}
	
	return dataArray;
}

function getInputData() {
	var inputArray = new Array(16);
	
	inputArray[0] = document.form0.input0.value;
	inputArray[1] = document.form0.input1.value;
	inputArray[2] = document.form0.input2.value;
	inputArray[3] = document.form0.input3.value;
	inputArray[4] = document.form0.input4.value;
	inputArray[5] = document.form0.input5.value;
	inputArray[6] = document.form0.input6.value;
	inputArray[7] = document.form0.input7.value;
	inputArray[8] = document.form0.input8.value;
	inputArray[9] = document.form0.input9.value;
	inputArray[10] = document.form0.input10.value;
	inputArray[11] = document.form0.input11.value;
	inputArray[12] = document.form0.input12.value;
	inputArray[13] = document.form0.input13.value;
	inputArray[14] = document.form0.input14.value;
	inputArray[15] = document.form0.input15.value;
	
	return inputArray;
}

function resetFields() {
	document.form0.input0.value = "";
	document.form0.input1.value = "";
	document.form0.input2.value = "";
	document.form0.input3.value = "";
	document.form0.input4.value = "";
	document.form0.input5.value = "";
	document.form0.input6.value = "";
	document.form0.input7.value = "";
	document.form0.input8.value = "";
	document.form0.input9.value = "";
	document.form0.input10.value = "";
	document.form0.input11.value = "";
	document.form0.input12.value = "";
	document.form0.input13.value = "";
	document.form0.input14.value = "";
	document.form0.input15.value = "";	
	
	document.form0.output.value = "";
}


function solveParadox() {
	var inputData = getInput();
	var clockInstance = new Clock(inputData);
	var paradoxInstance = new ParadoxSolver(clockInstance);

	document.form0.output.value = paradoxInstance.solve();
}






function GoNextInput(input, next)
{
	if (input.value.length == 1) {
		next.focus() ;
	}
}



var counter = 0;

function displayInputHelp() {
	var currentText = document.getElementById("helpText").innerHTML;
	
	if(counter++ % 2 == 0) {
		document.getElementById("helpText").innerHTML = 
							"Input instructions <br><br>" +
							"Input the numbers that occur on your clock. <br>" +
                            "Start by inputting the number at the 12 o'clock position (the [00] input field),<br>" +
                            "followed by the next number going clockwise.<br><br><br>" +
							"Explanation of solution text<br><br>" +
							"The output format is:<br>" +
							"[a] b -><br>" +
							"[a] is the position of the number b that you have to move to next.<br>" +
							"[0] is the number at the 12 o'clock position, increasing going clockwise.<br>" +
							"The arrow tell you to go to the next number indicated by the following '[a] b'-pair.";
	}
	else {
		document.getElementById("helpText").innerHTML = "";
	}
		
}
