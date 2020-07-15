//selecotors
const canvas = document.querySelector("canvas");
const nav = document.querySelector("nav");
[
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];
canvas.height = 500;
canvas.width = window.innerWidth;
const grid = [];
c = canvas.getContext("2d");
//grid size
box_width = 20;
box_height = 20;
maxNumberCols = Math.floor(canvas.width / box_width);
maxNumberRows = Math.floor(canvas.height / box_height);

m_position = {
  x: undefined,
  y: undefined,
};

//event listenres
canvas.addEventListener("click", function (e) {
  m_position.x = e.x;
  m_position.y = e.y - nav.offsetHeight; //canvas starts at the end of the nav;
  index_x = Math.floor(m_position.x / box_width);
  index_y = Math.floor(m_position.y / box_height);
  grid[index_y][index_x] = 1;
  drawBox(index_x, index_y);
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

gridGenerate();
