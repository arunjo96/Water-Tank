
const blockInput = document.getElementById("blockInput");
const solveBtn = document.getElementById("solveBtn");
const exampleBtn = document.getElementById("exampleBtn");
const resultBox = document.getElementById("resultBox");
const resultValue = document.getElementById("resultValue");
const errorBox = document.getElementById("error");
const svg = document.getElementById("visualization");

const exampleArray = [0, 4, 0, 0, 0, 6, 0, 6, 4, 0];

// 👉 Page load → auto solve
document.addEventListener("DOMContentLoaded", () => {
  blockInput.value = exampleArray.join(",");
  solveWaterTank();
});

// 👉 Example button
exampleBtn.addEventListener("click", () => {
  blockInput.value = exampleArray.join(",");
  clearError();
  solveWaterTank();
});

// 👉 Solve button
solveBtn.addEventListener("click", solveWaterTank);

// ================= MAIN FUNCTION =================
function solveWaterTank() {
  clearError();

  const input = blockInput.value.trim();

  if (!input) {
    showError("Please enter block heights.");
    return;
  }

  const blocks = input
    .split(",")
    .map((num) => num.trim())
    .filter((num) => num !== "")
    .map(Number);

  if (blocks.some(isNaN) || blocks.some((num) => num < 0)) {
    showError("Please enter valid non-negative numbers only.");
    return;
  }

  const totalWater = calculateWater(blocks);

  // 👉 Show result
  resultValue.textContent = totalWater;
  resultBox.classList.add("show");

  // 👉 Draw visualization
  renderVisualization(blocks);
}

// ================= WATER CALCULATION =================
function calculateWater(arr) {
  const n = arr.length;
  if (n === 0) return 0;

  const leftMax = new Array(n);
  const rightMax = new Array(n);

  leftMax[0] = arr[0];
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], arr[i]);
  }

  rightMax[n - 1] = arr[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], arr[i]);
  }

  let water = 0;

  for (let i = 0; i < n; i++) {
    water += Math.min(leftMax[i], rightMax[i]) - arr[i];
  }

  return water;
}

// ================= SVG VISUALIZATION =================
function renderVisualization(blocks) {
  const height = 400;
  const padding = 40;
  const barWidth = 45;
  const gap = 10;

  const maxHeight = Math.max(...blocks);

 
  const scale = maxHeight === 0 ? 0 : (height - 80) / maxHeight;

  const n = blocks.length;
  const leftMax = new Array(n);
  const rightMax = new Array(n);

  leftMax[0] = blocks[0];
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], blocks[i]);
  }

  rightMax[n - 1] = blocks[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], blocks[i]);
  }

  let svgContent = `
    <defs>
      <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:0.4" />
        <stop offset="100%" style="stop-color:#0ea5e9;stop-opacity:0.7" />
      </linearGradient>
    </defs>
  `;

  for (let i = 0; i < n; i++) {
    const x = padding + i * (barWidth + gap);

    const blockHeight = blocks[i] * scale;
    const y = height - padding - blockHeight;

    const waterUnits = Math.min(leftMax[i], rightMax[i]) - blocks[i];
    const waterHeight = waterUnits > 0 ? waterUnits * scale : 0;

  
    if (waterHeight > 0) {
      svgContent += `
        <rect
          x="${x}"
          y="${y - waterHeight}"
          width="${barWidth}"
          height="${waterHeight}"
          fill="url(#waterGradient)"
          rx="2"
        />
      `;
    }

 
    svgContent += `
      <rect
        x="${x}"
        y="${y}"
        width="${barWidth}"
        height="${blockHeight}"
        fill="#facc15"
        stroke="#eab308"
        stroke-width="1"
        rx="3"
      />
    `;

   
    svgContent += `
      <text
        x="${x + barWidth / 2}"
        y="${height - 10}"
        text-anchor="middle"
        fill="#cbd5e1"
        font-size="12"
      >
        ${blocks[i]}
      </text>
    `;
  }

  svg.innerHTML = svgContent;
}


function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.add("show");
}

function clearError() {
  errorBox.classList.remove("show");
  errorBox.textContent = "";
}