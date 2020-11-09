$(document).ready(function(){
	let urlparams = window.location.search
	_globalids = urlparams.substring(1);
	(_globalids==undefined || _globalids=='')
	cargar(_globalids);

	function cargar(_globalids){
		console.log(_globalids);
	}
});