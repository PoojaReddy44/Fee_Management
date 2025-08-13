console.log("Script loaded!");

// List all page section ids (for single page apps, here kept for potential script reuse)
const sections = [
  'main-screen', 'teacher-login', 'parent-login', 'parent-dashboard', 'parent-student-info',
  'parent-attendance', 'teacher-dashboard', 'pay-slips', 'payment-status',
  'attendance-menu', 'my-attendance', 'class-attendance', 'print-lists',
  'student-records', 'mark-sheet', 'feedback', 'forgot-password'
];

// Function to show one section, hide others - for SPA, unused here but kept for reference
function showSection(id) {
  sections.forEach(sectionId => {
    const sec = document.getElementById(sectionId);
    if (sec) sec.classList.add('hidden');
  });
  const target = document.getElementById(id);
  if (target) target.classList.remove('hidden');
}

// Navigation utility for pages with back buttons (modify to redirect as needed)
function goBack() {
  history.back(); // Navigate back in browser history
}
function logout() {
  window.location.href='../../index.html';
}

// Show/hide pages by navigation - replaced in separate files by page navigation instead of single page app
function showTeacherLogin() { window.location.href = '../teacher/teacher-login.html'; }
function showParentLogin() { window.location.href = '../parent/parent-login.html'; }
function showTeacherForgotPassword() { window.location.href = '../forgot-password.html'; }
function showParentForgotPassword() { window.location.href = '../forgot-password.html'; }

function showDashboard() { window.location.href = '../teacher/teacher-dashboard.html'; }
function showAttendanceMenu() { window.location.href = '../teacher/attendance-menu.html'; }
function showMyAttendance() { window.location.href = 'my-attendance.html'; }
function showClassAttendance() { window.location.href = 'class-attendance.html'; }
function showPrintLists() { window.location.href = 'print-lists.html'; }
function showStudentRecords() { window.location.href = '../teacher/student-records.html'; }
function showPaymentStatus() { window.location.href = '../teacher/payment-status.html'; }
function showMarkSheet() { window.location.href = '../teacher/mark-sheet.html'; }
function showFeedback() { window.location.href = '../teacher/feedback.html'; }
function showPaySlips() { window.location.href = '../teacher/pay-slips.html'; }

// Parent-specific navigation
function showParentDashboard() { window.location.href = '../parent/parent-dashboard.html'; }
function showParentStudentInfo() { window.location.href = '../parent/parent-student-info.html'; }
function showParentAttendance() { window.location.href = '../parent/parent-attendance.html'; }

// Login functions
function loginTeacher() {
  const id = document.getElementById('teacherId').value;
  const pwd = document.getElementById('teacherPassword').value;
  if (id && pwd) {
    alert(`Welcome Teacher ${id}`);
    showDashboard();
  } else alert('Please enter valid credentials');
}

function loginParent() {
  const id = document.getElementById('parentId').value;
  const pwd = document.getElementById('parentPassword').value;
  if (id && pwd) {
    alert(`Welcome Parent ${id}`);
    showParentDashboard();
  } else alert('Please enter valid credentials');
}

// Password reset (example alert only)
function resetPassword() {
  const name = document.getElementById('forgotName').value;
  const id = document.getElementById('forgotId').value;
  const newPassword = document.getElementById('newPassword').value;
  const reEnterPassword = document.getElementById('reEnterPassword').value;

  if (!name || !id || !newPassword || !reEnterPassword) {
    alert('Please fill all fields');
    return;
  }
  if (newPassword !== reEnterPassword) {
    alert('Passwords do not match');
    return;
  }
  alert('Password reset successful! Please login again.');
  goBack();
}

// Dummy data generators for attendance/pay slips/etc. You can expand these with real data or API calls

