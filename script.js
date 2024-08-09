//Input limiting
function setupInputLimits(inputId, min, max) {
  const input = document.getElementById(inputId);
  input.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
    if (this.value === "") return;
    let num = parseInt(this.value);
    if (num > max) this.value = max;
    if (num < min) this.value = min;
  });
}
setupInputLimits("cc-1", 0, 127);
setupInputLimits("cc-2", 0, 127);
setupInputLimits("cc-3", 0, 127);

// Theme Switching
const themeSwitch = document.getElementById("theme-switch");
document.body.classList.add("dark-mode"); // Set dark mode as default
themeSwitch.checked = false; // Ensure checkbox is unchecked by default
themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
});

// Configuration Sending
document
  .getElementById("send-config")
  .addEventListener("click", sendConfiguration);

function sendConfiguration() {
  const resolution = document.getElementById("resolution-select").value;
  const cc1 = document.getElementById("cc-1").value;
  const cc2 = document.getElementById("cc-2").value;
  const cc3 = document.getElementById("cc-3").value;

  const config = {
    resolution: resolution === "7" ? 0 : resolution === "10" ? 1 : 2,
    ccValues: [parseInt(cc1), parseInt(cc2), parseInt(cc3)],
  };

  console.log("Sending configuration:", config);
  alert("Sending configuration");
  // Here you would send this configuration to the Arduino
  // using Web Serial API or another method
}

// Arduino Connection (only for demonstration, won't work locally)
document.getElementById("connect-arduino").addEventListener("click", () => {
  console.log("Attempting to connect to Arduino...");
  alert("Attempting to connect to Arduino...");
  // Actual connection code would go here
});
