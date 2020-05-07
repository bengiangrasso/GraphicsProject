"use strict";

var canvas;
var gl;

var NumVertices  = 288;

var pointsArray = [];
var colorsArray = [];

var swing = -0.1;
var dirBool = 0;
var walkBool = 1;
var doorBool = 0;

var vertices = [
    // torso
    vec4(-0.1, -0.5,  0.7, 1.0), // 0 
    vec4(-0.1,  0.0,  0.7, 1.0), // 1
    vec4(0.1,  0.0,  0.7, 1.0), // 2
    vec4(0.1, -0.5,  0.7, 1.0), // 3
    vec4(-0.1, -0.5,  0.5, 1.0), // 4
    vec4(-0.1,  0.0,  0.5, 1.0), // 5
    vec4(0.1,  0.0,  0.5, 1.0), // 6
    vec4(0.1, -0.5,  0.5, 1.0), // 7

    // head
    vec4(-0.12, 0.05,  0.72, 1.0), // 8
    vec4(-0.12,  0.25,  0.72, 1.0), // 9
    vec4(0.12,  0.25,  0.72, 1.0), // 10
    vec4(0.12, 0.05,  0.72, 1.0), // 11
    vec4(-0.12, 0.05,  0.48, 1.0), // 12
    vec4(-0.12,  0.25,  0.48, 1.0), // 13
    vec4(0.12,  0.25,  0.48, 1.0), // 14
    vec4(0.12, 0.05,  0.48, 1.0), // 15

    // neck
    vec4(-0.08, 0.0,  0.68, 1.0), // 16
    vec4(-0.08,  0.05,  0.68, 1.0), // 17
    vec4(0.08,  0.05,  0.68, 1.0), // 18
    vec4(0.08, 0.0,  0.68, 1.0), // 19
    vec4(-0.08, 0.0,  0.52, 1.0), // 20
    vec4(-0.08,  0.05,  0.52, 1.0), // 21
    vec4(0.08,  0.05,  0.52, 1.0), // 22
    vec4(0.08, 0.0,  0.52, 1.0), // 23
];

var face = [
    vec2(0.2, 0.83),
    vec2(0.2, 0.17),
    vec2(0.8, 0.17),
    vec2(0.8, 0.83),
];
// moving vertices
var leftLeg = [
    vec4(-0.05, -0.9,  0.7, 1.0), // 0
    vec4(-0.05,  -0.4,  0.7, 1.0), // 1
    vec4(0.05,  -0.4,  0.7, 1.0), // 2
    vec4(0.05, -0.9,  0.7, 1.0), // 3
    vec4(-0.05, -0.9,  0.65, 1.0), // 4
    vec4(-0.05,  -0.4,  0.65, 1.0), // 5
    vec4(0.05,  -0.4,  0.65, 1.0), // 6
    vec4(0.05, -0.9,  0.65, 1.0), // 7
];
var rightLeg = [
    vec4(-0.05, -0.9,  0.55, 1.0), // 0
    vec4(-0.05,  -0.4,  0.55, 1.0), // 1
    vec4(0.05,  -0.4,  0.55, 1.0), // 2
    vec4(0.05, -0.9,  0.55, 1.0), // 3
    vec4(-0.05, -0.9,  0.5, 1.0), // 4
    vec4(-0.05,  -0.4,  0.5, 1.0), // 5
    vec4(0.05,  -0.4,  0.5, 1.0), // 6
    vec4(0.05, -0.9,  0.5, 1.0), // 7
];
var leftArm = [
    vec4(-0.05, -0.4,  0.75, 1.0), // 0
    vec4(-0.05, -0.1,  0.75, 1.0), // 1
    vec4(0.05, -0.1,  0.75, 1.0), // 2
    vec4(0.05, -0.4,  0.75, 1.0), // 3
    vec4(-0.05, -0.4,  0.7, 1.0), // 4
    vec4(-0.05, -0.1,  0.7, 1.0), // 5
    vec4(0.05, -0.1,  0.7, 1.0), // 6
    vec4(0.05, -0.4,  0.7, 1.0), // 7
];
var rightArm = [
    vec4(-0.05, -0.4,  0.5, 1.0), // 0
    vec4(-0.05, -0.1,  0.5, 1.0), // 1
    vec4(0.05, -0.1,  0.5, 1.0), // 2
    vec4(0.05, -0.4,  0.5, 1.0), // 3
    vec4(-0.05, -0.4,  0.45, 1.0), // 4
    vec4(-0.05, -0.1,  0.45, 1.0), // 5
    vec4(0.05, -0.1,  0.45, 1.0), // 6
    vec4(0.05, -0.4,  0.45, 1.0), // 7
];

var door = [
    vec4(0.2, -0.9, 0.8, 1.0),
    vec4(0.2, 0.3, 0.8, 1.0),
    vec4(0.25, 0.3, 0.8, 1.0),
    vec4(0.25, -0.9, 0.8, 1.0),
    vec4(0.2, -0.9, 0.4, 1.0),
    vec4(0.2, 0.3, 0.4, 1.0),
    vec4(0.25, 0.3, 0.4, 1.0),
    vec4(0.25, -0.9, 0.4, 1.0),
];

