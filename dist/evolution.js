/*
Evolution Programming Language
Copyright (C) 2022 Evolution Programming Language

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software 
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
imitations under the License.
*/
function jsdep(name, regex, callback) {
	if (!name in creg) {
		creg[name] = [regex, callback];
	} else {
		error("JslibError", "Duplicate definition of " + name);
	}
}
var pv = {};
var gvars = {};
var d = {
	'atc': function() {},
	'atcd': [],
	'atcc': 0,
	'atcdat': '',
	'retd': {
		"type": "null",
		'dt': 'null',
		'headers': {
			'null': 'null'
		}
	},
	'funct': false,
	'class': '',
	'evurl': 'https://cdn.jsdelivr.net/gh/mathstar13/Evolution/dist/',
	'lc': false,
	'prevt': false,
	'ifs': false,
	'su': false,
	'class': false,
	"fname": "@main",
	'cvs': [
		[],
		[]
	],
	'loop': false
};
var basehead = {
	"rd": {
		"item": {
			"type": "funct",
			"dt": `<function @defaults.item function>`,
			"headers": {
				"fn": {
					"attrib": {
						"c": "null"
					},
					"code": "cnch6 @self;cnch6 c;cnc6;return dat;",
					"head": {}
				}
			}
		},
		"set": {
			"type": "funct",
			"dt": "<function @defaults.set function>",
			"headers": {
				"fn": {
					"attrib": {
						"key": "null",
						"value": "null"
					},
					"code": "cnch7 @self;cnch7 key;cnch7 value;cnc7;return dat;",
					"head": {}
				}
			}
		},
		"type": {
			"type": "funct",
			"dt": "<function @defaults.type function>",
			"headers": {
				"fn": {
					"attrib": {
						"": "null"
					},
					"code": "cnch13 @self;cnc13;return dat;",
					"head": {}
				}
			}
		},
		"concat": {
			"type": "funct",
			"dt": "<function @defaults.concat function>",
			"headers": {
				"fn": {
					"attrib": {
						"string": "null"
					},
					"code": "cnch14 @self;cnch14 string;cnc14;return dat;",
					"head": {}
				}
			}
		}
	}
};
var creg = {};

function rep(dt) { //Replicate JSON
	return JSON.parse(JSON.stringify(dt));
}
var cnch = {};
var vars = rep(gvars);

function reverse(s) {
	return [...s].reverse().join("");
}

function escapeRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function replaceAll(str, find, replace) {
	return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function htmlDecode(input) {
	var doc = new DOMParser().parseFromString(input, "text/html");
	return doc.documentElement.textContent;
}

function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function typeify(data, fcmd = false) {
	var dat = {
		"type": "null",
		"dt": "null",
		"headers": {}
	};
	if (/^[ \n\t]*(.*)[ \n\t]*===[ \n\t]*(.*)[ \n\t]*$/.test(data)) {
		var dt = data.match(/^[ \n\t]*(.*)[ \n\t]*===[ \n\t]*(.*)[ \n\t]*$/);
		if (typeify(dt[1])['type'] == typeify(dt[2])['type']) {
			if (typeify(dt[1])['dt'] == typeify(dt[2])['dt']) {
				dat = {
					"type": "boolean",
					"dt": true,
					"headers": {}
				}
			} else {
				dat = {
					'type': 'boolean',
					'dt': false,
					'headers': {}
				}
			}
		} else {
			dat = {
				'type': 'boolean',
				'dt': false,
				'headers': {}
			};
		}
	} else if (/^[ \n\t]*(.*)[ \n\t]*!==[ \n\t]*(.*)[ \n\t]*$/.test(data)) {
		var dt = data.match(/^[ \n\t]*(.*)[ \n\t]*!==[ \n\t]*(.*)[ \n\t]*$/);
		if (typeify(dt[1])['type'] == typeify(dt[2])['type']) {
			if (typeify(dt[1])['dt'] != typeify(dt[2])['dt']) {
				dat = {
					"type": "boolean",
					"dt": true,
					"headers": {}
				}
			} else {
				dat = {
					'type': 'boolean',
					'dt': false,
					'headers': {}
				}
			}
		} else {
			dat = {
				'type': 'boolean',
				'dt': false,
				'headers': {}
			};
		}
	} else if (/^[ \n\t]*(.*)[ \n\t]*>==[ \n\t]*(.*)[ \n\t]*$/.test(data)) {
		var dt = data.match(/^[ \n\t]*(.*)[ \n\t]*>==[ \n\t]*(.*)[ \n\t]*$/);
		if (typeify(dt[1])['type'] == typeify(dt[2])['type']) {
			if (typeify(dt[1])['dt'] >= typeify(dt[2])['dt']) {
				dat = {
					"type": "boolean",
					"dt": true,
					"headers": {}
				}
			} else {
				dat = {
					'type': 'boolean',
					'dt': false,
					'headers': {}
				}
			}
		} else {
			dat = {
				'type': 'boolean',
				'dt': false,
				'headers': {}
			}
		}
	} else if (/^[ \n\t]*(.*)[ \n\t]*<==[ \n\t]*(.*)[ \n\t]*$/.test(data)) {
		var dt = data.match(/^[ \n\t]*(.*)[ \n\t]*<==[ \n\t]*(.*)[ \n\t]*$/);
		if (typeify(dt[1])['type'] == typeify(dt[2])['type']) {
			if (typeify(dt[1])['dt'] <= typeify(dt[2])['dt']) {
				dat = {
					"type": "boolean",
					"dt": true,
					"headers": {}
				}
			} else {
				dat = {
					'type': 'boolean',
					'dt': false,
					'headers': {}
				}
			}
		} else {
			dat = {
				'type': 'boolean',
				'dt': false,
				'headers': {}
			}
		}
	} else if (/^[ \n\t]*(.*)[ \n\t]*>=[ \n\t]*(.*)[ \n\t]*$/.test(data)) {
		var dt = data.match(/^[ \n\t]*(.*)[ \n\t]*>=[ \n\t]*(.*)[ \n\t]*$/);
		if (typeify(dt[1])['dt'] >= typeify(dt[2])['dt']) {
			dat = {
				"type": "boolean",
				"dt": true,
				"headers": {}
			}
		} else {
			dat = {
				'type': 'boolean',
				'dt': false,
				'headers': {}
			}
		}
	} else if (/^[ \n\t]*(.*)[ \n\t]*<=[ \n\t]*(.*)[ \n\t]*$/.test(data)) {
		var dt = data.match(/^[ \n\t]*(.*)[ \n\t]*<=[ \n\t]*(.*)[ \n\t]*$/);
		if (typeify(dt[1])['dt'] <= typeify(dt[2])['dt']) {
			dat = {
				"type": "boolean",
				"dt": true,
				"headers": {}
			}
		} else {
			dat = {
				'type': 'boolean',
				'dt': false,
				'headers': {}
			}
		}
	} else if (/^[ \n\t]*(.*)[ \n\t]*>[ \n\t]*(.*)[ \n\t]*$/.test(data)) {
		var dt = data.match(/^[ \n\t]*(.*)[ \n\t]*>[ \n\t]*(.*)[ \n\t]*$/);
		if (typeify(dt[1])['dt'] > typeify(dt[2])['dt']) {
			dat = {
				"type": "boolean",
				"dt": true,
				"headers": {}
			}
		} else {
			dat = {
				'type': 'boolean',
				'dt': false,
				'headers': {}
			}
		}
	} else if (/^[ \n\t]*(.*)[ \n\t]*<[ \n\t]*(.*)[ \n\t]*$/.test(data)) {
		var dt = data.match(/^[ \n\t]*(.*)[ \n\t]*<[ \n\t]*(.*)[ \n\t]*$/);
		if (typeify(dt[1])['dt'] < typeify(dt[2])['dt']) {
			dat = {
				"type": "boolean",
				"dt": true,
				"headers": {}
			}
		} else {
			dat = {
				'type': 'boolean',
				'dt': false,
				'headers': {}
			}
		}
	} else if (/^[ \n\t]*(.*)[ \n\t]*==[ \n\t]*(.*)[ \n\t]*$/.test(data)) {
		var dt = data.match(/^[ \n\t]*(.*)[ \n\t]*==[ \n\t]*(.*)[ \n\t]*$/);
		if (typeify(dt[1])['dt'] == typeify(dt[2])['dt']) {
			dat = {
				"type": "boolean",
				"dt": true,
				"headers": {}
			}
		} else {
			dat = {
				'type': 'boolean',
				'dt': false,
				'headers': {}
			}
		}
	} else if (/^[ \n\t]*(.*)[ \n\t]*!=[ \n\t]*(.*)[ \n\t]*$/.test(data)) {
		var dt = data.match(/^[ \n\t]*(.*)[ \n\t]*!=[ \n\t]*(.*)[ \n\t]*$/);
		if (typeify(dt[1])['dt'] != typeify(dt[2])['dt']) {
			dat = {
				"type": "boolean",
				"dt": true,
				"headers": {}
			}
		} else {
			dat = {
				'type': 'boolean',
				'dt': false,
				'headers': {}
			}
		}
	} else if (/^[ \n\t]*'([^']*)'[ \n\t]*$/.test(data)) {
		var dt = data.match(/[ \n\t]*'([^]*)'[ \n\t]*/);
		dat = {
			'type': 'string',
			'dt': dt[1],
			'headers': {}
		}
	} else if (/^[ \n\t]*"([^"]*)"[ \n\t]*$/.test(data)) {
		var dt = data.match(/[ \n\t]*"([^]*)"[ \n\t]*/);
		dat = {
			'type': 'string',
			'dt': dt[1],
			'headers': {}
		}
	} else if (/^[ \n\t]*`([^`]*)`[ \n\t]*$/.test(data)) {
		var data = data.match(/[ \n\t]*`([^`]*)`[ \n\t]*/)[1];
		var dat = data.match(/\$\{([^}]*)\}/g);
		if (dat != null) {
			for (item of [...Array(dat.length).keys()]) {
				var oretd = rep(d['retd']);
				ev(dat[item].match(/\$\{([^}]*)\}/)[1]);
				data = data.replace(dat[item], d['retd']['dt'], 1);
				d['retd'] = rep(oretd);
			}
		}
		dat = {
			'type': 'string',
			'dt': data,
			'headers': {}
		}
	} else if (/^[ \n\t]*(true|false)[ \n\t]*$/.test(data)) {
		var dt = data.match(/^[ \n\t]*(true|false)[ \n\t]*$/)[1];
		if (dt == 'true') {
			dat = {
				"type": "boolean",
				"dt": true,
				"headers": {}
			}
		} else {
			dat = {
				'type': 'boolean',
				'dt': false,
				'headers': {}
			}
		}
	} else if (/^[ \n\t]*([0-9]+)[ \n\t]*$/.test(data)) {
		var dt = data.match(/^[ \n\t]*([0-9]+)[ \n\t]*$/);
		var v = parseInt(dt);
		dat = {
			"type": "int",
			"dt": v,
			"headers": {}
		}
	} else if (/^[ \n\t]*\[([^]*)\][ \n\t]*$/.test(data)) {
		var dt = data.match(/^[ \n\t]*\[([^]*)\][ \n\t]*$/);
		var l = [];
		for (item of ap(dt[1]).split(",")) {
			item = replaceAll(item, "\\c", ",")
			l.push(typeify(item));
		}
		dat = {
			"type": "list",
			"dt": "<list list>",
			'headers': {
				"ld": l
			}
		};
	} else if (/^[ \n\t]*\{([^]*)\}[ \n\t]*$/.test(data)) {
		var dt = data.match(/^[ \n\t]*\{([^]*)\}[ \n\t]*$/);
		var l = {};
		for (item of ap(dt[1]).split(",")) {
			item = replaceAll(item, "\\c", ",")
			var itv = item.split(":");
			l[typeify(itv[0])['dt']] = typeify(itv[1]);
		}
		dat = {
			"type": "map",
			"dt": "<map map>",
			'headers': {
				"ld": l
			}
		};
	} else if (/^[ \n\t]*([^ ]+)[ \n\t]*\|[ \n\t]*([0-9]+)[ \n\t]*$/.test(data)) {
		var dt = data.match(/^[ \n\t]*([^ ]+)[ \n\t]*\|[ \n\t]*([0-9]+)[ \n\t]*$/);
		dat = pv[d['fname'] + '(' + dt[1]][dt[2]];
	} else {
		od = data;
		data = ap(data, "+");
		data = ap(data, "-");
		data = ap(data, "*");
		data = ap(data, "/");
		data = ap(data, "^");
		if (/^([ \n\t]*([^]+)[ \n\t]*([+\-*\/%^])[ \n\t]*([^]+))+$/.test(data)) {
			var dt = data.matchAll(/[ \n\t]*[+\-*\/%^][ \n\t]*/g)
			for (var i of dt) {
				var dat = data.split(i[0]);
				var d0 = dat[0].split(/[+\-*\/%^]/)[0];
				if (d0 == null) {
					d0 = dat[0];
				}
				var d0v = typeify(d0)['dt'];
				var d1 = dat[1].split(/[+\-*\/%^]/)[0];
				if (d1 == null) {
					d1 = dat[1];
				}
				var d1v = typeify(d1)['dt'];
				if (i == '+') {
					data = data.replace(d0 + i[0] + d1, d0v + d1v);
				} else if (i == '-') {
					data = data.replace(d0 + i[0] + d1, d0v - d1v);
				} else if (i == '*') {
					data = data.replace(d0 + i[0] + d1, d0v * d1v);
				} else if (i == '/') {
					data = data.replace(d0 + i[0] + d1, d0v / d1v);
				} else if (i == '%') {
					data = data.replace(d0 + i[0] + d1, d0v % d1v);
				} else if (i == '^') {
					data = data.replace(d0 + i[0] + d1, Math.pow(d0v, d1v));
				}
			}
			dat = {
				'type': 'int',
				'dt': parseInt(data),
				"headers": {}
			}
		} else {
			data = od;
			/*if(data.replace(/[ \n\t]/,'') in vars){
				return vars[data.replace(/[ \n\t]/,'')];
			}
			else if(data.replace(/[ \n\t]/,'') in gvars){
				return gvars[data.replace(/[ \n\t]/,'')];
			}
			else{
			error('VarError',`Unknown var: ${data}.`)
			}*/
			if (fcmd) {
				if (d['lc']) {
					return 'lc'
				} else {
					var f = checkcreg(data);
					if (!f) {
						error('CommandError', `Unknown command: ${line}.`);
					}
				}
			} else {
				var oretd = rep(d['retd']);
				ev(data);
				dat = rep(d['retd']);
				d['retd'] = oretd;
			}
		}
	}
	if (dat["headers"]["rd"] == undefined) {
		dat["headers"]["rd"] = {};
	}
	var defaults = {
		"item": {
			"type": "funct",
			"dt": `<function @defaults.item function>`,
			"headers": {
				"fn": {
					"attrib": {
						"c": "null"
					},
					"code": "cnch6 @self;cnch6 c;cnc6;return dat;",
					"head": {}
				}
			}
		},
		"set": {
			"type": "funct",
			"dt": "<function @defaults.set function>",
			"headers": {
				"fn": {
					"attrib": {
						"key": "null",
						"value": "null"
					},
					"code": "cnch7 @self;cnch7 key;cnch7 value;cnc7;return dat;",
					"head": {}
				}
			}
		},
		"type": {
			"type": "funct",
			"dt": "<function @defaults.type function>",
			"headers": {
				"fn": {
					"attrib": {
						"": "null"
					},
					"code": "cnch13 @self;cnc13;return dat;",
					"head": {}
				}
			}
		},
		"concat": {
			"type": "funct",
			"dt": "<function @defaults.concat function>",
			"headers": {
				"fn": {
					"attrib": {
						"string": "null"
					},
					"code": "cnch14 @self;cnch14 string;cnc14;return dat;",
					"head": {}
				}
			}
		}
	}
	for (var item in defaults) {
		if (dat["headers"]["rd"][item] == undefined) {
			dat["headers"]["rd"][item] = defaults[item];
		}
	}
	return dat;
}

