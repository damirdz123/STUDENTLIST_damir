"use strict";

window.addEventListener("DOMContentLoaded", initFrontend);

function initFrontend() {
  console.log("Frontend is running");

  // register buttons for sort
  document
    .querySelector("button#sort_first")
    .addEventListener("click", clickedSortFirstname);
  document
    .querySelector("button#sort_last")
    .addEventListener("click", clickedSortLastname);
  document
    .querySelector("button#sort_house")
    .addEventListener("click", clickedSortHouse);

  // buttons for filters
  // document.querySelectorAll("#filters a").forEach( function(element) {element.addEventListener("click", clickedFilter); } );
  document
    .querySelectorAll("#filters a")
    .forEach(element => element.addEventListener("click", clickedFilter));

  // table clicks
  document
    .querySelector("table#studentlist")
    .addEventListener("click", clickedTable);
}

function clickedTable(event) {
  //  console.log("clicked table");
  //  console.log(event.target);

  const clicked = event.target;
  //   console.log(clicked.tagName);
  if (clicked.tagName.toLowerCase() === "button") {
    clickedDelete(clicked);
  }
}

function clickedDelete(deleteButton) {
  // console.log(deleteButton);
  // find the parent <tr> that has this deleteButton inside it
  let tr = deleteButton.parentElement;
  while (tr.tagName !== "TR") {
    tr = tr.parentElement;
  }

  // find the studentId
  const studentId = tr.dataset.studentId;
  console.log(studentId);

  deleteStudent(studentId);

  // animate the <tr> out
  animateDelete(tr);
  // remove that <tr>
  //tr.remove();
}

function animateDelete(tr) {
  tr.style.transform = "translateX(-200%)";
  tr.style.transition = "transform 1.5s";

  // tr.classList.add("fly-out");
  const rect = tr.getBoundingClientRect();

  tr.addEventListener("transitionend", function() {
    // find the nextSibling (the tr below this)
    let nextSibling = tr.nextElementSibling;

    if (nextSibling !== null) {
      nextSibling.addEventListener("transitionend", function() {
        console.log("transition end");

        // reset all the translateY!
        let nextTr = tr.nextElementSibling;
        while (nextTr !== null) {
          nextTr.style.transform = "translateY(0)";
          nextTr.style.transition = "transform 0s";

          nextTr = nextTr.nextElementSibling;
        }

        // remove that <tr>
        tr.remove();
      });

      while (nextSibling !== null) {
        nextSibling.style.transform = "translateY(-" + rect.height + "px)";
        nextSibling.style.transition = "transform 0.5s";

        nextSibling = nextSibling.nextElementSibling;
      }
    } else {
      // no next sibling - just remove!
      tr.remove();
    }
  });
}

function clickedSortFirstname() {
  console.log("clickedSortFirstname");
  sortByFirstName();
  displayList(currentStudents);
}

function clickedSortLastname() {
  console.log("clickedSortLastname");
  sortByLastName();
  displayList(currentStudents);
}

function clickedSortHouse() {
  console.log("clickedSortHouse");
  sortByHouse();
  displayList(currentStudents);
}

function clickedFilter(event) {
  console.log("clickedFilter");
  const filter = this.dataset.filter; // references data-filter="____"
  console.log(event);
  event.preventDefault();

  // create a list of filtered students by house

  // if filter === all, let the list be all students
  if (filter === "all") {
    currentStudents = allStudents;
    displayList(currentStudents);
  } else {
    currentStudents = filterByHouse(filter);
    displayList(currentStudents);
  }
}

function displayList(listOfStudents) {
  console.log("Display list");
  // clear the table
  document.querySelector("table#studentlist tbody").innerHTML = "";

  // foreach student in listOfStudents
  listOfStudents.forEach(function(student) {
    // clone a table-row for student
    const clone = document
      .querySelector("#student_template")
      .content.cloneNode(true);

    // fill in the clone with data
    clone.querySelector("[data-firstname]").textContent = student.firstName;
    clone.querySelector("[data-lastname]").textContent = student.lastName;
    clone.querySelector("[data-house]").textContent = student.house;

    // add the studentId to the <tr>
    clone.querySelector("tr").dataset.studentId = student.id;

    // append clone to table
    document.querySelector("table#studentlist tbody").appendChild(clone);
  });
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
