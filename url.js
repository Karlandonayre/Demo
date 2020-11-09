$(document).ready(function(){
	let urlparams = window.location.search
	console.log(urlparams);
	_globalids = urlparams.substring(1);
	(_globalids==undefined || _globalids==' ') ? _globalids = "undefined": "";
	cargar(_globalids);

	function cargar(_globalids){
		console.log(parametros);
	}
});