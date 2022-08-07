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
var pv = {},
	gvars = {},
	d = {
		atc: function() {},
		atcd: [],
		atcc: 0,
		atcdat: "",
		retd: {
			type: "null",
			dt: "null",
			headers: {
				null: "null"
			}
		},
		funct: !1,
		class: "",
		evurl: "https://cdn.jsdelivr.net/gh/mathstar13/Evolution/dist/",
		lc: !1,
		prevt: !1,
		ifs: !1,
		su: !1,
		class: !1,
		fname: "@main"
	},
	basehead = {
		rd: {
			item: {
				type: "funct",
				dt: "<function @defaults.item function>",
				headers: {
					fn: {
						attrib: {
							c: "null"
						},
						code: "cnch6 @self;cnch6 c;cnc6;return dat;",
						head: {}
					}
				}
			},
			set: {
				type: "funct",
				dt: "<function @defaults.set function>",
				headers: {
					fn: {
						attrib: {
							key: "null",
							value: "null"
						},
						code: "cnch7 @self;cnch7 key;cnch7 value;cnc7;return dat;",
						head: {}
					}
				}
			},
			type: {
				type: "funct",
				dt: "<function @defaults.type function>",
				headers: {
					fn: {
						attrib: {
							"": "null"
						},
						code: "cnch13 @self;cnc13;return dat;",
						head: {}
					}
				}
			},
			concat: {
				type: "funct",
				dt: "<function @defaults.concat function>",
				headers: {
					fn: {
						attrib: {
							string: "null"
						},
						code: "cnch14 @self;cnch14 string;cnc14;return dat;",
						head: {}
					}
				}
			}
		}
	};

function rep(t) {
	return JSON.parse(JSON.stringify(t))
}
var cnch = {},
	vars = rep(gvars);

function reverse(t) {
	return [...t].reverse().join("")
}

