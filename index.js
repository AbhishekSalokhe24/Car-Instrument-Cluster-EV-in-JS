let speed = 120;
// Function to calculate the stroke-dashoffset based on the speed
function calculateDashOffset(speed) {
  // The maximum stroke-dashoffset is 615, which corresponds to a speed of 0 km/h
  // The minimum stroke-dashoffset is 0, which corresponds to a speed of 180 km/h
  let strokeDashoffset = 615 - (speed / 180) * 615;
  return strokeDashoffset;
}

// Function to update the speed display and stroke-dashoffset
function updateSpeedDisplay(speed) {
  // Calculate the stroke-dashoffset based on the speed
  let strokeDashoffset = calculateDashOffset(speed);
  
  // Get the speed display element
  let speedDisplay = document.getElementById("speed");
  
  // Update the text content of the speed display element
  speedDisplay.textContent = speed;
  // speedDisplay.textContent = speed + ' km/h';
  
  // Get the meter bar element
  let meterBar = document.getElementById("meter-bg-bar");
  
  // Update the stroke-dashoffset of the meter bar
  meterBar.style.strokeDashoffset = strokeDashoffset;
}

// Function to set the speed manually
function setSpeed(speed) {
  // Ensure the speed is within the valid range
  if (speed < 0) speed = 0;
  if (speed > 180) speed = 180;
  
  // Update the speed display and stroke-dashoffset
  updateSpeedDisplay(speed);
  updateMeterColor(speed);
}

// Example usage: Update the speed to 90 km/h
setSpeed(speed);

// Optionally, you can attach this to a slider or input field to set the speed dynamically
// document.getElementById('speed-input').addEventListener('input', function(event) {
//   let speed = parseInt(event.target.value, 10);
//   setSpeed(speed);
// });

function updateMeterColor(speed) {
  const meterBgBar = document.getElementById('meter-bg-bar');
  
  if (speed >= 20 && speed < 60) {
    meterBgBar.setAttribute('stroke', 'green');
  } else if (speed >= 60 && speed < 120) {
    meterBgBar.setAttribute('stroke', 'yellow');
  } else if (speed >= 120 && speed <= 180) {
    meterBgBar.setAttribute('stroke', 'red');
  } else {
    meterBgBar.setAttribute('stroke', 'none'); // Default or fallback color
  }
}

// Example usage: update the meter color based on a specific speed
// Change this value to test different speeds
updateMeterColor(speed);

//   ------------ Code for Battery

const chargeLevel = document.getElementById("charge-level");
const charge = document.getElementById("charge");
const chargingTimeRef = document.getElementById("charging-time");

window.onload = () => {
  //For browsers that don't support the battery status API
  if (!navigator.getBattery) {
    alert("Battery Status Api Is Not Supported In Your Browser");
    return false;
  }
};

navigator.getBattery().then((battery) => {
  function updateAllBatteryInfo() {
    updateChargingInfo();
    updateLevelInfo();
  }
  updateAllBatteryInfo();

  //When the charging status changes
  battery.addEventListener("chargingchange", () => {
    updateAllBatteryInfo();
  });

  //When the Battery Level Changes
  battery.addEventListener("levelchange", () => {
    updateAllBatteryInfo();
  });

  function updateChargingInfo() {
    if (battery.charging) {
      charge.classList.add("active");
      chargingTimeRef.innerText = "";
    } else {
      charge.classList.remove("active");

      //Display time left to discharge only when it is a integer value i.e not infinity
      if (parseInt(battery.dischargingTime)) {
        let hr = parseInt(battery.dischargingTime / 3600);
        let min = parseInt(battery.dischargingTime / 60 - hr * 60);
        chargingTimeRef.innerText = `${hr}hr ${min}mins remaining`;
      }
    }
  }

  //Updating battery level
  function updateLevelInfo() {
    let batteryLevel = `${parseInt(battery.level * 100)}%`;
    charge.style.width = `calc(${batteryLevel} - 20px)`;
    chargeLevel.textContent = batteryLevel;
  }
});
