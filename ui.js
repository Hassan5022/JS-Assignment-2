class UI {
    showSong(response) {
        if(response.tracks.items.length != 0){
            let songs = document.querySelector("#songs");
            let output = '';
            let heading = document.querySelector("#main-heading");
            heading.innerText = "Spotify Playlist";
            let j = 0;
            response.tracks.items.forEach((i) => {
                output += `
                <div id="${i.id}" class="song">
                    <div class="title">
                        <img src="${i.album.images[0].url}" alt="thumbnail">
                        <div>
                            <p>${i.name}</p>
                            <i class="fa-sharp fa-solid fa-play"></i>
                        </div>
                    </div>
                </div><div id="${j}" class="modal"><div class="modal-content"><img src="${i.album.images[0].url}" alt="thumbnail"><p>${i.name}</p><audio controls>
                            <source id="song" src="${i.preview_url}" type="audio/ogg">
                        </audio>
                        <div class="closs">Close</div>
                    </div>
                </div>
                `;
                j++;
            });
            songs.removeAttribute('class');
            songs.innerHTML = output;
        }else{
            alert('Songs not found');
        }
    }
}

