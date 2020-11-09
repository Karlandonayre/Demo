$(document).ready(function(){
	let urlparams = window.location.search
	_globalids = urlparams.substring(3);
	(_globalids==undefined || _globalids==' ') ? _globalids = "undefined": "";
	cargar(_globalids);

	function cargar(_globalids){
		console.log(_globalids);
	}
});