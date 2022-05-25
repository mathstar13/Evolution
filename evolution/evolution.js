var gvars = {};
var d = {'atc':function(){},'atcd':[],'atcc':0,'atcdat':'','retd':{"type":"null",'dt':'null','headers':{'null':'null'}},'funct':false,'class':'','evurl':'https://evolution-lang.greatusername.repl.co/evolution/','lc':false};
function rep(dt){ //Replicate JSON
return JSON.parse(JSON.stringify(dt));
}
var cnch = {};
var vars = rep(gvars);
function typeify(data){
	var dat = {"type":"null","dt":"null","headers":{}};
	if(/^[ \n\t+]*'([^']*)'[ \n\t+]*$/.test(data)){
		var dt = data.match(/[ \n\t+]*'([^]*)'[ \n\t+]*/);
		dat = {'type':'string','dt':dt[1],'headers':{}}
	}
	else if(/^[ \n\t+]*"([^"]*)"[ \n\t+]*$/.test(data)){
		var dt = data.match(/[ \n\t+]*"([^]*)"[ \n\t+]*/);
		dat = {'type':'string','dt':dt[1],'headers':{}}
	}
	else if(/^[ \n\t+]*`([^`]*)`[ \n\t+]*$/.test(data)){
		var data = data.match(/[ \n\t+]*`([^`]*)`[ \n\t+]*/)[1];
		var dat = data.match(/\$\{([^}]*)\}/g);
		for (item of [...Array(dat.length).keys()]){
			var oretd = rep(d['retd']);
			ev(dat[item].match(/\$\{([^}]*)\}/)[1]);
			data = data.replace(dat[item],d['retd']['dt'],1);
			d['retd'] = rep(oretd);
		}
		dat = {'type':'string','dt':data,'headers':{}}
	}
	else if(/^[ \n\t+]*(true|false)[ \n\t+]*$/.test(data)){
		var dt = data.match(/^[ \n\t+]*(true|false)[ \n\t+]*$/);
		if (dt == 'true'){
			dat = {'type':'boolean','dt':true,'headers':{}}
		}
		else{
			dat = {'type':'boolean','dt':false,'headers':{}}
		}
	}
	else if(/^[ \n\t+]*([0-9]+)[ \n\t+]*$/.test(data)){
		var dt = data.match(/^[ \n\t+]*([0-9]+)[ \n\t+]*$/);
		var v = parseInt(dt);
		dat = {"type":"int","dt":v,"headers":{}}
	}
	else{
		/*if(data.replace(/[ \n\t+]/,'') in vars){
			return vars[data.replace(/[ \n\t+]/,'')];
		}
		else if(data.replace(/[ \n\t+]/,'') in gvars){
			return gvars[data.replace(/[ \n\t+]/,'')];
		}
		else{
		error('VarError',`Unknown var: ${data}.`)
		}*/
		var oretd = rep(d['retd']);
		ev(data);
		dat = rep(d['retd']);
		d['retd'] = oretd;
	}
	if (dat["headers"]["rd"] == undefined){
		dat["headers"]["rd"] = {};
	}
	var defalts = {"type":{'type':"string","dt":dat["type"],"headers":{"rd":{}}},"item":{"type":"funct","dt":`<function @defalts.item function>`,"headers":{"fn":{"attrib":{"c":"null"},"code":"cnch6 @self;cnch6 c;cnc6;return dat;","head":{}}}}}
	for (item in defalts){
		if (!item in dat["headers"]["rd"]){
			dat["headers"]["rd"][item] = defalts[item];
		}
	}
	return dat;
}
function error(n,d){
	throw `${n}: ${d}`;
}
function cvar(n,type,dt,h={},global=false){
	vars[n] = {'type':type,'dt':dt,'headers':h};
	if (global){
		gvars[n] = {'type':type,'dt':dt,'headers':h};
	}
	return true;
}
function callfunct(funct,attrib={}){
	var fnatt = funct['headers']['fn']['attrib']
	var nvar = gvar;
	var cnt = 0;
	var attl = [];
	for (item in fnatt){
		attl.push(item);
	}
	/*
	for (item in attrib){
		if (typeof(item) != 'number'){
			nvar[item] = attrib[item];
		}
		else{
			nvar[fnatt[cnt] = attrib[];
		}
	}*/
}
function evaluate(line){
	if(/^([ \n\t+]*)$/.test(line)){
		
	}
	else if(/^[ \n\t+]*funct[ \n\t+]+([^\n ]+)[ \n\t+]*\(([^]*)\)[ \n\t+]*\{$/.test(line)){
		d['atc'] = function(dt,data,tr){
			cvar(data[0],"funct",`<function ${data[0]} function>`,{'fn':{'attrib':data[1],'code':dt,'head':{}}},true)
		}
		var dt = line.match(/[ \n\t+]*funct[ \n\t+]+([^\n ]+)[ \n\t+]*\(([^]*)\)[ \n\t+]*\{$/);
		var att = {};
		for(item of dt[2].split(/[ \n\t+]*,[ \n\t+]*/)){
			if (item.split(/[ \n\t+]*=[ \n\t+]*/).length != 1){
				att[item.split(/[ \n\t+]*=[ \n\t+]*/)[0]] = item.split(/[ \n\t+]*=[ \n\t+]*/)[1]
			}
			else{
				att[item] = 'null'
			}
		}
		d['atcd'] = [dt[1],att]
		d['atcc'] += 1;
	}
	else if(/^[ \n\t+]*([^( ]+)[ \n\t+]*\(([^]*)\)[ \n\t+]*$/.test(line)){
		var dt = line.match(/^[ \n\t+]*([^( ]+)[ \n\t+]*\(([^]*)\)[ \n\t+]*$/);
		var nvar = gvars;
		var attl = [];
		for (item of dt[2].replace("\\,","\\comma").split(/[ \n\t+]*,[ \n\t+]*/)){
		item = item.replace('\\comma',',')
		if (item != ''){
			item = typeify(item);
			attl.push(item)
		}
		}
		var cnt = 0;
		var item = rep(typeify(dt[1]));
		for(i in item['headers']['fn']['attrib']){
			var n = item['headers']['fn']['attrib'][i];
			if(attl[cnt] == undefined){
				break
			}
			else{
		nvar[i] = attl[cnt];
		cnt += 1
			}
		}
		var ov = vars;
		if(dt[1].split(".").length > 1){
		nvar["@self"] = rep(typeify(dt[1].split(".")[dt[1].split(".").length - 2]));
		}
		vars = nvar;
		cvar("@functname","string",dt[1],{});
		ev(item['headers']['fn']['code']);
		vars = ov;
	}
	else if (/^[ \n\t+]*var[ \n\t+]*([^\n ]+)[ \n\t+]*=[ \n\t+]*([^]+)[ \n\t+]*$/.test(line)){
		var dt = line.match(/[ \n\t+]*var[ \n\t+]*([^\n ]+)[ \n\t+]*=[ \n\t+]*([^]+)[ \n\t+]*/);
		var t = rep(typeify(rep(dt[2])));
		cvar(rep(dt[1]),t["type"],t["dt"],t["headers"]);
	}
	else if (/^[ \n\t+]*return[ \n\t+]+([^\n ]*)[ \n\t+]*$/.test(line)){
		var dt = line.match(/^[ \n\t+]*return[ \n\t+]+([^\n ]*)[ \n\t+]*$/);
		d['retd'] = typeify(dt[1]);
	}
	else if (/^[ \n\t+]*class[ \n\t+]+([^\n ]+)[ \n\t+]*\([^\n ]+\)[ \n\t+]*\{$/.test(line)){
		var dt = line.match(/^[ \n\t+]*class[ \n\t+]+([^\n ]+)[ \n\t+]*\([^\n ]+\)[ \n\t+]*\{$/);
		d['atc'] = function(dt,data,tr){
			ov = rep(vars);
			for (v in vars){
				if(vars[v]['headers'] == undefined){
					error("","")
				}
				vars[v]['headers']["ZH"] = 1;
			}
			ev(dt);
			vd = {};
			for (v in vars){
				if(vars[v]['headers']["ZH"] != 1){
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
			cvar(data[0][1],"class",`<class ${data[0][1]} class>`,{"rd":rep(vd)},true);
		}
		d['atcd'] = [dt]
		d['atcc'] += 1;
	}
	else if (/^[ \n\t+]*cnc[ \n\t+]*([0-9]+)[ \n\t+]*$/.test(line)){
		var dt = line.match(/^[ \n\t+]*cnc[ \n\t+]*([0-9]+)[ \n\t+]*$/);
		n = parseInt(dt[1]);
		var dat = rep(cnch[n]);
		if (n == 2){
			console.log(dat[0]['dt']);
		}
		else if (n == 3){
			console.error(dat[0]['dt']);
		}
		else if (n == 4){
			alert(dat[0]['dt']);
		}
		else if(n == 5){
			error(dat[0]['dt'],dat[1]['dt']);
		}
		else if(n == 6){
			if(dat[0]["type"] == "string"){
				var v = dat[0]["dt"].charAt(parseInt(dat[1]["dt"]));
				if (v == ""){
					error("KeyError","No such key.")
				}
				cvar("dat","string",v,{})
			}
			else{
				error("TypeError","Type is not available for @defalts.item.")
			}
		}
		cnch[n] = [];
	}
	else if (/^[ \n\t+]*cnch[ \n\t+]*([0-9]+)[ \n\t+]+([^]+)[ \n\t+]*$/.test(line)){
		var dt = line.match(/^[ \n\t+]*cnch[ \n\t+]*([0-9]+)[ \n\t+]+([^]+)[ \n\t+]*$/);
		n = parseInt(dt[1]);
		if(typeof cnch[n] == 'undefined'){
			cnch[n] = [];
		}
		cnch[n].push(typeify(dt[2]));
	}
	else{
		if (line.includes('.')){
			var ind = rep(typeify(line.split(".")[0]));
			var c = 0;
			var ov = rep(vars);
			for(item of line.split(".")){
				if (c == line.split(".").length-1){
					d['retd'] = ind[item];
				}
				if (c == 0){
				ind = ind["headers"]["rd"];
				}
				else{
					ind = ind[item]["headers"]["rd"];
				}
				c += 1;
			}
		}
		else if (vars[line.replace(/[ \n\t+]*/g,'')] != undefined){
			d['retd'] = vars[line.replace(/[ \n\t+]*/g,'')];
		}
		else{
	if (d['lc']){
		return 'lc'
	}
	else{
	error('CommandError',`Unknown command: ${line}.`);
	}
		}
	}
}
function ev(code){
	code = code.replace(/[ \n\t+]*\/#[^]*#\/[ \n\t+]*/g,'');
	code = code.replace(/\/\/[^\n]*/g,'')
	code = code.replace(/[ \n\t+]*\)[ \n\t+]*{[ \n\t+]*/g,'){;');
	var cd = code.split(/[ \n\t+]*;[ \n\t+]*/);
	var cnt = 1;
	for (line of cd){
		if (d['atcc'] == 0){
			evaluate(line)
	}
	else{
		for (item of line.split('')){
			if (item == '{'){
				d['atcc'] += 1;
			}
			if(item == '}'){
				d['atcc'] -= 1;
			}
		}
		if (d['atcc'] == 0){
				d['atc'](d['atcdat'],d['atcd'],line);
				d['atcdat'] = ''
				d['atct'] = []
				d['atcc'] = 0
				evaluate(line.replace(/[ +\n\t]*}[ +\n\t]*/,'',1));
		}
		else{
		d['atcdat'] += line+';'
		}
	}
	}
}
window.onload = function(){
var dl = [];
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
class @defalts(static){
	funct item(self,c){
	cnch6 self;
	cnch6 c;
	cnc6;
	return dat;
};
};`);
document.querySelectorAll('ev, evolution').forEach(function(item){
	item.style.display = 'none';
	if (item.hasAttribute('src')){
		const xhttp = new XMLHttpRequest();
		var s = item.getAttribute('src');
		if (s.split('.').length == 1){
			s = d['evurl']+'lib/'+s;
		}
  xhttp.open("GET",s,false);
  xhttp.send();
  item.innerHTML += xhttp.responseText;
	}
	dl.push(item);
});
dl.forEach(function(item){
	ev(item.innerHTML);
});
}