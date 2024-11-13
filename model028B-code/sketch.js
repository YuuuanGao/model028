// 引入 Matter.js 库
// 请确保在 HTML 文件中添加以下脚本标签以引入 Matter.js
// <script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.17.1/matter.min.js"></script>

let serial; // 串口对象
let cols = 4; // 每行的图形数量
let rows = 6; // 每列的图形数量
let shapes = []; // 存储图形的属性

let transitionSpeed = 0.1;  // 调整过渡速度

// 弹簧相关变量
let numSegments = 5; // 弹簧段数
let numCoilsPerSegment = 10; // 每个弹簧段的圈数
let restSegmentLength = 80; // 每段弹簧的自然长度
let springHeight = 40; // 弹簧的高度
let lastYValues = Array(cols * rows).fill(0); // 存储每个位置的上次 y 值

// Matter.js 物理引擎变量
let engine, world;
let case4Objects = []; // 存储所有 case4 的物理小球和弹簧
let    spt=false
// 自定义 x 值到圆的位置映射关系
let circleMapping = [
  3, 2, 1, 0,   // 第1行
  7, 6, 5, 4,   // 第2行
  11, 10, 9, 8, // 第3行
  15, 14, 13, 12, // 第4行
  19, 18, 17, 16, // 第5行
  23, 22, 21, 20  // 第6行
];



// 我点了第一个圆 和第一个logo    这个logo要出现在哪个位置？
// 点左上角第一个就传3是吧 是的 就是上面得映射得，把0-9 给对应得  稍等  
// 每个位置对应的图形类型：0 表示圆形，1 表示弹簧，2 表示随机多边形，3 表示模糊小球，4 表示带弹簧连接的小球（case4），5 表示移动小球（case5），6 表示线段组，7 表示螺旋波动，8 表示随机小球，9 表示圆柱体
let typeMapping = [
  0, 0, 5, 5,   // 将最后一个位置改为 9
  0, 5, 0, 5,   
  5, 0, 0, 5,   
  5, 0, 0, 5,   
  5, 5, 5, 5,   
  5, 0, 0, 5    
];
let zm=[
  0, 0, 0, 0,   // 将最后一个位置改为 9
  0, 0, 0, 0,   
  0, 0, 0, 0,   
  0, 0, 0, 0,   
  0, 0, 0, 0,   
  0, 0, 0, 0    
];

// let zm=[
//   -1, -1, -1, -1,   // 将最后一个位置改为 9
//   -1, -1, -1, -1,   
//   -1, -1, -1, -1,   
//   -1, -1, -1, -1,   
//   -1, -1, -1, -1,   
//   -1, -1, -1, -1    
// ];