function escapeRegExp(t) {
	return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function replaceAll(t, n, e) {
	return t.replace(new RegExp(escapeRegExp(n), "g"), e)
}

function htmlDecode(t) {
	return (new DOMParser).parseFromString(t, "text/html").documentElement.textContent
}

function getCookie(t) {
	let n = t + "=",
		e = decodeURIComponent(document.cookie).split(";");
	for (let t = 0; t < e.length; t++) {
		let c = e[t];
		for (;
			" " == c.charAt(0);) c = c.substring(1);
		if (0 == c.indexOf(n)) return c.substring(n.length, c.length)
	}
	return ""
}

function typeify(t, n = !1) {
	var e = {
		type: "null",
		dt: "null",
		headers: {}
	};
	if (/^[ \n\t]*(.*)[ \n\t]*===[ \n\t]*(.*)[ \n\t]*$/.test(t)) e = typeify((a = t.match(/^[ \n\t]*(.*)[ \n\t]*===[ \n\t]*(.*)[ \n\t]*$/))[1]).type == typeify(a[2]).type && typeify(a[1]).dt == typeify(a[2]).dt ? {
		type: "boolean",
		dt: !0,
		headers: {}
	} : {
		type: "boolean",
		dt: !1,
		headers: {}
	};
	else if (/^[ \n\t]*(.*)[ \n\t]*!==[ \n\t]*(.*)[ \n\t]*$/.test(t)) {
		e = typeify((a = t.match(/^[ \n\t]*(.*)[ \n\t]*!==[ \n\t]*(.*)[ \n\t]*$/))[1]).type == typeify(a[2]).type && typeify(a[1]).dt != typeify(a[2]).dt ? {
			type: "boolean",
			dt: !0,
			headers: {}
		} : {
			type: "boolean",
			dt: !1,
			headers: {}
		}
	} else if (/^[ \n\t]*(.*)[ \n\t]*>==[ \n\t]*(.*)[ \n\t]*$/.test(t)) {
		e = typeify((a = t.match(/^[ \n\t]*(.*)[ \n\t]*>==[ \n\t]*(.*)[ \n\t]*$/))[1]).type == typeify(a[2]).type && typeify(a[1]).dt >= typeify(a[2]).dt ? {
			type: "boolean",
			dt: !0,
			headers: {}
		} : {
			type: "boolean",
			dt: !1,
			headers: {}
		}
	} else if (/^[ \n\t]*(.*)[ \n\t]*<==[ \n\t]*(.*)[ \n\t]*$/.test(t)) {
		e = typeify((a = t.match(/^[ \n\t]*(.*)[ \n\t]*<==[ \n\t]*(.*)[ \n\t]*$/))[1]).type == typeify(a[2]).type && typeify(a[1]).dt <= typeify(a[2]).dt ? {
			type: "boolean",
			dt: !0,
			headers: {}
		} : {
			type: "boolean",
			dt: !1,
			headers: {}
		}
	} else if (/^[ \n\t]*(.*)[ \n\t]*>=[ \n\t]*(.*)[ \n\t]*$/.test(t)) {
		e = typeify((a = t.match(/^[ \n\t]*(.*)[ \n\t]*>=[ \n\t]*(.*)[ \n\t]*$/))[1]).dt >= typeify(a[2]).dt ? {
			type: "boolean",
			dt: !0,
			headers: {}
		} : {
			type: "boolean",
			dt: !1,
			headers: {}
		}
	} else if (/^[ \n\t]*(.*)[ \n\t]*<=[ \n\t]*(.*)[ \n\t]*$/.test(t)) {
		e = typeify((a = t.match(/^[ \n\t]*(.*)[ \n\t]*<=[ \n\t]*(.*)[ \n\t]*$/))[1]).dt <= typeify(a[2]).dt ? {
			type: "boolean",
			dt: !0,
			headers: {}
		} : {
			type: "boolean",
			dt: !1,
			headers: {}
		}
	} else if (/^[ \n\t]*(.*)[ \n\t]*>[ \n\t]*(.*)[ \n\t]*$/.test(t)) {
		e = typeify((a = t.match(/^[ \n\t]*(.*)[ \n\t]*>[ \n\t]*(.*)[ \n\t]*$/))[1]).dt > typeify(a[2]).dt ? {
			type: "boolean",
			dt: !0,
			headers: {}
		} : {
			type: "boolean",
			dt: !1,
			headers: {}
		}
	} else if (/^[ \n\t]*(.*)[ \n\t]*<[ \n\t]*(.*)[ \n\t]*$/.test(t)) {
		e = typeify((a = t.match(/^[ \n\t]*(.*)[ \n\t]*<[ \n\t]*(.*)[ \n\t]*$/))[1]).dt < typeify(a[2]).dt ? {
			type: "boolean",
			dt: !0,
			headers: {}
		} : {
			type: "boolean",
			dt: !1,
			headers: {}
		}
	} else if (/^[ \n\t]*(.*)[ \n\t]*==[ \n\t]*(.*)[ \n\t]*$/.test(t)) {
		e = typeify((a = t.match(/^[ \n\t]*(.*)[ \n\t]*==[ \n\t]*(.*)[ \n\t]*$/))[1]).dt == typeify(a[2]).dt ? {
			type: "boolean",
			dt: !0,
			headers: {}
		} : {
			type: "boolean",
			dt: !1,
			headers: {}
		}
	} else if (/^[ \n\t]*(.*)[ \n\t]*!=[ \n\t]*(.*)[ \n\t]*$/.test(t)) {
		e = typeify((a = t.match(/^[ \n\t]*(.*)[ \n\t]*!=[ \n\t]*(.*)[ \n\t]*$/))[1]).dt != typeify(a[2]).dt ? {
			type: "boolean",
			dt: !0,
			headers: {}
		} : {
			type: "boolean",
			dt: !1,
			headers: {}
		}
	} else if (/^[ \n\t]*'([^']*)'[ \n\t]*$/.test(t)) {
		e = {
			type: "string",
			dt: (a = t.match(/[ \n\t]*'([^]*)'[ \n\t]*/))[1],
			headers: {}
		}
	} else if (/^[ \n\t]*"([^"]*)"[ \n\t]*$/.test(t)) {
		e = {
			type: "string",
			dt: (a = t.match(/[ \n\t]*"([^]*)"[ \n\t]*/))[1],
			headers: {}
		}
	} else if (/^[ \n\t]*`([^`]*)`[ \n\t]*$/.test(t)) {
		if (null != (e = (t = t.match(/[ \n\t]*`([^`]*)`[ \n\t]*/)[1]).match(/\$\{([^}]*)\}/g)))
			for (u of [...Array(e.length).keys()]) {
				var c = rep(d.retd);
				ev(e[u].match(/\$\{([^}]*)\}/)[1]), t = t.replace(e[u], d.retd.dt, 1), d.retd = rep(c)
			}
		e = {
			type: "string",
			dt: t,
			headers: {}
		}
	} else if (/^[ \n\t]*(true|false)[ \n\t]*$/.test(t)) {
		e = "true" == (a = t.match(/^[ \n\t]*(true|false)[ \n\t]*$/)[1]) ? {
			type: "boolean",
			dt: !0,
			headers: {}
		} : {
			type: "boolean",
			dt: !1,
			headers: {}
		}
	} else if (/^[ \n\t]*([0-9]+)[ \n\t]*$/.test(t)) {
		var a = t.match(/^[ \n\t]*([0-9]+)[ \n\t]*$/);
		e = {
			type: "int",
			dt: parseInt(a),
			headers: {}
		}
	} else if (/^[ \n\t]*\[([^]*)\][ \n\t]*$/.test(t)) {
		a = t.match(/^[ \n\t]*\[([^]*)\][ \n\t]*$/);
		var r = [];
		for (u of ap(a[1]).split(",")) u = replaceAll(u, "\\c", ","), r.push(typeify(u));
		e = {
			type: "list",
			dt: "<list list>",
			headers: {
				ld: r
			}
		}
	} else if (/^[ \n\t]*\{([^]*)\}[ \n\t]*$/.test(t)) {
		a = t.match(/^[ \n\t]*\{([^]*)\}[ \n\t]*$/), r = {};
		for (u of ap(a[1]).split(",")) {
			var s = (u = replaceAll(u, "\\c", ",")).split(":");
			r[typeify(s[0]).dt] = typeify(s[1])
		}
		e = {
			type: "map",
			dt: "<map map>",
			headers: {
				ld: r
			}
		}
	} else if (/^[ \n\t]*([^ ]+)[ \n\t]*\|[ \n\t]*([0-9]+)[ \n\t]*$/.test(t)) {
		a = t.match(/^[ \n\t]*([^ ]+)[ \n\t]*\|[ \n\t]*([0-9]+)[ \n\t]*$/);
		e = pv[d.fname + "(" + a[1]][a[2]]
	} else if (od = t, t = ap(t, "+"), t = ap(t, "-"), t = ap(t, "*"), t = ap(t, "/"), t = ap(t, "^"), /^([ \n\t]*([^]+)[ \n\t]*([+\-*\/%^])[ \n\t]*([^]+))+$/.test(t)) {
		a = t.matchAll(/[ \n\t]*[+\-*\/%^][ \n\t]*/g);
		for (var l of a) {
			var i = (e = t.split(l[0]))[0].split(/[+\-*\/%^]/)[0];
			null == i && (i = e[0]);
			var f = typeify(i).dt,
				o = e[1].split(/[+\-*\/%^]/)[0];
			null == o && (o = e[1]);
			var h = typeify(o).dt;
			"+" == l ? t = t.replace(i + l[0] + o, f + h) : "-" == l ? t = t.replace(i + l[0] + o, f - h) : "*" == l ? t = t.replace(i + l[0] + o, f * h) : "/" == l ? t = t.replace(i + l[0] + o, f / h) : "%" == l ? t = t.replace(i + l[0] + o, f % h) : "^" == l && (t = t.replace(i + l[0] + o, Math.pow(f, h)))
		}
		e = {
			type: "int",
			dt: parseInt(t),
			headers: {}
		}
	} else if (t = od, n) {
		if (d.lc) return "lc";
		error("CommandError", `Unknown command: ${line}.`)
	} else {
		c = rep(d.retd);
		ev(t), e = rep(d.retd), d.retd = c
	}
	null == e.headers.rd && (e.headers.rd = {});
	var p = {
		item: {
			type: "funct",
			dt: "<function @defaults.item function>",
			headers: {
				fn: {
					attrib: {
						c: "null"
					},
					code: "cnch6 @self;cnch6 c;cnc6;return dat;",
					head: {}
				}
			}
		},
		set: {
			type: "funct",
			dt: "<function @defaults.set function>",
			headers: {
				fn: {
					attrib: {
						key: "null",
						value: "null"
					},
					code: "cnch7 @self;cnch7 key;cnch7 value;cnc7;return dat;",
					head: {}
				}
			}
		},
		type: {
			type: "funct",
			dt: "<function @defaults.type function>",
			headers: {
				fn: {
					attrib: {
						"": "null"
					},
					code: "cnch13 @self;cnc13;return dat;",
					head: {}
				}
			}
		},
		concat: {
			type: "funct",
			dt: "<function @defaults.concat function>",
			headers: {
				fn: {
					attrib: {
						string: "null"
					},
					code: "cnch14 @self;cnch14 string;cnc14;return dat;",
					head: {}
				}
			}
		}
	};
	for (var u in p) null == e.headers.rd[u] && (e.headers.rd[u] = p[u]);
	return e
}

