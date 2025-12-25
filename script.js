// Student Data Object
let studentData = {};

// Update UI Function
function updateUI(data) {

    document.getElementById("overallScore").innerText =
        data.overall + " / 9";

    document.getElementById("pronunciation").innerText = data.pronunciation;
    document.getElementById("fluency").innerText = data.fluency;
    document.getElementById("vocabulary").innerText = data.vocabulary;
    document.getElementById("grammar").innerText = data.grammar;

    // Progress bars
    document.getElementById("pronBar").style.width = (data.pronunciation / 9) * 100 + "%";
    document.getElementById("fluencyBar").style.width = (data.fluency / 9) * 100 + "%";
    document.getElementById("vocabBar").style.width = (data.vocabulary / 9) * 100 + "%";
    document.getElementById("grammarBar").style.width = (data.grammar / 9) * 100 + "%";

    // Feedback logic
    let feedback = "";
    if (data.overall >= 8) {
        feedback = "Excellent performance with strong control.";
    } else if (data.overall >= 6) {
        feedback = "Good performance with minor inaccuracies.";
    } else {
        feedback = "Needs improvement. More practice is required.";
    }
    document.getElementById("feedbackText").innerText = feedback;
}

// Initial Data Fetch
fetch("data.json")
    .then(res => res.json())
    .then(data => {
        studentData = data;
        updateUI(studentData);
    });

// display input form
document.getElementById("ChangeData").addEventListener("click", () => {
    document.getElementById("inputForm").style.display = "block";
    document.getElementById("ChangeData").style.display = "none";
    document.getElementById("default").style.display = "block";
    document.getElementById("pronInput").value = 0;
    document.getElementById("fluencyInput").value = 0;
    document.getElementById("vocabInput").value = 0;
    document.getElementById("grammarInput").value = 0;
});

// Update Data from Input
document.getElementById("updateBtn").addEventListener("click", () => {

    let overall =
        (Number(pronInput.value) +
        Number(fluencyInput.value) +
        Number(vocabInput.value) +
        Number(grammarInput.value)) / 4;

    overall = Number(overall.toFixed(1));
    overallInput.value = overall;

    studentData = {
        overall: overall,
        pronunciation: Number(pronInput.value),
        fluency: Number(fluencyInput.value),
        vocabulary: Number(vocabInput.value),
        grammar: Number(grammarInput.value)
    };

    updateUI(studentData);
});


// Reset to Default Data 
document.getElementById("default").addEventListener("click", () => {
    fetch("data.json")
        .then(res => res.json())
        .then(data => {
            studentData = data;
            updateUI(studentData);
        });
    document.getElementById("inputForm").style.display = "none";
    document.getElementById("default").style.display = "none";
    document.getElementById("ChangeData").style.display = "block";
});


// Dark Mode Toggle

// Create toggle button
const darkBtn = document.createElement("button");
darkBtn.className = "dark-toggle";
darkBtn.innerText = "🌙 Dark Mode";
document.body.appendChild(darkBtn);

// Load saved mode
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    darkBtn.innerText = "☀️ Light Mode";
}

// Toggle theme
darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        darkBtn.innerText = "☀️ Light Mode";
    } else {
        localStorage.setItem("theme", "light");
        darkBtn.innerText = "🌙 Dark Mode";
    }
});