let vk=[
  [
    0, 0, 3, 2,  
    0, 3, 0, 2,   
    3, 0, 0, 2,   
    3, 0, 0, 2,   
    3, 1, 1, 2,   
    3, 0, 0, 2   
  ],
  [
    
  3, 6, 6, 0,  
  3, 0, 0, 6,   
  3, 1, 1, 0,   
  3, 0, 6, 0,   
  3, 0, 0, 6,   
  3, 6, 6, 0      
  ],
  [
    0, 3, 3, 0,  
    4, 0, 0, 3,   
    4, 0, 0, 0,   
    4, 0, 0, 0,   
    4, 0, 0, 0,   
    0, 3, 3, 0
  ],
  [
    8, 6, 6, 0,  
    8, 0, 0, 6,   
    8, 0, 0, 6,   
    8, 0, 0, 6,   
    8, 0, 0, 6,   
    8, 6, 6, 0   
  ],
  [
    0, 9, 9, 9,  
    5, 0, 0, 0,   
    5, 0, 0, 0,   
    5, 9, 0, 0,   
    5, 0, 0, 0,   
    0, 9, 9, 0      
  ],
  [
    0, 1, 1, 1,  
  8, 0, 0, 0,   
  8, 0, 0, 0,   
  8, 4, 0, 0,   
  8, 0, 0, 0,   
  8, 0, 0, 0    
  ],
  [
    0, 2, 2, 0,  
  2, 0, 0, 2,   
  2, 0, 0, 0,   
  2, 0, 3, 0,   
  7, 0, 3, 0,   
  0, 7, 3, 0      
  ],
  [
    3, 0, 0, 3,  
    3, 0, 0, 3,   
    2, 0, 0, 2,   
    2, 0, 0, 2,   
    9, 9, 9, 9,   
    9, 0, 0, 9     
  ],
  [
    0, 0, 4, 0,  
  0, 0, 4, 0,   
  0, 0, 5, 0,   
  0, 0, 5, 0,   
  0, 0, 6, 0,   
  0, 0, 6, 0   
  ],
  [
    0, 0, 0, 3,  
  0, 0, 0, 3,   
  0, 0, 0, 0,   
  0, 0, 0, 3,   
  0, 0, 0, 3,   
  6, 6, 6, 0     
  ],
  [
    5, 0, 0, 3,  
    5, 0, 0, 3,   
    7, 0, 3, 0,   
    7, 3, 0, 0,   
    7, 0, 6, 0,   
    7, 0, 6, 0 
  ],
  [
    3, 0, 0, 0,  
    3, 0, 0, 0,   
    2, 0, 0, 0,   
    2, 0, 0, 0,   
    2, 0, 0, 0,   
    5, 1, 1, 1      
  ],
  [
    7, 0, 4, 0,  
  6, 5, 4, 1,   
  6, 5, 4, 1,   
  6, 0, 0, 1,   
  6, 0, 0, 1,   
  6, 0, 0, 1    
  ],
  [
    3, 0, 0, 1,  
  9, 4, 0, 1,   
  9, 0, 4, 1,   
  9, 0, 0, 1,   
  9, 0, 0, 1,   
  9, 0, 0, 7     
  ],
  [
    0, 2, 2, 0,  
    6, 0, 0, 3,   
    6, 0, 0, 3,   
    6, 0, 0, 3,   
    6, 0, 0, 3,   
    0, 4, 4, 0      
  ],
  [
    8, 7, 7, 0,  
  8, 0, 0, 3,   
  8, 0, 0, 3,   
  8, 5, 5, 0,   
  8, 0, 0, 0,   
  8, 0, 0, 0      
  ],
  [
    0, 7, 7, 0,  
    6, 0, 0, 3,   
    6, 0, 0, 3,   
    6, 0, 0, 5,   
    6, 0, 0, 5,   
    0, 8, 8, 0      
  ],
  [
    3, 6, 6, 0,  
    3, 0, 0, 2,   
    3, 0, 0, 2,   
    3, 1, 1, 0,   
    3, 8, 0, 0,   
    3, 0, 8, 0      
  ],
  [
    0, 5, 5, 0,  
    7, 0, 0, 0,   
    7, 0, 0, 0,   
    0, 4, 4, 0,   
    0, 0, 0, 8,   
    0, 8, 8, 0    
  ],
  [
    3, 3, 3, 3,  
    0, 0, 2, 0,   
    0, 0, 2, 0,   
    0, 0, 2, 0,   
    0, 0, 1, 0,   
    0, 0, 1, 0     
  ],
  [
    8, 0, 0, 3,  
  8, 0, 0, 3,   
  2, 0, 0, 7,   
  2, 0, 0, 7,   
  6, 0, 0, 6,   
  0, 6, 6, 0       
  ],
  [
    2, 0, 0, 3,  
  2, 0, 0, 3,   
  6, 0, 0, 3,   
  6, 0, 0, 3,   
  0, 1, 0, 1,   
  0, 0, 1, 1      
  ],
  [
    6, 0, 0, 5,  
  6, 0, 0, 5,   
  6, 0, 0, 5,   
  6, 9, 4, 5,   
  0, 9, 4, 5,   
  0, 9, 0, 5
  ],
  [
    6, 0, 0, 8,  
  6, 0, 0, 8,   
  6, 0, 0, 8,   
  0, 9, 9, 0,   
  5, 0, 0, 3,   
  5, 0, 0, 3    
  ],
  [
    5, 0, 0, 7,  
    5, 0, 0, 7,   
    5, 0, 0, 7,   
    0, 2, 2, 0,   
    0, 0, 2, 0,   
    0, 0, 2, 0       
  ],
  [
    5, 5, 5, 7,  
    0, 0, 7, 0,   
    0, 7, 0, 0,   
    2, 0, 0, 0,   
    2, 0, 0, 0,   
    3, 3, 3, 3    
  ],
  
]
let params;
function setup() {
  createCanvas(780,900,SVG);

  window.parent.postMessage({ myVariable: false }, '*');

   // 获取当前URL中的参数
   let urlString = window.location.href;
   let url = new URL(urlString);
   params = new URLSearchParams(url.search);
   
   // 通过参数名获取参数值
   let paramValue = params.get('index');


   if(paramValue)typeMapping=vk[paramValue]




   // 通过参数名获取参数值
   let paramValue1 = params.get('pm');

   if(paramValue1){
   // let paramValue2 = params.get('iy');
   JSON.parse(paramValue1).forEach(element => {
     zm[element[1]*4+element[0]]=element[2]
   });

   console.log(zm)



   // zm[paramValue1][paramValue2]=1
   typeMapping=zm
  }
  initPhysicsEngine();
  initShapes();
  initSerialPort();
}

// 初始化物理引擎
function initPhysicsEngine() {
  engine = Matter.Engine.create();
  world = engine.world;
}



// 初始化所有图形
function initShapes() {
  for (let i = 0; i < cols * rows; i++) {
    let type = typeMapping[i];

    if(type>-1){

      let shape = createShape(i, type);
      shapes.push(shape);
      
      if (type === 4) initCase4(shape);
      if (type === 5) initCase5(shape);
    }

    }
  
}

