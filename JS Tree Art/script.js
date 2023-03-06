// get canvas element and set its dimensions
const canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// create a 2D context
const ctx = canvas.getContext("2d");

// define the tree properties
const tree = {
  startX: canvas.width / 2,
  startY: canvas.height,
  trunkWidth: 30,
  trunkHeight: canvas.height / 3,
  branchWidth: 60,
  branchHeight: canvas.height / 5,
  angle: -Math.PI / 2,
  depth: 0,
  maxDepth: 8,
  maxBranches: 4,
  branchAngle: Math.PI / 4,
  branchLengthMultiplier: 0.7,
  leafColor: "#00ff00",
  branchColor: "#a0522d",
};

// create the tree trunk
ctx.fillStyle = tree.branchColor;
ctx.fillRect(
  tree.startX - tree.trunkWidth / 2,
  tree.startY - tree.trunkHeight,
  tree.trunkWidth,
  tree.trunkHeight
);

// draw the tree branches recursively
function drawBranch(x, y, angle, length, depth) {
  // calculate the end point of the branch
  const endX = x + Math.cos(angle) * length;
  const endY = y + Math.sin(angle) * length;

  // draw the branch
  ctx.strokeStyle = tree.branchColor;
  ctx.lineWidth = tree.branchWidth * (tree.maxDepth - depth + 1) / tree.maxDepth;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(endX, endY);
  ctx.stroke();

  // draw leaves if the branch is at the maximum depth
  if (depth >= tree.maxDepth) {
    ctx.fillStyle = tree.leafColor;
    ctx.beginPath();
    ctx.arc(endX, endY, 10, 0, 2 * Math.PI);
    ctx.fill();

    // randomly draw apples on the leaves
    const appleCount = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < appleCount; i++) {
      const appleX = endX + (Math.random() - 1) * 20;
      const appleY = endY + (Math.random() - 0.5) * 20;
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(appleX, appleY, 5, 2, 2 * Math.PI);
      ctx.fill();
    }
  } else {
    // otherwise, create child branches
    const branchCount = Math.floor(Math.random() * tree.maxBranches) + 3;
    for (let i = 0; i < branchCount; i++) {
      const newAngle =
        angle +
        tree.branchAngle * (i - (branchCount - 1) / 2) +
        Math.random() * Math.PI / 8;
      const newLength = length * tree.branchLengthMultiplier;
      drawBranch(endX, endY, newAngle, newLength, depth + 1);
    }
  }
}

// draw the tree branches
drawBranch(
  tree.startX,
  tree.startY - tree.trunkHeight,
  tree.angle,
  tree.branchHeight,
  tree.depth
);


  