function generateParentAttendance() {
  const dateInput = document.getElementById('parentAttendanceDate').value;
  const table = document.getElementById('parentAttendanceTable');
  const tbody = table.querySelector('tbody');
  tbody.innerHTML = ''; // Clear previous

  if (!dateInput) {
    table.classList.add('hidden');
    return;
  }

  // Populate dummy attendance data
  const periods = ['1st Period', '2nd Period', '3rd Period', '4th Period', '5th Period'];
  periods.forEach(period => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${period}</td><td>${Math.random() > 0.2 ? 'Present' : 'Absent'}</td>`;
    tbody.appendChild(tr);
  });
  table.classList.remove('hidden');
}

function generatePaySlips() {
  const month = document.getElementById('paySlipMonth').value;
  const table = document.getElementById('paySlipTable');
  const tbody = table.querySelector('tbody');
  tbody.innerHTML = '';

  if (!month) {
    table.classList.add('hidden');
    document.getElementById('printPaySlipBtn').classList.add('hidden');
    return;
  }

  // Dummy data for pay slips
  const students = ['Alice', 'Bob', 'Charlie'];
  students.forEach(name => {
    const amount = (Math.floor(Math.random() * 3) + 1) * 500;
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${name}</td><td>${month}</td><td>Rs.${amount}</td>`;
    tbody.appendChild(tr);
  });

  table.classList.remove('hidden');
  document.getElementById('printPaySlipBtn').classList.remove('hidden');
}

// Placeholder stubs for unimplemented UI logic to avoid errors
function generateMyAttendance() {
    const dateInput = document.getElementById('myDate').value;
  const attendanceTable = document.getElementById('myAttendanceTable');
  // Check if a date is selected
  if (dateInput) {
    // Show the attendance table
    attendanceTable.classList.remove('hidden');
  } else {
    // Hide the attendance table if no date is selected
    attendanceTable.classList.add('hidden');
  }
}

function generateClassAttendance() {
  const classSelect = document.getElementById('classSelect').value;
  const classDate = document.getElementById('classDate').value;
  const classTable = document.getElementById('classTable');
  const tbody = classTable.querySelector('tbody');

  // Clear previous data
  tbody.innerHTML = '';

  // Check if both class and date are selected
  if (classSelect && classDate) {
    // Sample data for demonstration
    const attendanceData = {
      '12-A': [
        { name: 'Alice', status: 'Present' },
        { name: 'Bob', status: 'Absent' },
        { name: 'Charlie', status: 'Present' }
      ],
      '12-B': [
        { name: 'David', status: 'Absent' },
        { name: 'Eva', status: 'Present' },
        { name: 'Frank', status: 'Present' }
      ]
    };

    // Populate the table based on selected class
    const students = attendanceData[classSelect];
    students.forEach(student => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${student.name}</td><td>${student.status}</td>`;
      tbody.appendChild(row);
    });

    // Show the attendance table
    classTable.classList.remove('hidden');
  } else {
    // Hide the attendance table if class or date is not selected
    classTable.classList.add('hidden');
  }
}

function generatePrintList() {
  const printClassSelect = document.getElementById('printClassSelect').value;
  const printDate = document.getElementById('printDate').value;
  const printTable = document.getElementById('printTable');
  const tbody = printTable.querySelector('tbody');

  // Clear previous data
  tbody.innerHTML = '';

  // Check if both class and date are selected
  if (printClassSelect && printDate) {
    // Sample data for demonstration
    const printData = {
      '12-A': [
        { name: 'Alice', status: 'Present' },
        { name: 'Bob', status: 'Absent' },
        { name: 'Charlie', status: 'Present' }
      ],
      '12-B': [
        { name: 'David', status: 'Absent' },
        { name: 'Eva', status: 'Present' },
        { name: 'Frank', status: 'Present' }
      ]
    };

    // Populate the table based on selected class
    const students = printData[printClassSelect];
    students.forEach(student => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${student.name}</td><td>${student.status}</td>`;
      tbody.appendChild(row);
    });

    // Show the print table
    printTable.classList.remove('hidden');
  } else {
    // Hide the print table if class or date is not selected
    printTable.classList.add('hidden');
  }
}
function loginManagement() {
  const id = document.getElementById("managementId").value;
  const password = document.getElementById("managementPassword").value;

  // For now, just redirect on any input (replace with real authentication if needed)
  if (id && password) {
    // Redirect to management dashboard
    window.location.href = "../../pages/management/management-dashboard.html";
  } else {
    alert("Please enter valid credentials.");
  }
}

