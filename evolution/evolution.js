var gvars = {};
var d = {'atc':function(){},'atcd':[],'atcc':0,'atcdat':'','retd':{"type":"null",'dt':'null','headers':{'null':'null'}},'funct':false,'class':'','evurl':'https://evolution-lang.greatusername.repl.co/evolution/','lc':false};
function rep(dt){ //Replicate JSON
return JSON.parse(JSON.stringify(dt));
}
var cnch = {};
var vars = rep(gvars);
function typeify(data){
	if(/^[ \n\t+]*'([^\']*)'[ \n\t+]*$/.test(data)){
		var dt = data.match(/[ \n\t+]*'([^]*)'[ \n\t+]*/);
		return {'type':'string','dt':dt[1],'headers':{}}
	}
	else if(/^[ \n\t+]*"([^\"]*)"[ \n\t+]*$/.test(data)){
		var dt = data.match(/[ \n\t+]*"([^]*)"[ \n\t+]*/);
		return {'type':'string','dt':dt[1],'headers':{}}
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
		return {'type':'string','dt':data,'headers':{}}
	}
	else if(/^[ \n\t+]*(true|false)[ \n\t+]*$/.test(data)){
		var dt = data.match(/^[ \n\t+]*(true|false)[ \n\t+]*$/);
		if (dt == 'true'){
			return {'type':'boolean','dt':true,'headers':{}}
		}
		else{
			return {'type':'boolean','dt':false,'headers':{}}
		}
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
		return d['retd'];
	}
}
function error(n,d){
	throw `${n}: ${d}`;
}
function cvar(n,type,dt,h={},global=false){
	gvars[n] = {'type':type,'dt':dt,'headers':h};
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
			window.gvars[data[0]] = data[1]
			window.gvars[data[0]]['headers']['fn']['code'] = dt;
			window.vars[data[0]] = data[1]
			window.vars[data[0]]['headers']['fn']['code'] = dt;
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
		d['atcd'] = [dt[1],{'type':'funct','dt':`<function ${dt[1]} function>`,'headers':{'fn':{'attrib':att,'code':'','head':{}}}}]
		d['atcc'] += 1;
	}
	else if(/^[ \n\t+]*([^( ]+)[ \n\t+]*\(([^]*)\)[ \n\t+]*$/.test(line)){
		var dt = line.match(/^[ \n\t+]*([^( ]+)[ \n\t+]*\(([^]*)\)[ \n\t+]*$/);
		var nvar = gvars;
		var attl = [];
		for (item of dt[2].split(/[ \n\t+]*,[ \n\t+]*/)){
		item = item.replace('\\comma',',')
		if (item != ''){
			item = typeify(item)
			attl.push(item)
		}
		}
		var cnt = 0;
		for(i in vars[dt[1]]['headers']['fn']['attrib']){
			var n = vars[dt[1]]['headers']['fn']['attrib'][i];
			if(attl[cnt] == undefined){
				break
			}
			else{
		nvar[i] = attl[cnt];
		cnt += 1
			}
		}
		var item = vars[dt[1]];
		vars = {'@functname':dt[1]};
		vars = nvar;
		ev(item['headers']['fn']['code']);
	}
	else if (/^[ \n\t+]*var[ \n\t+]*([^\n ]+)[ \n\t+]*=[ \n\t+]*([^]+)[ \n\t+]*$/.test(line)){
		var dt = line.match(/[ \n\t+]*var[ \n\t+]*([^\n ]+)[ \n\t+]*=[ \n\t+]*([^]+)[ \n\t+]*/);
		var t = rep(typeify(rep(dt[2])));
		cvar(rep(dt[1]),t[0],t[1],t[2]);
	}
	else if (/^[ \n\t+]*return[ \n\t+]+([^\n ]*)[ \n\t+]*$/.test(line)){
		var dt = line.match(/^[ \n\t+]*return[ \n\t+]+([^\n ]*)[ \n\t+]*$/);
		d['retd'] = typeify(dt[1]);
	}
	else if (/^[ \n\t+]*js[ \n\t+]+([^]*)[ \n\t+]*$/.test(line)){
		var dt = line.match(/[ \n\t+]*js[ \n\t+]+([^]*)[ \n\t+]*/);
		eval.call(window,typeify(dt[1])['dt']);
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
		if (vars[line.replace(/[ \n\t+]*/g,'')] != null){
			d['retd'] = vars[line.replace(/[ \n\t+]*/g,'')];
		}
		else{
	if (d['lc']){
		return 'lc'
	}
	else{
	error('CommandError',`Unknown command: ${line}.`)
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
var dl = [];
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