function ap(text, cchar = ',') {
	var latc = [false]
	var atct = []
	var txt = []
	for (var item of text) {
		txt.push(item)
	}
	text = ''
	var cnt = 0
	var lc = {
		'(': ')',
		'[': ']',
		'"': '"',
		"'": "'",
		'`': '`',
		"<": ">"
	}
	for (var char of txt) {
		if (latc[0]) {
			if (lc[atct[0]] == char) {
				delete latc[0]
			}
			if (char == cchar) {
				text += '\\c'
			} else {
				text += char
			}
		} else {
			if (char in lc) {
				latc.splice(0, 0, true)
				atct.splice(0, 0, char)
			}
			text += char
		}
		cnt += 1
	}
	return text
}

function error(n, d) {
	throw `${n}: ${d}`;
}

function cvar(n, type, dt, h = {}, global = false, admin = false) {
	if (!n.match(/^[A-Za-z$_]+[A-Za-z$_0-9]*$/) & !d['su'] & !admin) {
		if (n[0] == '@' & vars[n] == undefined) {

		} else {
			error("VarError", `Cannot create variable with name ${n}.`)
		}
	}
	for (var item in basehead['rd']) {
		if (h[item] == undefined) {
			h[item] = basehead['rd'][item];
		}
	}
	vars[n] = {
		'type': type,
		'dt': dt,
		'headers': h
	};
	if (global) {
		gvars[n] = {
			'type': type,
			'dt': dt,
			'headers': h
		};
	}
	if (pv[d['fname'] + '(' + n] == undefined) {
		pv[d['fname'] + '(' + n] = [{
			'type': type,
			'dt': dt,
			'headers': h
		}];
	} else {
		pv[d['fname'] + '(' + n].splice(0, 0, {
			'type': type,
			'dt': dt,
			'headers': h
		});
	}
	return true;
}

function callfunct(funct, attl = []) {
	var dt = ['', funct]
	var nvar = rep(gvars);
	ocvs = rep(d['cvs']);
	d['cvs'] = [
		[], attl
	];
	var cnt = 0;
	var item = rep(typeify(dt[1]));
	for (i in item['headers']['fn']['attrib']) {
		d['cvs'][0].push(i);
		var n = item['headers']['fn']['attrib'][i];
		if (attl[cnt] == undefined) {
			break
		} else {
			nvar[i] = attl[cnt];
			cnt += 1
		}
	}
	var ov = vars;
	if (dt[1].split(".").length > 1) {
		nvar["@self"] = rep(typeify(dt[1].split(".")[dt[1].split(".").length - 2]));
	}
	vars = nvar;
	cvar("@functname", "string", dt[1], {}, false, true);
	var ofn = rep(d['fname']);
	d['fname'] = dt[1];
	ev(item['headers']['fn']['code']);
	vars = ov;
	d['cvs'] = ocvs;
	d['fname'] = ofn;
}

