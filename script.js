"use strict";

window.addEventListener("DOMContentLoaded", init);

const allStudents = [];
let currentStudents = [];

const Student_prototype = {
  firstName: "",
  lastName: "",
  house: "",
  toString() {
    return this.firstName + " " + this.lastName;
  },
  splitName(fullName) {
    const firstSpace = fullName.indexOf(" ");
    this.firstName = fullName.substring(0, firstSpace);
    this.lastName = fullName.substring(firstSpace + 1);
  },
  setHouse(house) {
    this.house = house;
  }
};
/*
function init( ) {

}

function fetchData() {

}

function buildList(jsonData) {

}

function displayList( listOfStudents ) {

}

function sortByFirstName() {

}

function sortByLastName() {

}

function sortByHouse() {

}

function filterByHouse( house ) {

    return filteredList;
}
*/

function init() {
  // clear the students array
  allStudents.splice(0, allStudents.length); // from https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript

  // fetch JSON
  fetchData();

  // parse JSON
  // done via fetchJSON
}

function fetchData() {
  const url = "students.json";

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(jsondata) {
      console.log(jsondata);

      buildList(jsondata); // creates allStudents

      currentStudents = allStudents;

      displayList(currentStudents);
    });
}

function buildList(jsondata) {
  const houses = Object.keys(jsondata);
  //console.log(houses);
  houses.forEach(house => {
    // fill the house with a list of students
    const houseStudentNames = jsondata[house];
    // console.log(houseStudentNames);
    fillHouseWithStudents(house, houseStudentNames);
  });

  function fillHouseWithStudents(house, studentNames) {
    studentNames.forEach(createStudent);

    function createStudent(fullName) {
      const student = Object.create(Student_prototype);
      student.splitName(fullName);
      //student.setHouse(house);
      student.house = house;

      // give this student a unique ID
      student.id = generateUUID();
      allStudents.push(student);
    }
  }
}

// from: https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/8809472#8809472
function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime();
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    d += performance.now(); //use high-precision timer if available
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function deleteStudent(studentId) {
  // find the index of the student with studentId
  const index = allStudents.findIndex(findStudent);
  console.log("found index: " + index);

  allStudents.splice(index, 1);

  // function that returns true when student.id == studentId
  function findStudent(student) {
    if (student.id === studentId) {
      return true;
    } else {
      return false;
    }
  }
}

function sortByFirstName() {
  currentStudents.sort(byFirstName);

  function byFirstName(a, b) {
    if (a.firstName < b.firstName) {
      return -1;
    } else if (a.firstName > b.firstName) {
      return 1;
    } else {
      return 0;
    }
  }
}

function sortByLastName() {
  currentStudents.sort(byLastName);

  function byLastName(a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  }
}

function sortByHouse() {
  currentStudents.sort(byHouseAndFirstName);

  function byHouseAndFirstName(a, b) {
    // sort by house, if house is the same, sort by first name
    if (a.house < b.house) {
      return -1;
    } else if (a.house > b.house) {
      return 1;
    } else {
      if (a.firstName < b.firstName) {
        return -1;
      } else {
        return 1;
      }
    }
  }
}

function filterByHouse(house) {
  const filteredStudents = allStudents.filter(byHouse);

  function byHouse(student) {
    if (student.house === house) {
      return true;
    } else {
      return false;
    }
  }

  return filteredStudents;
}

function listOfStudents() {
  let str = "";

  allStudents.forEach(student => (str += student + "\n"));

  return str;
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
