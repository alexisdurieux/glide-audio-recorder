window.function = function (uploadUrl) {

    ht = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>Audio Recorder</title>
            
        </head>
        <body>
            <button type="button" class="recording-btn">Record</button> 
            <button type="button" class="stop-btn">Stop</button> 
            <button type="button" class="send-btn">Send</button> 
        </body>
        <script>
            console.log("Test loaded")

            const record = document.querySelector(".recording-btn");
            const stop = document.querySelector(".stop-btn");

            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                console.log("getUserMedia supported.");
                navigator.mediaDevices
                    .getUserMedia(
                        // constraints - only audio needed for this app
                        {
                            audio: true,
                        }
                    )

                    // Success callback
                    .then((stream) => {
                        const mediaRecorder = new MediaRecorder(stream);
                        record.onclick = () => {
                            mediaRecorder.start();
                            console.log(mediaRecorder.state);
                            console.log("recorder started");
                            record.style.background = "red";
                            record.style.color = "black";
                        };

                        stop.onclick = () => {
                            mediaRecorder.stop();
                            console.log(mediaRecorder.state);
                            console.log("recorder stopped");
                            record.style.background = "";
                            record.style.color = "";
                        };


                        let chunks = [];

                        mediaRecorder.ondataavailable = (e) => {
                            chunks.push(e.data);
                        };

                        mediaRecorder.onstop = (e) => {
                            console.log("recorder stopped");

                            const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
                            chunks = [];

                            fetch(${uploadUrl}, { method: "PUT", body: blob })
                                .then(_ => ${uploadUrl})
                                .catch((err) => 'error uploading blob')
                        };

                    })

                    // Error callback
                    .catch((err) => {
                        console.error('The following getUserMedia error occurred');
                    });
            } else {
                console.log("getUserMedia not supported on your browser!");
            }
        </script>
    </html>
    `
    let enc = encodeURIComponent(ht);
    let uri = `data:text/html;charset=utf-8,${enc}`

    return uri
}
