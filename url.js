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
    var url_prueba = "https://services6.arcgis.com/qHdoJI2FoNfsEzow/ArcGIS/rest/services/tabla_servicio_dash/FeatureServer/0";
    //Fields
    var fobjectid = "OBJECTID_";
    var fregisthidroc = "REGISTRO_DE_HIDORCARBUROS_";
    var frsocial = "RAZON_SOCIAL_";
    var fnombdepart = "DEPARTAMENTO_";
    var fnombprov = "PROVINCIA_";
    var fnombdist = "DISTRITO_";
    var fdireccion = "DIRECCION_";
    var factividad = "ACTIVIDAD_";
    var fcoddepart = "CODDEPARTAMENTO_";
    var fcodprov = "CODDPROVINCIA_";
    var fcoddist = "UBIGEO_";

    $("#btn_export").on('click', function(){
      let urlparams = window.location.search
      _params_url = urlparams.substring(1);
      (_params_url==undefined || _params_url==' ') ? _params_url = "undefined": "";
      cargar(_params_url);   
    });

    function cargar(_params_url){
      var parametros = _params_url.split('&');
      arrayParam = [];
      for (var i = 0; i < parametros.length; i++) {
        parametro = parametros[i].split('=')[1];
        arrayParam.push(parametro);
      }
      var coddepart = arrayParam[0].toString();
      var codprov = arrayParam[1].toString();
      var coddist = arrayParam[2].toString();
      
      console.log("departamento = ", coddepart,"provincia = " ,codprov, "distrito = " , coddist); 
      if(coddist != ""){
        porDistrito(coddist);
      }else if(codprov != ""){
        porProvincia(codprov);
      }else if(coddepart != ""){
        porDepartamento(coddepart);
      }
    } 

    function porDepartamento(coddepart){
        var sql = "CODDEPARTAMENTO_ = "+coddepart;
        console.log(sql);
        var query = new QueryTask({url:url_prueba});
        var params = new Query;
        params.returnGeometry = false;
        params.outFields = ["*"];
        params.where = sql;
        query.execute(params).then(function(response){
          console.log(response);
          if(response.features.length === 0){
            console.log("sin registros");
          }else{
            var registros = response.features;
            var tabla = $("#tbl_datos").html("");
            for (var i = 0; i < registros.length; i++) {
              var atributos = registros[i].attributes;
              var departamento = atributos[fnombdepart];
              var provincia = atributos[fnombprov];
              var distrito = atributos[fnombdist];
              var rsocial = atributos[frsocial];
              var actividad = atributos[factividad];
              console.log(departamento);

              tabla.append(`<tr>
                              <td>${departamento}</td>
                              <td>${provincia}</td>
                              <td>${distrito}</td>
                              <td>${rsocial}</td>
                              <td>${actividad}</td>
                            </tr>`);
            }
            console.log(tabla);
            exportar();
          }
        });
    }

    function exportar(){
      //exportacion de datos a excel
      var prueba = "prueba";
      var filename = 'export_'+prueba+'.xls';
      var $tbldatos = document.getElementById('tbl_exportar');
      Exporter.export($tbldatos, filename, 'Prueba');
      return false; 
    }

  })