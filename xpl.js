var xplcodes = {
popup: function(params,htm) {alert(params[0]);},
ask: function(params,htm) {return prompt(params[0]);},
value: function(params,htm) {return htm;}
};
function readread(code,params) {
return xplcodes[code.tagName](params,code.innerHTML);
}
function readline(code) {
if (code.children.length > 0) {
  var params = new Array();
for(var z = 0; z<code.children.length;z++) {
  params[z] = readline(code.children[z]);
  
}
  return readread(code,params);
} else {
  var params = new Array();
return readread(code,params);
}
}
function xplscript(code) {
readline(code.children[0]);
}

var parse = new DOMParser();
var xml = function(code) {return parse.parseFromString(code,"text/xml");};
function read(code) {
var xpl = xml(code);
  document.documentElement.innerHTML = xpl.getElementsByTagName("webpage")[0].innerHTML;
  var scripts = xpl.getElementsByTagName("javascript");
  for (var i = 0; i<scripts.length; i++) {
  eval(scripts[i].innerHTML);
    
  }
    var scripts = xpl.getElementsByTagName("xplscript");
  for (var i = 0; i<scripts.length; i++) {
  xplscript(scripts[i]);
    
  }
      var scripts = xpl.getElementsByTagName("EAGL");
  for (var i = 0; i<scripts.length; i++) {
  compile(scripts[i].innerHTML);
    
  }
}
