require(
  [
    "esri/identity/IdentityManager",
    "esri/core/urlUtils",
    "esri/layers/FeatureLayer",
    "esri/tasks/QueryTask",
    "esri/tasks/support/Query",
    "esri/core/watchUtils",
    "dojo/_base/array",  
          
    "dojo/domReady!"
  ],
  function(
    IdentityManager,
    urlUtils, 
    FeatureLayer,
    QueryTask,
    Query,
    watchUtils,
    array
  ){
  	//servicio
  	var url_prueba = "https://services6.arcgis.com/qHdoJI2FoNfsEzow/arcgis/rest/services/tabla_servicio_dash/FeatureServer";
  	//Fields
  	var fobjectid = "OBJECTID";
  	var fregisthidroc = "REGISTRO_DE_HIDORCARBUROS";
  	var frsocial = "RAZON_SOCIAL";
  	var fnombdepart = "DEPARTAMENTO";
  	var fnombprov = "PROVINCIA";
  	var fnombdist = "DISTRITO";
  	var fdireccion = "DIRECCION";
  	var factividad = "ACTIVIDAD";
  	var fcoddepart = "CODDEPARTAMENTO";
  	var fcodprov = "CODDPROVINCIA";
  	var fcoddist = "UBIGEO";

  	$("#btn_export").on('click', function(){
		let urlparams = window.location.search
		_params = urlparams.substring(1);
		(_params==undefined || _params==' ') ? _params = "undefined": "";
		cargar(_params);

		function cargar(_params){
			var parametros = _params.split('&')
			console.log(parametros);
			arrayParam = [];
			for (var i = 0; i < parametros.length; i++) {
				param = parametros[i].split('=')[1];
				arrayParam.push(param);
			}
			coddepart = arrayParam[1];
			codprov = arrayParam[2];
			coddist = arrayParam[3];
			console.log(arrayParam);
			console.log(coddepart, codprov, coddist);

		}		
	});


  })





