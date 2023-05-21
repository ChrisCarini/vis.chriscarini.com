const rainChars = "ムタ二コク1234567890シモラキリエスハヌトユABCDEF".split("");
const fontSize = 14;
let columns = 0;
let drops = [];


function getCanvas() {
    return document.getElementById("matrix-rain");
}

function getContext() {
    return getCanvas().getContext("2d");
}

function resize() {
    const canvas = getCanvas();
    //size the canvas
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    columns = canvas.width / fontSize; //number of columns for the rain
    //an array of drops - one per column
    drops = [];
    //x below is the x coordinate
    //1 = y co-ordinate of the drop(same for every drop initially)
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
}

function draw() {
    const c = getCanvas();
    const ctx = getContext();
    // Black BG for the canvas; translucent BG to show trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#007500"; //green text
    ctx.font = fontSize + "px monospace";
    //looping over drops
    for (let i = 0; i < drops.length; i++) {
        // a random character to print
        const text = rainChars[Math.floor(Math.random() * rainChars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // sending the drop back to the top randomly after it has crossed the screen
        // adding a randomness to the reset to make the drops scattered on the Y axis
        if (drops[i] * fontSize > c.height && Math.random() > 0.975)
            drops[i] = 0;

        //incrementing Y coordinate
        drops[i]++;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function type(text, new_caption_length) {
    let captionLength = new_caption_length || 0;
    let captionElement = document.getElementById('caption');

    captionElement.innerHTML = text.substring(0, captionLength++);
    if (captionLength < text.length + 1) {
        setTimeout(function () {
            type(text, captionLength);
        }, 75);
    }
}

function erase() {
    let captionElement = document.getElementById('caption');
    let caption = captionElement.innerHTML;
    let captionLength = caption.length;
    if (captionLength > 0) {
        captionElement.innerHTML = caption.substring(0, captionLength - 1);
        setTimeout(function () {
            erase();
        }, 30);
    }
}


async function terminal(time, message) {
    await sleep(time);
    console.clear();
    console.log(message);
    type(message);
}

window.addEventListener("load", async (event) => {
    // document.body.addEventListener("click", () => {
    //     document.body.requestFullscreen().then(async () => {
    const mult = 0.4;
    // timings from clip: https://www.youtube.com/watch?v=Smwrw4sNCxE
    await terminal(mult * 2000, "Wake up, Neo..."); // 0:25
    await terminal(mult * 18000, "The Matrix has you..."); // 0:43
    await terminal(mult * 15000, "Follow the white rabbit."); // 0:58
    await terminal(mult * 11000, "Knock, knock, Neo."); // 1:09
    await sleep(5000);
    erase();
    await sleep(1000);

    resize();
    draw();
    setInterval(draw, 33);
    window.addEventListener("resize", resize);
    // });
    // });

});
