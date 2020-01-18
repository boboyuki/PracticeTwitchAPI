const wrapper = document.querySelector('.wrapper');

const game = "Overwatch";
const limit = 10;
let nowoffset = 0;
const client_id = "z2cjxqc0jty8ehrd31epyku9mjj1eq";
let url = `https://api.twitch.tv/kraken/streams/?api_version=5&client_id=${client_id}&game=${game}&limit=${limit}&offset=${nowoffset}`;
console.log(url);

let isloading = false;

function getData(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("get",`https://api.twitch.tv/kraken/streams/?api_version=5&client_id=${client_id}&game=${game}&limit=${limit}&offset=${nowoffset}`,true);
    xhr.setRequestHeader('Client-ID',client_id);
    xhr.send();
    xhr.onload= function() {
        if(this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.responseText);
            isloading =true;
            callback(null,data); 
        }
    
        else{
            console.log(error);
        }
    }
}

getData((err,data) => {
    const streams = data.streams;
    nowoffset += 10;
    isloading = false;

    for(let stream of streams){
        let link = document.createElement('a');
        link.setAttribute('href', stream.channel.url);
        link.setAttribute('target', '_blank');
        link.innerHTML = 
        `
            <div class="box">
                <div class="preview">
                    <img src="${stream.preview.medium}" alt="preview" onload="this.style.opacity = 1" >
                </div>
                    <div class="title">
                    <img class="title-img" src="${stream.channel.logo}" alt="logo" onload="this.style.opacity = 1">
                    <div class="title-intro">
                        <p class="title-chlname">${stream.channel.status}</p>
                        <p class="title-name">${stream.channel.display_name}</p>
                    </div>
                </div>
                </div>
        `;
        wrapper.appendChild(link);
    }
    
    });

 //偵測滾動
 window.addEventListener("DOMContentLoaded",function() {
    appendData();
    window.addEventListener("scroll",loadData);
 });

function loadData() {
    console.log(window.scrollY,window.innerHeight,document.body.clientHeight);
    if(window.scrollY + window.innerHeight >= document.body.clientHeight){
        if(!isloading){
            appendData();
        }
    }
}

 
   


