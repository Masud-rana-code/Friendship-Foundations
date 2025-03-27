const ADMIN_PASSWORD = "1234"; // Set your own password

const members = {
    
    "01320369153": {
        name: "Md Ayoub Ali",
        phone: "01320369153",
        image: "img/ayoub.jpeg",
        totalDeposit: 7000,
        dueAmount: 0
    },
    "01780820548": {
        name: "Md Masud Rana",
        phone: "01780820548",
        image: "img/masud.jpg",
        totalDeposit: 7000,
        dueAmount: 0
    },
   
    "01701596668": {
        name: "Md Abu Raihan",
        phone: "01701596668",
        image: "img/raihan.jpg",
        totalDeposit: 5000,
        dueAmount: 200
    },
    "01568547797": {
        name: "Md Sohel Rana",
        phone: "01568547797",
        image: "img/sohel.jpg",
        totalDeposit: 5000,
        dueAmount: 200
    },
    "01985490771": {
        name: "Md Majedur Rahman",
        phone: "01985490771",
        image: "img/mazedur.jpg",
        totalDeposit: 5000,
        dueAmount: 200
    },
    "01319183091": {
        name: "Md Alamin Hossain",
        phone: "01319183091",
        image: "img/alamin.jpg",
        totalDeposit: 5000,
        dueAmount: 200
    },
};

// Load data from Local Storage
function loadDataFromLocalStorage() {
    const storedMembers = JSON.parse(localStorage.getItem("members"));
    if (storedMembers) {
        Object.assign(members, storedMembers);
    }
}

// Check Admin Login
function checkLogin() {
    let enteredPassword = document.getElementById("adminPassword").value.trim();
    if (enteredPassword === ADMIN_PASSWORD) {
        alert("✅ Cashier login successful!");
        localStorage.setItem("isAdmin", "true");
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("logoutSection").style.display = "block";
    } else {
        alert("❌ Wrong password! Try again.");
    }
}

// Logout Function
function logout() {
    localStorage.removeItem("isAdmin");
    alert("✅ Logged out successfully!");
    document.getElementById("loginSection").style.display = "block";
    document.getElementById("logoutSection").style.display = "none";
    document.getElementById("profile-card").style.display = "none";
}

// Search Member
function searchMember() {
    let searchValue = document.getElementById("searchBox").value.trim();
    let foundMember = null;
    let foundKey = null;

    for (let key in members) {
        if (members[key].name.includes(searchValue) || members[key].phone.includes(searchValue)) {
            foundMember = members[key];
            foundKey = key;
            break;
        }
    }

    if (foundMember) {
        document.getElementById("profile-card").style.display = "block";
        document.getElementById("memberName").innerText = foundMember.name;
        document.getElementById("memberPhone").innerText = foundMember.phone;
        document.getElementById("totalDeposit").innerText = foundMember.totalDeposit;
        document.getElementById("dueAmount").innerText = foundMember.dueAmount;
        document.getElementById("memberImage").src = foundMember.image;
        localStorage.setItem("currentMember", foundKey);
        document.getElementById("update-section").style.display = localStorage.getItem("isAdmin") === "true" ? "block" : "none";
    } else {
        alert("❌ Member not found!");
        localStorage.removeItem("currentMember");
    }
}

// Update Deposit
function updateDeposit() {
    if (localStorage.getItem("isAdmin") !== "true") {
        alert("❌ Only addmin can update balance!");
        return;
    }

    let amountInput = document.getElementById("amountInput").value.trim();
    let currentMemberKey = localStorage.getItem("currentMember");

    if (!currentMemberKey || !members[currentMemberKey]) {
        alert("❌ Search for a member first!");
        return;
    }

    if (amountInput === "" || isNaN(amountInput) || amountInput <= 0) {
        alert("⚠️ Enter a valid amount!");
        return;
    }

    let amount = parseInt(amountInput);
    let operation = document.querySelector('input[name="operation"]:checked').value;
    let updatedTotal = members[currentMemberKey].totalDeposit;

    updatedTotal = operation === "subtract" ? updatedTotal - amount : updatedTotal + amount;
    members[currentMemberKey].totalDeposit = Math.max(0, updatedTotal);

    localStorage.setItem("members", JSON.stringify(members));
    alert("✅ Balance updated!");
    searchMember();
}

window.onload = loadDataFromLocalStorage;
