// Declare a "SerialPort" object
let serial;
let latestData = "waiting for data";  // 用于保存串口接收到的数据
let lastUpdateTime = 0;  // 保存最后一次更新的时间
let idleTimeLimit = 5000;  // 5秒

// 存储图形组的队列
let shapeQueue = [];  // 用数组作为队列，最多只保留两组
let    spt=false
let transitionSpeed = 0.1;  // 适度调整过渡速度

// 自定义的绘制模式 (1 表示绘制图形, 0 表示跳过)
let drawPattern = [
  [0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 1, 1, 1, 1], 
  [0, 0, 0, 1, 1, 0, 0, 1], 
  [0, 0, 1, 1, 0, 0, 0, 1], 
  [0, 1, 1, 0, 0, 0, 0, 1], 
  [0, 1, 1, 0, 0, 0, 0, 1], 
  [1, 1, 1, 1, 1, 1, 1, 1], 
  [1, 0, 0, 0, 0, 0, 0, 1], 
  [1, 0, 0, 0, 0, 0, 0, 1],
];


let  zm=[
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 0, 0, 0, 0, 0, 0],

]
let pkm=[
  [
  [0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 1, 1, 1, 1], 
  [0, 0, 0, 1, 1, 0, 0, 1], 
  [0, 0, 1, 1, 0, 0, 0, 1], 
  [0, 1, 1, 0, 0, 0, 0, 1], 
  [0, 1, 1, 0, 0, 0, 0, 1], 
  [1, 1, 1, 1, 1, 1, 1, 1], 
  [1, 0, 0, 0, 0, 0, 0, 1], 
  [1, 0, 0, 0, 0, 0, 0, 1],
],
  [
    [1, 1, 1, 1, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 1, 0], 
    [1, 0, 0, 0, 0, 0, 1, 0], 
    [1, 1, 1, 1, 1, 1, 0, 0], 
    [1, 0, 0, 0, 0, 0, 1, 0], 
    [1, 0, 0, 0, 0, 0, 1, 1], 
    [1, 0, 0, 0, 0, 0, 1, 1], 
    [1, 0, 0, 0, 0, 1, 1, 0], 
    [1, 1, 1, 1, 1, 1,0, 0],
],
  [
    [0, 0, 0, 1, 1, 1, 1, 0],
    [0, 1, 1, 0, 0, 0, 0, 1], 
    [1, 1, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [0, 1, 0, 0, 0, 0, 1, 0], 
    [0, 0, 1, 1, 1, 1,0, 0],
],
  [
    [1, 1, 1, 1, 1, 0, 0, 0],
    [1, 0, 0, 0, 1, 1, 0, 0], 
    [1, 0, 0, 0, 0, 1, 1, 0], 
    [1, 0, 0, 0, 0, 0, 1, 1], 
    [1, 0, 0, 0, 0, 0, 1, 1], 
    [1, 0, 0, 0, 0, 0, 1, 1], 
    [1, 0, 0, 0, 0, 0, 1, 0], 
    [1, 0, 0, 0, 0, 1, 0, 0], 
    [1, 1, 1, 1, 1, 0,0, 0],
],
  [
    [0, 1, 1, 1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0, 0, 1, 1], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 1, 1, 1, 1, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [0, 1, 0, 0, 0, 0, 0, 0], 
    [0, 0, 1, 1, 1, 1,0, 0],
],
  [
    [0, 1, 1, 1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0, 0, 1, 1], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 1, 1, 1, 1, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0],
],
  [
    [0, 0, 0, 1, 1, 1, 1, 0],
    [0, 1, 1, 0, 0, 0, 0, 1], 
    [1, 1, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 1, 0, 0, 0], 
    [0, 1, 0, 0, 0, 1, 0, 0], 
    [0, 0, 1, 1, 1, 1,0, 0],
],
  [
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 1, 1, 1, 1, 1, 1, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1],
],
  [
    [0, 0, 0, 1, 1, 0, 0, 0],
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
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 1], 
    [0, 0, 0, 0, 0, 0, 0, 1], 
    [0, 0, 0, 0, 0, 0, 0, 1], 
    [0, 0, 0, 0, 0, 0, 0, 1], 
    [0, 0, 0, 0, 0, 0,1, 1], 
    [0, 0, 0, 0, 0, 0, 1, 1], 
    [0, 0, 0, 0, 1, 1, 1, 0], 
    [1, 1, 1, 1, 1, 1, 0, 0],
],
  [
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 1], 
    [1, 0, 0, 0, 0, 0, 1, 1], 
    [1, 0, 0, 0, 0, 1, 1, 0], 
    [1, 0, 0, 1, 1, 0, 0, 0], 
    [1, 1, 1, 0, 0, 0, 0, 0], 
    [1, 0, 0, 1, 1, 0, 0, 0], 
    [1, 0, 0, 0, 0, 1, 1, 0], 
    [1, 0, 0, 0, 0, 0, 1, 1],
],
  [
    [1, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 1, 1, 1, 1, 1, 1, 1],
],
  [
    [1, 1, 0, 1, 1, 0, 0, 0],
    [1, 0, 1, 1, 1, 1, 0, 0], 
    [1, 0, 0, 1, 0, 1, 1, 0], 
    [1, 0, 0, 1, 0, 0, 1, 1], 
    [1, 0, 0, 1, 0, 0, 0, 1], 
    [1, 0, 0, 1, 0, 0, 0, 1], 
    [1, 0, 0, 1, 0, 0, 0, 1], 
    [1, 0, 0, 1, 0, 0, 0, 1], 
    [1, 0, 0, 1, 0, 0, 0, 1],
],
  [
    [1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 0, 0, 1], 
    [1, 0, 0, 0, 1, 1, 0, 1], 
    [1, 0, 0, 0, 0, 1, 0, 1], 
    [1, 0, 0, 0, 0, 1, 1, 1], 
    [1, 0, 0, 0, 0, 0, 1, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1],
],
  [
    [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 0, 0, 1, 1, 0], 
  [1, 0, 0, 0, 0, 0, 0, 1], 
  [1, 0, 0, 0, 0, 0, 0, 1], 
  [1, 0, 0, 0, 0, 0, 0, 1], 
  [1, 0, 0, 0, 0, 0, 0, 1], 
  [1, 0, 0, 0, 0, 0, 0, 1], 
  [0, 1, 1, 0, 0, 1, 1, 0], 
  [0, 0, 1, 1, 1, 1, 0, 0],
],
  [
    [1, 1, 1, 1, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 1, 1, 0], 
    [1, 0, 0, 0, 0, 0, 1, 1], 
    [1, 0, 0, 0, 0, 0, 1, 1], 
    [1, 0, 0, 0, 0, 0, 1, 0], 
    [1, 1, 1, 1, 1, 1, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0],
],
  [
    [1, 1, 1, 1, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 1, 1, 0], 
    [1, 0, 0, 0, 0, 0, 1, 1], 
    [1, 0, 0, 0, 0, 0, 1, 1], 
    [1, 0, 0, 0, 0, 0, 1, 0], 
    [1, 1, 1, 1, 1, 1, 0, 0], 
    [1, 0, 1, 1, 0, 0, 0, 0], 
    [1, 0, 0, 1, 1, 0, 0, 0], 
    [1, 0, 0, 0, 1, 1, 0, 0],
],
  [
    [0, 0, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 0, 0, 1, 1, 0], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 1, 0, 1], 
    [1, 0, 0, 0, 0, 1, 0, 1], 
    [0, 1, 1, 0, 0, 1, 1, 0], 
    [0, 0, 1, 1, 1, 1, 0, 0],
],
  [
    [0, 1, 1, 1, 1, 0, 0, 0],
  [1, 1, 0, 0, 0, 0, 0, 0], 
  [1, 1, 0, 0, 0, 0, 0, 0], 
  [0, 1, 0, 0, 0, 0, 0, 0], 
  [0, 0, 1, 1, 1, 1, 0, 0], 
  [0, 0, 0, 0, 0, 1, 1, 0], 
  [0, 0, 0, 0, 0, 0, 0, 1], 
  [0, 0, 0, 0, 0, 0, 0, 1], 
  [0, 0, 0, 1, 1, 1, 1, 0],
],
  [
    [1, 1, 1, 1, 1, 1, 1, 1],
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
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [0, 1, 1, 0, 0, 1, 1, 0], 
    [0, 0, 1, 1, 1, 1, 0, 0],
],
  [
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 1, 0, 0, 0, 0, 0, 1], 
    [0, 1, 1, 0, 0, 0, 0, 1], 
    [0, 0, 1, 0, 0, 0, 0, 1], 
    [0, 0, 1, 1, 0, 0, 0, 1], 
    [0, 0, 0, 1, 1, 0, 0, 1], 
    [0, 0, 0, 0, 0, 1, 1, 1],
],
  [
    [1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1], 
    [1, 0, 0, 0, 1, 0, 0, 1], 
    [1, 0, 0, 0, 1, 0, 0, 1], 
    [1, 0, 0, 0, 1, 0, 0, 1], 
    [1, 1, 0, 0, 1, 0, 0, 1], 
    [0, 1, 1, 0, 1, 0, 0, 1], 
    [0, 0, 1, 1, 1, 1, 0, 1], 
    [0, 0, 0, 1, 1, 0, 1, 1],
],
  [
    [1, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 1, 1], 
    [0, 0, 1, 0, 0, 1, 1, 0], 
    [0, 0, 0, 1, 1, 1, 0, 0], 
    [0, 0, 0, 1, 1, 0, 0, 0], 
    [0, 0, 1, 1, 1, 1, 0, 0], 
    [0, 1, 1, 0, 0, 1, 1, 0], 
    [1, 1, 0, 0, 0, 0, 1, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1],
],
  [
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 0, 0, 0, 0, 0, 0, 1], 
    [1, 1, 0, 0, 0, 0, 0, 1], 
    [0, 1, 1, 0, 0, 0, 1, 1], 
    [0, 0, 0, 1, 1, 1, 1, 0], 
    [0, 0, 0, 0, 0, 1, 0, 0], 
    [0, 0, 0, 0, 0, 1, 0, 0], 
    [0, 0, 0, 0, 0, 1, 0, 0],
],
  [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 1, 0, 0], 
    [0, 0, 1, 1, 0, 0, 0, 0], 
    [0, 1, 1, 0, 0, 0, 0, 0], 
    [0, 1, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 0, 0, 0, 0, 0, 0, 0], 
    [1, 1, 1, 1, 1, 1, 1, 1],
]
]


