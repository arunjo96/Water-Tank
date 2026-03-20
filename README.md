
## 💧 Water Tank Problem Solver

An interactive web application to visualize and solve the classic Water Trapping Problem using Vanilla JavaScript, HTML, and CSS.

## 📋 Problem Description
Given an array of non-negative integers representing block heights, calculate how many units of water can be trapped after it rains.

## 📌 Example

**Input:** `[0, 4, 0, 0, 0, 6, 0, 6, 4, 0]` 

**Output:** `18 Units`

## 📂 Project Structure

```
water-tank/
│
├── index.html
├── README.md
│
├── assets/
│   ├── css/
│   │   └── master.css
│   │
│   ├── js/
│      └── main.js   
└──

```

## 🚀 Features

✨ **Interactive SVG Visualization**  
See blocks and trapped water in real-time with dynamic SVG rendering.

📝 **Custom Input**  
Enter any array of heights and instantly visualize the result.

💯 **Accurate Calculation**  
Implements an efficient algorithm with **O(n) time complexity**.

🎨 **Modern UI**  
Beautiful dark theme with smooth gradient accents for better UX.

📱 **Responsive Design**  
Fully responsive — works seamlessly on desktop and mobile devices.

⚡ **Instant Results**  
Get real-time visualization as you type input values.

📚 **Algorithm Explanation**  
Includes a step-by-step explanation of how the solution works.

## 💻 Technology Stack

- **HTML5** – Semantic markup  

- **CSS3** – Modern styling with variables, Flexbox, and gradients 

- **JavaScript (Vanilla)** – Pure JS, no frameworks or dependencies  

- **SVG** – Vector graphics for visualization  

## 🎯 Algorithm Explanation

- **Time Complexity:** `O(n)`  

- **Space Complexity:** `O(n)`

The solution uses the **Two-Pointer Approach**:

1. **Calculate Left Max**  
   For each position, store the maximum height to its left.

2. **Calculate Right Max**  
   For each position, store the maximum height to its right.

3. **Water Trapped**  
   At position `i`:  
   `water[i] = min(leftMax[i], rightMax[i]) - height[i]`

4. **Sum All**  
   Add water from all positions to get the total.


### 📌 Formula

`Water at position i = min(maxHeightLeft, maxHeightRight) - currentHeight`

## 📖 How to Use

1. **Enter Block Heights**  
   Type comma-separated values in the input field 

   _Example:_ `0,4,0,0,0,6,0,6,4,0`

2. **Click "Solve"**  
   Calculate the trapped water  

   - Result appears instantly  

   - SVG visualization updates automatically  

3. **View Visualization**  
   - 🔵 Blue blocks = actual blocks 

   - 💧 Cyan water = trapped water  

   - 🔢 Numbers show block heights  

4. **Try Example**  
   Click **"Use Example"** to load the demo input  

## ⚙️ Installation & Setup

 Clone the repo
   ```bash
   git clone https://github.com/arunjo96/Water-Tank.git