var vertexColors = [
    vec4( 0.957, 0.957, 0.859, 1.0 ), // light biege
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 0.645, 0.164, 0.164, 1.0 ), // brown
    vec4( 0.857, 0.857, 0.759, 1.0 ), // dark biege
];


var near = 0.99;
var far = 9.9;
var radius = 4.0;
var dr = 5.0 * Math.PI/180.0;
var theta  = dr * 9;
var phi    = dr * -2;
var  fovy = 45.0;  // Field-of-view in Y direction angle (in degrees)
var  aspect;       // Viewport aspect ratio

var mvMatrix, pMatrix;
var modelView, projection;
var eye;
const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);

// fills each trianle with a color
// two triangles create square
// e represents color
function quad(arr, a, b, c, d, e) {
    // triangle 1
    pointsArray.push(arr[a]);
    colorsArray.push(vertexColors[e]);
    pointsArray.push(arr[b]);
    colorsArray.push(vertexColors[e]);
    pointsArray.push(arr[c]);
    colorsArray.push(vertexColors[e]);
    // triangle 2
    pointsArray.push(arr[a]);
    colorsArray.push(vertexColors[e]);
    pointsArray.push(arr[c]);
    colorsArray.push(vertexColors[e]);
    pointsArray.push(arr[d]);
    colorsArray.push(vertexColors[e]);
}

// color six sides
function colorCube()
{
    // torso -> 36
    quad( vertices, 0, 1, 2, 3, 0 ); // front side
    quad( vertices, 4, 5, 6, 7, 0 ); // back side
    quad( vertices, 3, 2, 6, 7, 3 ); // right side
    quad( vertices, 1, 0, 4, 5, 3 ); // left side
    quad( vertices, 0, 3, 7, 4, 1 ); // bottom side
    quad( vertices, 6, 5, 1, 2, 1 ); // top side

    // head -> 72
    quad( vertices, 8, 9, 10, 11, 0 );
    quad( vertices, 12, 13, 14, 15, 0 );
    quad( vertices, 11, 10, 14, 15, 3 );
    quad( vertices, 9, 8, 12, 13, 3 );
    quad( vertices, 8, 11, 15, 12, 1 );
    quad( vertices, 14, 13, 9, 10, 1 );

    // neck -> 108
    quad( vertices, 16, 17, 18, 19, 0 );
    quad( vertices, 20, 21, 22, 23, 0 );
    quad( vertices, 19, 18, 22, 23, 3 );
    quad( vertices, 17, 16, 20, 21, 3 );
    quad( vertices, 16, 19, 23, 20, 1 );
    quad( vertices, 22, 21, 17, 18, 1 );

    // left leg -> 144
    quad( leftLeg, 0, 1, 2, 3, 0 );
    quad( leftLeg, 4, 5, 6, 7, 0 );
    quad( leftLeg, 3, 2, 6, 7, 3 );
    quad( leftLeg, 1, 0, 4, 5, 3 );
    quad( leftLeg, 0, 3, 7, 4, 1 );
    quad( leftLeg, 6, 5, 1, 2, 1 );

    // right leg -> 180
    quad( rightLeg, 0, 1, 2, 3, 0 );
    quad( rightLeg, 4, 5, 6, 7, 0 );
    quad( rightLeg, 3, 2, 6, 7, 3 );
    quad( rightLeg, 1, 0, 4, 5, 3 );
    quad( rightLeg, 0, 3, 7, 4, 1 );
    quad( rightLeg, 6, 5, 1, 2, 1 );

    // left arm -> 216
    quad( leftArm, 0, 1, 2, 3, 0 );
    quad( leftArm, 4, 5, 6, 7, 0 );
    quad( leftArm, 3, 2, 6, 7, 3 );
    quad( leftArm, 1, 0, 4, 5, 3 );
    quad( leftArm, 0, 3, 7, 4, 1 );
    quad( leftArm, 6, 5, 1, 2, 1 );

    // right arm -> 252
    quad( rightArm, 0, 1, 2, 3, 0 );
    quad( rightArm, 4, 5, 6, 7, 0 );
    quad( rightArm, 3, 2, 6, 7, 3 );
    quad( rightArm, 1, 0, 4, 5, 3 );
    quad( rightArm, 0, 3, 7, 4, 1 );
    quad( rightArm, 6, 5, 1, 2, 1 );

    // door -> 288
    quad( door, 0, 1, 2, 3, 0 );
    quad( door, 4, 5, 6, 7, 0 );
    quad( door, 3, 2, 6, 7, 3 );
    quad( door, 1, 0, 4, 5, 3 );
    quad( door, 0, 3, 7, 4, 1 );
    quad( door, 6, 5, 1, 2, 1 );
}


window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );

    aspect =  canvas.width/canvas.height;

    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);


    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    colorCube();

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    modelView = gl.getUniformLocation( program, "modelView" );
    projection = gl.getUniformLocation( program, "projection" );