let params;
function setup() {
  createCanvas(780, 900,SVG); // 创建画布
  background(255); // 设置背景为白色
   // 获取当前URL中的参数
   let urlString = window.location.href;
   let url = new URL(urlString);
   params = new URLSearchParams(url.search);
   window.parent.postMessage({ myVariable: false }, '*');
   // 通过参数名获取参数值
   let paramValue = params.get('index');

   if(paramValue)drawPattern=pkm[paramValue]



    // 通过参数名获取参数值
    let paramValue1 = params.get('pm');


    if(paramValue1){
    // let paramValue2 = params.get('iy');
    JSON.parse(paramValue1).forEach(element => {
      zm[element[1]][element[0]]=element[2]
    });

    console.log( zm)



    // zm[paramValue1][paramValue2]=1
   drawPattern=zm
  }
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  serial.list();

  // Open the specified port (change to your actual port name)
  serial.open("COM4");

  // Callbacks for serial events
  serial.on('connected', serverConnected);  // 添加 serverConnected 事件处理
  serial.on('list', gotList);  // 添加 gotList 事件处理
  serial.on('data', gotData);
  serial.on('error', gotError);  // 添加 gotError 事件处理
  serial.on('open', gotOpen);  // 添加 gotOpen 事件处理
  serial.on('close', gotClose);  // 添加 gotClose 事件处理
  
  // 初始化时显示所有图形为小圆点
  initializeShapesAsDots();



  
}



