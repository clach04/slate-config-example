Pebble.addEventListener('ready', function() {
  console.log('PebbleKit JS ready!');
});

Pebble.addEventListener('showConfiguration', function() {
  var url = 'https://rawgit.com/pebble-examples/design-guides-slate-config/master/config/index.html';
  console.log('Showing configuration page: ' + url);

  var ip = null;
  var ip_placeholder = (ip === null ? 'placeholder="IP Address"' : 'value="' + ip + '" ');
  console.log("showing configuration");
  url = "data:text/html,"+encodeURI('<!DOCTYPE html> <html> <head> <title>Configure_Page</title> <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><input type="text" id="ip" ' + ip_placeholder + ' style="height:30px;"/><br><br><button style="width:100px;height:60px;" onclick="saveConf();">Save</button><script type="text/javascript">function saveConf(){var result = {}; result["ip"] = document.getElementById("ip").value;document.location = "pebblejs://close#" + encodeURIComponent(JSON.stringify(result));}</script></body></html><!--.html');

  Pebble.openURL(url);
});

Pebble.addEventListener('webviewclosed', function(e) {
  var configData = JSON.parse(decodeURIComponent(e.response));
  console.log('Configuration page returned: ' + JSON.stringify(configData));

  var backgroundColor = configData['background_color'];

  var dict = {};
  if(configData['high_contrast'] === true) {
    dict['KEY_HIGH_CONTRAST'] = configData['high_contrast'];
  } else {
    dict['KEY_COLOR_RED'] = parseInt(backgroundColor.substring(2, 4), 16);
    dict['KEY_COLOR_GREEN'] = parseInt(backgroundColor.substring(4, 6), 16);
    dict['KEY_COLOR_BLUE'] = parseInt(backgroundColor.substring(6), 16);
  }

  // Send to watchapp
  Pebble.sendAppMessage(dict, function() {
    console.log('Send successful: ' + JSON.stringify(dict));
  }, function() {
    console.log('Send failed!');
  });
});