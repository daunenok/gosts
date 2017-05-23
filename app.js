var video = document.querySelector("video");
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var audio = document.querySelector("audio");
var div = document.querySelector("div");

getVideo();
paintCanvas();

document.querySelector("#photo").addEventListener("click", takePhoto);

function getVideo() {
	navigator.mediaDevices.getUserMedia({video: true, audio: false})
	.then(function(stream) {
		video.srcObject = stream;
		video.play();
	});
}
 
function paintCanvas() {
	setInterval(function() {
		ctx.drawImage(video, 0, 0);
		var pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
		pixels = myEffect(pixels);
		ctx.globalAlpha = 0.8;
		ctx.putImageData(pixels, 0, 0);
	}, 16);
}

function takePhoto() {
	audio.currentTime = 0;
	audio.play();
	var data = canvas.toDataURL("image/jpeg");
	var newImg = document.createElement("img");
	newImg.src = data;
	newImg.style.width = "100px";
	div.insertBefore(newImg, div.firstChild);
}

function myEffect(pxs) {
	for (var i = 0; i < pxs.data.length; i += 4) {
		pxs.data[i - 150] = pxs.data[i];
		pxs.data[i + 500] = pxs.data[i + 1];
		pxs.data[i - 550] = pxs.data[i + 2];
	}
	return pxs;
}