

//  Calculate trapped water
function calculateWater(heights) {
  if (!Array.isArray(heights) || heights.length === 0) return 0;

  const n = heights.length;
  const leftMax = new Array(n).fill(0);
  const rightMax = new Array(n).fill(0);


  leftMax[0] = heights[0];
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], heights[i]);
  }


  rightMax[n - 1] = heights[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], heights[i]);
  }

  
  let totalWater = 0;
  for (let i = 0; i < n; i++) {
    const waterLevel = Math.min(leftMax[i], rightMax[i]);
    totalWater += Math.max(0, waterLevel - heights[i]);
  }

  return totalWater;
}


function parseInput(input) {
  const trimmed = input.trim();
  if (!trimmed) throw new Error("Please enter values");

  const values = trimmed.split(",").map((v) => {
    const num = parseInt(v.trim());
    if (isNaN(num) || num < 0) {
      throw new Error("All values must be non-negative integers");
    }
    return num;
  });

  if (values.length === 0) throw new Error("Please enter at least one value");
  return values;
}

// Visualize using SVG
function visualize(heights) {
  const svg = document.getElementById("visualization");
  svg.innerHTML = "";

  if (heights.length === 0) return;

  const maxHeight = Math.max(...heights, 1);
  const padding = 40;
  const width = 600;
  const height = 400;
  const blockWidth = (width - 2 * padding) / heights.length;
  const scale = (height - 2 * padding) / maxHeight;

  
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const waterGradient = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "linearGradient",
  );
  waterGradient.setAttribute("id", "waterGradient");
  waterGradient.setAttribute("x1", "0%");
  waterGradient.setAttribute("y1", "0%");
  waterGradient.setAttribute("x2", "0%");
  waterGradient.setAttribute("y2", "100%");

  const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("style", "stop-color:#06b6d4;stop-opacity:0.4");

  const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop2.setAttribute("offset", "100%");
  stop2.setAttribute("style", "stop-color:#0ea5e9;stop-opacity:0.6");

  waterGradient.appendChild(stop1);
  waterGradient.appendChild(stop2);
  defs.appendChild(waterGradient);
  svg.appendChild(defs);


  const n = heights.length;
  const leftMax = new Array(n).fill(0);
  const rightMax = new Array(n).fill(0);

  leftMax[0] = heights[0];
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], heights[i]);
  }

  rightMax[n - 1] = heights[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], heights[i]);
  }

  
  for (let i = 0; i < heights.length; i++) {
    const x = padding + i * blockWidth;
    const blockHeight = heights[i] * scale;
    const y = height - padding - blockHeight;

    // Draw water
    const waterLevel = Math.min(leftMax[i], rightMax[i]);
    const waterHeight = (waterLevel - heights[i]) * scale;

    if (waterHeight > 0) {
      const waterRect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect",
      );
      waterRect.setAttribute("x", x + 2);
      waterRect.setAttribute("y", y + blockHeight);
      waterRect.setAttribute("width", blockWidth - 4);
      waterRect.setAttribute("height", waterHeight);
      waterRect.setAttribute("fill", "url(#waterGradient)");
      waterRect.setAttribute("rx", "2");
      svg.appendChild(waterRect);
    }


    const blockRect = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect",
    );
    blockRect.setAttribute("x", x + 2);
    blockRect.setAttribute("y", y);
    blockRect.setAttribute("width", blockWidth - 4);
    blockRect.setAttribute("height", blockHeight);
    blockRect.setAttribute("fill", "#3b82f6");
    blockRect.setAttribute("stroke", "#1e40af");
    blockRect.setAttribute("stroke-width", "1");
    blockRect.setAttribute("rx", "2");
    blockRect.setAttribute("class", "block-rect");
    svg.appendChild(blockRect);


    if (heights[i] > 0) {
      const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text",
      );
      text.setAttribute("x", x + blockWidth / 2);
      text.setAttribute("y", y + blockHeight / 2 + 5);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("fill", "#f1f5f9");
      text.setAttribute("font-size", "12");
      text.setAttribute("font-weight", "bold");
      text.setAttribute("pointer-events", "none");
      text.textContent = heights[i];
      svg.appendChild(text);
    }
  }


  const baseline = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line",
  );
  baseline.setAttribute("x1", padding);
  baseline.setAttribute("y1", height - padding);
  baseline.setAttribute("x2", width - padding);
  baseline.setAttribute("y2", height - padding);
  baseline.setAttribute("stroke", "#334155");
  baseline.setAttribute("stroke-width", "2");
  baseline.setAttribute("stroke-dasharray", "5,5");
  svg.appendChild(baseline);
}


document.getElementById("solveBtn").addEventListener("click", () => {
  const errorEl = document.getElementById("error");
  const resultBox = document.getElementById("resultBox");

  try {
    errorEl.classList.remove("show");
    const input = document.getElementById("blockInput").value;
    const heights = parseInput(input);

    const water = calculateWater(heights);
    document.getElementById("resultValue").textContent = water;
    resultBox.classList.add("show");

    visualize(heights);
  } catch (err) {
    errorEl.textContent = "❌ " + err.message;
    errorEl.classList.add("show");
    resultBox.classList.remove("show");
    document.getElementById("visualization").innerHTML =
      '<text x="300" y="200" text-anchor="middle" fill="#cbd5e1" font-size="16">Enter values and click "Solve" to visualize</text>';
  }
});

document.getElementById("exampleBtn").addEventListener("click", () => {
  document.getElementById("blockInput").value = "0,4,0,0,0,6,0,6,4,0";
  document.getElementById("solveBtn").click();
});


document.getElementById("blockInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter" && e.ctrlKey) {
    document.getElementById("solveBtn").click();
  }
});

// Load example on page load
window.addEventListener("load", () => {
  document.getElementById("exampleBtn").click();
});
