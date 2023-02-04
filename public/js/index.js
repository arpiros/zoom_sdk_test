window.addEventListener('DOMContentLoaded', function(event) {
    console.log('DOM fully loaded and parsed');
    websdkready();
  });
  
  function websdkready() {
    console.log("ready");
    const zoomMeetingSDK = document.getElementById('zmmtg-root')
    zoomMeetingSDK.style.display = 'none';
  
    console.log("checkSystemRequirements");
    console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));
    ZoomMtg.preLoadWasm();
  
    //WHEN JOIN IS CLICKED
    document.getElementById("join_meeting").addEventListener("click", async function (e) {
        e.preventDefault();
        console.log("click join");
        var meetingid = document.getElementById("meeting_number").value;
  
        getSignature(meetingid,0,function(signature){
          console.log(signature);
          var name = document.getElementById("display_name").value;
          var meetingpwd = document.getElementById("meeting_pwd").value;
          var leaveUrl = "./";
          const sdkKey = "＜Marketplaceから取得した SDK KEY＞";
          ZoomMtg.prepareJssdk();
          ZoomMtg.init({
            leaveUrl: leaveUrl,
            disableCORP: !window.crossOriginIsolated, // default true
            success: function () {
              console.log("signature: ", signature);
              zoomMeetingSDK.style.display = 'block';
              ZoomMtg.join({
                meetingNumber: meetingid,
                userName: name,
                signature: signature,
                sdkKey: sdkKey,
                passWord: meetingpwd,
                success: function (res) {
                  console.log("join meeting success");
                },
                error: function (res) {
                  console.log(res);
                },
              });
            },
            error: function (res) {
              console.log(res);
            },
          });
        });
    });
  
    //　GET SIGNATURE FOR WEBSDK
    function getSignature(meeting_number, role, callback){
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
          console.log(xhr.responseText);
          const obj = JSON.parse(xhr.responseText);
          if(callback) callback(obj.signature);
        }
      }
      xhr.open('POST', '/', true);
      xhr.setRequestHeader('content-type', 'application/json');
      const body = '{"meetingNumber":"' + meeting_number +'", "role":"'+ role +'"}';
      xhr.send(body);
    };
  
  };
  