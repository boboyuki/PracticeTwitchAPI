const wrapper = document.querySelector('.wrapper');

const game = "Overwatch";
const limit = 10;
const client_id = "z2cjxqc0jty8ehrd31epyku9mjj1eq";

let nowoffset = 0;
let isloading = false;

//切換語言
var I18N = {
    en: require('./en.js'),
    'zh-tw': require('./zh-tw.js')
}

let Lang = 'zh-tw';

function changeLang(lang) {
    document.querySelector('.menu__title').textContent = I18N[lang]['Title'];
    Lang = lang;
    while (wrapper.firstChild) {
        wrapper.removeChild(wrapper.firstChild);
    }
    nowoffset = 0; //資料歸零
    appendData(Lang);
    console.log(lang);
}

//串接資料
function getData(lang,callback) {
    isloading =true;

    const xhr = new XMLHttpRequest();
    xhr.open("get",`https://api.twitch.tv/kraken/streams/?api_version=5&client_id=${client_id}&game=${game}&limit=${limit}&offset=${nowoffset}&language=${lang}`,true);
    xhr.setRequestHeader('Client-ID',client_id);
    xhr.send();
    xhr.onload= function() {
        if(this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(this.responseText);
            callback(null,data); 
        }
    
        else{
            console.log(error);
        }
    }
}
function appendData(lang) {
    getData(lang,(error,data) => {
        const streams = data.streams;
        nowoffset += 10;
        isloading = false;
    
        for(let stream of streams){
            let link = document.createElement('a');
            link.setAttribute('href', stream.channel.url);
            link.setAttribute('target', '_blank');
            link.style.textDecoration = "none";
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
}


 //偵測滾動
 window.addEventListener("DOMContentLoaded",(e) =>　{
    document.querySelector('.lang-zh-tw').addEventListener('click',()=>{changeLang('zh-tw')});
    document.querySelector('.lang-en').addEventListener('click',()=>{changeLang('en')});
    appendData(Lang);
    console.log(e);
    window.addEventListener("scroll",loadData);
 });

function loadData() {
    if(window.scrollY + window.innerHeight >= document.body.clientHeight){
        if(!isloading){
            appendData(Lang);
        }
    }
}

 
   


