$(document).ready(function(){
	let urlparams = window.location.search
	console.log(urlparams);
	_departamento = urlparams.substring(1);
	(_departamento==undefined || _departamento==' ') ? _departamento = "undefined": "";
	cargar(_departamento);

	function cargar(_departamento){
		console.log(_departamento);
	}
});