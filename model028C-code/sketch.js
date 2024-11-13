let serial;
let threshold = 10000; // 数据变化阈值
let boxes = [
  { accel: { x: 0, y: 0, z: 0 }, gyro: { x: 0, y: 0, z: 0 }, angleZ: 0, targetAngleZ: 0 },
  { accel: { x: 0, y: 0, z: 0 }, gyro: { x: 0, y: 0, z: 0 }, angleZ: 0, targetAngleZ: 0 },
  { accel: { x: 0, y: 0, z: 0 }, gyro: { x: 0, y: 0, z: 0 }, angleZ: 0, targetAngleZ: 0 }
];

// 更新后的 typeMapping 数组 B
let typeMapping = [
  [3, 2, 2, 2, 2, 2, 0, 0],
  [1, 0, 0, 0, 0, 0, 1, 0],
  [1, 0, 0, 0, 0, 0, 1, 0],
  [1, 2, 2, 2, 2, 1, 0, 0],
  [1, 0, 0, 0, 0, 0, 1, 0],
  [1, 0, 0, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 1, 1, 0],
  [3, 2, 2, 2, 2, 2, 0, 0]
];


let    spt=false

let   zm= [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
]
let    zkm=[
  [
    [0, 0, 0, 0, 0, 0, 3, 3],
    [0, 0, 0, 0, 2, 2, 2, 1], 
    [0, 0, 0, 2, 1, 0, 0, 1], 
    [0, 0, 2, 1, 0, 0, 0, 1], 
    [0, 2, 1, 0, 0, 0, 0, 1], 
    [0, 2, 1, 0, 0, 0, 0, 1], 
    [1, 2, 2, 2, 2, 2, 2, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1],
  ],
  [
    [3, 2, 2, 2, 2, 2, 0, 0],
    [1, 0, 0, 0, 0, 0, 1, 0], 
    [1, 0, 0, 0, 0, 0, 1, 0], 
    [1, 2, 2, 2, 2, 1, 0, 0], 
    [1, 0, 0, 0, 0, 0, 1, 0], 
    [1, 0, 0, 0, 0, 0, 1, 2], 
    [1, 0, 0, 0, 0, 0, 1, 2], 
    [1, 0, 0, 0, 0, 1, 1, 0], 
    [3, 2, 2, 2, 2, 2,0, 0],
  ],
  [
    [0, 0, 0, 2, 2, 2, 2, 0],
  [0, 2, 1, 0, 0, 0, 0, 3], 
  [1, 1, 0, 0, 0, 0, 0, 0], 
  [1, 0, 0, 0, 0, 0, 0, 0], 
  [1, 0, 0, 0, 0, 0, 0, 0], 
  [1, 0, 0, 0, 0, 0, 0, 0], 
  [1, 0, 0, 0, 0, 0, 0, 0], 
  [0, 1, 0, 0, 0, 0, 3, 0], 
  [0, 0, 2, 2, 2, 2, 0, 0],
  ],
  [
    [3, 2, 2, 2, 2, 0, 0, 0],
    [1, 0, 0, 0, 2, 2, 0, 0], 
    [1, 0, 0, 0, 0, 2, 2, 0], 
    [1, 0, 0, 0, 0, 0, 2, 2], 
    [1, 0, 0, 0, 0, 0, 2, 2], 
    [1, 0, 0, 0, 0, 0, 2, 2], 
    [1, 0, 0, 0, 0, 0, 2, 0], 
    [1, 0, 0, 0, 0, 2, 0, 0], 
    [3, 2, 2, 2, 2, 0,0, 0],
  ],
  [
    [0, 2, 2, 2, 2, 2, 2, 0],
    [1, 0, 0, 0, 0, 0, 3, 3], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 2, 2, 2, 3, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [0, 1, 0, 0, 0, 0, 0, 0], 
    [0, 0, 2, 2, 2, 3, 0, 0],
  ],
  [
    [0, 2, 2, 2, 2, 2, 2, 0],
  [1, 0, 0, 0, 0, 0, 3, 3], 
  [1, 0, 0, 0, 0, 0, 0, 0], 
  [1, 0, 0, 0, 0, 0, 0, 0], 
  [1, 0, 0, 0, 0, 0, 0, 0], 
  [1, 2, 2, 2, 3, 0, 0, 0], 
  [1, 0, 0, 0, 0, 0, 0, 0], 
  [1, 0, 0, 0, 0, 0, 0, 0], 
  [1, 0, 0, 0, 0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 2, 2, 2, 2, 0],
  [0, 2, 1, 0, 0, 0, 0, 3], 
  [1, 1, 0, 0, 0, 0, 0, 0], 
  [1, 0, 0, 0, 0, 0, 0, 0], 
  [1, 0, 0, 0, 0, 0, 0, 0], 
  [1, 0, 0, 0, 0, 0, 0, 0], 
  [1, 0, 0, 0, 3, 0, 0, 0], 
  [0, 1, 0, 0, 0, 1, 0, 0], 
  [0, 0, 2, 2, 2, 1,0, 0],
  ],
  [
    [3, 0, 0, 0, 0, 0, 0, 3],
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 2, 2, 2, 2, 2, 2, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [3, 0, 0, 0, 0, 0, 0, 3],
  ],
  [
    [0, 0, 0, 3, 3, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0], 
  [0, 0, 0, 1, 1, 0, 0, 0], 
  [0, 0, 0, 1, 1, 0, 0, 0], 
  [0, 0, 0, 1, 1, 0, 0, 0], 
  [0, 0, 0, 1, 1, 0, 0, 0], 
  [0, 0, 0, 1, 1, 0, 0, 0], 
  [0, 0, 0, 1, 1, 0, 0, 0], 
  [0, 0, 0, 3, 3, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 3],
    [0, 0, 0, 0, 0, 0, 0, 1], 
    [0, 0, 0, 0, 0, 0, 0, 1], 
    [0, 0, 0, 0, 0, 0, 0, 1], 
    [0, 0, 0, 0, 0, 0, 0, 1], 
    [0, 0, 0, 0, 0, 0,2, 1], 
    [0, 0, 0, 0, 0, 0, 2, 1], 
    [0, 0, 0, 0, 2, 2, 1, 0], 
    [3, 2, 2, 2, 2, 2, 0, 0],
  ],
  [
    [3, 0, 0, 0, 0, 0, 0, 3],
    [1, 0, 0, 0, 0, 0, 2, 1], 
    [1, 0, 0, 0, 0, 0, 2, 1], 
    [1, 0, 0, 0, 0, 2, 1, 0], 
    [1, 0, 0, 2, 1, 0, 0, 0], 
    [1, 2, 2, 0, 0, 0, 0, 0], 
    [1, 0, 0, 2, 2, 0, 0, 0], 
    [1, 0, 0, 0, 0, 2, 1, 0], 
    [3, 0, 0, 0, 0, 0, 1, 3],
  ],
  [
    [3, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [2, 2, 2, 2, 2, 2, 2, 3],
  ],
  [
    [3, 2, 0, 3, 2, 0, 0, 0],
    [1, 0, 2, 1, 2, 2, 0, 0], 
    [1, 0, 0, 1, 0, 2, 2, 0], 
    [1, 0, 0, 1, 0, 0, 2, 1], 
    [1, 0, 0, 1, 0, 0, 0, 1], 
    [1, 0, 0, 1, 0, 0, 0, 1], 
    [1, 0, 0, 1, 0, 0, 0, 1], 
    [1, 0, 0, 1, 0, 0, 0, 1], 
    [3, 0, 0, 3, 0, 0, 0, 3],
  ],
  [
    [3, 2, 2, 0, 0, 0, 0, 3],
    [1, 0, 0, 1, 1, 0, 0, 1], 
    [1, 0, 0, 0, 2, 1, 0, 1], 
    [1, 0, 0, 0, 0, 1, 0, 1], 
    [1, 0, 0, 0, 0, 2, 1, 1], 
    [1, 0, 0, 0, 0, 0, 2, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [3, 0, 0, 0, 0, 0, 0, 3],
  ],
  [
    [0, 0, 2, 3, 3, 2, 0, 0],
    [0, 1, 2, 0, 0, 2, 1, 0], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [0, 1, 2, 0, 0, 2, 1, 0], 
    [0, 0, 2, 3, 3, 2, 0, 0],
  ],
  [
    [3, 2, 2, 2, 2, 1, 0, 0],
    [1, 0, 0, 0, 0, 2, 1, 0], 
    [1, 0, 0, 0, 0, 0, 2, 1], 
    [1, 0, 0, 0, 0, 0, 2, 1], 
    [1, 0, 0, 0, 0, 0, 1, 0], 
    [1, 2, 2, 2, 2, 2, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [3, 0, 0, 0, 0, 0, 0, 0],
  ],
  [
    [0, 0, 2, 3, 3, 2, 0, 0],
  [0, 1, 2, 0, 0, 2, 1, 0], 
  [1, 0, 0, 0, 0, 0, 0, 1], 
  [1, 0, 0, 0, 0, 0, 0, 1], 
  [1, 0, 0, 0, 0, 0, 0, 1], 
  [1, 0, 0, 0, 0, 1, 0, 1], 
  [1, 0, 0, 0, 0, 1, 0, 1], 
  [0, 1, 2, 0, 0, 1, 1, 0], 
  [0, 0, 2, 3, 3, 2, 0, 0],
  ],
  [
    [3, 2, 2, 2, 2, 2, 0, 0],
  [1, 0, 0, 0, 0, 2, 1, 0], 
  [1, 0, 0, 0, 0, 0, 2, 1], 
  [1, 0, 0, 0, 0, 0, 2, 1], 
  [1, 0, 0, 0, 0, 0, 1, 0], 
  [1, 2, 2, 2, 2, 2, 0, 0], 
  [1, 0, 2, 1, 0, 0, 0, 0], 
  [1, 0, 0, 2, 1, 0, 0, 0], 
  [3, 0, 0, 0, 2, 3, 0, 0],
  ],
  [
    [0, 2, 2, 2, 3, 0, 0, 0],
  [1, 2, 0, 0, 0, 0, 0, 0], 
  [1, 2, 0, 0, 0, 0, 0, 0], 
  [0, 1, 0, 0, 0, 0, 0, 0], 
  [0, 0, 2, 2, 2, 2, 0, 0], 
  [0, 0, 0, 0, 0, 1, 1, 0], 
  [0, 0, 0, 0, 0, 0, 0, 1], 
  [0, 0, 0, 0, 0, 0, 0, 1], 
  [0, 0, 0, 3, 2, 2, 2, 0],
  ],
  [
    [3, 2, 2, 2, 2, 2, 2, 3],
  [0, 0, 0, 1, 1, 0, 0, 0], 
  [0, 0, 0, 1, 1, 0, 0, 0], 
  [0, 0, 0, 1, 1, 0, 0, 0], 
  [0, 0, 0, 1, 1, 0, 0, 0], 
  [0, 0, 0, 1, 1, 0, 0, 0], 
  [0, 0, 0, 1, 1, 0, 0, 0], 
  [0, 0, 0, 1, 1, 0, 0, 0], 
  [0, 0, 0, 1, 1, 0, 0, 0],
  ],
  [
    [3, 0, 0, 0, 0, 0, 0, 3],
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [0, 1, 2, 0, 0, 2, 1, 0], 
    [0, 0, 2, 2, 2, 2, 0, 0],
  ],
  [
    [3, 0, 0, 0, 0, 0, 0, 3],
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [2, 1, 0, 0, 0, 0, 0, 1], 
    [0, 2, 1, 0, 0, 0, 0, 1], 
    [0, 0, 1, 0, 0, 0, 0, 1], 
    [0, 0, 1, 2, 0, 0, 0, 1], 
    [0, 0, 0, 2, 1, 0, 0, 1], 
    [0, 0, 0, 0, 0, 2, 2, 2],
  ],
  [
    [3, 0, 0, 0, 3, 0, 0, 3],
    [1, 0, 0, 0, 1, 0, 0, 1], 
    [1, 0, 0, 0, 1, 0, 0, 1], 
    [1, 0, 0, 0, 1, 0, 0, 1], 
    [1, 0, 0, 0, 1, 0, 0, 1], 
    [1, 2, 0, 0, 1, 0, 0, 1], 
    [0, 1, 2, 0, 1, 0, 0, 1], 
    [0, 0, 2, 2, 2, 2, 0, 2], 
    [0, 0, 0, 2, 3, 0, 2, 3],
  ],
  [
    [3, 0, 0, 0, 0, 0, 0, 3],
    [0, 1, 0, 0, 0, 0, 1, 2], 
    [0, 0, 1, 0, 0, 1, 2, 0], 
    [0, 0, 0, 1, 1, 2, 0, 0], 
    [0, 0, 0, 1, 1, 0, 0, 0], 
    [0, 0, 2, 1, 1, 2, 0, 0], 
    [0, 2, 1, 0, 0, 1, 2, 0], 
    [2, 1, 0, 0, 0, 0, 1, 2], 
    [3, 0, 0, 0, 0, 0, 0, 3],
  ],
  [
    [3, 0, 0, 0, 0, 0, 0, 3],
  [1, 0, 0, 0, 0, 0, 0, 1], 
  [1, 0, 0, 0, 0, 0, 0, 1], 
  [1, 2, 0, 0, 0, 0, 0, 1], 
  [0, 1, 2, 0, 0, 0, 2, 1], 
  [0, 0, 0, 2, 2, 2, 2, 0], 
  [0, 0, 0, 0, 0, 1, 0, 0], 
  [0, 0, 0, 0, 0, 1, 0, 0], 
  [0, 0, 0, 0, 0, 3, 0, 0],
  ],
  [
    [3, 2, 2, 2, 2, 2, 2, 2],
  [0, 0, 0, 0, 1, 1, 0, 0], 
  [0, 0, 2, 1, 0, 0, 0, 0], 
  [0, 2, 1, 0, 0, 0, 0, 0], 
  [0, 1, 0, 0, 0, 0, 0, 0], 
  [1, 0, 0, 0, 0, 0, 0, 0], 
  [1, 0, 0, 0, 0, 0, 0, 0], 
  [1, 0, 0, 0, 0, 0, 0, 0], 
  [2, 2, 2, 2, 2, 2, 2, 3],
  ],
]
let params;
function setup() {
  createCanvas(780,900, WEBGL);

  window.parent.postMessage({ myVariable: false }, '*');
   // 获取当前URL中的参数
   let urlString = window.location.href;
   let url = new URL(urlString);
   params = new URLSearchParams(url.search);
   
   // 通过参数名获取参数值
   let paramValue = params.get('index');


   if(paramValue)typeMapping=zkm[paramValue]




     // 通过参数名获取参数值
     let paramValue1 = params.get('pm');


     if(paramValue1){
     // let paramValue2 = params.get('iy');
     JSON.parse(paramValue1).forEach(element => {
       zm[element[1]][element[0]]=element[2]
     });
 
     console.log( JSON.parse(paramValue1))
 
 
 
     // zm[paramValue1][paramValue2]=1
     typeMapping=zm


    }
  serial = new p5.SerialPort();
  serial.on('data', serialEvent);
  serial.open("COM4"); // 根据实际串口调整
}



function  saveSvg(){

  saveCanvas('028C.jpg');

}

function draw() {
  background(255); // 设置背景为白色
  lights(); // 添加全局光照

  let boxSize = 25; // 每个方块的大小
  let boxSize2 = 80; // 二号立方体的大小
  let boxSize3 = 90; // 三号立方体的大小
  let spacingX = 60; // 每个方块的横向间距
  let spacingY = 72; // 每个方块的竖向间距

  // 移动整个方块组的位置，使其居中并留出边距
  translate(-spacingX * (typeMapping[0].length - 1) / 2, -spacingY * (typeMapping.length - 1) / 2);
  // 遍历 typeMapping，根据每个位置的类型绘制不同的方块
  for (let row = 0; row < typeMapping.length; row++) {
    for (let col = 0; col < typeMapping[row].length; col++) {
      let type = typeMapping[row][col];
      let x = col * spacingX; // 每个方块的 x 位置
      let y = row * spacingY; // 每个方块的 y 位置
      
      if (type === 1) {
        drawOutlinedBox(boxes[0], x, y, boxSize); // 绘制描边方块
      } else if (type === 2) {
        drawDottedBox(boxes[1], x, y, boxSize2);   // 绘制小圆点方块
      } else if (type === 3) {
        drawPrism(boxes[2], x, y, boxSize3);   // 绘制描边三棱柱
      } else if (type === 0) {
        drawOutlinedSphere(x, y, 8); // 绘制大小为 20 的描边小球
      }
    }
  }
}

// 一号立方体：描边效果
function drawOutlinedBox(boxObj, x, y, size) {
  push();
  translate(x, y, 0);
  let angleX = atan2(boxObj.accel.y, boxObj.accel.z);
  let angleY = atan2(-boxObj.accel.x, sqrt(boxObj.accel.y ** 2 + boxObj.accel.z ** 2));
  rotateX(angleX);
  rotateY(angleY);
  rotateZ(boxObj.angleZ); 
  noFill();
  stroke(144, 4, 214); 
  strokeWeight(7);
  
  // 修改为宽大于长的立方体
  let width = size * 1.5; // 宽度为原来的1.5倍
  let height = size; // 高度保持不变
  let depth = size; // 深度保持不变
  box(width, height, depth); // 绘制宽大于长的立方体
  pop();
}

// 二号立方体：圆点效果
function drawDottedBox(boxObj, x, y, size) {
  push();
  translate(x, y, 0);
  let angleX = atan2(boxObj.accel.y, boxObj.accel.z);
  let angleY = atan2(-boxObj.accel.x, sqrt(boxObj.accel.y ** 2 + boxObj.accel.z ** 2));
  rotateX(angleX);
  rotateY(angleY);
  rotateZ(boxObj.angleZ);

  noStroke();
  fill(255, 136, 0); 
  for (let x = -size / 2; x <= size / 2; x += 30) {  // 修改间隔为30以减少密度
    for (let y = -size / 2; y <= size / 2; y += 30) { // 修改间隔为30以减少密度
      for (let z = -size / 2; z <= size / 2; z += 30) { // 修改间隔为30以减少密度
        push();
        translate(x, y, z);
        sphere(1.5); 
        pop();
      }
    }
  }
  pop();
}


// 三棱柱：描边效果
function drawPrism(boxObj, x, y, size) {
  push();
  translate(x, y, 0);
  let angleX = atan2(boxObj.accel.y, boxObj.accel.z);
  let angleY = atan2(-boxObj.accel.x, sqrt(boxObj.accel.y ** 2 + boxObj.accel.z ** 2));
  rotateX(angleX);
  rotateY(angleY);
  rotateZ(boxObj.angleZ);

  noFill(); // 移除填充
  stroke(31, 224, 215); // 设置描边为黑色
  strokeWeight(2); // 设置描边粗细

  let h = size * 1; // 高度
  let r = size / 2; // 半径

  // 底部三角形顶点
  let v1 = createVector(-r, -h / 2, 0);
  let v2 = createVector(r, -h / 2, 0);
  let v3 = createVector(0, -h / 2, r * sqrt(3));

  // 顶部三角形顶点
  let v4 = createVector(-r, h / 2, 0);
  let v5 = createVector(r, h / 2, 0);
  let v6 = createVector(0, h / 2, r * sqrt(3));

  // 绘制底部三角形
  beginShape();
  vertex(v1.x, v1.y, v1.z);
  vertex(v2.x, v2.y, v2.z);
  vertex(v3.x, v3.y, v3.z);
  endShape(CLOSE);

  // 绘制顶部三角形
  beginShape();
  vertex(v4.x, v4.y, v4.z);
  vertex(v5.x, v5.y, v5.z);
  vertex(v6.x, v6.y, v6.z);
  endShape(CLOSE);

  // 绘制侧面1
  beginShape();
  vertex(v1.x, v1.y, v1.z);
  vertex(v2.x, v2.y, v2.z);
  vertex(v5.x, v5.y, v5.z);
  vertex(v4.x, v4.y, v4.z);
  endShape(CLOSE);

  // 绘制侧面2
  beginShape();
  vertex(v2.x, v2.y, v2.z);
  vertex(v3.x, v3.y, v3.z);
  vertex(v6.x, v6.y, v6.z);
  vertex(v5.x, v5.y, v5.z);
  endShape(CLOSE);

  // 绘制侧面3
  beginShape();
  vertex(v3.x, v3.y, v3.z);
  vertex(v1.x, v1.y, v1.z);
  vertex(v4.x, v4.y, v4.z);
  vertex(v6.x, v6.y, v6.z);
  endShape(CLOSE);

  pop();
}

function serialEvent() {
  let data = serial.readLine().trim();
  if (data.length > 0) {
    let values = data.split(",").map(Number);
    let sensorIndex = values[0];

    if (sensorIndex >= 0 && sensorIndex < 3) {
      if(!spt){
        spt=true
        window.parent.postMessage({ myVariable: true }, '*');
      }
      
      // 向父页面发送消息
window.parent.postMessage({ myVariable: true }, '*');

      boxes[sensorIndex].accel.x = values[3];
      boxes[sensorIndex].accel.y = values[2];
      boxes[sensorIndex].accel.z = values[1];

      let gyroChange = abs(values[6] - boxes[sensorIndex].gyro.z);
      if (gyroChange > threshold) {
        boxes[sensorIndex].targetAngleZ += values[6] * 0.0001;
        boxes[sensorIndex].gyro.z = values[6]; 
        boxes[sensorIndex].angleZ = boxes[sensorIndex].targetAngleZ; 
      } else {
        boxes[sensorIndex].targetAngleZ = boxes[sensorIndex].angleZ; 
      }
    }
  }
}

// 新增绘制描边小球的函数
function drawOutlinedSphere(x, y, size) {
  let sides = 30; // 使用 30 边形模拟圆形
  let radius = size / 2; // 减小半径大小，控制圆的尺寸
  
  push();
  translate(x, y, 0);
  noFill();
  stroke(0);
  strokeWeight(1);
  
  // 只绘制一个缩小的 30 边形的边缘轮廓
  beginShape();
  for (let j = 0; j < sides; j++) {
    let angle = map(j, 0, sides, 0, TWO_PI);
    let xPos = cos(angle) * radius;
    let yPos = sin(angle) * radius;
    vertex(xPos, yPos, 0); // 所有顶点在同一平面上
  }
  endShape(CLOSE);
  
  pop();
}