function  saveSvg(){

  save("028A.svg");

}
function draw() {
  // scale (0.5)
  background(255);  // 清除画布

  let currentTime = millis();  // 获取当前时间

  // 检查是否超过 5 秒未接收到数据
  let isIdle = (currentTime - lastUpdateTime > idleTimeLimit);

  // 遍历存储的每个图形组，并进行绘制
  for (let shapeGroup of shapeQueue) {
    // 遍历每组图形
    for (let y = 0; y < drawPattern.length; y++) {
      for (let i = 0; i < drawPattern[y].length; i++) {
        if (drawPattern[y][i] === 1) {
          let shape = shapeGroup[y * drawPattern[0].length + i];

          if (isIdle) {
            // 如果超过5秒没有操作，将图形强制转换为小圆点
            shape.currentSize = lerp(shape.currentSize, 0.2, transitionSpeed);  // 插值过渡到小圆点
            shape.currentType = 1;  // 强制将图形类型设为圆形
            shape.strokeColor = color(0);  // 设置描边颜色为黑色
          } else {
            // 正常过渡
            shape.currentSize = lerp(shape.currentSize, shape.targetSize, transitionSpeed);  // 插值过渡
            shape.currentType = lerp(shape.currentType, shape.targetType, transitionSpeed);  // 插值过渡
            shape.strokeColor = shape.originalStrokeColor;  // 恢复原始描边颜色
          }

             // 修正位置：根据 drawPattern 确定图形位置
             let baseSize = 40;  // 图形基础大小
             let startX = 180 + i * 60;  // 每个图形的 x 轴起点，**50像素间距**
             let startY = 162 + y * 72;  // 每个图形的 y 轴起点，60像素间距
             drawShape(int(shape.currentType), startX, startY, baseSize * shape.currentSize, shape);  // 绘制图形
        }
      }
    }
  }
}