function ap(t, n = ",") {
	var e = [!1],
		c = [],
		a = [];
	for (var r of t) a.push(r);
	t = "";
	var s = {
		"(": ")",
		"[": "]",
		'"': '"',
		"'": "'",
		"`": "`",
		"<": ">"
	};
	for (var d of a) e[0] ? (s[c[0]] == d && delete e[0], t += d == n ? "\\c" : d) : (d in s && (e.splice(0, 0, !0), c.splice(0, 0, d)), t += d), 1;
	return t
}

function error(t, n) {
	throw `${t}: ${n}`
}

function cvar(t, n, e, c = {}, a = !1, r = !1) {
	for (var s in !t.match(/^[A-Za-z$_]+[A-Za-z$_0-9]*$/) & !d.su & !r && error("VarError", `Cannot create variable with name ${t}.`), basehead.rd) null == c[s] && (c[s] = basehead.rd[s]);
	return vars[t] = {
		type: n,
		dt: e,
		headers: c
	}, a && (gvars[t] = {
		type: n,
		dt: e,
		headers: c
	}), null == pv[d.fname + "(" + t] ? pv[d.fname + "(" + t] = [{
		type: n,
		dt: e,
		headers: c
	}] : pv[d.fname + "(" + t].splice(0, 0, {
		type: n,
		dt: e,
		headers: c
	}), !0
}

function callfunct(t, n = {}) {
	var e = t.headers.fn.attrib,
		c = (gvar, []);
	for (item in e) c.push(item)
}

