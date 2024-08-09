// Theme Switching
const themeSwitch = document.getElementById("theme-switch");
document.body.classList.add("dark-mode"); // Set dark mode as default
themeSwitch.checked = false; // Ensure checkbox is unchecked by default
themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
});

// Configuration Saving
document
  .getElementById("save-config")
  .addEventListener("click", saveConfiguration);

function saveConfiguration() {
  const resolution = document.getElementById("resolution-select").value;
  const cc1 = document.getElementById("cc-1").value;
  const cc2 = document.getElementById("cc-2").value;
  const cc3 = document.getElementById("cc-3").value;

  const config = {
    resolution: resolution === "7" ? 0 : resolution === "10" ? 1 : 2,
    ccValues: [parseInt(cc1), parseInt(cc2), parseInt(cc3)],
  };

  console.log("Saving configuration:", config);
  // Here you would send this configuration to the Arduino
  // using Web Serial API or another method
}

// Arduino Connection (only for demonstration, won't work locally)
document.getElementById("connect-arduino").addEventListener("click", () => {
  console.log("Attempting to connect to Arduino...");
  // Actual connection code would go here
});
