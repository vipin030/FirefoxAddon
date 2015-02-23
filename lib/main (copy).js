var data=require("sdk/self").data;
var pageMod=require("sdk/page-mod");
var contentScriptString = '$("body").html("<h1>Page matches ruleset</h1>"';
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "Visit Mozilla",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

function handleClick(state) {
  tabs.open("https://www.mozilla.org/");
}
pageMod.PageMod({
  include: "*",
  contentScriptWhen:'end',
  contentScript: contentScriptString,
  contentScriptFile: [data.url("jquery-1.10.2.min.js"),data.url("gmail.js"),data.url("mail_function.js")]
});
