// Get elements
const passwordForm = document.getElementById("passwordForm");
const passwordList = document.getElementById("passwordList");

// Helper to get passwords from localStorage
function getPasswords() {
  return JSON.parse(localStorage.getItem("passwords")) || [];
}

// Helper to save passwords to localStorage
function setPasswords(passwords) {
  localStorage.setItem("passwords", JSON.stringify(passwords));
}

// Load and display all saved passwords
function loadPasswords() {
  const passwords = getPasswords();
  passwordList.innerHTML = "";

  passwords.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "password-item";
    div.innerHTML = `
      <div class="info-line">
        <span class="label">Website:</span> ${item.website}
      </div>
      <div class="info-line">
        <span class="label">Username:</span> ${item.username}
        <button class="copy-btn" data-copy="${item.username}">Copy Username</button>
      </div>
      <div class="info-line">
        <span class="label">Password:</span> ${item.password}
        <button class="copy-btn" data-copy="${item.password}">Copy Password</button>
      </div>
      <button class="delete-btn" onclick="deletePassword(${index})" >Delete</button>
    `;
    passwordList.appendChild(div);
  });

  // Attach copy button listeners
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const text = btn.dataset.copy;
      navigator.clipboard
        .writeText(text)
        .then(() => {
          showTooltip(btn, "Copied!");
        })
        .catch((err) => {
          console.error("Copy failed:", err);
        });
    });
  });
}

// Tooltip shown after copying
function showTooltip(button, message) {
  const tooltip = document.createElement("span");
  tooltip.className = "tooltip";
  tooltip.textContent = message;

  button.parentElement.appendChild(tooltip);

  setTimeout(() => {
    tooltip.remove();
  }, 1500);
}

// Save new password entry
function savePassword(website, username, password) {
  const passwords = getPasswords();
  passwords.push({ website, username, password });
  setPasswords(passwords);
  loadPasswords();
}

// Delete password by index
function deletePassword(index) {
  const passwords = getPasswords();
  passwords.splice(index, 1);
  setPasswords(passwords);
  loadPasswords();
}

// Handle form submit
passwordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const website = document.getElementById("website").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  savePassword(website, username, password);
  passwordForm.reset();
});

// Initial load
loadPasswords();
