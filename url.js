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
  $("#mensaje").hide();
    //servicio prueba
    //var url_prueba = "https://services6.arcgis.com/qHdoJI2FoNfsEzow/ArcGIS/rest/services/tabla_servicio_dash/FeatureServer/0";
    var url_prueba = "https://services5.arcgis.com/oAvs2fapEemUpOTy/arcgis/rest/services/FS_LyOper_LVGLP_v04/FeatureServer/0";

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
    var fcodprov = "CODPROVINCIA";
    var fcoddist = "UBIGEO";
    var fcodosinergmin = "CODIGO_DE_OSINERGMIN";

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
      var upper_dep = arrayParam[0].toString();
      var upper_prov = arrayParam[1].toString();
      var upper_dist = arrayParam[2].toString();
      
      if(upper_dist != ""){
        upper_dist = upper_dist.split('%20');
        var distrito = "";
        for (var i = 0; i < upper_dist.length; i++) {
          distrito = distrito + upper_dist[i] + " ";
        }
        var consulta = "UPPER_DIST = '"+distrito+"'";
        cargarDatos(consulta,distrito);
      }else if(upper_prov != ""){
        upper_prov = upper_prov.split('%20');
        var provincia = "";
        for (var i = 0; i < upper_prov.length; i++) {
          provincia = provincia + upper_prov[i] + " ";
        }
        var consulta = "UPPER_PROV = '"+provincia+"'";
        cargarDatos(consulta, provincia);
      }else if(upper_dep != ""){
        upper_dep = upper_dep.split('%20');
        var departamento = "";
        for (var i = 0; i < upper_dep.length; i++) {
          departamento = departamento + upper_dep[i] + " ";
        }
        var consulta = "UPPER_DEP = '"+departamento+"'";
        cargarDatos(consulta, departamento);
      }
    } 

    function cargarDatos(consulta, tipo){
        var sql = consulta;
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
            $("#mensaje").css('display', 'block');
            $("#mensaje").fadeOut(4000);
            $("#mensaje").show();
            $("#mensaje").hide(4000);
          }else{
            var registros = response.features;
            var tabla = $("#tbl_datos").html("");
            for (var i = 0; i < registros.length; i++) {
              var atributos = registros[i].attributes;
              var departamento = atributos[fnombdepart];
              var provincia = atributos[fnombprov];
              var distrito = atributos[fnombdist];
              var codOsinergmin = atributos[fcodosinergmin];
              var regHidroc = atributos[fregisthidroc];
              var rsocial = atributos[frsocial];
              var direccion = atributos[fdireccion];
              var actividad = atributos[factividad];
              console.log(departamento);
              console.log(registros);
              tabla.append(`<tr>
                              <td>${departamento}</td>
                              <td>${provincia}</td>
                              <td>${distrito}</td>
                              <td>${codOsinergmin}</td>
                              <td>${regHidroc}</td>
                              <td>${rsocial}</td>
                              <td>${direccion}</td>
                              <td>${actividad}</td>
                            </tr>`);
            }
            exportar(tipo);
          }
        });
    }

    function exportar(tipo){
      //exportacion de datos a excel
      var filename = 'export_'+tipo+'.xls';
      var $tbldatos = document.getElementById('tbl_exportar');
      Exporter.export($tbldatos, filename, 'Locales de venta LGVL');
      return false; 
    }

  })