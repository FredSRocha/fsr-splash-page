/*!
 * FSR Components - Splash Page v1.0.0 (https://github.com/fredsrocha/fsr-splash-page/)
 * Licensed under MIT (https://github.com/fredsrocha/fsr-splash-page/blob/master/LICENSE/)
 * Copyright (c) 2017 Fred Rocha (https://github.com/fredsrocha/)
 */
/* Embed background Video.
 *   Reference
 *     Digital Inspiration:
 *       (http://www.labnol.org/internet/embed-mute-youtube-video/29149/)
 *     Google Developers:
 *       (https://developers.google.com/youtube/iframe_api_reference?hl=en-us)
 */
(function() {
  var adCountDownTimer, browserName, browserVersion, browserVersionArray, firstScriptTag, loadPlayer, onYouTubePlayer, tag, userLang;

  onYouTubePlayer = function() {
    var player;
    player = new YT.Player('bg-video-youtube', {
      videoId: 'BQh3sQULqFg',
      width: 560,
      height: 316,
      playerVars: {
        autoplay: 1,
        controls: 0,
        showinfo: 0,
        modestbranding: 1,
        loop: 1,
        fs: 0,
        cc_load_policy: 0,
        iv_load_policy: 3,
        autohide: 0
      },
      events: {
        onReady: function(e) {
          e.target.mute();
        },
        onStateChange: function(e) {
          if (e.data === YT.PlayerState.ENDED) {
            player.playVideo();
          }
        }
      }
    });
  };

  loadPlayer = function() {
    if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
      window.onYouTubePlayerAPIReady = function() {
        onYouTubePlayer();
      };
    }
  };

  /* AD Countdown Timer.
   *   references
   *     Stackoverflow:
   *       (http://stackoverflow.com/questions/9335140/how-to-countdown-to-a-date)
   *     Developer Mozilla:
   *       (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator/)
   */

  adCountDownTimer = function(date, id) {
    var _day, _hour, _minute, _second, end, showRemaining, timer;
    end = new Date(date);
    _second = 1000;
    _minute = _second * 60;
    _hour = _minute * 60;
    _day = _hour * 24;
    showRemaining = function() {
      var days, distance, hours, minutes, now, seconds;
      now = new Date;
      distance = end - now;
      if (distance < 0) {
        clearInterval(timer);
        document.getElementById(id).style.display = 'none';
        document.getElementById('ad-btn').style.display = 'block';
        return;
      }
      days = Math.floor(distance / _day);
      hours = Math.floor(distance % _day / _hour);
      minutes = Math.floor(distance % _hour / _minute);
      seconds = Math.floor(distance % _minute / _second);
      document.getElementById(id).style.display = 'block';
      if (days !== 0) {
        document.getElementById('ad-days').innerHTML = ' ' + days + ' ';
        document.getElementById('ad-days-label').style.display = 'inline-block';
      } else {
        document.getElementById('ad-days').innerHTML = '';
        document.getElementById('ad-days-label').style.display = 'none';
      }
      if (hours !== 0) {
        document.getElementById('ad-hours').innerHTML = ' ' + hours + ' ';
        document.getElementById('ad-hours-label').style.display = 'inline-block';
      } else {
        document.getElementById('ad-hours').innerHTML = '';
        document.getElementById('ad-hours-label').style.display = 'none';
      }
      if (minutes !== 0) {
        document.getElementById('ad-minutes').innerHTML = ' ' + minutes + ' ';
        document.getElementById('ad-minutes-label').style.display = 'inline-block';
      } else {
        document.getElementById('ad-minutes').innerHTML = '';
        document.getElementById('ad-minutes-label').style.display = 'none';
      }
      if (seconds !== 0) {
        document.getElementById('ad-seconds').innerHTML = ' ' + seconds + ' ';
        document.getElementById('ad-seconds-label').style.display = 'inline-block';
      } else {
        document.getElementById('ad-seconds').innerHTML = '';
        document.getElementById('ad-seconds-label').style.display = 'none';
      }
    };
    timer = setInterval(showRemaining, 1000);
  };

  /* Checks the browser version.
   *   Reference
   *     Stackoverflow:
   *       (http://stackoverflow.com/questions/5916900/how-can-you-detect-the-version-of-a-browser)
   *     Developer Mozilla:
   *       (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
   */

  navigator.browserVersion = (function() {
    var M, tem, ua;
    ua = navigator.userAgent;
    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem !== null) {
        return tem.slice(1).join(' ').replace('OPR', 'Opera');
      }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) !== null) {
      M.splice(1, 1, tem[1]);
    }
    return M.join(' ');
  })();

  browserVersionArray = navigator.browserVersion.split(/[\s\t]/);

  browserName = browserVersionArray[0];

  browserVersion = browserVersionArray[1];

  if (browserName === 'Safari' && browserVersion < '6') {
    document.getElementById('bg-video').style.display = 'none';
  } else {
    tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    loadPlayer();
  }

  //adCountDownTimer('01/17/2017 9:9:9 AM', 'ad-countdown'); // Uncomment this line when ready.

  var today = new Date(); // Delete this when you're done.
  var ddDate = today.getDate(); // Delete this when you're done.
  var ddMonth = today.getMonth(); // Delete this when you're done.
  var ddYear = today.getFullYear(); // Delete this when you're done.
  adCountDownTimer((ddMonth + 1) + '/' + (ddDate + 1) + '/' + (ddYear + 1) + ' 9:9:9 AM', 'ad-countdown'); // Delete this when you're done.
  /* Open link in the new tab.
   *  References
   *    Stackoverflow
   *      (http://stackoverflow.com/questions/804256/how-do-i-add-target-blank-to-a-link-within-a-specified-div)
 
  window.onload = function() {
    var anchors, i, len;
    anchors = [].slice.call(document.getElementsByTagName('a'));
    i = 0;
    len = anchors.length;
    while (i < len) {
      anchors[i].setAttribute('target', '_blank');
      i++;
    }
  };
  */

  /* Get your browser language.
   *   References
   *     Stackoverflow:
   *       (http://stackoverflow.com/questions/8199760/how-to-get-the-browser-language-using-javascript)
   */

  userLang = navigator.language || navigator.userLanguage;

  /* Warning message in console.
   *   References
   *     Stackoverflow:
   *       http://stackoverflow.com/questions/2312817/javascript-switch-with-logical-operators
   *     W3schools:
   *       https://www.w3schools.com/js/js_switch.asp
   */

  switch (true) {
    case userLang === 'pt-br' || userLang === 'pt-BR':
      window.console.log('%c%s', 'color: red; background: yellow; font-size: 24px;', 'AVISO');
      window.console.log('%c%s', 'color: black; font-size: 18px;', 'É possível que o uso deste console permita que invasores falsifiquem sua identidade para roubar informações por meio de um ataque chamado Self-XSS.\nNão insira nem cole códigos que você não conhece.');
      break;
    default:
      window.console.log('%c%s', 'color: red; background: yellow; font-size: 24px;', 'NOTICE');
      window.console.log('%c%s', 'color: black; font-size: 18px;', 'It is possible that the use of this console allows an attacker to falsify their identity to steal information through an attack called Self-XSS. Do not insert or paste code that you do not know.');
  }

}).call(this);