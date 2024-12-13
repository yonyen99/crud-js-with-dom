// Array to store students
const students = [
    { name: "Alice", age: 20, grade: "A" },
    { name: "Bob", age: 22, grade: "B" },
    { name: "Charlie", age: 19, grade: "A+" },
];

// Get DOM elements
const studentsTableBody = document.getElementById("studentsTableBody");
const studentForm = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const gradeInput = document.getElementById("grade");
const submitButton = document.getElementById("submitButton");

let editIndex = null; // Track the index of the student being edited

// Function to render students
function displayStudents() {
    studentsTableBody.innerHTML = ""; // Clear previous rows

    students.forEach((student, index) => {
        const row = document.createElement("tr");

        const numberCell = document.createElement("td");
        numberCell.textContent = index + 1;
        row.appendChild(numberCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = student.name;
        row.appendChild(nameCell);

        const ageCell = document.createElement("td");
        ageCell.textContent = student.age;
        row.appendChild(ageCell);

        const gradeCell = document.createElement("td");
        gradeCell.textContent = student.grade;
        row.appendChild(gradeCell);

        // Add action buttons
        const actionsCell = document.createElement("td");
        
        // Edit Button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("btn", "btn-warning", "btn-sm", "me-2");
        editButton.addEventListener("click", () => editStudent(index));
        actionsCell.appendChild(editButton);

        // Delete Button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn", "btn-danger", "btn-sm");
        deleteButton.addEventListener("click", () => deleteStudent(index));
        actionsCell.appendChild(deleteButton);

        row.appendChild(actionsCell);

        studentsTableBody.appendChild(row);
    });
}

// Function to add or edit a student
function handleFormSubmit(event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const age = parseInt(ageInput.value.trim(), 10);
    const grade = gradeInput.value.trim();

    if (name && age && grade) {
        if (editIndex !== null) {
            // Edit existing student
            students[editIndex] = { name, age, grade };
            editIndex = null; // Reset edit index
            submitButton.textContent = "Add Student"; // Reset button text
        } else {
            // Add new student
            students.push({ name, age, grade });
        }

        nameInput.value = "";
        ageInput.value = "";
        gradeInput.value = "";

        displayStudents();
    } else {
        alert("Please fill in all fields.");
    }
}

// Function to edit a student
function editStudent(index) {
    const student = students[index];
    nameInput.value = student.name;
    ageInput.value = student.age;
    gradeInput.value = student.grade;

    editIndex = index; // Set the index of the student being edited
    submitButton.textContent = "Edit Student"; // Change button text
}

// Function to delete a student
function deleteStudent(index) {
    const confirmed = confirm("Are you sure you want to delete this student?");
    if (confirmed) {
        students.splice(index, 1); // Remove student from the array
        displayStudents(); // Re-render the table
    }
}

// Attach event listener to the form
studentForm.addEventListener("submit", handleFormSubmit);

// Initial render of the table
displayStudents();