// 创建单个图形对象
function createShape(i, type) {
  return {
    x: (i % cols) * 100 + 240,
    y: Math.floor(i / cols) * 120 + 150,
    size: 20,
    targetSize: 20,
    type: type,
    stretchFactor: 0.15,  // 弹簧的伸缩因子
    targetStretchFactor: 0.15, // 弹簧的目标伸缩因子
    sides: 5, // 多边形初始边数
    targetSides: 5, // 多边形的目标边数
    radii: [], // 存储多边顶点的随机半径
    blurAmount: 0, // 模糊小球的初始模糊程度
    targetBlurAmount: 0, // 模糊小球的目标模糊程度
    currentRadius: 30, // 模糊小球的当前半径
    targetRadius: 80, // 模糊小球的目标半
    // 初始化移动小球的属性（仅在 type 5 时使用）
    ball: {x: 0, y: 0, size: 10}, // 缩小移动小球的尺寸
    centerX: 0,
    centerY: 0,
    radius: 40, // 缩小圆形分区的半径
    currentSection: 0,
    targetX: 0,
    targetY: 0,
    speed: 0.0000000001, // 将移动小球的速度进一步减慢
    yValue: 200, // 初始 y 值
    lines: type === 6 ? Array(10).fill().map((_, i) => ({
      x1: 0,
      y1: -30,  // 将线段长度从 100 减少到 50
      x2: 0,
      y2: 30,   // 将线段长度从 100 减少到 50
      angle: 0
    })) : null,
    lastGroup: -1,
    // 添加 case7 的属性
    spiral: type === 7 ? {
      waveAmplitude: 0,
      waveFrequency: 0.01,
      angleOffset: 0,
      currentZone: -1,
      lastY: 0
    } : null,
    // 添加 case8 的属性
    balls: type === 8 ? [] : null,
    maxBalls: 7, // 从 20 改为 10
    bigBallRadius: 100,
    // 添加 case9 的属性
    cylinder: type === 9 ? {
      radius: 40,
      height: 150,
      currentHeight: 150,
      lightDir: { x: 0.5, y: 1, z: 0 },
      xRotation: PI/12,
      yRotation: -PI/90, // 添加Y旋转角度（负值表示逆时针）
      zRotation: PI/12
    } : null
  };
}

// 初始串口
function initSerialPort() {
  serial = new p5.SerialPort();
  serial.open("COM4");
  serial.on("connected", () => print("Connected to Server"));
  serial.on("open", () => print("The serial port opened."));
  serial.on("data", serialEvent);
  serial.on("error", (err) => print("Serial port error: " + err));
  serial.on("close", () => print("The serial port closed."));
}

// 更新图形状态
function updateShape(shape, y) {
  shape.targetSize = map(y, 0, 1023, 10, 100);
  
  // 更新 yValue
  shape.yValue = y; // 确保 yValue 被更新

  switch(shape.type) {
    case 1: // 弹簧
      shape.targetStretchFactor = map(y, 0, 1023, 0.15, 0.27);
      break;
    case 2: // 随机多边形
      updatePolygon(shape, y);
      break;
    case 3: // 模糊小球
      updateBlurBall(shape, y);
      break;
    case 4: // 物理弹小球
      updateCase4(shape, y);
      break;
    case 5: // 移动小球
      setNewTarget(shape);
      break;
    case 6: // 线段组
      updateCase6(shape, y);
      break;
    case 7: // 螺旋波动
      updateCase7(shape, y);
      break;
    case 8: // 随机小球
      updateCase8(shape, y);
      break;
    case 9: // 圆柱体
      updateCase9(shape, y);
      break;
  }
}

// 简化后的 serialEvent
function serialEvent() {
  let data = serial.readLine().trim();
  if (!data) return;
  
  let [x, y] = data.replace(/[()]/g, "").split(",").map(Number);
  if (isNaN(x) || isNaN(y)) return;
  if(!spt){
    spt=true
    window.parent.postMessage({ myVariable: true }, '*');
  }
  
  // 向父页面发送消息
window.parent.postMessage({ myVariable: true }, '*');

  let shapeIndex = circleMapping[x];
  if (shapeIndex === undefined || shapeIndex < 0 || shapeIndex >= shapes.length) return;
  
  if (Math.abs(y - lastYValues[shapeIndex]) > 5) {
    updateShape(shapes[shapeIndex], y);
    lastYValues[shapeIndex] = y;
  }
}