// 定义初始化为小圆点的函数
function initializeShapesAsDots() {
  let newShapeGroup = [];
  for (let y = 0; y < drawPattern.length; y++) {
    for (let i = 0; i < drawPattern[y].length; i++) {
      newShapeGroup.push({
        currentType: 1,    // 设置为圆形
        targetType: 1,     // 设置为圆形
        currentSize: 0.2,  // 初始大小设为小圆点
        targetSize: 0.2,   // 目标大小为小圆点
        xPos: i * 50 + 100,  // X 轴位置修正，**50像素间距**
        yPos: y * 60 + 100,  // Y 轴位置修正
        originalStrokeColor: color(0),  // 设置初始描边颜色为黑色
        strokeColor: color(0)  // 设置当前描边颜色为黑色
      });
    }
  }

  // 添加到队列
  shapeQueue.push(newShapeGroup);
}

// 定义 serverConnected 函数
function serverConnected() {
  print("Connected to Server");
}

// 定义 gotList 函数来列出串口
function gotList(thelist) {
  print("List of Serial Ports:");
  for (let i = 0; i < thelist.length; i++) {
    print(i + " " + thelist[i]);
  }
}

// 定义 gotError 函数来处理错误
function gotError(theerror) {
  print("There was an error with the serial port: " + theerror);
}

// 定义 gotOpen 函数来处理串口打开
function gotOpen() {
  print("Serial Port is Open");
}

// 定义 gotClose 函数来处理串口关闭
function gotClose() {
  print("Serial Port is Closed");
}

