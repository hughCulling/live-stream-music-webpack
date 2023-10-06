import IVSBroadcastClient, {
    Errors,
    BASIC_LANDSCAPE
} from 'amazon-ivs-web-broadcast';

// Create an Instance of the AmazonIVSBroadcastClient
const client = IVSBroadcastClient.create({
    // Enter the desired stream configuration
    streamConfig: IVSBroadcastClient.BASIC_LANDSCAPE,
    // Enter the ingest endpoint from the AWS console or CreateChannel API
    ingestEndpoint: 'rtmps://f3a548d10fbe.global-contribute.live-video.net:443/app/',
});

// Set Up a Stream Preview
// where #preview is an existing <canvas> DOM element on your page
const previewEl = document.getElementById('preview');
client.attachPreview(previewEl);

// Needed in "Retrieve a MediaStream from a Device"
const streamConfig = IVSBroadcastClient.BASIC_LANDSCAPE

// Needed in "startBroadcast()"
const streamKey = "sk_us-east-1_4W2sFQfsleKv_DLm1YlAQ9xi8XL5AulgHKknxrpY04r"


// List Available Devices & Retrieve a MediaStream from a Device
async function retrieveMediaStream() {
    // List Available Devices
    const devices = await navigator.mediaDevices.enumerateDevices();
    window.videoDevices = devices.filter((d) => d.kind === 'videoinput');
    window.audioDevices = devices.filter((d) => d.kind === 'audioinput');

    // Retrieve a MediaStream from a Device
    window.cameraStream = await navigator.mediaDevices.getUserMedia({
        video: {
            deviceId: window.videoDevices[0].deviceId,
            width: {
                ideal: streamConfig.maxResolution.width,
                max: streamConfig.maxResolution.width,
            },
            height: {
                ideal: streamConfig.maxResolution.height,
                max: streamConfig.maxResolution.height,
            },
        },
    });
    window.microphoneStream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: window.audioDevices[0].deviceId },
    });

    // Add Device to a Stream
    client.addVideoInputDevice(window.cameraStream, 'camera1', { index: 0 }); // only 'index' is required for the position parameter
    client.addAudioInputDevice(window.microphoneStream, 'mic1');
}

// Start a Broadcast
function startBroadcast() {
    client
        .startBroadcast(streamKey)
        .then((result) => {
            console.log('I am successfully broadcasting!');
        })
        .catch((error) => {
            console.error('Something drastically failed while broadcasting!', error);
        });
}

// Stop a Broadcast
function stopBroadcast() {
    client.stopBroadcast();
}

// Create startBroadcast button
function createStartButton() {
    const startButton = document.getElementById('start');

    startButton.onclick = startBroadcast;
}

function createStopButton() {
    const stopButton = document.getElementById('stop');

    stopButton.onclick = stopBroadcast;
}

retrieveMediaStream();
createStartButton();
createStopButton();