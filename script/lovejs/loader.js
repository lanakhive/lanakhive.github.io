function loadlove(canvasID, insertSpanID) {
  (function createCanvases() {
    var ca = document.createElement('canvas');
    ca.id = canvasID;
    ca.style.display = 'none';
    ca.setAttribute("oncontextmenu","event.preventDefault()");
    var cb = document.createElement('canvas');
    cb.id = canvasID + "loading";
    cb.style.display = 'block';
    var cw = document.getElementById(insertSpanID).parentElement.clientWidth;
    if (!cw) cw = 800;
    var ch = cw * 0.75;
    cb.setAttribute("width",cw);
    cb.setAttribute("height",ch);
    // cb.style.maxWidth = "800px";
    cb.style.width = "100%";
    // cb.style.background = "url(line2.png)";
    // cb.style.background-size = "contain";
    cb.setAttribute("oncontextmenu","event.preventDefault()");
    document.getElementById(insertSpanID).appendChild(ca);
    document.getElementById(insertSpanID).appendChild(cb);
  })();

  //Store page title because app will try to change it
  var documentTitle = document.title;

  var loadingContext = document.getElementById(canvasID + "loading").getContext('2d');
  var loadingImage = new Image();
  loadingImage.src = '/script/lovejs/line2.png';
  loadingImage.addEventListener("load", function() {
    loadingContext.drawImage(loadingImage,0,0);
    loadingContext.fillStyle = "rgb(142, 195, 227)";
    loadingContext.font = '2em Open Sans';
    loadingContext.textAlign = 'left';
    loadingContext.fillStyle = "rgb( 255, 255, 255 )";
    loadingContext.fillText("Click to load", 40, loadingContext.canvas.height-40);
  }, false);



  function drawLoadingText(text) {
    var canvas = loadingContext.canvas;

    // loadingContext.clearRect(0,0,canvas.scrollWidth, canvas.scrollHeight);
    loadingContext.drawImage(loadingImage,0,0);

    loadingContext.font = '2em Open Sans';
    loadingContext.textAlign = 'center';
    loadingContext.fillStyle = "rgb( 255, 255, 255 )";
    loadingContext.fillText(text, canvas.width / 2, canvas.height / 2);

    loadingContext.fillText("Powered By love.js", canvas.width / 2, canvas.height / 4);
    loadingContext.fillText("LÖVE + Emscripten", canvas.width / 2, canvas.scrollHeight / 4 * 3);
  }

  window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  }, false);

  window.Module = {
    arguments: ['./'],
    printErr: console.error.bind(console),
    filePackagePrefixURL: "http://www.lanakhive.com/script/lovejs/",
    memoryInitializerPrefixURL: "http://www.lanakhive.com/script/lovejs/",
    canvas: (function() {
      var canvas = document.getElementById(canvasID);

      // As a default initial behavior, pop up an alert when webgl context is lost. To make your
      // application robust, you may want to override this behavior before shipping!
      // See http://www.khronos.org/registry/webgl/specs/latest/1.0/#5.15.2
      canvas.addEventListener("webglcontextlost", function(e) { alert('WebGL context lost. You will need to reload the page.'); e.preventDefault(); }, false);

      return canvas;
    })(),
    setStatus: function(text) {
      if (text) {
        drawLoadingText(text);
      } else if (Module.didSyncFS && Module.remainingDependencies === 0) {
        Module.callMain(Module.arguments);
        document.getElementById(canvasID + "loading").style.display = 'none';
        document.getElementById(canvasID).style.display = 'block';
        // document.getElementById('canvas').style.maxWidth = '800px';
        document.getElementById(canvasID).style.width = '100%';
        document.title = documentTitle;
      }
    },
    didSyncFS: false  ,
    totalDependencies: 0,
    remainingDependencies: 0,
    monitorRunDependencies: function(left) {
      this.remainingDependencies = left;
      this.totalDependencies = Math.max(this.totalDependencies, left);
      Module.setStatus(left ? 'Preparing... (' + (this.totalDependencies-left) + '/' + this.totalDependencies + ')' : 'All downloads complete.');
    }
  };
  
  // Module.setStatus('Downloading...');
  function startDemo(event) {
    Module.setStatus('Downloading...');
    var lovescript = document.createElement('script');
    lovescript.src = '/script/lovejs/love.js';
    lovescript.async = true;
    lovescript.type = 'text/javascript';
    document.body.appendChild(lovescript);
    var gamescript = document.createElement('script');
    gamescript.src = '/script/lovejs/game.js';
    gamescript.type = 'text/javascript';
    document.body.appendChild(gamescript);
    document.getElementById(canvasID + "loading").removeEventListener('click',startDemo);
  }
  document.getElementById(canvasID + "loading").addEventListener('click', startDemo);

  window.onerror = function(event) {
    // TODO: do not warn on ok events like simulating an infinite loop or exitStatus
    Module.setStatus('Exception thrown, see JavaScript console');
    Module.setStatus = function(text) {
      if (text) Module.printErr('[post-exception status] ' + text);
    };
  };
}