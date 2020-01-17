const game = "Overwatch";
const limit = 20;
const client_id = "z2cjxqc0jty8ehrd31epyku9mjj1eq";
const url = "https://api.twitch.tv/kraken/streams/?api_version=5&client_id=" + client_id + "&game=" + game + "&limit=" + limit;
const wrapper = document.querySelector('.wrapper');

function getData(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("get",url,true);
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

 getData((err,data) => {
    const streams = data.streams;
    console.log(streams);
    
    for(let stream of streams){
        let link = document.createElement('a');
        link.setAttribute('href', stream.channel.url);
        link.setAttribute('target', '_blank');
        link.innerHTML = 
        `<div class="box">
            <div class="container">
                <div class="preview">
                    <img src="${stream.preview.medium}" alt="preview">
                </div>
                 <div class="title">
                    <img class="title-img" src="${stream.channel.logo}" alt="logo">
                    <div class="title-intro">
                        <p class="title-chlname">${stream.channel.status}</p>
                        <p class="title-name">${stream.channel.display_name}</p>
                    </div>
                </div>
            </div>
       </div>`;
        wrapper.appendChild(link);
    }
    const space = document.createElement('div');
    space.className = "box";
    wrapper.appendChild(space);
 })
   