// 绘制不同形状的函数，并在每种形状中自定义颜色和描边
function drawShape(type, x, y, size, shape) {
  stroke(shape.strokeColor); // 使用当前描边颜色
  strokeWeight(2); // 描边粗细
  fill(255); // 填充白色

  switch (type) {
    case 0:
      // 设置线段的颜色和描边粗细
      stroke(0, 0, 255);  // 蓝色描边
      noFill();           // 无填充
      line(x, y - size / 2, x, y + size / 2);  // 线段，从中心开始画
      break;
      
    case 1:
      // 使用当前描边颜色
     
      strokeWeight(3); // 描边粗细
      ellipse(x, y, size*0.8);  // 圆形，以中心缩放
      stroke(140, 113, 0);  // 绿色描边
    
      break;
      
case 2:
  // 设置圆角方块的颜色和描边粗细
  stroke(0, 255, 0);  // 绿色描边
  strokeWeight(3);    // 描边粗细
  fill(200, 255, 200);  // 浅绿色填充
  rectMode(CENTER);    // 方块，从中心缩放
  
  let maxSize = 60;    // 限制圆角方块的最大尺寸
  let adjustedSize = min(size, maxSize);  // 如果 size 超过 maxSize，使用 maxSize
  
  let cornerRadius = 20;  // 设置圆角半径
  rect(x, y, adjustedSize*1.2, adjustedSize*1.2, cornerRadius);  // 使用调整后的尺寸绘制圆角方块
  break;

  case 3:
  // 设置三角形的颜色和描边粗细
  stroke(255, 255, 0);  // 黄色描边
  strokeWeight(3);      // 描边粗细
  fill(255, 255, 200);  // 浅黄色填充
  
  // 绘制等边三角形
  let h = (sqrt(3) / 2) * size;  // 等边三角形的高度
  triangle(
    x, y - h / 2,  // 顶部顶点
    x - size / 2, y + h / 2,  // 左下角顶点
    x + size / 2, y + h / 2   // 右下角顶点
  );
  break;

    case 4:
      // 设置梯形的颜色和描边粗细
      stroke(0, 255, 234);  // 青色描边
      strokeWeight(20);      // 描边粗细
      fill(177, 252, 247);  // 浅青色填充
      quad(
        x - size / 4, y - size / 2,
        x + size / 4, y - size / 2,
        x + size / 3, y + size / 2,
        x - size / 3, y + size / 2
      );  // 梯形
      break;
      
case 5:
  // 设置扁的倒三角形的颜色和描边粗细
  stroke(140, 113, 0);  // 紫色描边
  strokeWeight(5);      // 描边粗细
  noFill();  // 不填充

  let triangleWidth = size * 1.5;  // 调整三角形的宽度，放大为原来的2.5倍
  let triangleHeight = size * 0.3;   // 调整三角形的高度，放大为原来的1.5倍

  // 绘制放大的扁倒三角形
  triangle(
    x, y + triangleHeight / 2,  // 底部顶点
    x - triangleWidth / 2, y - triangleHeight / 2,  // 左顶点
    x + triangleWidth / 2, y - triangleHeight / 2   // 右顶点
  );
  break;



case 6:
  // 设置正方形的描边颜色和描边粗细
  stroke(255, 145, 0);  // 橙色描边
  strokeWeight(3);      // 描边粗细
  noFill();             // 无填充，只显示描边

  // 绘制正方形
  rectMode(CENTER);  // 让正方形从中心绘制
  rect(x, y, size, size);  // 绘制正方形，宽和高为 size

  // 设置圆形的填充颜色
  fill(77, 24, 222);  // 填充橙色
  noStroke();  // 取消圆形的描边

  // 绘制正方形内的圆形
  ellipse(x, y, size * 0.7, size * 0.7);  // 圆形的直径为正方形的 80%
  break;


  case 7:
  // 设置圆形组合的颜色和描边粗细
  noStroke();  // 蓝色描边
  // strokeWeight(2);    // 描边粗细
  fill(0, 255, 13);  // 浅蓝色填充

  let spacing = size / 1.5;  // 减少圆形之间的间距
  let smallCircleSize = size / 8;  // 每个小圆的大小，减小圆的尺寸

  // 绘制3x3的圆形组合
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // 计算每个圆的位置
      let offsetX = x + i * spacing;  // 水平方向偏移
      let offsetY = y + j * spacing;  // 垂直方向偏移
      ellipse(offsetX, offsetY, smallCircleSize, smallCircleSize);  // 绘制圆形
    }
  }
  break;

  
      
