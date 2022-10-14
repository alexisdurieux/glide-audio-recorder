window.function = function (uploadUrl) {

    ht = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>Audio Recorder</title>
        </head>
        <body>
         <button type="button" value="false" class="recording-btn">Record</button> 
         <button type="button" class="send-btn">Send</button> 
        </body>
    </html>
    `
    let enc = encodeURIComponent(ht);
    let uri = `data:text/html;charset=utf-8,${enc}`

  return ht
}