function draw() {
  clear(); // 清除背景，保持透明
  // translate (50,100)
  // 更新 Matter.js 引擎
  Matter.Engine.update(engine);

  // 绘制每个图形
  for (let i = 0; i < shapes.length; i++) {
    let shape = shapes[i];

    // 平滑过渡
    shape.size = lerp(shape.size, shape.targetSize, transitionSpeed);
    if (shape.type === 1) {
      shape.stretchFactor = lerp(shape.stretchFactor, shape.targetStretchFactor, transitionSpeed);
    }
    if (shape.type === 2) {
      shape.sides = lerp(shape.sides, shape.targetSides, transitionSpeed);
    }
    if (shape.type === 3) {
      shape.blurAmount = lerp(shape.blurAmount, shape.targetBlurAmount, transitionSpeed);
      shape.currentRadius = lerp(shape.currentRadius, shape.targetRadius, transitionSpeed);
    }
    if (shape.type === 5) {
      // 更新移动小球的位置
      moveBallTowardsTarget(shape);
    }

    push();
    noFill();

    // 根据图形类型绘制不同的形状
    switch (shape.type) {
      case 0: 
        ellipse(shape.x, shape.y, 8, 8); 
        break;
      case 1: 
        drawSpring(shape.x, shape.y, shape.stretchFactor); 
        break;
      case 2: 
        drawRandomPolygon(shape.x, shape.y, shape.sides, shape.radii); 
        break;
      case 3: 
        drawSimulatedBlurBall(shape.x, shape.y, shape.blurAmount, shape.currentRadius); 
        break;
      case 4: 
        drawPhysicsBalls(i); 
        break; // case4: Matter.js 物理引擎的弹簧小球
      case 5:
        drawCase5(shape);
        break; // case5: 移动小球
      case 6:
        drawCase6(shape);
        break;
      case 7:
        drawCase7(shape);
        break;
      case 8:
        drawCase8(shape);
        break;
      case 9:
        drawCase9(shape);
        break;
      default: 
        ellipse(shape.x, shape.y, shape.size, shape.size); 
        break;
    }
    pop();
  }
}

// case4 - 物理引擎的小球和弹簧
function drawPhysicsBalls(index) {
  // 获取对应的 case4 对象
  let shape = shapes[index];
  let case4Index = case4Objects.findIndex(obj => 
    obj.ballA.position.x === shape.x && obj.ballA.position.y === shape.y
  );
  if (case4Index === -1) return;
  
  let obj = case4Objects[case4Index];
  let { ballA, ballB, constraint } = obj;

  // 绘制弹簧（粉色）
  stroke(255, 0, 0);
  strokeWeight(1);
  line(ballA.position.x, ballA.position.y, ballB.position.x, ballB.position.y);

  // 绘制上方方块，缩小尺寸
  noFill(); // 去掉填充
  stroke(0); // 设置描边颜色
  rect(ballA.position.x - 8, ballA.position.y - 8, 16, 16); // 缩小方块的尺寸

  // 绘制下方小球，增加描边粗细并改变颜色
  stroke(0); // 设置描边颜色为绿色
  strokeWeight(15); // 增加描边粗细
  ellipse(ballB.position.x, ballB.position.y, 80, 16); // 将 ballB 直径从80减小到40
}

// case5 - 绘制移动小球
function drawCase5(shape) {
  // 绘制圆形分区
  push();
  translate(shape.centerX, shape.centerY);
  stroke(0);
  strokeWeight(3);
  noFill();
  
  // 绘制圆形分区
  ellipse(0, 0, shape.radius * 2.3);
  
  // 根据 y 值动态调整小球数量
  let ballCount = floor(map(shape.yValue, 0, 1023, 1, 10)); // 根据 y 值计算小球数量
  while (shape.balls.length < ballCount) {
    shape.balls.push(createBall(shape)); // 创建新小球
  }
  while (shape.balls.length > ballCount) {
    shape.balls.pop(); // 移除多余的小球
  }
  
  // 绘制所有小球
  for (let ball of shape.balls) {
    ball.display(); // 绘制小球
  }
  
  pop();
}

// 创建小球的函数
function createBall(shape) {
  return {
    x: shape.x,
    y: shape.y,
    size: 20, // 小球的大小
    display() {
      fill(255, 0, 0);
      noStroke();
      ellipse(this.x, this.y, this.size);
    }
  };
}

function moveBallTowardsTarget(shape) {
  let distance = dist(shape.ball.x, shape.ball.y, shape.targetX, shape.targetY);
  
  // 如果小球到达了目标位，更新新的目标
  if (distance < shape.speed) {
    setNewTarget(shape);
  } else {
    // 以恒定速度朝目标点移动
    let angle = atan2(shape.targetY - shape.ball.y, shape.targetX - shape.ball.x);
    // 使用 yValue (0-1023) 来调整速度
    let speedMultiplier = map(shape.yValue, 0, 1023, 0.1, 2); // 将 y 值映射到 0.1-2 的范围
    shape.ball.x += cos(angle) * shape.speed * 0.2 * speedMultiplier;
    shape.ball.y += sin(angle) * shape.speed * 0.2 * speedMultiplier;
  }
}

function setNewTarget(shape) {
  // 根据 y 值计算当在哪个分区
  let yGroups = 8;
  let groupHeight = height / yGroups;
  shape.currentSection = floor(shape.yValue / groupHeight);
  shape.currentSection = constrain(shape.currentSection, 0, 7); // 保证有效的分区
  
  // 计标位置
  let angle = TWO_PI / 8 * (shape.currentSection + 0.5); // 区域的中心角度
  let sectionRadius = random(shape.radius * 0.2, shape.radius * 1.2); // 在该区域内随机位置
  shape.targetX = shape.centerX + cos(angle) * sectionRadius;
  shape.targetY = shape.centerY + sin(angle) * sectionRadius;
}