function argparse(i) {
	var att = {};
	for (item of replaceAll(ap(i.replace("\\,", "\\comma")), "\\c", "\\comma").split(/[ \n\t]*,[ \n\t]*/)) {
		item = item.replace('\\comma', ',')
		if (item.split(/[ \n\t]*=[ \n\t]*/).length != 1) {
			att[item.split(/[ \n\t]*=[ \n\t]*/)[0]] = item.split(/[ \n\t]*=[ \n\t]*/)[1]
		} else {
			att[item] = 'null'
		}
	}
	return att;
}

function checkcreg(line) {
	var fm = false;
	for (var i in creg) {
		if (i[0].test(line)) {
			i[1](line.match(i[0]));
			fm = true;
			break;
		}
	}
	return fm;
}

function evaluate(line) {
	if (/^([ \n\t]*)$/.test(line)) {

	} else if (/^[ \n\t]*funct[ \n\t]+([^\n ]+)[ \n\t]*\(([^]*)\)[ \n\t]*\{$/.test(line)) {
		d['atc'] = function(dt, data, tr) {
			cvar(data[0], "funct", `<function ${data[0]} function>`, {
				'fn': {
					'attrib': data[1],
					'code': dt,
					'head': {}
				}
			}, !d['class'])
		}
		var dt = line.match(/[ \n\t]*funct[ \n\t]+([^\n ]+)[ \n\t]*\(([^]*)\)[ \n\t]*\{$/);
		var att = argparse(dt[2])
		d['atcd'] = [dt[1], att]
		d['atcc'] += 1;
	} else if (/^[ \n\t]*([^( ]+)[ \n\t]*\(([^]*)\)[ \n\t]*(\[.*\])?[ \n\t]*$/.test(line)) {
		var dt = line.match(/^[ \n\t]*([^( ]+)[ \n\t]*\(([^]*)\)[ \n\t]*(\[.*\])?[ \n\t]*$/);
		var nvar = rep(gvars);
		var attl = [];
		var head = {};
		if (dt[3] != undefined) {
			var it = dt[3].match(/^[ \n\t]*\[[ \n\t]*(.*)[ \n\t]*\][ \n\t]*$/)[1].split(';');
			for (var i of it) {
				var ite = i.split('=');
				if (ite[1] != undefined) {
					head[ite[0]] = ite[1];
				} else {
					head[i] = 'true';
				}
			}
		}
		if (head['hv'] != undefined) {
			var da = typeify(head['hv']);
			if (da['type'] != "list") {
				error("CallError", "HeaderVars must be a list.");
			}
			for (i of da['headers']['ld']) {
				var i = i['dt'];
				var ite = i.split('=');
				if (ite[1] == undefined) {
					if (head[i] != undefined) {
						continue;
					}
				} else {
					if (head[ite[0]] != undefined) {
						continue;
					}
				}
				if (ite[1] == undefined) {
					head[i] = 'true';
				} else {
					head[ite[0]] = ite[1];
				}
			}
		}
		if (head['localcall'] == 'true') {
			head['lc'] = 'true';
		}
		if (head['lc'] == "true") {
			for (i in vars) {
				nvar[i] = rep(vars[i]);
			}
		}
		for (item of replaceAll(ap(dt[2].replace("\\,", "\\comma")), "\\c", "\\comma").split(/[ \n\t]*,[ \n\t]*/)) {
			item = item.replace('\\comma', ',')
			if (item != '') {
				item = typeify(item);
				attl.push(item)
			}
		}
		ocvs = rep(d['cvs']);
		d['cvs'] = [
			[], attl
		];
		var cnt = 0;
		var item = rep(typeify(dt[1]));
		for (i in item['headers']['fn']['attrib']) {
			d['cvs'][0].push(i);
			var n = item['headers']['fn']['attrib'][i];
			if (attl[cnt] == undefined) {
				break
			} else {
				nvar[i] = attl[cnt];
				cnt += 1
			}
		}
		var ov = vars;
		if (dt[1].split(".").length > 1) {
			nvar["@self"] = rep(typeify(dt[1].split(".")[dt[1].split(".").length - 2]));
		}
		vars = nvar;
		cvar("@functname", "string", dt[1], {}, false, true);
		var ofn = rep(d['fname']);
		d['fname'] = dt[1];
		ev(item['headers']['fn']['code']);
		if (head['lc'] != "true") {
			vars = ov;
		}
		d['cvs'] = ocvs;
		d['fname'] = ofn;
	} else if (/^[ \n\t]*var[ \n\t]*([^\n ]+)[ \n\t]*=[ \n\t]*([^]+)[ \n\t]*$/.test(line)) {
		var dt = line.match(/[ \n\t]*var[ \n\t]*([^\n ]+)[ \n\t]*=[ \n\t]*([^]+)[ \n\t]*/);
		var t = rep(typeify(dt[2]));
		cvar(rep(dt[1]), t["type"], t["dt"], t["headers"]);
	} else if (/^[ \n\t]*return[ \n\t]+([^\n ]*)[ \n\t]*$/.test(line)) {
		var dt = line.match(/^[ \n\t]*return[ \n\t]+([^\n ]*)[ \n\t]*$/);
		d['retd'] = typeify(dt[1]);
	}
	/*else if (/^[ \n\t]*recurse[ \n\t]*$/.test(line)){
		var dt = line.match(/^[ \n\t]*recurse[ \n\t]*$/);
		var attrib = [];
		var fcv = false;
		var c = 0;
		for (var i of d['cvs'][0]){
			if (i in vars){
				if (JSON.stringify(d['cvs'][1][c]) != JSON.stringify(vars[i])){
					fcv = true;
				}
				attrib.push(vars[i]);
			}
			else{
				error("RecursionError","Variable no longer exists: "+i);
			}
		}
		if (fcv){
			callfunct(d['fname'],attrib);
		}
		else{
			error("RecursionError","No variable was changed since last recursion.")
		}
	}*/
	else if (/^[ \n\t]*(else){0,1}[ \n\t]*if[ \n\t]*\((.*)\)[ \n\t]*\{[ \n\t]*$/.test(line)) {
		var dt = line.match(/^[ \n\t]*(else){0,1}[ \n\t]*if[ \n\t]*\((.*)\)[ \n\t]*\{[ \n\t]*$/);
		d['atc'] = function(dt, data, tr) {
			d['ifs'] = true;
			if (data[0]) {
				ev(dt);
				d['prevt'] = true;
			}
			d['ifs'] = true;
		}
		if (dt[1] == "else") {
			if (!d['ifs']) {
				error("SyntaxError", "Elseif without if statement before.")
			}
			if (d['prevt']) {
				var b = false;
			} else {
				var b = typeify(dt[2])['dt'];
			}
		} else {
			var b = typeify(dt[2])['dt'];
		}
		d['atcd'] = [b];
		d['atcc'] = 1;
	} else if (/^[ \n\t]*else[ \n\t]*\{[ \n\t]*/.test(line)) {
		var dt = line.match(/^[ \n\t]*else[ \n\t]*\{[ \n\t]*/);
		if (!d['ifs']) {
			error("SyntaxError", "Else without if statement before.")
		}
		if (!d['prevt']) {
			d['atc'] = function(dt, data, tr) {
				d['ifs'] = false;
				ev(dt);
				d['prevt'] = false;
			}
			d['atcd'] = [];
			d['atcc'] = 1;

		} else {
			d['atc'] = function(dt, data, tr) {}
			d['atcd'] = [];
			d['atcc'] = 1;
		}
	} else if (/^[ \n\t]*class[ \n\t]+([^\n ]+)[ \n\t]*\([^\n ]+\)[ \n\t]*\{$/.test(line)) {
		var dt = line.match(/^[ \n\t]*class[ \n\t]+([^\n ]+)[ \n\t]*\([^\n ]+\)[ \n\t]*\{$/);
		d['atc'] = function(dt, data, tr) {
			ov = rep(vars);
			for (v in vars) {
				if (vars[v]['headers'] == undefined) {
					error("", "")
				}
				vars[v]['headers']["ZH"] = 1;
			}
			d['class'] = true;
			ev(dt);
			d['class'] = false;
			vd = {};
			for (v in vars) {
				if (vars[v]['headers']["ZH"] != 1) {
					vars[v]['headers']["ZH"] = 0;
					vd[v] = vars[v];
				}
				/*if (ov[v] == undefined){
					vd[v] = vars[v];
				}
				else{
				/*for (var dat of Object.keys(vars[v])){
						/*console.log(v);
					if (vars[v][dat] != ov[v][dat]){
						vd[v] = vars[v];
						break;
					}
					if(vars[v][dat] != ov[v][dat]){
						vd[v] = vars[v];
					}
				}
				}
				if(vars[v]['headers']["ZH"] != 1){
					vars[v]['headers']["ZH"] = 0;
					vd[v] = vars[v];
				}
				}*/
			}
			vars = ov;
			cvar(data[0][1], "class", `<class ${data[0][1]} class>`, {
				"rd": rep(vd)
			}, true);
		}
		d['atcd'] = [dt]
		d['atcc'] += 1;
	} else if (/^[ \n\t]*break[ \n\t]*$/.test(line)) {
		var dt = line.match(/^[ \n\t]*break[ \n\t]*$/);
		if (d['loop']) {
			d['loop'] = false;
		} else {
			error("LoopError", 'Cannot break a loop that is not looping.')
		}
	} else if (/^[ \n\t]*while[ \n\t]*\(([^]*)\)[ \n\t]*\{[ \n\t]*$/.test(line)) {
		var dt = line.match(/^[ \n\t]*while[ \n\t]*\(([^]*)\)[ \n\t]*\{[ \n\t]*$/);
		d['atc'] = function(dt, data, tr) {
			var ol = rep(d['loop']);
			d['loop'] = true;
			var c = 1;
			while (c < 100000) {
				if (!d['loop']) {
					break;
				}
				if (typeify(data[0])['dt']) {
					ev(dt);
				} else {
					break;
				}
				c++;
			}
			d['loop'] = ol;
		}
		d['atcd'] = [dt[1]]
		d['atcc'] += 1;
	} else if (/^[ \n\t]*for[ \n\t]*\(([^]*)\)[ \n\t]*\{[ \n\t]*$/.test(line)) {
		var dt = line.match(/^[ \n\t]*for[ \n\t]*\(([^]*)\)[ \n\t]*\{[ \n\t]*$/);
		d['atc'] = function(dt, data, tr) {
			var c = 1;
			if (data[1]['type'] == 'list') {
				for (var i of data[1]['headers']['ld']) {
					cvar(data[0], i['type'], i['dt'], i['headers']);
					ev(dt);
				}
			} else if (data[1]['type'] == 'map') {
				for (var i in data[1]['headers']['ld']) {
					cvar(data[0], "string", i, basehead);
					ev(dt);
				}
			} else {
				error("TypeError", `Cannot loop over non-iterable type "${data[1]["type"]}".`)
			}
		}
		var l = [dt[1].match(/[ \n\t]*([^ ]+)[ \n\t]*\:[ \n\t]*([^ ]+)[ \n\t]*/)[1], typeify(dt[1].match(/[ \n\t]*([^ ]+)[ \n\t]*\:[ \n\t]*([^ ]+)[ \n\t]*/)[2])];
		d['atcd'] = l;
		d['atcc'] += 1;
	} else if (/^[ \n\t]*cnc[ \n\t]*([0-9]+)[ \n\t]*$/.test(line)) {
		var dt = line.match(/^[ \n\t]*cnc[ \n\t]*([0-9]+)[ \n\t]*$/);
		n = parseInt(dt[1]);
		if (cnch[n] != undefined) {
			var dat = rep(cnch[n]);
		} else {
			var dat = [];
		}
		if (n == 2) {
			console.log(dat[0]['dt']);
		} else if (n == 3) {
			console.error(dat[0]['dt']);
		} else if (n == 4) {
			alert(dat[0]['dt']);
		} else if (n == 5) {
			error(dat[0]['dt'], dat[1]['dt']);
		} else if (n == 6) {
			if (dat[0]["type"] == "string") {
				var v = dat[0]["dt"].charAt(parseInt(dat[1]["dt"]));
				if (v == "") {
					error("KeyError", "No such key.")
				}
				cvar("dat", "string", v, {})
			} else if (dat[0]["type"] == "list") {
				var v = dat[0]['headers']['ld'][parseInt(dat[1]["dt"])];
				cvar("dat", v['type'], v['dt'], basehead);
			} else if (dat[0]["type"] == "map") {
				var k = dat[1]['dt'];
				var v = dat[0]['headers']['ld'][k];
				cvar("dat", v['type'], v['dt'], basehead);
			} else {
				error("TypeError", "Type is not available for @defaults.item.")
			}
		} else if (n == 7) {
			if (dat[0]['type'] == "map") {
				var md = dat[0]['headers']['ld'];
				md[dat[1]['dt']] = dat[2];
				var hd = dat[0]['headers'];
				hd["ld"] = md;
				cvar("dat", "map", dat[0]['dt'], hd);
			} else {
				error('TypeError', "Cannot Set item of unknown type.")
			}
		} else if (n == 8) {
			dtdt = typeify("`" + document.title.toString() + "`");
			cvar("dat", "string", dtdt['dt'], dtdt['headers']);
		} else if (n == 9) {
			dtdt = typeify("`" + document.documentElement.innerHTML + "`");
			cvar("dat", "string", dtdt['dt'], dtdt['headers']);
		} else if (n == 10) {
			if (dat[0]['dt'] == 'id') {
				var i = document.getElementById(dat[1]["dt"]);
			} else {
				var i = document.querySelector(dat[1]['dt']);
			}
			if (dat[2]['dt'] == 'innerHTML') {
				cvar("dat", "string", i.innerHTML, basehead);
			} else {
				cvar("dat", "string", i.getAttribute(dat[2]['dt']), basehead);
			}
		} else if (n == 11) {
			if (dat[0]['dt'] == 'id') {
				var i = document.getElementById(dat[1]["dt"]);
			} else {
				var i = document.querySelector(dat[1]['dt']);
			}
			if (dat[2]['dt'] == 'innerHTML') {
				i.innerHTML = dat[3]['dt'];
				cvar("dat", "string", i.innerHTML, basehead);
			} else {
				i.setAttribute(dat[2]['dt'], dat[3]['dt']);
			}
		} else if (n == 12) {
			var e = document.createElement(dat[0]['dt']);
			if (dat[1]['dt'] == 'id') {
				var i = document.getElementById(dat[2]["dt"]);
			} else {
				var i = document.querySelector(dat[2]['dt']);
			}
			if (dat[3]['dt'] == 'id') {
				e.id = dat[4]['dt'];
			} else {
				e.setAttribute(dat[3]['dt'], dat[4]['dt']);
			}
			i.appendChild(e);
		} else if (n == 13) {
			cvar("dat", "string", dat[0]['type'], basehead);
		} else if (n == 14) {
			cvar("dat", "string", dat[0]['dt'] + dat[1]['dt'], basehead);
		} else if (n == 15) {
			document.cookie = `${dat[0]['dt']}=${dat[1]['dt']}; expires=${dat[2]['dt']}; path=${dat[3]['dt']};`;
		} else if (n == 16) {
			cvar("dat", "string", getCookie(dat[0]['dt']), basehead);
		} else if (n == 17) {
			const d = new Date();
			if (dat[0]['dt'] == 'sec') {
				var ty = "int";
				var dta = d.getSeconds();
			} else if (dat[0]['dt'] == 'min') {
				var ty = "int";
				var dta = d.getMinutes();
			} else if (dat[0]['dt'] == 'hr') {
				var ty = "int";
				var dta = d.getHours();
			} else if (dat[0]['dt'] == "mon") {
				var ty = "int";
				var dta = d.getMonth() + 1;
			} else if (dat[0]['dt'] == 'monn') {
				var l = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
				var ty = "string";
				var dta = l[d.getMonth()];
			} else if (dat[0]['dt'] == "date") {
				var ty = "int";
				var dta = d.getDate();
			} else if (dat[0]['dt'] == "year") {
				var ty = "int";
				var dta = d.getFullYear();
			}
			cvar("dat", ty, dta, basehead);
		} else if (n == 18) {
			var xhttp = new XMLHttpRequest();
			xhttp.open("GET", d['evurl'] + 'lib/' + dat[0]['dt'], false);
			xhttp.send();
			ev(xhttp.responseText);
		}
		cnch[n] = [];
	} else if (/^[ \n\t]*cnch[ \n\t]*([0-9]+)[ \n\t]+([^]+)[ \n\t]*$/.test(line)) {
		var dt = line.match(/^[ \n\t]*cnch[ \n\t]*([0-9]+)[ \n\t]+([^]+)[ \n\t]*$/);
		n = parseInt(dt[1]);
		if (typeof cnch[n] == 'undefined') {
			cnch[n] = [];
		}
		cnch[n].push(typeify(dt[2]));
	} else if (/^[ \n\t]*getvars[ \n\t]*$/.test(line)) {
		console.log(vars);
	} else {
		if (line.includes('.')) {
			var ind = rep(typeify(line.split(".")[0]));
			var c = 0;
			var ov = rep(vars);
			for (item of line.split(".")) {
				if (c == line.split(".").length - 1) {
					d['retd'] = ind[item];
				}
				if (c == 0) {
					ind = ind["headers"]["rd"];
				} else {
					ind = ind[item]["headers"]["rd"];
				}
				c += 1;
			}
		} else if (vars[line.replace(/[ \n\t]*/g, '')] != undefined) {
			d['retd'] = vars[line.replace(/[ \n\t]*/g, '')];
		} else if (line.replace(/[ \n\t]*/g, '')[0] == '~') {
			var dda = vars[line.replace(/[ \n\t]*/g, '').replace("~", "")];
			if (dda == undefined) {
				dda = {
					"type": "int",
					"dt": 0,
					"headers": {
						"rd": {
							"item": {
								"type": "funct",
								"dt": "<function @defaults.item function>",
								"headers": {
									"fn": {
										"attrib": {
											"c": "null"
										},
										"code": "cnch6 @self;cnch6 c;cnc6;return dat;",
										"head": {}
									}
								}
							},
							"set": {
								"type": "funct",
								"dt": "<function @defaults.set function>",
								"headers": {
									"fn": {
										"attrib": {
											"key": "null",
											"value": "null"
										},
										"code": "cnch7 @self;cnch7 key;cnch7 value;cnc7;return dat;",
										"head": {}
									}
								}
							},
							"type": {
								"type": "funct",
								"dt": "<function @defaults.type function>",
								"headers": {
									"fn": {
										"attrib": {
											"": "null"
										},
										"code": "cnch13 @self;cnc13;return dat;",
										"head": {}
									}
								}
							},
							"concat": {
								"type": "funct",
								"dt": "<function @defaults.concat function>",
								"headers": {
									"fn": {
										"attrib": {
											"string": "null"
										},
										"code": "cnch14 @self;cnch14 string;cnc14;return dat;",
										"head": {}
									}
								}
							}
						},
						"item": {
							"type": "funct",
							"dt": "<function @defaults.item function>",
							"headers": {
								"fn": {
									"attrib": {
										"c": "null"
									},
									"code": "cnch6 @self;cnch6 c;cnc6;return dat;",
									"head": {}
								}
							}
						},
						"set": {
							"type": "funct",
							"dt": "<function @defaults.set function>",
							"headers": {
								"fn": {
									"attrib": {
										"key": "null",
										"value": "null"
									},
									"code": "cnch7 @self;cnch7 key;cnch7 value;cnc7;return dat;",
									"head": {}
								}
							}
						},
						"type": {
							"type": "funct",
							"dt": "<function @defaults.type function>",
							"headers": {
								"fn": {
									"attrib": {
										"": "null"
									},
									"code": "cnch13 @self;cnc13;return dat;",
									"head": {}
								}
							}
						},
						"concat": {
							"type": "funct",
							"dt": "<function @defaults.concat function>",
							"headers": {
								"fn": {
									"attrib": {
										"string": "null"
									},
									"code": "cnch14 @self;cnch14 string;cnc14;return dat;",
									"head": {}
								}
							}
						}
					}
				};
			}
			d['retd'] = dda;
		} else {
			typeify(line, true)
		}
	}
}

function ev(code) {
	code = htmlDecode(code);
	code = code.replace(/[ \n\t]*\/#[^]*#\/[ \n\t]*/g, '');
	code = code.replace(/\/\/[^\n]*/g, '')
	code = ap(code, ";");
	code = code.replace(/[ \n\t]*\)[ \n\t]*{[ \n\t]*/g, '){;');
	code = code.replace(/[ \n\t]*else[ \n\t]*{[ \n\t]*/g, 'else{;');
	var cd = code.split(/[ \n\t]*;[ \n\t]*/);
	code = replaceAll(code, '\\c', ';');
	var cnt = 1;
	for (line of cd) {
		line = replaceAll(line, '\\c', ";");
		line = ap(line, "<");
		fna = line.split("<");
		line = rep(fna[0]);
		line = replaceAll(line, "\\c", "<")
		delete fna[0];
		var cnt = 1;
		fnh = rep(basehead);
		fnh['fn'] = {
			'attrib': {},
			'code': "",
			'head': {}
		};
		for (var i in fna) {
			i = fna[i];
			i = replaceAll(i, "\\c", "<")
			fnh['fn']['code'] = reverse(reverse(i).replace(">", ""));
			if (/^[ \n\t]*fnargs:([^]*):fnargs/.test(fnh['fn']['code'])) {
				var args = fnh['fn']['code'].match(/^[ \n\t]*fnargs:([^]*):fnargs/)[1];
				fnh['fn']['attrib'] = argparse(args);
				fnh['fn']['code'] = fnh['fn']['code'].replace(/^[ \n\t]*fnargs:([^]*):fnargs/, "");
			}
			cvar("@fn" + cnt, "funct", "<function anonymous function>", rep(fnh), false, true);
			cnt += 1;
		}
		if (d['atcc'] == 0) {
			var op = rep(d['prevt']);
			var oifs = rep(d['ifs']);
			evaluate(line);
			if (op && d['prevt']) {
				d['prevt'] = false;
			}
			if (oifs && d['ifs']) {
				d['ifs'] = false;
			}
			for (i = 1; i < cnt; i++) {
				delete vars["@fn" + i];
			}
		} else {
			for (item of line.split('')) {
				if (item == '{') {
					d['atcc'] += 1;
				}
				if (item == '}') {
					d['atcc'] -= 1;
				}
			}
			if (d['atcc'] == 0) {
				d['atc'](d['atcdat'], d['atcd'], line);
				d['atcdat'] = ''
				d['atct'] = []
				d['atcc'] = 0
				evaluate(line.replace(/[ \n\t]*}[ \n\t]*/, '', 1));
			} else {
				d['atcdat'] += line + ';'
			}
		}
	}
}
d['su'] = true;
ev(`funct log(txt){
cnch2 txt;
cnc2;
};
funct error(txt){
cnch3 txt;
cnc3;
};
funct alert(txt){
cnch4 txt;
cnc4;
};
funct throw(n,t){
cnch5 n;
cnch5 t;
cnc5;
};
class @defaults(static){
	funct item(self,c){
	cnch6 self;
	cnch6 c;
	cnc6;
	return dat;
};
funct set(self,key,value){
	cnch7 self;
	cnch7 key;
	cnch7 value;
	cnc7;
	return dat;
};
funct type(self){
	cnch13 self;
	cnc13;
	return dat;
};
funct concat(self,string){
	cnch14 self;
	cnch14 string;
	cnc14;
	return dat;
};
};
class @doc(static){
	funct title(){
		cnc8;
		return dat;
	};
	funct HTML(){
		cnc9;
		return dat;
	};
	funct getElement(sel,retd="innerHTML",seltype="id"){
		cnch10 seltype;
		cnch10 sel;
		cnch10 retd;
		cnc10;
		return dat;
	};
	funct setElement(sel,value,it="innerHTML",seltype="id"){
		cnch11 seltype;
		cnch11 sel;
		cnch11 it;
		cnch11 value;
		cnc11;
		return dat;
	};
	funct createElement(type,tsel,sel,tseltype="id",seltype="id"){
		cnch12 type;
		cnch12 seltype;
		cnch12 sel;
		cnch12 tseltype;
		cnch12 tsel;
		cnc12;
	};
};
class @cookie(static){
funct set(name,data,exp,path='/'){
	cnch15 name;
	cnch15 data;
	cnch15 exp;
	cnch15 path;
	cnc15;
};
funct get(name){
	cnch16 name;
	cnc16;
	return dat;
};
funct delete(name){
	cnch15 name;
	cnch15 "";
	cnch15 "Thu, 01 Jan 1970 00:00:00 UTC";
	cnch15 "/";
	cnc15;
};
};
funct log(txt){
cnch2 txt;
cnc2;
};
funct error(txt){
cnch3 txt;
cnc3;
};
funct alert(txt){
cnch4 txt;
cnc4;
};
funct throw(n,t){
cnch5 n;
cnch5 t;
cnc5;
};
class @defaults(static){
	funct item(self,c){
	cnch6 self;
	cnch6 c;
	cnc6;
	return dat;
};
funct set(self,key,value){
	cnch7 self;
	cnch7 key;
	cnch7 value;
	cnc7;
	return dat;
};
funct type(self){
	cnch13 self;
	cnc13;
	return dat;
};
funct concat(self,string){
	cnch14 self;
	cnch14 string;
	cnc14;
	return dat;
};
};
class @doc(static){
	funct title(){
		cnc8;
		return dat;
	};
	funct HTML(){
		cnc9;
		return dat;
	};
	funct getElement(sel,retd="innerHTML",seltype="id"){
		cnch10 seltype;
		cnch10 sel;
		cnch10 retd;
		cnc10;
		return dat;
	};
	funct setElement(sel,value,it="innerHTML",seltype="id"){
		cnch11 seltype;
		cnch11 sel;
		cnch11 it;
		cnch11 value;
		cnc11;
		return dat;
	};
	funct createElement(type,tsel,sel,tseltype="id",seltype="id"){
		cnch12 type;
		cnch12 seltype;
		cnch12 sel;
		cnch12 tseltype;
		cnch12 tsel;
		cnc12;
	};
};
class @cookie(static){
funct set(name,data,exp,path='/'){
	cnch15 name;
	cnch15 data;
	cnch15 exp;
	cnch15 path;
	cnc15;
};
funct get(name){
	cnch16 name;
	cnc16;
	return dat;
};
funct delete(name){
	cnch15 name;
	cnch15 "";
	cnch15 "Thu, 01 Jan 1970 00:00:00 UTC";
	cnch15 "/";
	cnc15;
};
};
class @date(static){
	funct sec(){
		cnch17 'sec';
		cnc17;
		return dat;
	};
	funct min(){
		cnch17 'min';
		cnc17;
		return dat;
	};
	funct hour24(){
		cnch17 'hr';
		cnc17;
		return dat;
	};
	funct hour(){
		cnch17 'hr';
		cnc17;
		var ty = " AM";
		if(dat > 12){
			var ty = " PM";
			var dat = dat-12;
		};
		return dat.concat(ty);
	};
	funct timestr24(){
		cnch17 'hr';
		cnc17;
		var s = dat;
		var s = s.concat(":");
		cnch17 'min';
		cnc17;
		var s = s.concat(dat);
		var s = s.concat(":");
		cnch17 'sec';
		cnc17;
		var s = s.concat(dat);
		return s;
	};
	funct timestr(){
		cnch17 'hr';
		cnc17;
		var s = dat;
		var ty = "AM";
		if(s > 12){
			var ty = "PM";
			var s = s-12;
		};
		var s = s.concat(":");
		cnch17 'min';
		cnc17;
		var s = s.concat(dat);
		var s = s.concat(":");
		cnch17 'sec';
		cnc17;
		var s = s.concat(dat);
		var s = s.concat(" ");
		var s = s.concat(ty);
		return s;
	};
	funct month(){
		cnch17 "mon";
		cnc17;
		return dat;
	};
	funct monthName(){
		cnch17 "monn";
		cnc17;
		return dat;
	};
	funct date(){
		cnch17 "date";
		cnc17;
		return dat;
	};
	funct year(){
		cnch17 "year";
		cnc17;
		return dat;
	};
	funct datestr(){
		cnch17 "mon";
		cnc17;
		var s = dat;
		var s = s.concat("/");
		cnch17 "date";
		cnc17;
		var s = s.concat(dat);
		var s = s.concat("/");
		cnch17 "year";
		cnc17;
		var s = s.concat(dat);
		return s;
	};
	funct str(){
		cnch17 "mon";
		cnc17;
		var s = dat;
		var s = s.concat("/");
		cnch17 "date";
		cnc17;
		var s = s.concat(dat);
		var s = s.concat("/");
		cnch17 "year";
		cnc17;
		var s = s.concat(dat);
		var s = s.concat(" ");
		cnch17 'hr';
		cnc17;
		var ty = "AM";
		if(dat > 12){
			var ty = "PM";
			var s = s.concat(dat-12);
		};
		else{
		var s = s.concat(dat);
		}
		var s = s.concat(":");
		cnch17 'min';
		cnc17;
		var s = s.concat(dat);
		var s = s.concat(":");
		cnch17 'sec';
		cnc17;
		var s = s.concat(dat);
		var s = s.concat(" ");
		var s = s.concat(ty);
		return s;
	};
	funct str24(){
		cnch17 "mon";
		cnc17;
		var s = dat;
		var s = s.concat("/");
		cnch17 "date";
		cnc17;
		var s = s.concat(dat);
		var s = s.concat("/");
		cnch17 "year";
		cnc17;
		var s = s.concat(dat);
		var s = s.concat(" ");
		cnch17 'hr';
		cnc17;
		var s = s.concat(dat);
		var s = s.concat(":");
		cnch17 'min';
		cnc17;
		var s = s.concat(dat);
		var s = s.concat(":");
		cnch17 'sec';
		cnc17;
		var s = s.concat(dat);
		return s;
	};
};
funct @lib(name){
	cnch18 name;
	cnc18;
};`);
d['su'] = false;
window.onload = function() {
	var dl = [];
	document.querySelectorAll('ev, evolution').forEach(function(item) {
		item.style.display = 'none';
		if (item.hasAttribute('src')) {
			const xhttp = new XMLHttpRequest();
			var s = item.getAttribute('src');
			if (s.split('.').length == 1) {
				s = d['evurl'] + 'lib/' + s;
			}
			xhttp.open("GET", s, false);
			xhttp.send();
			item.innerHTML += xhttp.responseText;
		}
		dl.push(item);
	});
	var q = document.querySelectorAll("[ev-onclick]");
	for (var i of q) {
		i.addEventListener('click', function() {
			ev(this.getAttribute("ev-onclick"));
		});
	}
	dl.forEach(function(item) {
		ev(item.innerHTML);
	});
}