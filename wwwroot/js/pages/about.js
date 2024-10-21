let message;
let direction = true;
let fontSize = 30;
let speed = 0.3;

let invert = 1;

async function main()
{
    message = document.getElementById("message");
    setTimeout(changeFont, 5);
}

async function changeFont()
{
    if(fontSize > 50)
        direction = false;
    if(fontSize < 20)
    {
        direction = true;
        invert = -invert;
        message.style.transform = `scale(${invert}, 1)`;
    }

    fontSize = direction ? fontSize + speed : fontSize - speed;
    message.style.fontSize = `${fontSize}px`;

    setTimeout(changeFont, 1);
}