// 绘制弹簧
function drawSpring(x, y, stretchFactor) {
  stroke(75, 0, 130); // 设置簧颜色
  strokeWeight(4);
  noFill();

  push();
  translate(x, y); // 将弹簧绘制到指定位置
  rotate(-HALF_PI); // 逆时针旋转 90 度

  let currentSegmentLength = restSegmentLength * stretchFactor;

  for (let j = 0; j < numSegments; j++) {
    beginShape();
    for (let i = 0; i <= numCoilsPerSegment; i++) {
      let posX = i * (currentSegmentLength / numCoilsPerSegment) + j * currentSegmentLength;
      let posY = springHeight * sin((TWO_PI * i) / numCoilsPerSegment); // 波浪形状
      vertex(posX, posY);
    }
    endShape();
  }
  pop();
}

// 绘制随机多边形
function drawRandomPolygon(x, y, sides, radii) {
  sides = round(sides); // 确保边数是整数

  // 绘制多边形
  beginShape();
  for (let i = 0; i < sides; i++) {
    let angle = TWO_PI / sides * i;
    let px = x + cos(angle) * radii[i];
    let py = y + sin(angle) * radii[i];
    vertex(px, py);
  }
  fill(200,255,100)
  stroke(159,255,0)
  strokeWeight(5);
  endShape(CLOSE);

  // 在顶点上显示数字
  fill(0); // 设文本颜色为黑色
  noStroke(); // 禁止文本的外边框
  for (let i = 0; i < sides; i++) {
    let angle = TWO_PI / sides * i;
    let px = x + cos(angle) * radii[i];
    let py = y + sin(angle) * radii[i];
    
    textAlign(CENTER, CENTER); // 设置文本居中
    text(sides, px, py); // 所有顶点显示相同的边数
  }
}

// 模拟模糊小球，使用透明度和多层圆
function drawSimulatedBlurBall(x, y, blurAmount, radius) {
  noStroke(); // 去除黑色边框
  let layers = 20;

  for (let i = layers; i > 0; i--) {
    let layerRadius = map(i, 1, layers, radius / 2, radius);
    let alpha2 = map(i, 1, layers, 1, 115 / blurAmount); // 控制每层透明度，随着模糊值降低
    // console.log(alpha2)
    fill(4, 56, 181, alpha2?alpha2:255);
    ellipse(x, y, layerRadius*1.8, layerRadius*1.8);
  }
}

// 使用 y 值决定多边形目标边数
function getSidesBasedOnY(y) {
  y = constrain(y, 0, 1023);
  let group = floor(map(y, 0, 1023, 0, 10));

  switch (group) {
    case 0:
      return 4;
    case 1:
      return 5;
    case 2:
      return 6;
    case 3:
      return 7;
    case 4:
      return 8;
    case 5:
      return 9;
    case 6:
      return 10;
    case 7:
      return 11;
    case 8:
      return 12;
    case 9:
      return 13;
    default:
      return 4;
  }
}

// 应用随机力到 ballB，包含水平和竖直方向
function applyRandomForce(obj) {
  let randomForce = Matter.Vector.create(random(-0.1, 0.1), random(-0.1, 0.1));
  Matter.Body.applyForce(obj.ballB, obj.ballB.position, randomForce);
}

// 绘制移动小球的圆形分区和小球
function drawCase5(shape) {
  // 绘制圆形分区
  push();
  translate(shape.centerX, shape.centerY);
  stroke(166, 94, 247);
  strokeWeight(1);
  noFill();
  
  // Draw the circle
  ellipse(0, 0, shape.radius * 2.4);

  
  // // Draw the lines that divide the circle into 8 sections
  // for (let i = 0; i < 8; i++) {
  //   let angle = TWO_PI / 8 * i;
  //   let x = cos(angle) * shape.radius;
  //   let y = sin(angle) * shape.radius;
  //   line(0, 0, x*0.85, y*0.85);
  // }
  
  // Draw the numbers in the center of each section
  textAlign(CENTER, CENTER);
  for (let i = 1; i <= 8; i++) {
    let angle = TWO_PI / 8 * (i - 0.5); // Adjust to center the text
    let x = cos(angle) * shape.radius * 0.6;
    let y = sin(angle) * shape.radius * 0.6+3;
    textSize(35);  // 增大数字的字体
    fill(166, 94, 247);
    noStroke();
    text(i, x, y);
  }
  pop();
  
  // 绘制移动小球
  fill(255, 0, 0);
  noStroke();
  ellipse(shape.ball.x, shape.ball.y, 20,20);
}

