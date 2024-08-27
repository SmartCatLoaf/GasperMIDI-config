function setupInputLimits(inputId, min, max) {
  const input = document.getElementById(inputId);
  const resolutionSelect = document.getElementById("resolution-select");

  input.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
    if (this.value === "") return;
    let num = parseInt(this.value);

    const currentResolution = resolutionSelect.value;
    const maxValue = currentResolution === "7" ? 127 : 32;

    if (num > maxValue) this.value = maxValue;
    if (num < min) this.value = min;
  });
}

function updateInputValues() {
  const resolutionSelect = document.getElementById("resolution-select");
  const currentResolution = resolutionSelect.value;
  const maxValue = currentResolution === "7" ? 127 : 32;

  ["cc-1", "cc-2", "cc-3"].forEach((id) => {
    const input = document.getElementById(id);
    const currentValue = parseInt(input.value);
    if (currentValue > maxValue) {
      input.value = maxValue;
    }
  });
}

setupInputLimits("cc-1", 0);
setupInputLimits("cc-2", 0);
setupInputLimits("cc-3", 0);

// Update limits when resolution changes
document
  .getElementById("resolution-select")
  .addEventListener("change", function () {
    setupInputLimits("cc-1", 0);
    setupInputLimits("cc-2", 0);
    setupInputLimits("cc-3", 0);
    updateInputValues();
  });

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

async function sendConfiguration() {
  console.log("Attempting to send configuration...");

  if ("serial" in navigator) {
    console.log("Web Serial API is supported in this browser.");
    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });

      const encoder = new TextEncoder();
      const writer = port.writable.getWriter();

      const resolution = document.getElementById("resolution-select").value;
      const cc1 = document.getElementById("cc-1").value;
      const cc2 = document.getElementById("cc-2").value;
      const cc3 = document.getElementById("cc-3").value;

      const config = {
        resolution: resolution === "7" ? 0 : resolution === "10" ? 1 : 2,
        ccValues: [parseInt(cc1), parseInt(cc2), parseInt(cc3)],
      };

      const data = JSON.stringify(config);
      console.log("Sending configuration:", data);

      await writer.write(encoder.encode(data));

      writer.releaseLock();
      await port.close();

      console.log("Configuration successfully sent!");
      alert("Configuration successfully sent to Arduino!");
    } catch (error) {
      console.error("Error in sending configuration:", error);
      alert(
        "Failed to connect to Arduino. Make sure it's connected and try again. If the problem persists, try using a different USB port or cable."
      );
    }
  } else {
    console.log("Web Serial API is not supported in this browser.");
    alert(
      "Web Serial API is not supported in this browser. Please use a desktop version of Chrome, Edge, or Opera to configure your MIDI controller."
    );
  }
}

// Check for WebSerialAPI support

document.addEventListener("DOMContentLoaded", (event) => {
  if ("serial" in navigator) {
    console.log("Web Serial API IS supported in this browser.");
    document.getElementById("send-config").style.display = "block";
  } else {
    console.log("Web Serial API is NOT supported in this browser.");
    const warningElement = document.createElement("p");
    warningElement.textContent =
      "Web Serial API is not supported in this browser. Please use a desktop version of Chrome, Edge, or Opera to configure your MIDI controller.";
    warningElement.style.color = "red";
    warningElement.style.fontWeight = "bold";
    warningElement.style.textAlign = "center";
    warningElement.style.width = "100%";
    warningElement.style.padding = "10px 0";
    document.querySelector(".button-container").appendChild(warningElement);
    document.getElementById("send-config").style.display = "none";
  }
});
