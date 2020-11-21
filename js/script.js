let add = (a, b) => parseFloat(a) + parseFloat(b)
let subtract = (a, b) => parseFloat(b) - parseFloat(a)
let divide = (a, b) => parseFloat(b) / parseFloat(a)
let multiply = (a, b) => parseFloat(a) * parseFloat(b)

let active = undefined;
let memory = undefined;
let operator = undefined;
let total = undefined;

let clear = () => {
  calcDisplay.innerText = ""
  active = undefined;
  operator = undefined;
  memory = undefined;
  total = undefined;
}

function displayResults(result) {
  if (result.toString().length > 10) {
    calcDisplay.innerText = result.toString().substring(0, 11)
  } else {
    calcDisplay.innerText = result.toString()
  }
}

let operate = (operator, a, b) => {
  switch (operator) {
    case 'multiply':
      total = multiply(a, b)
      displayResults(total)
      break;
    case 'add':
      total = add(a, b);
      displayResults(total)
      break;
    case 'subtract':
      total = subtract(a, b);
      displayResults(total)
      break;
    case 'divide':
      if (a == 0) {
        clear()
        calcDisplay.innerText = "u no div by 0";
        break;
      }
      total = divide(a, b);
      displayResults(total)
      break;
  }
  active = undefined;
  memory = undefined;
  operator = undefined;
  return total;
}


let calcDisplay = document.querySelector('.display p')

let updateActive = (num) => {
  if (num == "%") {
    active /= 100
  }
  if (!active && !operator && !memory && total) {
    total = 0
  } else if (active == undefined) {
    active = num;
  } else {
    active = active.concat(num);
  }
  calcDisplay.innerText = active
  return active
}

let clearAll = document.querySelector('.clear')
  .addEventListener('click', clear)

let btnZero = document.querySelector('.zero')
  .addEventListener('click', () =>
    screen.innerText = updateActive("0"))

let btnOne = document.querySelector('.one')
  .addEventListener('click', () =>
    screen.innerText = updateActive("1"))

let btnTwo = document.querySelector('.two')
  .addEventListener('click', () =>
    screen.innerText = updateActive("2"))

let btnThree = document.querySelector('.three')
  .addEventListener('click', () =>
    screen.innerText = updateActive("3"))

let btnFour = document.querySelector('.four')
  .addEventListener('click', () =>
    screen.innerText = updateActive("4"))

let btnFive = document.querySelector('.five')
  .addEventListener('click', () =>
    screen.innerText = updateActive("5"))

let btnSix = document.querySelector('.six')
  .addEventListener('click', () =>
    screen.innerText = updateActive("6"))

let btnSeven = document.querySelector('.seven')
  .addEventListener('click', () =>
    screen.innerText = updateActive("7"))

let btnEight = document.querySelector('.eight')
  .addEventListener('click', () =>
    screen.innerText = updateActive("8"))

let btnNine = document.querySelector('.nine')
  .addEventListener('click', () =>
    screen.innerText = updateActive("9"))

let btnDecimal = document.querySelector('.decimal')
  .addEventListener('click', () => {
    if (!calcDisplay.innerText.includes('.')) {
      screen.innerText = updateActive(".")
    }
  })

let processOperator = (typeOfOperator) => {
  if (!active && !memory && total) {
    memory = total;
    operator = typeOfOperator
    // Haven't pressed "Equals" yet
  } else if (active && memory && operator) {
    total = operate(typeOfOperator, active, memory)
    active = undefined
    operator = typeOfOperator
    memory = total
    // String of operatores in a row
  } else if (!active && !memory && !operator) {
    total += operate(typeOfOperator, active, memory)
    operator = typeOfOperator
    memory = total
    active = undefined
  } else if (!active && !memory && total === 0) {
    memory = total
    operator = typeOfOperator
    active = undefined
    // First entry
  } else if (!memory) {
    memory = active;
    operator = typeOfOperator;
    active = undefined
  }
}

let blink = () => {
  calcDisplay.style.visibility = 'hidden';
  setTimeout(() => {
    calcDisplay.style.visibility = 'visible';
  }, 75);
}

let operatorDivide = document.querySelector('.divide')
  .addEventListener('click', function () {
    blink();
    total = processOperator(operator)
    operator = 'divide'
  });

let operatorMultiply = document.querySelector('.multiply')
  .addEventListener('click', function () {
    blink();
    total = processOperator(operator)
    operator = 'multiply'
  });

let operatorSubtract = document.querySelector('.subtract')
  .addEventListener('click', function () {
    blink();
    if (!operator) {
      operator = 'subtract'
    }
    total = processOperator(operator)
    operator = 'subtract'
  });

let operatorAdd = document.querySelector('.add')
  .addEventListener('click', function () {
    blink();
    if (!operator) {
      operator = 'add'
    }
    if (!memory && !operator) {
      operator = 'add'
      memory = total
    }
    total = processOperator(operator)
    operator = 'add'
  });

let operatorPercentage = document.querySelector('.percentage')
  .addEventListener('click', function () {
    blink();
    if (active) {
      total = active / 100
      displayResults(total)
    } else if (!active && total) {
      total = total / 100
      displayResults(total)
    }

  });

let operatorPlusMinus = document.querySelector('.plusminus')
  .addEventListener('click', function () {
    blink();
    if (active) {
      active *= -1
      calcDisplay.innerText = active
    } else if (!active && total) {
      total *= -1
      displayResults(total)
    }
  })

let operatorEquals = document.querySelector('.equals')
  .addEventListener('click', function () {
    blink();
    if (total == undefined) {
      total = operate(operator, parseFloat(active), parseFloat(memory))
    } else if (total == 0) {
      total += operate(operator, parseFloat(active), parseFloat(memory))
    }
  })