// 移动小球朝目标移动
function moveBallTowardsTarget(shape) {
  let distance = dist(shape.ball.x, shape.ball.y, shape.targetX, shape.targetY);
  
  // 如果小球到达了目标位置，更新新的目标
  if (distance < shape.speed) {
    setNewTarget(shape);
  } else {
    // 以恒定��度朝目标点移动
    let angle = atan2(shape.targetY - shape.ball.y, shape.targetX - shape.ball.x);
    // 使用 yValue (0-1023) 来调整速度
    let speedMultiplier = map(shape.yValue, 0, 1023, 0.1, 2); // 将 y 值映射到 0.1-2 的范围
    shape.ball.x += cos(angle) * shape.speed * 0.2 * speedMultiplier;
    shape.ball.y += sin(angle) * shape.speed * 0.2 * speedMultiplier;
  }
}

// 设置新的目标位置
function setNewTarget(shape) {
  // 根据 yValue 计算当在哪个分区
  let yGroups = 8;
  let groupHeight = height / yGroups;
  shape.currentSection = floor(shape.yValue / groupHeight);
  shape.currentSection = constrain(shape.currentSection, 0, 7); // 保证有效的分区
  
  // 计算目标位置
  let angle = TWO_PI / 8 * (shape.currentSection + 0.6); // 区域的中心角度
  let sectionRadius = random(shape.radius * 0.2, shape.radius * 1.4); // 在该区域内随机位置
  shape.targetX = shape.centerX + cos(angle) * sectionRadius;
  shape.targetY = shape.centerY + sin(angle) * sectionRadius;
}

// 初始化 case4 (物理弹簧小球)
function initCase4(shape) {
  let ballAOptions = { isStatic: true };
  let ballBOptions = { restitution: 0.8 };
  
  // 创建 ballA 和 ballB
  let ballA = Matter.Bodies.circle(shape.x, shape.y, 20, ballAOptions);
  let ballB = Matter.Bodies.circle(shape.x + 100, shape.y, 20, ballBOptions);
  
  // 创建弹簧约束
  let constraint = Matter.Constraint.create({
    bodyA: ballA,
    bodyB: ballB,
    length: 1,
    stiffness: 0.01
  });
  
  // 添加到物理世界
  Matter.World.add(world, [ballA, ballB, constraint]);
  
  // 存储到 case4Objects 数组
  case4Objects.push({
    ballA: ballA,
    ballB: ballB,
    constraint: constraint,
    lastGroup: -1
  });
}

// 初始 case5 (移动小球)
function initCase5(shape) {
  // 初始化移动小球属性
  shape.ball.x = shape.x;
  shape.ball.y = shape.y;
  shape.centerX = shape.x;
  shape.centerY = shape.y;
  shape.radius = 50;
  shape.currentSection = 0;
  shape.targetX = shape.x;
  shape.targetY = shape.y;
  shape.speed = 4;
  shape.yValue = 200;
  
  // 添加一个数组来存储小球
  shape.balls = []; // 新增：存储小球的数组
  setNewTarget(shape);
}

// 更新多边形
function updatePolygon(shape, y) {
  shape.targetSides = getSidesBasedOnY(y);
  shape.radii = [];
  for (let i = 0; i < shape.targetSides; i++) {
    shape.radii.push(random(30, 100));
  }
}

// 更新模糊小球
function updateBlurBall(shape, y) {
  shape.targetBlurAmount = map(y, 0, 1023, 1, 5);
  shape.targetRadius = map(y, 0, 1023, 30, 100);
}

// 更新物理弹簧小球 (case4)
function updateCase4(shape, y) {
  // 找到对应的 case4Objects 索引
  let case4Index = case4Objects.findIndex(obj => 
    obj.ballA.position.x === shape.x && obj.ballA.position.y === shape.y
  );
  
  if (case4Index !== -1) {
    let obj = case4Objects[case4Index];
    // 根据新的 y 值更新弹簧长度
    obj.constraint.length = map(y, 0, 1023, 30, 50);
    // 应用随机力
    applyRandomForce(obj);
  }
}

// 添加 case6 的更新函数
function updateCase6(shape, y) {
  let groupSize = 1023 / 5;
  let group = floor(y / groupSize);
  
  // 根据 y 值计算线段长度（范围20-150）
  let lineLength = map(y, 0, 1023, 20, 80);
  
  if (group !== shape.lastGroup) {
    let numRotatedLines = constrain(group, 0, 10);
    for (let i = 0; i < shape.lines.length; i++) {
      // 更新每个线段的长度
      shape.lines[i].y1 = -lineLength/2;  // 除以2是为了保持线段中心点不变
      shape.lines[i].y2 = lineLength/2;
      
      // 更新旋转角度，范围从 -PI/6 到 2PI/3 (30° 到 120°)
      if (i >= shape.lines.length - numRotatedLines) {
        shape.lines[i].angle = random(-PI/6, 2*PI/3);
      } else {
        shape.lines[i].angle = 0;
      }
    }
    shape.lastGroup = group;
  }
}

