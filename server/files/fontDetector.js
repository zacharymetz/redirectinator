main = (fonts)=>{
    //  this is my script to see what web request get sent
    //  aint is nice 
    var analyticsJson = {  //  the return json for our stuff we 
                      //  we can add all of our 
      //  data goes here lmad
        "appCodeName": navigator.appCodeName,
        "appName": navigator.appName,
        "networkInformation": {
          "downlink" : navigator.connection.downlink,
          "effectiveType" : navigator.connection.effectiveType,
          "rtt" : navigator.connection.rtt,
          "saveData" : navigator.connection.saveData
        },
        //  Geolocation is a call back so it might not be good lol 
        geolocation : null,
        memory : navigator.deviceMemory,
  
        //language 
        language : navigator.language,
        languages : navigator.languages,
        //media devices information like cameras and stuff 
        mediaDevices : [],
        width : screen.width,
        height : screen.height,
        availWidth : screen.availWidth,
        availHeight : screen.availHeight,
        colorDepth : screen.colorDepth,
        pixelDepth : screen.pixelDepth,
        viewPortHeight : window.innerHeight, 
        viewPortWidth : window.innerWidth,
  
        //
  
        //  max touch points 
        maxTouchPoints : navigator.maxTouchPoints,
        //  platform 
  
        //  product info 
        vendor : navigator.vendor,
        product : navigator.product,
  
        "location" : window.location
    };  
    var mediaDevicesPromise = navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
      devices.forEach(function(device) {
        analyticsJson.mediaDevices.push({
            kind : device.kind,
            label : device.label,
            deviceId : device.deviceId,
            groupId : device.groupId
          });
      });
    })
    .catch(function(err) { // dev only 
      console.log(err.name + ": " + err.message);
    });;
  
    //  promise to check installed fonts 
    var fontsPromise = new Promise(function(resolve, reject) {
        
      d = new Detector();
      var fontsavalible = [];
      for(var i=0;i<fonts.length;i++){
        if(d.detect(fonts[i])){
          fontsavalible.push(i);
        }
      }
      //  add them when done 
      resolve(fontsavalible);
    });
    fontsPromise.then(function(toAdd) {
      analyticsJson.fonts = toAdd;
      console.log(toAdd);
    })
  
  
  
    //  this is where the web request is sent, send it to 
    //  my api url when its all done and with the token il will give it 
    Promise.all([mediaDevicesPromise,fontsPromise]).then(function(values) {
      analyticsJson.token = window.getToken();
      debugger
      var xhr = new XMLHttpRequest();
      //    post to our server 
      xhr.open('POST', '/l');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function() {
          if (xhr.status === 200) {
              var userInfo =  xhr.responseText 
          }
          //    this is the static method for redirecting to where we want to go 

          window.on();
      };
      // make an on faliure too incase it dosent quite work 
      xhr.onerror = ()=>{
        window.on();
      }
      xhr.send(JSON.stringify(analyticsJson));
    });
  
  }
  
  //  Used for font detection 
  /**
   * JavaScript code to detect available availability of a
   * particular font in a browser using JavaScript and CSS.
   *
   * Author : Lalit Patel
   * Website: http://www.lalit.org/lab/javascript-css-font-detect/
   * License: Apache Software License 2.0
   *          http://www.apache.org/licenses/LICENSE-2.0
   * Version: 0.15 (21 Sep 2009)
   *          Changed comparision font to default from sans-default-default,
   *          as in FF3.0 font of child element didn't fallback
   *          to parent element if the font is missing.
   * Version: 0.2 (04 Mar 2012)
   *          Comparing font against all the 3 generic font families ie,
   *          'monospace', 'sans-serif' and 'sans'. If it doesn't match all 3
   *          then that font is 100% not available in the system
   * Version: 0.3 (24 Mar 2012)
   *          Replaced sans with serif in the list of baseFonts
   */
  
  /**
   * Usage: d = new Detector();
   *        d.detect('font name');
   */
  var Detector = function() {
      // a font will be compared against all the three default fonts.
      // and if it doesn't match all 3 then that font is not available.
      var baseFonts = ['monospace', 'sans-serif', 'serif'];
  
      //we use m or w because these two characters take up the maximum width.
      // And we use a LLi so that the same matching fonts can get separated
      var testString = "mmmmmmmmmmlli";
  
      //we test using 72px font size, we may use any size. I guess larger the better.
      var testSize = '72px';
  
      var h = document.getElementsByTagName("body")[0];
  
      // create a SPAN in the document to get the width of the text we use to test
      var s = document.createElement("span");
      s.style.fontSize = testSize;
      s.innerHTML = testString;
      var defaultWidth = {};
      var defaultHeight = {};
      for (var index in baseFonts) {
          //get the default width for the three base fonts
          s.style.fontFamily = baseFonts[index];
          h.appendChild(s);
          defaultWidth[baseFonts[index]] = s.offsetWidth; //width for the default font
          defaultHeight[baseFonts[index]] = s.offsetHeight; //height for the defualt font
          h.removeChild(s);
      }
  
      function detect(font) {
          var detected = false;
          for (var index in baseFonts) {
              s.style.fontFamily = font + ',' + baseFonts[index]; // name of the font along with the base font for fallback.
              h.appendChild(s);
              var matched = (s.offsetWidth != defaultWidth[baseFonts[index]] || s.offsetHeight != defaultHeight[baseFonts[index]]);
              h.removeChild(s);
              detected = detected || matched;
          }
          return detected;
      }
  
      this.detect = detect;
  };

  main([
    "Abadi MT Condensed Light",
    "Albertus Extra Bold",
    "Albertus Medium",
    "Antique Olive",
    "Arial",
    "Arial Black",
    "Arial MT",
    "Arial Narrow",
    "Bazooka",
    "Book Antiqua",
    "Bookman Old Style",
    "Boulder",
    "Calisto MT",
    "Calligrapher",
    "Century Gothic",
    "Century Schoolbook",
    "Cezanne",
    "CG Omega",
    "CG Times",
    "Charlesworth",
    "Chaucer",
    "Clarendon Condensed",
    "Comic Sans MS",
    "Copperplate Gothic Bold",
    "Copperplate Gothic Light",
    "Cornerstone",
    "Coronet",
    "Courier",
    "Courier New",
    "Cuckoo",
    "Dauphin",
    "Denmark",
    "Fransiscan",
    "Garamond",
    "Geneva",
    "Haettenschweiler",
    "Heather",
    "Helvetica",
    "Herald",
    "Impact",
    "Jester",
    "Letter Gothic",
    "Lithograph",
    "Lithograph Light",
    "Long Island",
    "Lucida Console",
    "Lucida Handwriting",
    "Lucida Sans",
    "Lucida Sans Unicode",
    "Marigold",
    "Market",
    "Matisse ITC",
    "MS LineDraw",
    "News GothicMT",
    "OCR A Extended",
    "Old Century",
    "Pegasus",
    "Pickwick",
    "Poster",
    "Pythagoras",
    "Sceptre",
    "Sherwood",
    "Signboard",
    "Socket",
    "Steamer",
    "Storybook",
    "Subway",
    "Tahoma",
    "Technical",
    "Teletype",
    "Tempus Sans ITC",
    "Times",
    "Times New Roman",
    "Times New Roman PS",
    "Trebuchet MS",
    "Tristan",
    "Tubular",
    "Unicorn",
    "Univers",
    "Univers Condensed",
    "Vagabond",
    "Verdana",
    "Westminste",
    "Allegro",
    "Amazone BT",
    "AmerType Md BT",
    "Arrus BT",
    "Aurora Cn BT",
    "AvantGarde Bk BT",
    "AvantGarde Md BT",
    "BankGothic Md BT",
    "Benguiat Bk BT",
    "BernhardFashion BT",
    "BernhardMod BT",
    "BinnerD",
    "Bremen Bd BT",
    "CaslonOpnface BT",
    "Charter Bd BT",
    "Charter BT",
    "ChelthmITC Bk BT",
    "CloisterBlack BT",
    "CopperplGoth Bd BT",
    "English 111 Vivace BT",
    "EngraversGothic BT",
    "Exotc350 Bd BT",
    "Freefrm721 Blk BT",
    "FrnkGothITC Bk BT",
    "Futura Bk BT",
    "Futura Lt BT",
    "Futura Md BT",
    "Futura ZBlk BT",
    "FuturaBlack BT",
    "Galliard BT",
    "Geometr231 BT",
    "Geometr231 Hv BT",
    "Geometr231 Lt BT",
    "GeoSlab 703 Lt BT",
    "GeoSlab 703 XBd BT",
    "GoudyHandtooled BT",
    "GoudyOLSt BT",
    "Humanst521 BT",
    "Humanst 521 Cn BT",
    "Humanst521 Lt BT",
    "Incised901 Bd BT",
    "Incised901 BT",
    "Incised901 Lt BT",
    "Informal011 BT",
    "Kabel Bk BT",
    "Kabel Ult BT",
    "Kaufmann Bd BT",
    "Kaufmann BT",
    "Korinna BT",
    "Lydian BT",
    "Monotype Corsiva",
    "NewsGoth BT",
    "Onyx BT",
    "OzHandicraft BT",
    "PosterBodoni BT",
    "PTBarnum BT",
    "Ribbon131 Bd BT",
    "Serifa BT",
    "Serifa Th BT",
    "ShelleyVolante BT",
    "Souvenir Lt BT",
    "Staccato222 BT",
    "Swis721 BlkEx BT",
    "Swiss911 XCm BT",
    "TypoUpright BT",
    "ZapfEllipt BT",
    "ZapfHumnst BT",
    "ZapfHumnst Dm BT",
    "Zurich BlkEx BT",
    "Zurich Ex BT",
    ]);
    