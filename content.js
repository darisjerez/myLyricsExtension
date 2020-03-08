var data = []; 

function getTrackDataSuccess(response){
    let dataSuccess = JSON.stringify(response);
    data.push(dataSuccess);
}
function getTrackDataError(response){
    var errorSuccess = JSON.stringify(response);
    return console.error(errorSuccess);
}
function getTrackInfo(){
   var trackData = JSON.parse(data[0]);
   var songArtist = trackData.item.album.artists[0].name;
   var songName = trackData.item.name;
   var trackInfo = [songName, songArtist];
   data.length = 0;
    return trackInfo;
}
function sendDataToButton() {
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          if(request.message === "clicked_browser_action") {
            var trackDataInfo = getTrackInfo();
            var url = `https://www.google.com/search?q=${trackDataInfo[0]}+${trackDataInfo[1]}+lyrics`;
            console.log(trackDataInfo);
            chrome.runtime.sendMessage({"message": "open_new_tab", "url": url});
          }
        }
      );
}
(function manageRequest(){  
    $.ajax({
        url: 'https://api.spotify.com/v1/me/player/currently-playing',
        beforeSend: function(xhr){
            xhr.setRequestHeader('Authorization', 'Bearer BQAK3kGjljgMUGbbOHy0_vDFW7wH2qUxgyMwGXHnFkQBPJCLxjwtmtZo36kchJriNQMLoRygC1TUyvepawMisZpG11T3WIk5Xfpfwdm7GL8kbqu6HLF23eoF6B7zcVe0sFfINWszWdci0siLcOWt7rL61PxLmohqTeaR9w7j')
        },
        success: function(result){
            getTrackDataSuccess(result);
        },
        error: function(error){
            getTrackDataError(error);
        },
        complete: function(){
            sendDataToButton();
        }
    });
})();