// 添加 case6 的绘制函数
function drawCase6(shape) {
  push();
  translate(shape.x, shape.y);
  strokeCap(SQUARE);  // 添加这行来设置方角线段
  for (let i = 0; i < shape.lines.length; i++) {
    let lineObj = shape.lines[i];
    push();
    translate(i * 10 - (shape.lines.length * 10) / 2, 0);
    rotate(lineObj.angle);
    strokeWeight(10);
    stroke(1, 84, 4)
    line(lineObj.x1, lineObj.y1, lineObj.x2, lineObj.y2);
    pop();
  }
  pop();
}

// 添加 case7 的更新函数
function updateCase7(shape, y) {
  let newZone = floor(map(y, 0, 1023, 0, 10));
  
  // 只在 y 值变化显著时更新
  if (abs(y - shape.spiral.lastY) > 5) {
    // 如果进入新区间，重置随机种子
    if (newZone !== shape.spiral.currentZone) {
      shape.spiral.currentZone = newZone;
      shape.spiral.angleOffset = random(-PI, PI);
    }
    
    shape.spiral.waveAmplitude = map(y, 0, 1023, 0, 50);
    shape.spiral.lastY = y;
  }
}

// 添加 case7 的绘制函数
function drawCase7(shape) {
  push();
  translate(shape.x, shape.y);
  stroke(255, 51, 0);
  strokeWeight(3);
  noFill();
  
  let centerX = 0;
  let centerY = 0;
  let angle = 0;
  let radius = 2;
  let angleIncrement = 154;
  let radiusIncrement = 0.35;

  beginShape();
  for (let i = 0; i < 150; i++) {
    let x = centerX + cos(angle + shape.spiral.angleOffset) * radius;
    let y = centerY + sin(angle + shape.spiral.angleOffset) * radius;
    
    let smoothWaveOffset = sin(i * shape.spiral.waveFrequency) * shape.spiral.waveAmplitude;
    x += cos(angle + shape.spiral.angleOffset) * smoothWaveOffset;
    y += sin(angle + shape.spiral.angleOffset) * smoothWaveOffset;
    
    vertex(x, y);
    
    angle += angleIncrement;
    radius += radiusIncrement;
  }
  endShape();
  pop();
}

// 加 case8 的更新函数
function updateCase8(shape, y) {
  // 确保即使在 y=0 时也有最小数量的小球
  let minBalls = 1;
  let ballCount = floor(map(y, 0, 1023, minBalls, shape.maxBalls));
  
  // 更新小球数组的大小，传入 y 值
  while (shape.balls.length < ballCount) {
    shape.balls.push(new Ball(shape.x, shape.y, shape.bigBallRadius, y));
  }
  while (shape.balls.length > ballCount) {
    shape.balls.pop();
  }
  
  // 更新现有小球的范围和速度
  if (frameCount % 60 === 0) { // 每秒更新一次
    for (let ball of shape.balls) {
      // 动态计算最大范围
      let maxRadius = map(y, 0, 1023, shape.bigBallRadius * 0.2, shape.bigBallRadius);
      ball.r = map(y, 0, 1023, 20, maxRadius);
      
      // 更新小球大小
      ball.size = map(y*1.5, 0, 1023, 15, 35);
      
      // 如果小球超出新范围，将其移回范围内
      let distFromCenter = dist(ball.pos.x, ball.pos.y, ball.cx, ball.cy);
      if (distFromCenter > ball.r - ball.size / 2) {
        let angle = atan2(ball.pos.y - ball.cy, ball.pos.x - ball.cx);
        ball.pos.x = ball.cx + cos(angle) * (ball.r - ball.size / 2);
        ball.pos.y = ball.cy + sin(angle) * (ball.r - ball.size / 2);
      }
      
      // 更新速度
      let speedMultiplier = map(y, 0, 1023, 0.5, 2);
      ball.vel = p5.Vector.random2D().mult(random(1, 2) * speedMultiplier);
    }
  }
}

// 添加 case8 的绘制函数
function drawCase8(shape) {
  push();
  // 绘制最大范围（虚线）
  stroke(209, 190, 165);
  strokeWeight(0.8);
  setLineDash([5, 5]);
  noFill();
  ellipse(shape.x, shape.y, shape.bigBallRadius * 2);
  
  // 绘制当前活动范围（实线）
  if (shape.balls.length > 0) {
    stroke(117, 91, 56);
    strokeWeight(1);
    setLineDash([]);
    
    // 获取当形状的索引
    let shapeIndex = shapes.indexOf(shape);
    let currentY = lastYValues[shapeIndex] || 0;
    
    // 计算目标半径
    let maxRadius = map(currentY, 0, 1023, shape.bigBallRadius * 0.2, shape.bigBallRadius);
    shape.targetRadius = map(currentY, 0, 1023, 30, maxRadius * 0.7);
    
    // 使用 lerp 进行平滑过渡
    shape.currentRadius = lerp(shape.currentRadius, shape.targetRadius, 0.1);
    
    ellipse(shape.x, shape.y, shape.currentRadius * 2);
  }
  
  // 更新和绘制每个小球
  for (let ball of shape.balls) {
    ball.move();
    ball.display();
  }
  pop();
}

