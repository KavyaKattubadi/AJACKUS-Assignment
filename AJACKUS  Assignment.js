let employees = [{
        id: 1,
        firstName: "Alice",
        lastName: "Smith",
        email: "alice@example.com",
        department: "HR",
        role: "Manager"
    },
    {
        id: 2,
        firstName: "Bob",
        lastName: "Johnson",
        email: "bob@example.com",
        department: "IT",
        role: "Developer"
    },
    {
        id: 3,
        firstName: "Charlie",
        lastName: "Lee",
        email: "charlie@example.com",
        department: "Finance",
        role: "Analyst"
    }
];

let filteredEmployees = [...employees];

function renderEmployees() {
    const list = document.getElementById("employeeList");
    list.innerHTML = "";
    const showCount = parseInt(document.getElementById("showCount").value) || 10;
    filteredEmployees.slice(0, showCount).forEach(emp => {
        const div = document.createElement("div");
        div.className = "employee-card";
        div.innerHTML = `
      <strong>${emp.firstName} ${emp.lastName}</strong>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
        list.appendChild(div);
    });
}

function openForm() {
    document.getElementById("formTitle").innerText = "Add Employee";
    document.getElementById("form").reset();
    document.getElementById("employeeId").value = "";
    document.getElementById("employeeForm").style.display = "block";
}

function closeForm() {
    document.getElementById("employeeForm").style.display = "none";
}

document.getElementById("form").addEventListener("submit", function(e) {
    e.preventDefault();
    const id = document.getElementById("employeeId").value;
    const newEmp = {
        id: id ? parseInt(id) : Date.now(),
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        department: document.getElementById("department").value,
        role: document.getElementById("role").value
    };

    if (id) {
        const index = employees.findIndex(emp => emp.id == id);
        employees[index] = newEmp;
    } else {
        employees.push(newEmp);
    }

    filteredEmployees = [...employees];
    renderEmployees();
    closeForm();
});

function editEmployee(id) {
    const emp = employees.find(e => e.id === id);
    document.getElementById("employeeId").value = emp.id;
    document.getElementById("firstName").value = emp.firstName;
    document.getElementById("lastName").value = emp.lastName;
    document.getElementById("email").value = emp.email;
    document.getElementById("department").value = emp.department;
    document.getElementById("role").value = emp.role;
    document.getElementById("formTitle").innerText = "Edit Employee";
    document.getElementById("employeeForm").style.display = "block";
}

function deleteEmployee(id) {
    if (confirm("Are you sure?")) {
        employees = employees.filter(e => e.id !== id);
        filteredEmployees = [...employees];
        renderEmployees();
    }
}

function toggleFilter() {
    const sidebar = document.getElementById("filterSidebar");
    sidebar.style.display = sidebar.style.display === "block" ? "none" : "block";
}

function applyFilters() {
    const fname = document.getElementById("filterFirstName").value.toLowerCase();
    const dept = document.getElementById("filterDepartment").value.toLowerCase();
    const role = document.getElementById("filterRole").value.toLowerCase();

    filteredEmployees = employees.filter(emp =>
        emp.firstName.toLowerCase().includes(fname) &&
        emp.department.toLowerCase().includes(dept) &&
        emp.role.toLowerCase().includes(role)
    );
    renderEmployees();
}

function resetFilters() {
    document.getElementById("filterFirstName").value = "";
    document.getElementById("filterDepartment").value = "";
    document.getElementById("filterRole").value = "";
    filteredEmployees = [...employees];
    renderEmployees();
}

function sortEmployees() {
    const sortKey = document.getElementById("sortSelect").value;
    filteredEmployees.sort((a, b) => a[sortKey]?.localeCompare(b[sortKey]));
    renderEmployees();
}

document.getElementById("searchInput").addEventListener("input", function() {
    const keyword = this.value.toLowerCase();
    if (keyword === "") {
        filteredEmployees = [...employees];
    } else {
        filteredEmployees = employees.filter(emp =>
            emp.firstName.toLowerCase().includes(keyword) ||
            emp.lastName.toLowerCase().includes(keyword) ||
            emp.email.toLowerCase().includes(keyword)
        );
    }
    renderEmployees();
});

renderEmployees();