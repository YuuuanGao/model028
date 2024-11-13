let ms=0;
let gp=0
let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let gridSize = 40;
let gap = 10;
let Aclicked = -1;
let letterBoxes = [];

let    ad1=[[],[],[]]
let klm=["../model028A-code/index.html?index=", "../model028B-code/index.html?index=", "../model028C-code/index.html?index="]
let klm2=["../model028A-code/index.html?", "../model028B-code/index.html?", "../model028C-code/index.html?"]
let   showall=false

let circles = [];
let clickCount = 0;
let canvas;
// let 0 = 0;
let   img=[]

let customFont;

let pm=[]
function preload(){
  customFont = loadFont('1.otf');
  // textFont(customFont);
for(let i=0;i<6;i++){

  img[i]=loadImage("./images/"+i+".png")
}
}
function setup(){

  // createCanvas(1920,2220)
  createCanvas(windowWidth,2000)

  // createAdaptiveCanvas(1920,2220);

  let index = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 9; j++) {
      let x = j * (gridSize + gap) + gridSize / 2;
      let y = i * (gridSize + gap) + gridSize / 2;
      letterBoxes.push(new LetterBox(x+290, y+140, letters[index],index));
      index++;
    }
  }



  let size = 5;
  let pindex = 1;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 9; j++) {
      let x = size + i * 30 +20;
      let y = size + j * 36+15 ;
      circles.push(new Circle(x+290, y+415, size,i,j));
      pindex++;
    }
  }
}


let    zbn=false

iframe=document.getElementById('028A');
iframe1=document.getElementById('028B');
iframe2=document.getElementById('028C');


// 监听来自iframe的消息
window.addEventListener('message', function(event) {
  // 检查消息来源是否是您的iframe
  try {
  if (event.source === iframe.contentWindow) {
      // 获取从iframe发送过来的数据
      const data = event.data;
      
      // 检查变量值是否为true
      if (data.myVariable === true) {
          // 执行相应的操作
          console.log('变量值为true');
          zbn=true
          // 可以在这里执行您需要的操作
      }
      else{
        zbn=false
      }
  }
} catch (error) {
  // 捕获并处理异常
  // console.log('捕获到异常：' + error.message);
}
});
window.addEventListener('message', function(event) {
  // 检查消息来源是否是您的iframe
  try {
  if (event.source === iframe1.contentWindow) {
      // 获取从iframe发送过来的数据
      const data = event.data;
      
      // 检查变量值是否为true
      if (data.myVariable === true) {
          // 执行相应的操作
          console.log('变量值为true');
          zbn=true
          // 可以在这里执行您需要的操作
      }
      else{
        zbn=false
      }
  }
} catch (error) {
  // 捕获并处理异常
  // console.log('捕获到异常：' + error.message);
}
});
window.addEventListener('message', function(event) {


  try {
  // 检查消息来源是否是您的iframe
  if (event.source === iframe2.contentWindow) {
      // 获取从iframe发送过来的数据
      const data = event.data;
      
      // 检查变量值是否为true
      if (data.myVariable === true) {
          // 执行相应的操作
          console.log('变量值为true');
          zbn=true
          // 可以在这里执行您需要的操作
      }
      else{
        zbn=false
      }
  }

} catch (error) {
  // 捕获并处理异常
  // console.log('捕获到异常：' + error.message);
}
});


  