case 8:
  // 设置线的颜色和描边粗细
  stroke(255, 8, 16);  // 黑色描边
  strokeWeight(5);  // 描边粗细
  strokeCap(SQUARE);  // 设置平头线条
  noFill();  // 不需要填充

  let lineSpacing = size / 4;  // 两条竖线之间的间距

  // 绘制第一根竖线
  line(x - lineSpacing, y - size / 2, x - lineSpacing, y + size / 2);

  // 绘制第二根竖线
  line(x + lineSpacing, y - size / 2, x + lineSpacing, y + size / 2);
  break;





    case 9:
      // 设置十边形的颜色和描边粗细
      noStroke();  // 橙色描边
      strokeWeight(2);      // 描边粗细
      fill(110, 46, 1);  // 浅橙色填充
      drawPolygon(x, y, size / 2, 10);  // 绘制十边形
      break;

   case 10:
  // 设置扁长方形的颜色和描边粗细
  stroke(235, 0, 23);  // 绿色描边
  strokeWeight(4);      // 描边粗细
  fill(0, 121, 235);  // 浅绿色填充
  rectMode(CENTER);     // 矩形从中心开始绘制

  let rectWidth = size * 0.3;  // 扩大宽度，变成扁的长方形
  let rectHeight = size / 1.1;   // 高度相对较小

  rect(x, y, rectWidth, rectHeight);  // 绘制扁长方形
  break;


case 11:
  // 设置大圆的颜色和描边粗细
  stroke(219, 4, 219);  // 红色描边
  strokeWeight(1.5);    // 描边粗细
  noFill();  // 取消填充，只保留描边
  
  let largeCircleSize = size * 2.2;  // 将圆形放大两倍
  
  ellipse(x, y, largeCircleSize, largeCircleSize);  // 绘制一个大圆
  break;


    default:
      // 设置默认圆形的颜色和描边粗细
      stroke(0);  // 黑色描边
      strokeWeight(1);  // 描边粗细
      fill(255, 255, 255);  // 白色填充
      ellipse(x, y, size);  // 默认绘制圆形
      break;
  }
}

// 绘制五角星的函数
function drawStar(x, y, radius1, radius2) {
  let angle = TWO_PI / 5;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// 绘制任意边数多边形的函数
function drawPolygon(x, y, radius, sides) {
  beginShape();
  for (let i = 0; i < sides; i++) {
    let angle = TWO_PI / sides * i;
    let sx = x + cos(angle) * radius;
    let sy = y + sin(angle) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// 绘制心形的函数
function drawHeart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 3, x - size, y + size / 3, x, y + size / 2);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 3, x, y);
  endShape(CLOSE);
}

// 处理串口数据
function gotData() {
  
  // 向父页面发送消息
if(!spt){
  spt=true
  window.parent.postMessage({ myVariable: true }, '*');
}

  let currentString = serial.readLine();  
  currentString = trim(currentString);    
  if (!currentString) return;             
  console.log(currentString);             
  
  let dataArray = currentString.split(',');  

  if (dataArray.length === 2) {
    let x = int(dataArray[0]);  // 获取 x 值作为图形的键
    let size = map(int(dataArray[1]), 0, 255, 0.5, 2);  // 图形大小，范围从0.5倍到2倍

    // 更新最后一次操作时间
    lastUpdateTime = millis();

    // 创建新的图形组
    let newShapeGroup = [];
    for (let y = 0; y < drawPattern.length; y++) {
      for (let i = 0; i < drawPattern[y].length; i++) {
        newShapeGroup.push({
          currentType: x,    // 当前类型，初始化为输入的类型
          targetType: x,     // 目标类型
          currentSize: 0.5,  // 初始大小设为 0.5 以确保有过渡效果
          targetSize: size,  // 目标大小
          xPos: i * 50 + 100,  // X 轴位置修正，**50像素间距**
          yPos: y * 60 + 100,  // Y 轴位置修正
          originalStrokeColor: color(0),  // 设置初始描边颜色为黑色
          strokeColor: color(0)  // 设置当前描边颜色为黑色
        });
      }
    }

    // 限制图形组队列的大小为2，超过时移除最早的图形组
    if (shapeQueue.length >= 2) {
      shapeQueue.shift();  // 删除队列中的第一个图形组
    }

    // 将新的图形组添加到队列
    shapeQueue.push(newShapeGroup);
  }

  latestData = currentString;  
}