
$("#btn_export").on('click', function(){
	let urlparams = window.location.search
	_globalids = urlparams.substring(1);
	(_globalids==undefined || _globalids==' ') ? _globalids = "undefined": "";
	cargar(_globalids);

	function cargar(_globalids){
		console.log(_globalids);
	}
	
});