function draw(){
  background(255)
  textFont(customFont);
  rect(width-150,30,100,30)
  textSize(36)
  fill (0)
  text ("Model 028-VariFont Playboard",30,52)
  textSize(26)
  text ("Model 028-A",65,117)

 
  text ("Model 028-B",65,154)
  text ("Model 028-C",65,191)
  textSize(15)

  
  if(zbn)  text ("connected",width-140,50)
    else text ("connecting...",width-140,50)
  // text ("connecting...",80,height-100)
  // text ("Model 028-C",80,290)


  

  textSize(22)
  text("Default A-Z",290,115)

  text("Custom",290,325)
  noFill()


  for(let i=0;i<3;i++){


    push()

    if(i==ms)fill(0)
      else noFill()

    ellipse(40,108+37*i,23,23)

    pop()

  }
  
  line(65,120+ms*37,215,120+ms*37)
  

  line (0,80,width,80)
  line (width/6,80,width/6,height)
  line (width/2,80,width/2,height)

  
  for (let box of letterBoxes) {
    if(box.letter)box.display();
  }

  if(ms!=1){
  push()
  translate(0,-50)
  stroke(0);
   
  if (gp==0) {
    fill(0);
    rect(290,405,80,25);
    fill(255);
  } else {
    fill(255);
    rect(290,405,80,25);
    fill(0);
  }
  textAlign(CENTER, CENTER);
  textSize(16);
  text("8*9", 290+40, 405+12.5);
  pop ()
  }

  if(ms==1){
    push()
    stroke(0);
    translate(0,-50)
    if (gp==0) {
      fill(0);
      rect(290,405,80,25);
      fill(255);
    } else {
      fill(255);
      rect(290,405,80,25);
      fill(0);
    }
    textAlign(CENTER, CENTER);
    textSize(16);
    text("4*6", 290+40, 405+12.5);
    pop ()
    }
if(ms!=1){
  // push()
  // stroke(0);
   
  // if (gp==1) {
  //   fill(0);
  //   rect(540,420,120,40);
  //   fill(255);
  // } else {
  //   fill(255);
  //   rect(540,420,120,40);
  //   fill(0);
  // }
  // textAlign(CENTER, CENTER);
  // textSize(24);
  // // text("16*18", 540+60, 420+22);
  // pop ()
}
   if(ms!=1){
    if(gp==0)rect(290,405,260,350)
      if(gp==1)rect(290,405,480,520)

   }
   else{

    rect(290,405,140,240)
   }
  
  for (let circle of circles) {
    circle.display();
  }

  push()

  if(gp==1)translate (0,190)
 


  if(ms==0){


    // for(let i=0;i<clickCount;i++){

      push()

  translate(-100,-85)
  // scale (0.82)
    fill(0)
    ellipse(400,890,25,25)
    fill(255)
    textSize(15)
    textAlign(CENTER, CENTER);
    text(clickCount,400,890)
  
    rect(430,878,80,25)
    fill(0)
    text("clean",470,890)
push()
rectMode(CENTER)
  for(let i=0;i<44;i++){

   strokeWeight(0.5)
    rect(390+i*10,930,5,0.5)
  }
  rect(276+55*10,930+10,0.5,5)
  rect(276+55*10,930+20,0.5,5)
  // rect(276+55*10,930+30,0.5,5)
  rect(386,930+10,0.5,5)
  rect(386,930+20,0.5,5)
  // rect(386,930+30,0.5,5)

  pop()
  for(let j=0;j<12;j++){

    if(ad1[clickCount].includes(j)){

      fill(0)
    }
    else{
      noFill()
    }

    // ellipse(386+j*50,970,10,10)
  }
  image (img[0],365,960,595*0.8,66*0.8)

  pop()
    // }
}

  if(ms==1){

    translate(-100,-195)
    fill(0)
    ellipse(400,890,25,25)
    fill(255)
    textSize(15)
    textAlign(CENTER, CENTER);
    text(clickCount,400,890)
  
    rect(430,878,80,25)
    fill(0)
    text("clean",470,890)


    push()
    rectMode(CENTER)
      for(let i=0;i<42;i++){
    
        strokeWeight(0.5)
        rect(392+i*10,930,5,0.5)
      }
      rect(260+55*10,930+10,0.5,5)
      rect(260+55*10,930+20,0.5,5)
      // rect(276+55*10,930+30,0.5,5)
      rect(386,930+10,0.5,5)
      rect(386,930+20,0.5,5)
      // rect(386,930+30,0.5,5)
    
      pop()
  for(let i=0;i<9;i++){

    if(ad1[clickCount].includes(i)){

      fill(0)
    }
    else{
      noFill()
    }

   
    ellipse(386+i*53,970,10,10)
  }


  image (img[1],360,970,600*0.8,88*0.8)

}
  if(ms==2){
    push()
    translate(-100,-85)
    fill(0)
    ellipse(400,890,25,25)
    fill(255)
    textSize(15)
    textAlign(CENTER, CENTER);
    text(clickCount,400,890)
  
    rect(430,878,80,25)
    fill(0)
    text("clean",470,890)

    push()
    rectMode(CENTER)
      for(let i=0;i<10;i++){
    
        strokeWeight(0.5)
        rect(392+i*10,930,5,0.5)
      }
      rect(488,930+10,0.5,5)
      rect(488,930+20,0.5,5)
      // rect(276+55*10,930+30,0.5,5)
      rect(386,930+10,0.5,5)
      rect(386,930+20,0.5,5)
      // rect(386,930+30,0.5,5)
    
      pop()
  for(let i=0;i<3;i++){

    if(ad1[clickCount].includes(i)){

      fill(0)
    }
    else{
      noFill()
    }

    ellipse(386+i*50,970,10,10)
  }


  
  image (img[2],360,973,200*0.8,90*0.8)
pop()
}

  pop ()




  // right

 fill(0)
  rect(width/2,80,width/2,height+0)


  fill(255)
  rect(width/2+30,100,780*0.8,900*0.8)


  push()

  fill(255)
  rect(width/2+30,850,130,30)
  fill(0)
  textSize(18)
  text("save_svg",width/2+58,865+5)

  image(img[ms+3],width/2+30,950,img[ms+3].width*0.8/3,img[ms+3].height*0.8/3)

  pop()

}
function pointInRectangle(rx, ry, rw, rh) {
  if (mouseX >= rx && mouseX <= rx + rw && mouseY >= ry-0) {
    return true;
  } else {
    return false;
  }
}
function mouseClicked() {


  console.log(mouseX,mouseY)


  let   psl=[[364,801],[369,693],[364,801]]

  if(dist(mouseX,mouseY,psl[ms][0],psl[ms][1])<50){
    let lastIndex = -1;

    for (let i = 0; i < circles.length; i++) {
      if (circles[i].clicked === true) {
          lastIndex = i;
      }
  }

  circles[lastIndex].clicked=false

  clickCount--;


  pm.pop()




  if(ms==0){


    
    let newSrc = klm2[ms]+"pm="+ JSON.stringify(pm);
    console.log(newSrc)
    let zk=["28A","28B","28C"]
document.getElementById(zk[ms]).src = newSrc;
document.getElementById(zk[ms]).style.display = "block";


    console.log(ad1)


    // console.log(parseInt((mouseX-360)/(600/12)))
  }
  if(ms==1){


    
    let newSrc = klm2[ms]+"pm="+ JSON.stringify(pm);
    console.log(newSrc)
    let zk=["28A","28B","28C"]
document.getElementById(zk[ms]).src = newSrc;
document.getElementById(zk[ms]).style.display = "block";
    console.log(ad1)


    
  }
  if(ms==2){


    // ad1[clickCount].push(parseInt((mouseX-360)/(200/3)))
  

    // console.log(ad1)

    // pm[clickCount-1][pm[clickCount-1].length-1]=parseInt((mouseX-360)/(200/3))+1
    // console.log(x,y)
    let newSrc = klm2[ms]+"pm="+ JSON.stringify(pm);
    console.log(newSrc)
    let zk=["28A","28B","28C"]
document.getElementById(zk[ms]).src = newSrc;
document.getElementById(zk[ms]).style.display = "block";
    // console.log(parseInt((mouseX-360)/(600/12)))
  }
    
  }
    
   if(dist(mouseX,mouseY,865 ,865)<80){

    let zk=["28A","28B","28C"]
    document.getElementById(zk[ms]).contentWindow.saveSvg()
  
   }

  if(ms==0&& pointInRectangle(365,960,595*0.8,66*0.8)){


    ad1[clickCount].push(parseInt((mouseX-365)/(595*0.8/12)))




    pm[clickCount-1][pm[clickCount-1].length-1]=parseInt((mouseX-365)/(595*0.8/12))+1
    // console.log(x,y)
    let newSrc = klm2[ms]+"pm="+ JSON.stringify(pm);
    console.log(newSrc)
    let zk=["28A","28B","28C"]
document.getElementById(zk[ms]).src = newSrc;
document.getElementById(zk[ms]).style.display = "block";


    console.log(ad1)


    // console.log(parseInt((mouseX-360)/(600/12)))
  }
  if(ms==1&& pointInRectangle(259,774,600*0.8,88*0.8)){

    // ad1[clickCount]=[]
    // console.log(ad1[clickCount])
    ad1[clickCount][0]=parseInt((mouseX-259)/(600*0.8/9))

    // pm[clickCount-1].push(parseInt((mouseX-360)/(600/9)))
    pm[clickCount-1][pm[clickCount-1].length-1]=parseInt((mouseX-259)/(600*0.8/9))+1
    // console.log(x,y)
    let newSrc = klm2[ms]+"pm="+ JSON.stringify(pm);
    console.log(newSrc)
    let zk=["28A","28B","28C"]
document.getElementById(zk[ms]).src = newSrc;
document.getElementById(zk[ms]).style.display = "block";
    // console.log(ad1)


    // console.log(parseInt((mouseX-360)/(600/12)))
  }
  if(ms==2&& pointInRectangle(260,886,200*0.8,90*0.8)){


    ad1[clickCount][0]=parseInt((mouseX-260)/(200*0.8/3))
  

    console.log(ad1)

    pm[clickCount-1][pm[clickCount-1].length-1]=parseInt((mouseX-260)/(200*0.8/3))+1
    // console.log(x,y)
    let newSrc = klm2[ms]+"pm="+ JSON.stringify(pm);
    console.log(newSrc)
    let zk=["28A","28B","28C"]
document.getElementById(zk[ms]).src = newSrc;
document.getElementById(zk[ms]).style.display = "block";
    // console.log(parseInt((mouseX-360)/(600/12)))
  }
  for (let box of letterBoxes) {
    box.checkClicked();
  }
  console.log(mouseX,mouseY)
  for(let i=0;i<3;i++){



    if(mouseX<345&&mouseY<115+40*i&&mouseY>90+40*i){
      ms=i

 
      clickCount=0
      ad1=[[]]
      pm=[]

      if(ms==1){
        circles=[]
    
        let size = 5;
        let pindex = 1;
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 6; j++) {
            let x = size + i * 30 +20;
      let y = size + j * 36+15 ;
            circles.push(new Circle(x+290, y+415, size,i,j));
            pindex++;
          }
        }

      }
      else{
        circles=[]
    
        let size = 5;
        let pindex = 1;
        for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 9; j++) {
            let x = size + i * 30 +20;
      let y = size + j * 36+15 ;
            circles.push(new Circle(x+290, y+415, size,i,j));
            pindex++;
          }
        }
      }
    }

    

  }
  for (let circle of circles) {
    circle.checkClick(mouseX, mouseY+0);
  }


  // if(dist(mouseX,mouseY,540+60, 420+22)<50){
  //   clickCount=0

  //   gp=1
  //   let size = 12;
  //   let pindex = 1;
  //   circles=[]
  //   for (let i = 0; i < 16; i++) {
  //     for (let j = 0; j < 18; j++) {
  //       let x = size + i * size * 2.5;
  //       let y = size + j * size * 2.5;
  //       circles.push(new Circle(x+400, y+500, size,i,j));
  //       pindex++;
  //     }
  //   }

  // }
  // if(dist(mouseX,mouseY,290+60, 420+22)<50){
  //   clickCount=0
  //   gp=0
  //   circles=[]
  //   let size = 5;
  //   let pindex = 1;
  //   for (let i = 0; i < 8; i++) {
  //     for (let j = 0; j < 9; j++) {
  //       let x = size + i * size * 2.5;
  //       let y = size + j * size * 2.5;
  //       circles.push(new Circle(x+400, y+500, size,i,j));
  //       pindex++;
  //     }
  //   }

  // }
}


