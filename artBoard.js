const canvas = document.getElementById('myCanvas');
var xPosition;
var yPosition;

var firstClick=[];
var secondClick=[];

rectBtn = document.getElementById("rect");
circlBtn = document.getElementById("crcl");
lineBtn = document.getElementById("line");
drawBtn = document.getElementById("draw");
clearBtn = document.getElementById("clear");

var fillColor;
var strokeColor;

var isPress = false;
var old = null;

document.getElementById("crcl").addEventListener("click",()=>{
    rectBtn.style.backgroundColor = "greenyellow";
    circlBtn.style.backgroundColor = "red";
    lineBtn.style.backgroundColor = "greenyellow";
    drawBtn.style.backgroundColor = "greenyellow";
    clearBtn.style.backgroundColor = "greenyellow";
});

document.getElementById("line").addEventListener("click",()=>{
    rectBtn.style.backgroundColor = "greenyellow";
    circlBtn.style.backgroundColor = "greenyellow";
    lineBtn.style.backgroundColor = "red";
    drawBtn.style.backgroundColor = "greenyellow";
    clearBtn.style.backgroundColor = "greenyellow";
});

document.getElementById("rect").addEventListener("click",()=>{
    rectBtn.style.backgroundColor = "red";
    circlBtn.style.backgroundColor = "greenyellow";
    lineBtn.style.backgroundColor = "greenyellow";
    drawBtn.style.backgroundColor = "greenyellow";
    clearBtn.style.backgroundColor = "greenyellow";
});

document.getElementById("draw").addEventListener("click",()=>{
    rectBtn.style.backgroundColor = "greenyellow";
    circlBtn.style.backgroundColor = "greenyellow";
    lineBtn.style.backgroundColor = "greenyellow";
    drawBtn.style.backgroundColor = "red";
    clearBtn.style.backgroundColor = "greenyellow";
    console.log("vvvv");
    console.log(drawBtn.style.backgroundColor);
});

document.getElementById("clear").addEventListener("click",()=>{
    rectBtn.style.backgroundColor = "greenyellow";
    circlBtn.style.backgroundColor = "greenyellow";
    lineBtn.style.backgroundColor = "greenyellow";
    drawBtn.style.backgroundColor = "greenyellow";
    clearBtn.style.backgroundColor = "red";
});

document.getElementById("fill").addEventListener("change",(e)=>{
    fillColor = e.target.value;
});

document.getElementById("strok").addEventListener("change",(e)=>{
    strokeColor = e.target.value;
});

var clear = canvas.getContext('2d');
canvas.addEventListener("mousedown",(e)=>{
    isPress = false;
    var rect = e.target.getBoundingClientRect();
    xPosition = e.clientX - rect.left; 
    yPosition = e.clientY - rect.top; 
    firstClick[0]=xPosition;
    firstClick[1]=yPosition;
    if (clearBtn.style.backgroundColor == "red" ||  drawBtn.style.backgroundColor == "red")
    {
        console.log("sadasdasda");
        isPress = true;
        old = {x: e.offsetX, y: e.offsetY};
    }
})

canvas.addEventListener("mousemove",(e)=>{
    if (clearBtn.style.backgroundColor == "red")
    {
        if (isPress) {
            var x = e.offsetX;
            var y = e.offsetY;
            clear.globalCompositeOperation = 'destination-out';
            clear.beginPath();
            clear.arc(x, y, 10, 0, 2 * Math.PI);
            clear.fill();
            clear.lineWidth = 20;
            clear.beginPath();
            clear.moveTo(old.x, old.y);
            clear.lineTo(x, y);
            clear.stroke();
            old = {x: x, y: y};
          }
    }
    else if(drawBtn.style.backgroundColor == "red")
    {
        if(isPress)
        {
            var x = e.offsetX;
            var y = e.offsetY;
            clear.strokeStyle= strokeColor;
            clear.lineWidth = 3;
            clear.globalCompositeOperation = 'source-over';
            clear.beginPath();
            clear.moveTo(old.x, old.y);
            clear.lineTo(x, y);
            clear.stroke(); 
            old = {x: x, y: y};
        }
    }
});

canvas.addEventListener("mouseup",(e)=>{

    var rect = e.target.getBoundingClientRect();
    xPosition = e.clientX - rect.left; 
    yPosition = e.clientY - rect.top; 
    secondClick[0]=xPosition;
    secondClick[1]=yPosition;
    
    if (circlBtn.style.backgroundColor == "red")
    {
        isPress = false;
        secondClick[0]=xPosition;
        secondClick[1]=yPosition;
        var radius = Math.sqrt(Math.pow(Math.abs(firstClick[0]-secondClick[0]), 2) + Math.pow(Math.abs(firstClick[1]-secondClick[1]), 2)); 
        var circle = canvas.getContext('2d');
        clear.globalCompositeOperation = 'source-over';
        circle.beginPath();
        circle.arc(firstClick[0], firstClick[1], radius, 0, 2 * Math.PI, false);
        circle.fillStyle = fillColor;
        circle.fill();
        circle.strokeStyle= strokeColor;
        circle.lineWidth = 4;
        circle.stroke();
    }

    else if (rectBtn.style.backgroundColor == "red")
    {
        isPress = false;
        secondClickFlag = true;
        secondClick[0]=xPosition;
        secondClick[1]=yPosition;
        var cContext = canvas.getContext("2d");  
        var width = secondClick[0]-firstClick[0];
        var height = secondClick[1]-firstClick[1];
        cContext.fillStyle = fillColor;
        clear.globalCompositeOperation = 'source-over';
        cContext.fillRect(firstClick[0],firstClick[1],width,height); 
        cContext.strokeStyle= strokeColor;
        cContext.strokeRect(firstClick[0],firstClick[1],width,height); 
        cContext.lineWidth = 4;      
    }

    else if (lineBtn.style.backgroundColor == "red")
    {
        isPress = false;
        secondClick[0]=xPosition;
        secondClick[1]=yPosition;
        var ctx = canvas.getContext("2d");
        ctx.moveTo(firstClick[0], firstClick[1]);
        ctx.lineTo(secondClick[0], secondClick[1]);
        ctx.strokeStyle= strokeColor;
        clear.globalCompositeOperation = 'source-over';
        ctx.stroke();    
    }

    else if (clearBtn.style.backgroundColor == "red" || drawBtn.style.backgroundColor == "red")
    {
        isPress = false;
    }
});