// 添加辅助函数来设置虚线样式
function setLineDash(list) {
  drawingContext.setLineDash(list);
}

// 添加 Ball 类
class Ball {
  constructor(cx, cy, r, yValue) {
    this.cx = cx;
    this.cy = cy;
    
    // 根据 y 值动态计算最大范围
    let maxRadius = map(yValue, 0, 1023, r * 0.2, r);
    this.r = map(yValue, 0, 1023, 20, maxRadius);
    
    // 根据 y 值动态调整小球大小
    this.size = map(yValue, 0, 1023, 5, 25); // 小球尺寸从 5-15 随 y 值变化
    
    // 在计算出的范围内随机生成位置
    let angle = random(TWO_PI);
    let distance = random(this.r - this.size / 2);
    this.pos = createVector(
      cx + cos(angle) * distance,
      cy + sin(angle) * distance
    );
    
    // 根据 y 值调整速度
    let speedMultiplier = map(yValue, 0, 1023, 0.5, 2);
    this.vel = p5.Vector.random2D().mult(random(1, 2) * speedMultiplier);
  }
  
  move() {
    this.pos.add(this.vel);
    
    let distFromCenter = dist(this.pos.x, this.pos.y, this.cx, this.cy);
    if (distFromCenter + this.size / 2 > this.r) {
      let normal = createVector(
        this.pos.x - this.cx, 
        this.pos.y - this.cy
      ).normalize();
      let velDotNormal = this.vel.dot(normal);
      this.vel.sub(p5.Vector.mult(normal, 2 * velDotNormal));
      
      this.pos = createVector(
        this.cx + normal.x * (this.r - this.size / 2),
        this.cy + normal.y * (this.r - this.size / 2)
      );
    }
  }
  
  display() {
    fill(117, 91, 56);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}

// 添加 case9 的更新函数
function updateCase9(shape, y) {
  // 将 y 值映射到圆柱体高度 (50-200)
  shape.cylinder.height = map(y, 0, 1023, 50, 120);
}

// 修改 drawCase9 函数
function drawCase9(shape) {
  push();
  translate(shape.x, shape.y);
  
  // 平滑过渡高度
  shape.cylinder.currentHeight = lerp(
    shape.cylinder.currentHeight, 
    shape.cylinder.height, 
    0.1
  );
  
  // 设置点的基本属性
  noStroke();
  fill(250, 197, 5);
  
  // 圆柱体参数
  let radius = shape.cylinder.radius;
  let height = shape.cylinder.currentHeight;
  let verticalSteps = 10;  // 垂直方向的点数
  let horizontalSteps = 14; // 平方向的点数
  let baseDotSize = 2;  // 基础点大小
  
  // 旋转角度
  let xRotation = PI/2.5;  // X轴15度
  let yRotation = -PI/2.5; // Y轴逆时针2度
  let zRotation = PI/2;  // Z轴15度
  
  // 绘制圆柱体表面的点
  for (let v = 0; v < verticalSteps; v++) {
    let yPos = map(v, 0, verticalSteps - 1, -height/2, height/2);
    
    for (let h = 0; h < horizontalSteps; h++) {
      let angle = (TWO_PI * h) / horizontalSteps;
      
      // 基础坐标
      let x = cos(angle) * radius;
      let y = yPos;
      let z = sin(angle) * radius;
      
      // 应用 Y 轴旋转
      let x1 = x * cos(yRotation) + z * sin(yRotation);
      let z1 = -x * sin(yRotation) + z * cos(yRotation);
      
      // 应用 X 轴旋转
      let y2 = y * cos(xRotation) - z1 * sin(xRotation);
      let z2 = y * sin(xRotation) + z1 * cos(xRotation);
      
      // 应用 Z 轴旋转
      let x3 = x1 * cos(zRotation) - y2 * sin(zRotation);
      let y3 = x1 * sin(zRotation) + y2 * cos(zRotation);
      
      // 应用透视效果
      let perspectiveScale = 0.9;
      let zScale = 0.2; // 控制椭圆效果
      
      // 最终坐标
      let xPos = x3 * perspectiveScale;
      let yPos3 = y3;
      let zPos = z2 * perspectiveScale * zScale;
      
      // 计算光照效果
      let lightAngle = angle + frameCount * 0.02;
      let lightIntensity = (cos(lightAngle) * 0.5 + 0.5) * 0.8 + 0.2;
      
      // 根据深度调整点的大小
      let depthScale = map(z2, -radius, radius, 0.6, 1.1);
      let dynamicSize = (baseDotSize + (lightIntensity * baseDotSize * 2)) * depthScale;
      
      // 绘制点
      ellipse(xPos, yPos3 + zPos, dynamicSize, dynamicSize);
    }
  }
  
  pop();
}



function  saveSvg(){

  save("028B.svg");

}