class LetterBox {
  constructor(x, y, letter,index) {
    this.x = x;
    this.y = y;
    this.letter = letter;
    this.clicked = index;
  }

  display() {

    push()
    stroke(0);
   
    if (this.clicked==Aclicked) {
      fill(0);
      rect(this.x - gridSize / 2, this.y - gridSize / 2, gridSize, gridSize);
      fill(255);
    } else {
      fill(255);
      rect(this.x - gridSize / 2, this.y - gridSize / 2, gridSize, gridSize);
      fill(0);
    }
    textAlign(CENTER, CENTER);
    textSize(26);
    noStroke()
    text(this.letter, this.x, this.y);
    pop ()
  }

  checkClicked() {
    if (mouseX > this.x - gridSize / 2 && mouseX < this.x + gridSize / 2 &&
        mouseY > this.y - gridSize / 2 && mouseY < this.y + gridSize / 2) {
          Aclicked= this.clicked 


          let newSrc = klm[ms]+this.clicked;
          let zk=["28A","28B","28C"]
      document.getElementById(zk[ms]).src = newSrc;
      document.getElementById(zk[ms]).style.display = "block";
    }
  }
}



class Circle {
  constructor(x, y, size,ix,iy) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.clicked = false;

    this.ix=ix,
    this.iy=iy,

    this.clickOrder = 0;
  }
  
  display() {

    push()

    if (this.clicked) {
      fill(0);
      ellipse(this.x, this.y, this.size*5);
      fill(255);
      textSize(15);
      textAlign(CENTER, CENTER);
      text(this.clickOrder, this.x, this.y);
    } else {
      fill(255);
      ellipse(this.x, this.y, this.size);
    }

    pop ()
  }
  
  checkClick(x, y) {
    let d = dist(x, y, this.x, this.y);
    if (d < this.size) {
      this.clicked = true;
      clickCount++;

      if(ms==0)pm.push([this.ix,this.iy,1])
       else pm.push([this.ix,this.iy,0])
      console.log(x,y)
      let newSrc = klm2[ms]+"pm="+ JSON.stringify(pm);
      console.log(newSrc)
      let zk=["28A","28B","28C"]
  document.getElementById(zk[ms]).src = newSrc;
  document.getElementById(zk[ms]).style.display = "block";
      // resizeCanvas(width, height+clickCount*100);
      ad1[clickCount]=[]
      this.clickOrder = clickCount;
    }
  }
}