function argparse(t) {
	var n = {};
	for (item of t.split(/[ \n\t]*,[ \n\t]*/)) 1 != item.split(/[ \n\t]*=[ \n\t]*/).length ? n[item.split(/[ \n\t]*=[ \n\t]*/)[0]] = item.split(/[ \n\t]*=[ \n\t]*/)[1] : n[item] = "null";
	return n
}

function evaluate(t) {
	if (/^([ \n\t]*)$/.test(t));
	else if (/^[ \n\t]*funct[ \n\t]+([^\n ]+)[ \n\t]*\(([^]*)\)[ \n\t]*\{$/.test(t)) {
		d.atc = function(t, n, e) {
			cvar(n[0], "funct", `<function ${n[0]} function>`, {
				fn: {
					attrib: n[1],
					code: t,
					head: {}
				}
			}, !d.class)
		};
		var n = argparse((e = t.match(/[ \n\t]*funct[ \n\t]+([^\n ]+)[ \n\t]*\(([^]*)\)[ \n\t]*\{$/))[2]);
		d.atcd = [e[1], n], d.atcc += 1
	} else if (/^[ \n\t]*([^( ]+)[ \n\t]*\(([^]*)\)[ \n\t]*$/.test(t)) {
		var e = t.match(/^[ \n\t]*([^( ]+)[ \n\t]*\(([^]*)\)[ \n\t]*$/),
			c = rep(gvars),
			a = [];
		for (s of replaceAll(ap(e[2].replace("\\,", "\\comma")), "\\c", "\\comma").split(/[ \n\t]*,[ \n\t]*/)) "" != (s = s.replace("\\comma", ",")) && (s = typeify(s), a.push(s));
		var r = 0,
			s = rep(typeify(e[1]));
		for ($ in s.headers.fn.attrib) {
			var l = s.headers.fn.attrib[$];
			if (null == a[r]) break;
			c[$] = a[r], r += 1
		}
		var i = vars;
		e[1].split(".").length > 1 && (c["@self"] = rep(typeify(e[1].split(".")[e[1].split(".").length - 2]))), vars = c, cvar("@functname", "string", e[1], {}, !1, !0);
		var f = rep(d.fname);
		d.fname = e[1], ev(s.headers.fn.code), vars = i, d.fname = f
	} else if (/^[ \n\t]*var[ \n\t]*([^\n ]+)[ \n\t]*=[ \n\t]*([^]+)[ \n\t]*$/.test(t)) {
		var o = rep(typeify((e = t.match(/[ \n\t]*var[ \n\t]*([^\n ]+)[ \n\t]*=[ \n\t]*([^]+)[ \n\t]*/))[2]));
		cvar(rep(e[1]), o.type, o.dt, o.headers)
	} else if (/^[ \n\t]*return[ \n\t]+([^\n ]*)[ \n\t]*$/.test(t)) {
		e = t.match(/^[ \n\t]*return[ \n\t]+([^\n ]*)[ \n\t]*$/);
		d.retd = typeify(e[1])
	} else if (/^[ \n\t]*(else){0,1}[ \n\t]*if[ \n\t]*\((.*)\)[ \n\t]*\{[ \n\t]*$/.test(t)) {
		e = t.match(/^[ \n\t]*(else){0,1}[ \n\t]*if[ \n\t]*\((.*)\)[ \n\t]*\{[ \n\t]*$/);
		if (d.atc = function(t, n, e) {
				d.ifs = !0, n[0] && (ev(t), d.prevt = !0), d.ifs = !0
			}, "else" == e[1])
			if (d.ifs || error("SyntaxError", "Elseif without if statement before."), d.prevt) var h = !1;
			else h = typeify(e[2]).dt;
		else h = typeify(e[2]).dt;
		d.atcd = [h], d.atcc = 1
	} else if (/^[ \n\t]*else[ \n\t]*\{[ \n\t]*/.test(t)) {
		e = t.match(/^[ \n\t]*else[ \n\t]*\{[ \n\t]*/);
		d.ifs || error("SyntaxError", "Else without if statement before."), d.prevt ? (d.atc = function(t, n, e) {}, d.atcd = [], d.atcc = 1) : (d.atc = function(t, n, e) {
			d.ifs = !1, ev(t), d.prevt = !1
		}, d.atcd = [], d.atcc = 1)
	} else if (/^[ \n\t]*class[ \n\t]+([^\n ]+)[ \n\t]*\([^\n ]+\)[ \n\t]*\{$/.test(t)) {
		e = t.match(/^[ \n\t]*class[ \n\t]+([^\n ]+)[ \n\t]*\([^\n ]+\)[ \n\t]*\{$/);
		d.atc = function(t, n, e) {
			for (y in i = rep(vars), vars) null == vars[y].headers && error("", ""), vars[y].headers.ZH = 1;
			for (y in d.class = !0, ev(t), d.class = !1, vd = {}, vars) 1 != vars[y].headers.ZH && (vars[y].headers.ZH = 0, vd[y] = vars[y]);
			vars = i, cvar(n[0][1], "class", `<class ${n[0][1]} class>`, {
				rd: rep(vd)
			}, !0)
		}, d.atcd = [e], d.atcc += 1
	} else if (/^[ \n\t]*while[ \n\t]*\(([^]*)\)[ \n\t]*\{[ \n\t]*$/.test(t)) {
		e = t.match(/^[ \n\t]*while[ \n\t]*\(([^]*)\)[ \n\t]*\{[ \n\t]*$/);
		d.atc = function(t, n, e) {
			for (var c = 1; c < 1e5 && typeify(n[0]).dt;) ev(t), c++
		}, d.atcd = [e[1]], d.atcc += 1
	} else if (/^[ \n\t]*for[ \n\t]*\(([^]*)\)[ \n\t]*\{[ \n\t]*$/.test(t)) {
		e = t.match(/^[ \n\t]*for[ \n\t]*\(([^]*)\)[ \n\t]*\{[ \n\t]*$/);
		d.atc = function(t, n, e) {
			if ("list" == n[1].type)
				for (var c of n[1].headers.ld) cvar(n[0], c.type, c.dt, c.headers), ev(t);
			else if ("map" == n[1].type)
				for (var c in n[1].headers.ld) cvar(n[0], "string", c, basehead), ev(t);
			else error("TypeError", `Cannot loop over non-iterable type "${n[1].type}".`)
		};
		var p = [e[1].match(/[ \n\t]*([^ ]+)[ \n\t]*\:[ \n\t]*([^ ]+)[ \n\t]*/)[1], typeify(e[1].match(/[ \n\t]*([^ ]+)[ \n\t]*\:[ \n\t]*([^ ]+)[ \n\t]*/)[2])];
		d.atcd = p, d.atcc += 1
	} else if (/^[ \n\t]*cnc[ \n\t]*([0-9]+)[ \n\t]*$/.test(t)) {
		e = t.match(/^[ \n\t]*cnc[ \n\t]*([0-9]+)[ \n\t]*$/);
		if (l = parseInt(e[1]), null != cnch[l]) var u = rep(cnch[l]);
		else u = [];
		if (2 == l) console.log(u[0].dt);
		else if (3 == l) console.error(u[0].dt);
		else if (4 == l) alert(u[0].dt);
		else if (5 == l) error(u[0].dt, u[1].dt);
		else if (6 == l) {
			if ("string" == u[0].type) "" == (y = u[0].dt.charAt(parseInt(u[1].dt))) && error("KeyError", "No such key."), cvar("dat", "string", y, {});
			else if ("list" == u[0].type) {
				cvar("dat", (y = u[0].headers.ld[parseInt(u[1].dt)]).type, y.dt, basehead)
			} else if ("map" == u[0].type) {
				var y, v = u[1].dt;
				cvar("dat", (y = u[0].headers.ld[v]).type, y.dt, basehead)
			} else error("TypeError", "Type is not available for @defaults.item.")
		} else if (7 == l)
			if ("map" == u[0].type) {
				var m = u[0].headers.ld;
				m[u[1].dt] = u[2];
				var g = u[0].headers;
				g.ld = m, cvar("dat", "map", u[0].dt, g)
			} else error("TypeError", "Cannot Set item of unknown type.");
		else if (8 == l) dtdt = typeify("`" + document.title.toString() + "`"), cvar("dat", "string", dtdt.dt, dtdt.headers);
		else if (9 == l) dtdt = typeify("`" + document.documentElement.innerHTML + "`"), cvar("dat", "string", dtdt.dt, dtdt.headers);
		else if (10 == l) {
			if ("id" == u[0].dt) var $ = document.getElementById(u[1].dt);
			else $ = document.querySelector(u[1].dt);
			"innerHTML" == u[2].dt ? cvar("dat", "string", $.innerHTML, basehead) : cvar("dat", "string", $.getAttribute(u[2].dt), basehead)
		} else if (11 == l) {
			if ("id" == u[0].dt) $ = document.getElementById(u[1].dt);
			else $ = document.querySelector(u[1].dt);
			"innerHTML" == u[2].dt ? ($.innerHTML = u[3].dt, cvar("dat", "string", $.innerHTML, basehead)) : $.setAttribute(u[2].dt, u[3].dt)
		} else if (12 == l) {
			var b = document.createElement(u[0].dt);
			if ("id" == u[1].dt) $ = document.getElementById(u[2].dt);
			else $ = document.querySelector(u[2].dt);
			"id" == u[3].dt ? b.id = u[4].dt : b.setAttribute(u[3].dt, u[4].dt), $.appendChild(b)
		} else if (13 == l) cvar("dat", "string", u[0].type, basehead);
		else if (14 == l) cvar("dat", "string", u[0].dt + u[1].dt, basehead);
		else if (15 == l) document.cookie = `${u[0].dt}=${u[1].dt}; expires=${u[2].dt}; path=${u[3].dt};`;
		else if (16 == l) cvar("dat", "string", getCookie(u[0].dt), basehead);
		else if (17 == l) {
			const t = new Date;
			if ("sec" == u[0].dt) var E = "int",
				M = t.getSeconds();
			else if ("min" == u[0].dt) E = "int", M = t.getMinutes();
			else if ("hr" == u[0].dt) E = "int", M = t.getHours();
			else if ("mon" == u[0].dt) E = "int", M = t.getMonth() + 1;
			else if ("monn" == u[0].dt) E = "string", M = (p = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"])[t.getMonth()];
			else if ("date" == u[0].dt) E = "int", M = t.getDate();
			else if ("year" == u[0].dt) E = "int", M = t.getFullYear();
			cvar("dat", E, M, basehead)
		}
		cnch[l] = []
	} else if (/^[ \n\t]*cnch[ \n\t]*([0-9]+)[ \n\t]+([^]+)[ \n\t]*$/.test(t)) {
		e = t.match(/^[ \n\t]*cnch[ \n\t]*([0-9]+)[ \n\t]+([^]+)[ \n\t]*$/);
		l = parseInt(e[1]), void 0 === cnch[l] && (cnch[l] = []), cnch[l].push(typeify(e[2]))
	} else if (/^[ \n\t]*getvars[ \n\t]*$/.test(t)) console.log(vars);
	else if (t.includes(".")) {
		var x = rep(typeify(t.split(".")[0])),
			A = 0;
		i = rep(vars);
		for (s of t.split(".")) A == t.split(".").length - 1 && (d.retd = x[s]), x = 0 == A ? x.headers.rd : x[s].headers.rd, A += 1
	} else null != vars[t.replace(/[ \n\t]*/g, "")] ? d.retd = vars[t.replace(/[ \n\t]*/g, "")] : typeify(t, !0)
}

function ev(t) {
	var n = (t = (t = (t = ap(t = (t = (t = htmlDecode(t)).replace(/[ \n\t]*\/#[^]*#\/[ \n\t]*/g, "")).replace(/\/\/[^\n]*/g, ""), ";")).replace(/[ \n\t]*\)[ \n\t]*{[ \n\t]*/g, "){;")).replace(/[ \n\t]*else[ \n\t]*{[ \n\t]*/g, "else{;")).split(/[ \n\t]*;[ \n\t]*/);
	t = replaceAll(t, "\\c", ";");
	var e = 1;
	for (line of n) {
		line = replaceAll(line, "\\c", ";"), fna = line.split("<"), line = rep(fna[0]), delete fna[0];
		e = 1;
		for (var c in fnh = rep(basehead), fnh.fn = {
				attrib: {},
				code: "",
				head: {}
			}, fna) {
			if (c = fna[c], fnh.fn.code = reverse(reverse(c).replace(">", "")), /^[ \n\t]*fnargs:([^]*):fnargs/.test(fnh.fn.code)) {
				var a = fnh.fn.code.match(/^[ \n\t]*fnargs:([^]*):fnargs/)[1];
				fnh.fn.attrib = argparse(a), fnh.fn.code = fnh.fn.code.replace(/^[ \n\t]*fnargs:([^]*):fnargs/, "")
			}
			cvar("@fn" + e, "funct", "<function anonymous function>", rep(fnh), !1, !0), e += 1
		}
		if (0 == d.atcc) {
			var r = rep(d.prevt),
				s = rep(d.ifs);
			for (evaluate(line), r && d.prevt && (d.prevt = !1), s && d.ifs && (d.ifs = !1), c = 1; c < e; c++) delete vars["@fn" + c]
		} else {
			for (item of line.split("")) "{" == item && (d.atcc += 1), "}" == item && (d.atcc -= 1);
			0 == d.atcc ? (d.atc(d.atcdat, d.atcd, line), d.atcdat = "", d.atct = [], d.atcc = 0, evaluate(line.replace(/[ \n\t]*}[ \n\t]*/, "", 1))) : d.atcdat += line + ";"
		}
	}
}
d.su = !0, ev('funct log(txt){\ncnch2 txt;\ncnc2;\n};\nfunct error(txt){\ncnch3 txt;\ncnc3;\n};\nfunct alert(txt){\ncnch4 txt;\ncnc4;\n};\nfunct throw(n,t){\ncnch5 n;\ncnch5 t;\ncnc5;\n};\nclass @defaults(static){\n\tfunct item(self,c){\n\tcnch6 self;\n\tcnch6 c;\n\tcnc6;\n\treturn dat;\n};\nfunct set(self,key,value){\n\tcnch7 self;\n\tcnch7 key;\n\tcnch7 value;\n\tcnc7;\n\treturn dat;\n};\nfunct type(self){\n\tcnch13 self;\n\tcnc13;\n\treturn dat;\n};\nfunct concat(self,string){\n\tcnch14 self;\n\tcnch14 string;\n\tcnc14;\n\treturn dat;\n};\n};\nclass @doc(static){\n\tfunct title(){\n\t\tcnc8;\n\t\treturn dat;\n\t};\n\tfunct HTML(){\n\t\tcnc9;\n\t\treturn dat;\n\t};\n\tfunct getElement(sel,retd="innerHTML",seltype="id"){\n\t\tcnch10 seltype;\n\t\tcnch10 sel;\n\t\tcnch10 retd;\n\t\tcnc10;\n\t\treturn dat;\n\t};\n\tfunct setElement(sel,value,it="innerHTML",seltype="id"){\n\t\tcnch11 seltype;\n\t\tcnch11 sel;\n\t\tcnch11 it;\n\t\tcnch11 value;\n\t\tcnc11;\n\t\treturn dat;\n\t};\n\tfunct createElement(type,tsel,sel,tseltype="id",seltype="id"){\n\t\tcnch12 type;\n\t\tcnch12 seltype;\n\t\tcnch12 sel;\n\t\tcnch12 tseltype;\n\t\tcnch12 tsel;\n\t\tcnc12;\n\t};\n};\nclass @cookie(static){\nfunct set(name,data,exp,path=\'/\'){\n\tcnch15 name;\n\tcnch15 data;\n\tcnch15 exp;\n\tcnch15 path;\n\tcnc15;\n};\nfunct get(name){\n\tcnch16 name;\n\tcnc16;\n\treturn dat;\n};\nfunct delete(name){\n\tcnch15 name;\n\tcnch15 "";\n\tcnch15 "Thu, 01 Jan 1970 00:00:00 UTC";\n\tcnch15 "/";\n\tcnc15;\n};\n};\nfunct log(txt){\ncnch2 txt;\ncnc2;\n};\nfunct error(txt){\ncnch3 txt;\ncnc3;\n};\nfunct alert(txt){\ncnch4 txt;\ncnc4;\n};\nfunct throw(n,t){\ncnch5 n;\ncnch5 t;\ncnc5;\n};\nclass @defaults(static){\n\tfunct item(self,c){\n\tcnch6 self;\n\tcnch6 c;\n\tcnc6;\n\treturn dat;\n};\nfunct set(self,key,value){\n\tcnch7 self;\n\tcnch7 key;\n\tcnch7 value;\n\tcnc7;\n\treturn dat;\n};\nfunct type(self){\n\tcnch13 self;\n\tcnc13;\n\treturn dat;\n};\nfunct concat(self,string){\n\tcnch14 self;\n\tcnch14 string;\n\tcnc14;\n\treturn dat;\n};\n};\nclass @doc(static){\n\tfunct title(){\n\t\tcnc8;\n\t\treturn dat;\n\t};\n\tfunct HTML(){\n\t\tcnc9;\n\t\treturn dat;\n\t};\n\tfunct getElement(sel,retd="innerHTML",seltype="id"){\n\t\tcnch10 seltype;\n\t\tcnch10 sel;\n\t\tcnch10 retd;\n\t\tcnc10;\n\t\treturn dat;\n\t};\n\tfunct setElement(sel,value,it="innerHTML",seltype="id"){\n\t\tcnch11 seltype;\n\t\tcnch11 sel;\n\t\tcnch11 it;\n\t\tcnch11 value;\n\t\tcnc11;\n\t\treturn dat;\n\t};\n\tfunct createElement(type,tsel,sel,tseltype="id",seltype="id"){\n\t\tcnch12 type;\n\t\tcnch12 seltype;\n\t\tcnch12 sel;\n\t\tcnch12 tseltype;\n\t\tcnch12 tsel;\n\t\tcnc12;\n\t};\n};\nclass @cookie(static){\nfunct set(name,data,exp,path=\'/\'){\n\tcnch15 name;\n\tcnch15 data;\n\tcnch15 exp;\n\tcnch15 path;\n\tcnc15;\n};\nfunct get(name){\n\tcnch16 name;\n\tcnc16;\n\treturn dat;\n};\nfunct delete(name){\n\tcnch15 name;\n\tcnch15 "";\n\tcnch15 "Thu, 01 Jan 1970 00:00:00 UTC";\n\tcnch15 "/";\n\tcnc15;\n};\n};\nclass @date(static){\n\tfunct sec(){\n\t\tcnch17 \'sec\';\n\t\tcnc17;\n\t\treturn dat;\n\t};\n\tfunct min(){\n\t\tcnch17 \'min\';\n\t\tcnc17;\n\t\treturn dat;\n\t};\n\tfunct hour24(){\n\t\tcnch17 \'hr\';\n\t\tcnc17;\n\t\treturn dat;\n\t};\n\tfunct hour(){\n\t\tcnch17 \'hr\';\n\t\tcnc17;\n\t\tvar ty = " AM";\n\t\tif(dat > 12){\n\t\t\tvar ty = " PM";\n\t\t\tvar dat = dat-12;\n\t\t};\n\t\treturn dat.concat(ty);\n\t};\n\tfunct timestr24(){\n\t\tcnch17 \'hr\';\n\t\tcnc17;\n\t\tvar s = dat;\n\t\tvar s = s.concat(":");\n\t\tcnch17 \'min\';\n\t\tcnc17;\n\t\tvar s = s.concat(dat);\n\t\tvar s = s.concat(":");\n\t\tcnch17 \'sec\';\n\t\tcnc17;\n\t\tvar s = s.concat(dat);\n\t\treturn s;\n\t};\n\tfunct timestr(){\n\t\tcnch17 \'hr\';\n\t\tcnc17;\n\t\tvar s = dat;\n\t\tvar ty = "AM";\n\t\tif(s > 12){\n\t\t\tvar ty = "PM";\n\t\t\tvar s = s-12;\n\t\t};\n\t\tvar s = s.concat(":");\n\t\tcnch17 \'min\';\n\t\tcnc17;\n\t\tvar s = s.concat(dat);\n\t\tvar s = s.concat(":");\n\t\tcnch17 \'sec\';\n\t\tcnc17;\n\t\tvar s = s.concat(dat);\n\t\tvar s = s.concat(" ");\n\t\tvar s = s.concat(ty);\n\t\treturn s;\n\t};\n\tfunct month(){\n\t\tcnch17 "mon";\n\t\tcnc17;\n\t\treturn dat;\n\t};\n\tfunct monthName(){\n\t\tcnch17 "monn";\n\t\tcnc17;\n\t\treturn dat;\n\t};\n\tfunct date(){\n\t\tcnch17 "date";\n\t\tcnc17;\n\t\treturn dat;\n\t};\n\tfunct year(){\n\t\tcnch17 "year";\n\t\tcnc17;\n\t\treturn dat;\n\t};\n\tfunct datestr(){\n\t\tcnch17 "mon";\n\t\tcnc17;\n\t\tvar s = dat;\n\t\tvar s = s.concat("/");\n\t\tcnch17 "date";\n\t\tcnc17;\n\t\tvar s = s.concat(dat);\n\t\tvar s = s.concat("/");\n\t\tcnch17 "year";\n\t\tcnc17;\n\t\tvar s = s.concat(dat);\n\t\treturn s;\n\t};\n\tfunct str(){\n\t\tcnch17 "mon";\n\t\tcnc17;\n\t\tvar s = dat;\n\t\tvar s = s.concat("/");\n\t\tcnch17 "date";\n\t\tcnc17;\n\t\tvar s = s.concat(dat);\n\t\tvar s = s.concat("/");\n\t\tcnch17 "year";\n\t\tcnc17;\n\t\tvar s = s.concat(dat);\n\t\tvar s = s.concat(" ");\n\t\tcnch17 \'hr\';\n\t\tcnc17;\n\t\tvar ty = "AM";\n\t\tif(dat > 12){\n\t\t\tvar ty = "PM";\n\t\t\tvar s = s.concat(dat-12);\n\t\t};\n\t\telse{\n\t\tvar s = s.concat(dat);\n\t\t}\n\t\tvar s = s.concat(":");\n\t\tcnch17 \'min\';\n\t\tcnc17;\n\t\tvar s = s.concat(dat);\n\t\tvar s = s.concat(":");\n\t\tcnch17 \'sec\';\n\t\tcnc17;\n\t\tvar s = s.concat(dat);\n\t\tvar s = s.concat(" ");\n\t\tvar s = s.concat(ty);\n\t\treturn s;\n\t};\n\tfunct str24(){\n\t\tcnch17 "mon";\n\t\tcnc17;\n\t\tvar s = dat;\n\t\tvar s = s.concat("/");\n\t\tcnch17 "date";\n\t\tcnc17;\n\t\tvar s = s.concat(dat);\n\t\tvar s = s.concat("/");\n\t\tcnch17 "year";\n\t\tcnc17;\n\t\tvar s = s.concat(dat);\n\t\tvar s = s.concat(" ");\n\t\tcnch17 \'hr\';\n\t\tcnc17;\n\t\tvar s = s.concat(dat);\n\t\tvar s = s.concat(":");\n\t\tcnch17 \'min\';\n\t\tcnc17;\n\t\tvar s = s.concat(dat);\n\t\tvar s = s.concat(":");\n\t\tcnch17 \'sec\';\n\t\tcnc17;\n\t\tvar s = s.concat(dat);\n\t\treturn s;\n\t};\n};'), d.su = !1, window.onload = function() {
	var t = [];
	document.querySelectorAll("ev, evolution").forEach((function(n) {
		if (n.style.display = "none", n.hasAttribute("src")) {
			const t = new XMLHttpRequest;
			var e = n.getAttribute("src");
			1 == e.split(".").length && (e = d.evurl + "lib/" + e), t.open("GET", e, !1), t.send(), n.innerHTML += t.responseText
		}
		t.push(n)
	}));
	var n = document.querySelectorAll("[ev-onclick]");
	for (var e of n) e.addEventListener("click", (function() {
		ev(this.getAttribute("ev-onclick"))
	}));
	t.forEach((function(t) {
		ev(t.innerHTML)
	}))
};