function showManagementStudentRecords() {
  window.location.href = 'management-student-records.html'; // ✔️

}

function showFinances() {
  window.location.href = '../../management/finances.html';
}

function showStaffRecords() {
  window.location.href = '../../management/staff-records.html';
}

function goBack() {
  window.location.href = '../../index.html';
}
function addNewStudent() {
  alert("Redirecting to Add New Students module...");
  // Replace with actual page logic
}

function removeStudent() {
  alert("Redirecting to Remove Students module...");
  // Replace with actual page logic
}

function viewStudentDetails() {
  alert("Redirecting to Student Details module...");
  // Replace with actual page logic
}
function addNewStudent() {
  window.location.href = "add-student.html";
}

function removeStudent() {
  window.location.href = "remove-student.html";
}

function viewStudentDetails() {
  window.location.href = "student-details.html";
}
document.addEventListener("DOMContentLoaded", function () {
  const classSelect = document.getElementById("classSelect");
  const studentListContainer = document.getElementById("studentListContainer");
  const removeTableBody = document.querySelector("#removeTable tbody");

  // Default Class 3rd student list if not set
  if (!localStorage.getItem("class3")) {
    const defaultStudents = [
      { roll: "044", name: "Pooja" },
      { roll: "56", name: "Teena" },
      { roll: "05", name: "Keerthana" },
      { roll: "12", name: "Lasya" },
      { roll: "15", name: "Madhavi" } // roll and name same
    ];
    localStorage.setItem("class3", JSON.stringify(defaultStudents));
  }

  if (classSelect) {
    classSelect.addEventListener("change", function () {
      const selectedClass = classSelect.value;
      if (selectedClass === "3rd") {
        const class3Students = JSON.parse(localStorage.getItem("class3")) || [];
        renderStudentTable(class3Students);
        studentListContainer.style.display = "block";
      } else {
        studentListContainer.style.display = "none";
      }
    });
  }

  function renderStudentTable(students) {
    removeTableBody.innerHTML = ""; // Clear table
    students.forEach((student, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${student.roll}</td>
        <td>${student.name}</td>
        <td><button onclick="deleteStudent(${index})">Delete</button></td>
      `;
      removeTableBody.appendChild(row);
    });
  }

  window.deleteStudent = function (index) {
    let class3Students = JSON.parse(localStorage.getItem("class3")) || [];
    class3Students.splice(index, 1);
    localStorage.setItem("class3", JSON.stringify(class3Students));
    renderStudentTable(class3Students);
  };
});
document.addEventListener("DOMContentLoaded", () => {
  const classSelect = document.getElementById("class-select");
  const studentListContainer = document.getElementById("student-list-container");
  const studentDetails = document.getElementById("student-details");

  const studentData = {
    "3rd": [
      {
        admissionNo: "A12345",
        name: "Pooja",
        roll: "44",
        aadhar: "1234-5678-9012",
        father: "Srinivas Reddy",
        mother: "Lakshmi Reddy",
        dob: "2012-06-15",
        joiningDate: "2016-06-10",
        tcDate: "",
        address: "123 ABC Colony, Hyderabad",
        phone: "9951521662",
        bloodGroup: "O+",
        financialStatus: "Below Poverty Line",
        photo: "pooja.jpg"
      },
      {
        admissionNo: "A12346",
        name: "Teena",
        roll: "42",
        aadhar: "9876-5432-1098",
        father: "Manoj Kumar",
        mother: "Sangeetha",
        dob: "2013-02-20",
        joiningDate: "2017-06-12",
        tcDate: "",
        address: "XYZ Nagar, Warangal",
        phone: "9988776655",
        bloodGroup: "A+",
        financialStatus: "Middle Class",
        photo: "teena.jpg"
      },
      {
  admissionNo: "A12347",
  name: "Rahul Sharma",
  roll: "45",
  aadhar: "4567-8910-1234",
  father: "Vikram Sharma",
  mother: "Neeta Sharma",
  dob: "2012-09-10",
  joiningDate: "2016-07-01",
  tcDate: "",
  address: "Plot 25, Green Park, Delhi",
  phone: "9876543210",
  bloodGroup: "B+",
  financialStatus: "Above Average",
  photo: "rahul.jpg"
},
{
  admissionNo: "A12348",
  name: "Sneha Reddy",
  roll: "46",
  aadhar: "3210-6547-8912",
  father: "Rajesh Reddy",
  mother: "Divya Reddy",
  dob: "2012-12-05",
  joiningDate: "2016-06-25",
  tcDate: "",
  address: "H.No 47, Sunrise Colony, Secunderabad",
  phone: "9966332211",
  bloodGroup: "AB+",
  financialStatus: "Below Poverty Line",
  photo: "sneha.jpg"
}

      
    ]
    // Add more classes as needed...
  };

  classSelect.addEventListener("change", () => {
    const selectedClass = classSelect.value;
    studentListContainer.innerHTML = "";
    studentDetails.innerHTML = "";
    studentDetails.classList.add("hidden");

    if (studentData[selectedClass]) {
      studentData[selectedClass].forEach((student, index) => {
        const btn = document.createElement("button");
        btn.textContent = `View ${student.name}`;
        btn.classList.add("student-button");

        btn.addEventListener("click", () => {
          studentDetails.innerHTML = `
            <h3>Student Details</h3>
            <img src="../../images/${student.photo}" alt="Passport Photo" style="width:100px; height:120px; border-radius: 8px; border: 1px solid #ccc; margin-bottom: 10px;">
            <p><strong>Admission No:</strong> ${student.admissionNo}</p>
            <p><strong>Name:</strong> ${student.name}</p>
            <p><strong>Roll No:</strong> ${student.roll}</p>
            <p><strong>Aadhaar Number:</strong> ${student.aadhar}</p>
            <p><strong>Date of Birth:</strong> ${student.dob}</p>
            <p><strong>Date of Joining:</strong> ${student.joiningDate}</p>
            <p><strong>Date of TC (if applicable):</strong> ${student.tcDate || "N/A"}</p>
            <p><strong>Father's Name:</strong> ${student.father}</p>
            <p><strong>Mother's Name:</strong> ${student.mother}</p>
            <p><strong>Address:</strong> ${student.address}</p>
            <p><strong>Contact Number:</strong> ${student.phone}</p>
            <p><strong>Blood Group:</strong> ${student.bloodGroup}</p>
            <p><strong>Financial Status:</strong> ${student.financialStatus}</p>
          `;
          studentDetails.classList.remove("hidden");
        });

        studentListContainer.appendChild(btn);
      });
    } else {
      studentListContainer.innerHTML = `<p>No data available for selected class.</p>`;
    }
  });
});

function toggleSidebar() {
  const sidebar = document.getElementById("mySidebar");
  if (sidebar.style.left === "0px") {
    sidebar.style.left = "-250px";
  } else {
    sidebar.style.left = "0px";
  }
}
function showReportCard() {
  alert("Report Card feature coming soon!");
}

function showTeacherDetails() {
  alert("Teacher Details feature coming soon!");
}

function showWeeklyTimetable() {
  alert("Weekly Timetable feature coming soon!");
}

function showSchoolCalendar() {
  alert("School Calendar feature coming soon!");
}

function showNotices() {
  alert("Notice Board feature coming soon!");
}