// PWA Service Worker Registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((reg) => console.log("Service worker registered.", reg))
      .catch((err) => console.log("Service worker registration failed:", err));
  });
}

// Theme Switching
const themeSwitch = document.getElementById("theme-switch");
themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("light-mode");
});

// Fader Functionality
const faders = document.querySelectorAll(".fader");
faders.forEach((fader, index) => {
  const knob = fader.querySelector(".fader-knob");
  let isDragging = false;

  knob.addEventListener("mousedown", startDragging);
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDragging);

  knob.addEventListener("touchstart", startDragging);
  document.addEventListener("touchmove", drag);
  document.addEventListener("touchend", stopDragging);

  function startDragging(e) {
    isDragging = true;
    e.preventDefault(); // Prevent text selection
  }

  function stopDragging() {
    isDragging = false;
  }

  function drag(e) {
    if (!isDragging) return;
    const faderRect = fader.getBoundingClientRect();
    const y = (e.clientY || e.touches[0].clientY) - faderRect.top;
    let percentage = (faderRect.height - y) / faderRect.height;
    percentage = Math.max(0, Math.min(1, percentage));
    knob.style.top = `${(1 - percentage) * 100}%`;
    // Here you would send MIDI data based on the fader position
    console.log(`Fader ${index + 1}: ${Math.round(percentage * 127)}`);
  }
});

// Arduino Connection
let port;

async function connectToArduino() {
  try {
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
    console.log("Connected to Arduino");
    // Setup input and output streams here
  } catch (error) {
    console.error("Error connecting to Arduino:", error);
  }
}

document
  .getElementById("connect-arduino")
  .addEventListener("click", connectToArduino);

// Configuration Saving
document
  .getElementById("save-config")
  .addEventListener("click", saveConfiguration);

async function saveConfiguration() {
  const resolution = document.getElementById("resolution-select").value;
  const cc1 = document.getElementById("cc-1").value;
  const cc2 = document.getElementById("cc-2").value;
  const cc3 = document.getElementById("cc-3").value;

  const config = {
    resolution: resolution === "7" ? 0 : resolution === "10" ? 1 : 2,
    ccValues: [parseInt(cc1), parseInt(cc2), parseInt(cc3)],
  };

  console.log("Saving configuration:", config);

  if (port && port.writable) {
    const writer = port.writable.getWriter();
    const encoder = new TextEncoder();
    await writer.write(encoder.encode(JSON.stringify(config)));
    writer.releaseLock();
  }
}

// You may want to add more functions here to handle:
// - Receiving confirmation from the Arduino
// - Updating the UI based on Arduino responses