// buttons for viewing parameters

    document.getElementById("Button1").onclick = function(){near  *= 1.1; far *= 1.1;};
    document.getElementById("Button2").onclick = function(){near *= 0.9; far *= 0.9;};
    document.getElementById("Button3").onclick = function(){radius *= 2.0;};
    document.getElementById("Button4").onclick = function(){radius *= 0.5;};
    document.getElementById("Button5").onclick = function(){theta += (dr * 2);};
    document.getElementById("Button6").onclick = function(){theta -= (dr * 2);};
    document.getElementById("Button7").onclick = function(){phi += dr;};
    document.getElementById("Button8").onclick = function(){phi -= dr;};
    document.getElementById("Button9").onclick = function(){location.reload();};
    render();
}


var render = function(){
    if(swing == 0.25) {
        dirBool = 1;
    }
    if(swing == -0.25) {
        dirBool = 0;
    }
    if(dirBool == 1) {
        swing -= 0.05;
    }
    if(dirBool == 0) {
        swing += 0.05;
    }
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    eye = vec3(radius*Math.sin(theta)*Math.cos(phi),
        radius*Math.sin(theta)*Math.sin(phi), radius*Math.cos(theta));
    // draw torso
    mvMatrix = lookAt(eye, at , up);
    pMatrix = perspective(fovy, aspect, near, far);

    gl.uniformMatrix4fv( modelView, false, flatten(mvMatrix) );
    gl.uniformMatrix4fv( projection, false, flatten(pMatrix) );
    gl.drawArrays( gl.TRIANGLES, 0, 108 );

    // stop moving after 3 seconds
    setTimeout(showDoor, 3000);
    if(walkBool == 1) {
        // draw left leg
        mvMatrix = lookAt(eye, at , vec3(swing, 1.0, 0.0));
        pMatrix = perspective(fovy, aspect, near, far);

        gl.uniformMatrix4fv( modelView, false, flatten(mvMatrix) );
        gl.uniformMatrix4fv( projection, false, flatten(pMatrix) );
        gl.drawArrays( gl.TRIANGLES, 108, 36 );

        // draw right leg
        mvMatrix = lookAt(eye, at , vec3(swing * -1.0, 1.0, 0.0));
        pMatrix = perspective(fovy, aspect, near, far);

        gl.uniformMatrix4fv( modelView, false, flatten(mvMatrix) );
        gl.uniformMatrix4fv( projection, false, flatten(pMatrix) );
        gl.drawArrays( gl.TRIANGLES, 144, 36 );

        // draw left arm
        mvMatrix = lookAt(eye, at , vec3(swing * -1.0, 1.0, 0.0));
        pMatrix = perspective(fovy, aspect, near, far);

        gl.uniformMatrix4fv( modelView, false, flatten(mvMatrix) );
        gl.uniformMatrix4fv( projection, false, flatten(pMatrix) );
        gl.drawArrays( gl.TRIANGLES, 180, 36 );

        // draw right arm
        mvMatrix = lookAt(eye, at , vec3(swing, 1.0, 0.0));
        pMatrix = perspective(fovy, aspect, near, far);

        gl.uniformMatrix4fv( modelView, false, flatten(mvMatrix) );
        gl.uniformMatrix4fv( projection, false, flatten(pMatrix) );
        gl.drawArrays( gl.TRIANGLES, 216, 36 );
    }
    else {
        // body is not moving
        mvMatrix = lookAt(eye, at , vec3(0.0, 1.0, 0.0));
        pMatrix = perspective(fovy, aspect, near, far);

        gl.uniformMatrix4fv( modelView, false, flatten(mvMatrix) );
        gl.uniformMatrix4fv( projection, false, flatten(pMatrix) );
        gl.drawArrays( gl.TRIANGLES, 108, 108 );

        // right arm is reaching for the door
        mvMatrix = lookAt(eye, at , vec3(0.5, 1.0, 0.0));
        pMatrix = perspective(fovy, aspect, near, far);

        gl.uniformMatrix4fv( modelView, false, flatten(mvMatrix) );
        gl.uniformMatrix4fv( projection, false, flatten(pMatrix) );
        gl.drawArrays( gl.TRIANGLES, 216, 36 );

        setTimeout(openDoor, 1000);
        if(doorBool == 1) {
            // door closed
            mvMatrix = lookAt(eye, at , vec3(0.0, 1.0, 0.0));
            pMatrix = perspective(fovy, aspect, near, far);

            gl.uniformMatrix4fv( modelView, false, flatten(mvMatrix) );
            gl.uniformMatrix4fv( projection, false, flatten(pMatrix) );
            gl.drawArrays( gl.TRIANGLES, 252, 36 );
        }
        else {
            // door opened
            mvMatrix = lookAt(eye, at , vec3(0.0, 1.0, 0.0));
            pMatrix = perspective(fovy, aspect, near, far);

            gl.uniformMatrix4fv( modelView, false, flatten(mvMatrix) );
            gl.uniformMatrix4fv( projection, false, flatten(pMatrix) );
            gl.drawArrays( gl.TRIANGLES, 252, 36 );
        }
        
    }
    requestAnimFrame(render);
}


var showDoor = function(){
    walkBool = 0;
}

var openDoor = function(){
    doorBool = 1;
}
