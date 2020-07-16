//selecotors
const canvas = document.querySelector("canvas");
const nav = document.querySelector("nav");

canvas.height = 500;
canvas.width = window.innerWidth;
c = canvas.getContext("2d");

//grid size
let [i, j] = [undefined, undefined];
const visited = [];
const grid = [];
box_width = 20;
box_height = 20;
maxNumberCols = Math.floor(canvas.width / box_width);
maxNumberRows = Math.floor(canvas.height / box_height);

//mouse position
m_position = {
  x: undefined,
  y: undefined,
};

let starting = false;
//event listenres
canvas.addEventListener("click", function (e) {
  m_position.x = e.x;
  m_position.y = e.y - nav.offsetHeight; //canvas starts at the end of the nav;
  index_x = Math.floor(m_position.x / box_width);
  index_y = Math.floor(m_position.y / box_height);
  grid[index_y][index_x] = 1;
  starting = true;
});

//functions

function gridGenerate() {
  for (let i = 0; i < maxNumberCols; i++) {
    grid.push([]);
    for (let j = 0; j < maxNumberRows; j++) {
      grid[i].push(0);
      c.beginPath();
      c.strokeRect(i * 20, j * 20, 20, 20);
    }
  }
}

function drawBox(index_x, index_y) {
  c.beginPath();
  c.fillRect(index_x * box_width, index_y * box_height, box_width, box_height);
  c.fill();
}

function StartNode(index_x, index_y, color) {
  this.index_x = index_x;
  this.index_y = index_y;
  this.color = color;
  this.x = index_x * box_width;
  this.y = index_y * box_height;
  grid[index_y][index_x] = "S";
}

function EndNode(index_x, index_y, color) {
  this.index_x = index_x;
  this.index_y = index_y;
  this.color = color;
  this.x = index_x * box_width;
  this.y = index_y * box_height;
  grid[index_y][index_x] = "E";
}

gridGenerate();

start_node = new StartNode(15, 15, "green");
end_node = new EndNode(18, 14, "red");

function draw() {
  for (let i = 0; i < maxNumberCols; i++) {
    for (let j = 0; j < maxNumberRows; j++) {
      if (grid[j][i] == "S") {
        c.beginPath();
        c.fillStyle = start_node.color;
        c.fillRect(i * box_width, j * box_height, box_width, box_height);
      } else if (grid[j][i] == "E") {
        c.beginPath();
        c.fillStyle = end_node.color;
        c.fillRect(i * box_width, j * box_height, box_width, box_height);
      } else if (grid[j][i] == 1) {
        c.beginPath();
        c.fillStyle = "black";
        c.fillRect(i * box_width, j * box_height, box_width, box_height);
      } else if (grid[j][i] == "V") {
        c.beginPath();
        c.fillStyle = "lightgreen";
        c.fillRect(i * box_width, j * box_height, box_width, box_height);
      } else {
        c.beginPath();
        c.strokeRect(i * box_width, j * box_height, box_width, box_height);
      }
    }
  }
}

function getMove(i, j, direction) {
  switch (direction) {
    case "L":
      i -= 1;
      break;
    case "R":
      i += 1;
      break;
    case "U":
      j -= 1;
      break;
    case "D":
      j += 1;
      break;
  }

  //   if (direction === "L") {
  //   } else if (direction === "R") {
  //     i += 1;
  //   } else if (direction === "U") {
  //     j -= 1;
  //   } else if (direction === "D") {
  //     j += 1;
  //   }
  return [i, j];
}

function isValid(move) {
  if (move[0] < grid[0].length && move[1] < grid.length) {
    if (listHas(visited, move)) return false;
    if (grid[move[1]][move[0]] != "S" && grid[move[1]][move[0]] != "E") {
      return true;
    }
  }
  return false;
}

//check if a list of lists includes a list
//arguments(list_of_lists, list)
//return bool
function listHas(array1, array2) {
  let ar1 = array1;
  let ar2 = array2;
  for (let j = 0; j < ar1.length; j++) {
    ar1_child = ar1[j];
    let equals = true;
    if (ar1_child.length == ar2.length) {
      for (let i = 0; i < ar1_child.length; i++) {
        if (ar1_child[i] != ar2[i]) {
          equals = false;
        }
      }
      if (!equals) continue;
      return true;
    } else continue;
  }
  return false;
}

const unvisited_list = [[start_node.index_x, start_node.index_y]];
function bfs() {
  [x, y] = unvisited_list.shift();
  console.log(x, y);
  if (grid[y][x] !== "E") {
    let directions = ["L", "U", "R", "D"];
    for (let i = 0; i < directions.length; i++) {
      move = getMove(x, y, directions[i]);
      if (isValid(move)) {
        unvisited_list.push(move);
      }
    }
  }
  visited.push([x, y]);
  grid[y][x] = "V";
}

function animate() {
  requestAnimationFrame(animate);
  draw();
  //   if (grid[bfs()[1]][bfs()[0]] === "E") {
  //     starting = false;
  //   }
  if (starting) {
    bfs();
  }
}

animate();
