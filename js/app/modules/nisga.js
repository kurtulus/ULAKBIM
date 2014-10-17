// Nisga'a Tribe jQuery UI elements for Client Side
// Triggers Framework events and client events
'use strict';

// lindneo namespace
window.lindneo = window.lindneo || {};

// nisga module
window.lindneo.nisga = (function(window, $, undefined){

  var page_div_selector = '#current_page';
  var revision_array = {
                revisions: []
            };
  var comment_id_array = new Array();
  var array_revisions=[];
  var revision_id=0;
  var revision_value = 0;

  

  var ChatNewLine = function ( line,activeUser,show ){
    if (show !== false)
      $(".chat_window" ).show();
    var lineHtml = $('<div class="chat_sent_message_holder " style ="border-left: 10px solid '+activeUser.color+';"> \
      <div class="chat_sent_message_user_name">'+activeUser.name+'</div> \
      <div class="chat_sent_message_text">'+line.replace(/\n/g, '<br />')+'</div> \
    </div>');
    $('.chat_sent_messages').append(lineHtml);
    $(".chat_sent_messages").animate({ scrollTop: $('.chat_sent_messages')[0].scrollHeight}, 100);
    

  }

 


  var createComponent = function( component, oldcomponent_id ){
      ////console.log(revision_value);
    //console.log(component);
    ////console.log(revision_array);
    /*
    $.each(revision_array.revisions, function(index,value){ 
        if (value.component_id == oldcomponent_id ){
            revision_array.revisions[index].component_id = component.id;
            revision_array.revisions[index].component.id = component.id;
          }
    });
    */
    ////console.log(revision_array);
    componentBuilder( component );  
    /*
    if(revision_value==0){
      if(typeof oldcomponent_id == 'undefined')  {
        revision_array.revisions.push({component_id: component.id, component: component, revision_date: $.now(), even_type: 'CREATE'});
        revision_id++;
      }
    }
    else revision_value=0;
    */
    //if(typeof oldcomponent_id != 'undefined') revision_array.revisions.pop();
    ////console.log(revision_array);
  };

  var componentBuilder = function( component ){
     //console.log(component.type);
    switch( component.type ) {
      case 'text':
        textComponentBuilder( component );
        break;
      case 'image':
        imageComponentBuilder( component );
        break;
      case 'galery':
        galeryComponentBuilder( component );

      break; 
      case 'sound':
        soundComponentBuilder( component );
      break; 

        break;
      case 'quiz':
        quizComponentBuilder( component );
        break;

      case 'mquiz':
        mquizComponentBuilder( component );
        break;

      case 'video':
        videoComponentBuilder( component );
        break;

      case 'popup':
        popupComponentBuilder( component );
        break;

      case 'grafik':
        graphComponentBuilder( component );
        break;

      case 'shape':
        shapeComponentBuilder( component );
        break;

      case 'link':
        linkComponentBuilder( component );
        break;

      case 'table':
        tableComponentBuilder( component );
        break;

      case 'html':
        htmlComponentBuilder( component );
        break;

      case 'wrap':
        wrapComponentBuilder( component );
        break;

      case 'latex':
        latexComponentBuilder( component );
        break;

      case 'slider':
        sliderComponentBuilder( component );
        break;

      case 'plink':
        plinkComponentBuilder( component );
        break;

      case 'tag':
        tagComponentBuilder( component );
        break;

      case 'thumb':
        thumbComponentBuilder( component );
        break;

      case 'rtext':
        rtextComponentBuilder( component );
        break;
      case 'page':
        pageComponentBuilder( component );
        break;
      case 'plumb':
        plumbComponentBuilder( component );
        break;

      case 'cquiz':
        cquizComponentBuilder( component );
        break;

      case 'puzzle':
        puzzleComponentBuilder( component );
        break;

      default:
         // what can I do sometimes
         break;
    }
    
  }; 

  var undoComponent = function() {
    console.log(revision_array.revisions);
    
      if(revision_id > 0){
        revision_id = revision_id - 1;
        ////console.log(revision_array.revisions);
        //console.log(revision_id);
        //console.log(revision_array.revisions[revision_id].even_type);
        ////console.log(revision_array.revisions);

        if(revision_array.revisions[revision_id].even_type=='CREATE'){
          if(revision_array.revisions[revision_id].component.type=='image'){
            ////console.log(revision_id);
            window.lindneo.tlingit.componentHasDeleted(revision_array.revisions[revision_id].component, revision_array.revisions[revision_id].component.id);
            window.lindneo.tlingit.componentHasCreated(revision_array.revisions[revision_id-1].component, revision_array.revisions[revision_id-1].component.id);
          }
          else{
          window.lindneo.tlingit.componentHasDeleted(revision_array.revisions[revision_id].component, revision_array.revisions[revision_id].component.id);
          }
          
        }
        else if(revision_array.revisions[revision_id].even_type=='UPDATE'){
          //console.log(revision_array.revisions[revision_id].component.data.textarea.val);
          
          var array_where = [];
          $.each(revision_array.revisions, function(index,value){ 
            ////console.log(value.component_id + ' ----- ' +revision_array.revisions[revision_id].component_id);
              if (value.component_id == revision_array.revisions[revision_id].component_id && index<=revision_id)
                  array_where.push(value);
          });

         array_where.pop();
         ////console.log(array_where);
         ////console.log(array_where[array_where.length-1].component);
         window.lindneo.tlingit.componentHasDeleted(array_where[array_where.length-1].component, array_where[array_where.length-1].component.id);
         window.lindneo.tlingit.createComponent(array_where[array_where.length-1].component, array_where[array_where.length-1].component.id);

        }
        else if(revision_array.revisions[revision_id].even_type=='DELETE'){
          //console.log(revision_array.revisions[revision_id].component);
         window.lindneo.tlingit.createComponent(revision_array.revisions[revision_id].component, revision_array.revisions[revision_id].component.id);
        }
      }
    }
    
    var redoComponent = function() {
      if(revision_id < revision_array.revisions.length){
        //console.log(revision_array.revisions);
        //console.log(revision_id);
        //console.log(revision_array.revisions[revision_id].even_type);
        ////console.log(revision_array.revisions);

        if(revision_array.revisions[revision_id].even_type == 'CREATE'){
          ////console.log(revision_id);
          window.lindneo.tlingit.createComponent(revision_array.revisions[revision_id].component, revision_array.revisions[revision_id].component.id);
        }
        else if(revision_array.revisions[revision_id].even_type=='UPDATE'){

          var array_where = [];
          $.each(revision_array.revisions, function(index,value){ 
            ////console.log(value.component_id + ' ----- ' +revision_array.revisions[revision_id].component_id);
              if (value.component_id == revision_array.revisions[revision_id].component_id && index>=revision_id)
                  array_where.push(value);
          });

         //array_where.pop();
         ////console.log(array_where);
         ////console.log(array_where[0].component);
         window.lindneo.tlingit.componentHasDeleted(array_where[0].component, array_where[0].component.id);
         window.lindneo.tlingit.createComponent(array_where[0].component, array_where[0].component.id);
          
        }
        else if(revision_array.revisions[revision_id].even_type=='DELETE'){
          window.lindneo.tlingit.componentHasDeleted(revision_array.revisions[revision_id].component, revision_array.revisions[revision_id].component.id);
        }
        revision_id++;
      }
   }

  var destroyComponent = function ( component, oldcomponent_id ) {
    //console.log(oldcomponent_id);
    if(revision_value==0){
        if(typeof oldcomponent_id == 'undefined')  {
          revision_array.revisions.push({component_id: component.id, component: component, revision_date: $.now(), even_type: 'DELETE'});
          revision_id++;
          //console.log(revision_array.revisions); 
        }
      }
      else revision_value=0;   
  };

  var destroyByIdComponent = function ( componentID ) {
  //console.log(componentID);
    $('[id="'+componentID+'"]').parent().not('#current_page').remove();
    $('[id="'+componentID+'"]').remove();
    window.lindneo.toolbox.removeComponentFromSelection( $('#'+ componentID) );
  };
  
  var ComponentDelete = function ( component ) {
    if(revision_value==0){
        revision_array.revisions.push({component_id: component.id, component: component, revision_date: $.now(), even_type: 'DELETE'});
        revision_id++;
        //console.log(revision_array.revisions); 
      }
      else revision_value=0;
    //console.log(componentId);
    $('[id="'+component.id+'"]').parent().not('#current_page').remove();
    $('[id="'+component.id+'"]').remove();
  };

  var deleteComponent = function ( component, oldcomponent_id ) {
      if(revision_value==0){
        if(typeof oldcomponent_id == 'undefined')  {
          revision_array.revisions.push({component_id: component.id, component: component, revision_date: $.now(), even_type: 'DELETE'});
          revision_id++;
        }
      }
      else revision_value=0;
      var delete_component_id = "";
    if(component.id) delete_component_id = component.id;
    else delete_component_id = oldcomponent_id;
//        //console.log(revision_array);
    window.lindneo.toolbox.removeComponentFromSelection( $('#'+ component.id) );
    window.lindneo.tlingit.componentHasDeleted( component.id );

  };


  var shapeComponentBuilder = function( component ) {
    
    var element  = $('<canvas> </canvas>');
    var elementWrap=$('<div title="'+j__("Şekil Aracı")+'"></div>');
    elementWrap.appendTo( page_div_selector );

    element
    .appendTo( elementWrap )
    .shapeComponent({
      'component': component,
      'update': function ( event, component ) {
        if(revision_value==0){
        var newObject = jQuery.extend(true, {}, component);
        revision_array.revisions.push({component_id: component.id, component: newObject, revision_date: $.now(), even_type: 'UPDATE'});
                revision_id++;

      }
      else revision_value=0;
      ////console.log(revision_array);
        window.lindneo.tlingit.componentHasUpdated( component );        
      },
      'selected': function (event, element) {
        window.lindneo.currentComponentWidget = element;
        window.lindneo.toolbox.refresh( element );
      }
    });

  };

  var tableComponentBuilder = function( component ) {
   

    var element  = $('<div ></div>');
    var elementWrap=$('<div title="'+j__("Tablo Aracı")+'"></div>');
    elementWrap.appendTo( page_div_selector );

    element
    .appendTo( elementWrap )
    .tableComponent({
      'component': component,
      'update': function ( event, component ) {
        if(revision_value==0){
        var newObject = jQuery.extend(true, {}, component);
        revision_array.revisions.push({component_id: component.id, component: newObject, revision_date: $.now(), even_type: 'UPDATE'});
                revision_id++;

      }
      else revision_value=0;
      ////console.log(revision_array);
        window.lindneo.tlingit.componentHasUpdated( component );
      },
      'selected': function (event, element) {
        window.lindneo.currentComponentWidget = element;
        window.lindneo.toolbox.refresh( element );
      }
    });

  };
  var graphComponentBuilder = function( component ) {
    
    var element  = $('<canvas style="width:100%;height:100%;"> </canvas>');
    //var elementWrap=$('<div title="'+j__("Grafik Aracı")+'"></div>');
    //elementWrap.appendTo( page_div_selector );

    element
    .appendTo( page_div_selector )
    .graphComponent({
      'component': component,
      'update': function ( event, component ) {
        if(revision_value==0){
        var newObject = jQuery.extend(true, {}, component);
        revision_array.revisions.push({component_id: component.id, component: newObject, revision_date: $.now(), even_type: 'UPDATE'});
                revision_id++;

      }
      else revision_value=0;
      ////console.log(revision_array);
        window.lindneo.tlingit.componentHasUpdated( component );
      },
      'selected': function (event, element) {
        window.lindneo.currentComponentWidget = element;
        window.lindneo.toolbox.refresh( element );
      }
    });

  };
//
var textComponentBuilder = function( component ) {

    var element = $('<textarea title="'+j__("Yazı Aracı")+'"></textarea>'); 

    element
    .appendTo( page_div_selector )
    .textComponent({
      'component': component,
      'update': function ( event, component ) {  
        if(revision_value==0){
        var newObject = jQuery.extend(true, {}, component);
        revision_array.revisions.push({component_id: component.id, component: newObject, revision_date: $.now(), even_type: 'UPDATE'});
                revision_id++;

      }
      else revision_value=0;
      ////console.log(event);
      ////console.log(revision_array);
        window.lindneo.tlingit.componentHasUpdated( component );
        
      },
      'selected': function (event, element) {
        window.lindneo.currentComponentWidget = element;
        window.lindneo.toolbox.refresh( element );
      }
    });

  };

  var pageComponentBuilder = function( component ) {

    var element = $('<textarea class="page_number" title="'+j__("Sayfa Numara Aracı")+'"></textarea>'); 

    element
    .appendTo( page_div_selector )
    .pageComponent({
      'component': component,
      'update': function ( event, component ) {  
        if(revision_value==0){
        var newObject = jQuery.extend(true, {}, component);
        revision_array.revisions.push({component_id: component.id, component: newObject, revision_date: $.now(), even_type: 'UPDATE'});
                revision_id++;

      }
      else revision_value=0;
      ////console.log(event);
      ////console.log(revision_array);
        window.lindneo.tlingit.componentHasUpdated( component );
        
      },
      'selected': function (event, element) {
        window.lindneo.currentComponentWidget = element;
        window.lindneo.toolbox.refresh( element );
      }
    });

  };

  var linkComponentBuilder = function ( component ) {
    
    var link_element  = $('<div class="link-controllers" title="'+j__("Bağlantı Aracı")+'" style="width:100%; height:100%;"></div>');
    var element  = $('<a class="link-component"></a>');
    var elementWrap=$('<div ></div>');
    elementWrap.appendTo( page_div_selector );
    element.appendTo( link_element );

    link_element
    .appendTo( elementWrap )
    .linkComponent({
      'component': component,
      'marker': window.base_path+'/css/linkmarker.png'  ,
      'update': function ( event, component ) {
        if(revision_value==0){
        var newObject = jQuery.extend(true, {}, component);
        revision_array.revisions.push({component_id: component.id, component: newObject, revision_date: $.now(), even_type: 'UPDATE'});
                revision_id++;

      }
      else revision_value=0;
      ////console.log(revision_array);
        window.lindneo.tlingit.componentHasUpdated( component );
      },
      'selected': function (event, element) {
        window.lindneo.currentComponentWidget = element;
        window.lindneo.toolbox.refresh( element );
      }
    });

  };


  var popupComponentBuilder = function ( component ) {
    
    
    var element  = $('<div class="popup-controllers" style="width:100%; height:100%;"> </div>');
    var elementWrap=$('<div title='+j__("Açılır Pencere Aracı")+'"></div>');
    elementWrap.appendTo( page_div_selector );

    element
    .appendTo( elementWrap )
    .popupComponent({
      'component': component,
      'marker': window.base_path+'/css/popupmarker.png'  ,
      'update': function ( event, component ) {
        if(revision_value==0){
        var newObject = jQuery.extend(true, {}, component);
        revision_array.revisions.push({component_id: component.id, component: newObject, revision_date: $.now(), even_type: 'UPDATE'});
                revision_id++;

      }
      else revision_value=0;
      ////console.log(revision_array);
        window.lindneo.tlingit.componentHasUpdated( component );
      },
      'selected': function (event, element) {
        window.lindneo.currentComponentWidget = element;
        window.lindneo.toolbox.refresh( element );
      }
    });

  };

  var wrapComponentBuilder = function ( component ) {
    
    
    var element  = $('<div class="wrap-controllers" style="width:100%; height:100%; overflow:hidden;"> </div>');
    var elementWrap=$('<div  title="'+j__("Metinle Çevreleme Aracı")+'"></div>');
    elementWrap.appendTo( page_div_selector );

    element
    .appendTo( elementWrap )
    .wrapComponent({
      'component': component,
      'marker': window.base_path+'/css/popupmarker.png'  ,
      'update': function ( event, component ) {
        if(revision_value==0){
        var newObject = jQuery.extend(true, {}, component);
        revision_array.revisions.push({component_id: component.id, component: newObject, revision_date: $.now(), even_type: 'UPDATE'});
                revision_id++;

      }
      else revision_value=0;
      ////console.log(revision_array);
        window.lindneo.tlingit.componentHasUpdated( component );
      },
      'selected': function (event, element) {
        window.lindneo.currentComponentWidget = element;
        window.lindneo.toolbox.refresh( element );
      }
    });

  };

  var htmlComponentBuilder = function( component ) {

    var element  = $('<div class="html-controllers" style="width:100%; height:100%;"></div>');
    var elementWrap=$('<div title="'+j__("HTML Aracı")+'"></div>');
    elementWrap.appendTo( page_div_selector );
    //console.log(component);
    element
    .appendTo( elementWrap )
    .htmlComponent({
      'component': component,
      'update': function ( event, component ) {
        if(revision_value==0){
        var newObject = jQuery.extend(true, {}, component);
        revision_array.revisions.push({component_id: component.id, component: newObject, revision_date: $.now(), even_type: 'UPDATE'});
                revision_id++;

      }
      else revision_value=0;
      ////console.log(revision_array);
        window.lindneo.tlingit.componentHasUpdated( component );
      },
      'selected': function (event, element) {
        window.lindneo.currentComponentWidget = element;
        window.lindneo.toolbox.refresh( element );
      }
    });


  };

  var rtextComponentBuilder = function( component ) {

    var element  = $('<div class="rtext-controllers" style="width:100%; height:100%;" > </div>');
    var elementWrap=$('<div title="'+j__("Zengin Metin Aracı")+'"></div>');
    elementWrap.appendTo( page_div_selector );
    //console.log(component);
    element
    .appendTo( elementWrap )
    .rtextComponent({
      'component': component,
      'update': function ( event, component ) {
        if(revision_value==0){
        var newObject = jQuery.extend(true, {}, component);
        revision_array.revisions.push({component_id: component.id, component: newObject, revision_date: $.now(), even_type: 'UPDATE'});
                revision_id++;

      }
      else revision_value=0;
      ////console.log(revision_array);
        window.lindneo.tlingit.componentHasUpdated( component );
      },
      'selected': function (event, element) {
        window.lindneo.currentComponentWidget = element;
        window.lindneo.toolbox.refresh( element );
      }
    });


  };

  var plinkComponentBuilder = function( component ) {

    var element  = $('<div class="plink-controllers" style="width:100%; height:100%;"> </div>');
    var elementWrap=$('<div title="'+j__("Sayfa Bağlantı Aracı")+'"></div>');
    elementWrap.appendTo( page_div_selector );
    //console.log(component);
    element
    .appendTo( elementWrap )
    .plinkComponent({
      'component': component,
      'update': function ( event, component ) {
        if(revision_value==0){
        var newObject = jQuery.extend(true, {}, component);
        revision_array.revisions.push({component_id: component.id, component: newObject, revision_date: $.now(), even_type: 'UPDATE'});
                revision_id++;

      }
      else revision_value=0;
      ////console.log(revision_array);
        window.lindneo.tlingit.componentHasUpdated( component );
      },
      'selected': function (event, element) {
        window.lindneo.currentComponentWidget = element;
        window.lindneo.toolbox.refresh( element );
      }
    });


  };

  var latexComponentBuilder = function( component ) {

    var element  = $('<div class="latex-controllers" style="width:100%; height:100%;"> </div>');
    var elementWrap=$('<div title="'+j__("Latex Aracı")+'"></div>');
    elementWrap.appendTo( page_div_selector );

    element
    .appendTo( elementWrap )
    .latexComponent({
      'component': component,
      'update': function ( event, component ) {
        if(revision_value==0){
        var newObject = jQuery.extend(true, {}, component);
        revision_array.revisions.push({component_id: component.id, component: newObject, revision_date: $.now(), even_type: 'UPDATE'});
                revision_id++;

      }
      else revision_value=0;
      ////console.log(revision_array);
        window.lindneo.tlingit.componentHasUpdated( component );
      },
      'selected': function (event, element) {
        window.lindneo.currentComponentWidget = element;
        window.lindneo.toolbox.refresh( element );
      }
    });


  };



  var destroyChapter=function(chapter){
    $(".chapter[chapter_id='"+chapter+"']").remove();
  }; 

  var destroyPage = function(pageId){
    //console.log(pageId);
    
    $("li[page_id="+pageId+"]").remove();
  }; 


  
  var imageComponentBuilder = function ( component ) {
    
    //var element = $('<img></img>');

    var element  = $('<img>');
    var elementWrap=$('<div class="popup-controllers" title="'+j__("Resim Aracı")+'"></div>');
    elementWrap.appendTo( page_div_selector );
    //console.log(component.data.img.marker);
    element
    .appendTo( elementWrap )
    .imageComponent({
      'component': component,
      'marker': component.data.img.marker  ,
      'update': function ( event, component ) {
        if(revision_value==0){
        var newObject = jQuery.extend(true, {}, component);
        revision_array.revisions.push({component_id: component.id, component: newObject, revision_date: $.now(), even_type: 'UPDATE'});
                revision_id++;

      }
      else revision_value=0;
      ////console.log(revision_array);
        window.lindneo.tlingit.componentHasUpdated( component );
      },
      'selected': function (event, element) {
        //console.log($("#"+element.options.component.id).on('keydown', function(e) {}));
        

        $(document).keydown(function(e) {
          switch (e.which) {
          case 37:
              $("#"+element.options.component.id).stop().animate({
                  left: '-=10'
              }); //left arrow key
              break;
          case 38:
              $("#"+element.options.component.id).stop().animate({
                  top: '-=10'
              }); //up arrow key
              break;
          case 39:
              $("#"+element.options.component.id).stop().animate({
                  left: '+=10'
              }); //right arrow key
              break;
          case 40:
              $("#"+element.options.component.id).stop().animate({
                  top: '+=10'
              }); //bottom arrow key
              break;
          }
      });
        window.lindneo.currentComponentWidget = element;
        window.lindneo.toolbox.refresh( element );
      }
    });

  };

  var tagComponentBuilder = function ( component ) {
    
    //var element = $('<img></img>');

    var element  = $('<div class="popup-controllers"> </div>');
    var elementWrap=$('<div title="'+j__("Etiketleme Aracı")+'"></div>');
    elementWrap.appendTo( page_div_selector );
    ////console.log(component);
    element
    .appendTo( elementWrap )
    .tagComponent({
      'component': component,
      'update': function ( event, component ) {
        if(revision_value==0){
        var newObject = jQuery.extend(true, {}, component);
        revision_array.revisions.push({component_id: component.id, component: newObject, revision_date: $.now(), even_type: 'UPDATE'});
                revision_id++;

      }
      else revision_value=0;
      ////console.log(revision_array);
        window.lindneo.tlingit.componentHasUpdated( component );
      },
      'selected': function (event, element) {
        window.lindneo.currentComponentWidget = element;
        window.lindneo.toolbox.refresh( element );
      }
    });

  };

  var videoComponentBuilder = function ( component ) {
    
    var element  = $('<div class="video-controllers" style="width:100%; height:100%;"> </div>');
    var elementWrap=$('<div title="'+j__("Video Aracı")+'"></div>');
    elementWrap.appendTo( page_div_selector );
    ////console.log(component);
    element
    .appendTo( elementWrap )
    .videoComponent({
      'component': component,
      'marker': component.data.marker  ,
      'update': function ( event, component ) {
        if(revision_value==0){
        var newObject = jQuery.extend(true, {}, component);
        revision_array.revisions.push({component_id: component.id, component: newObject, revision_date: $.now(), even_type: 'UPDATE'});
                revision_id++;

      }
      else revision_value=0;
      ////console.log(revision_array);
        window.lindneo.tlingit.componentHasUpdated( component );
      },
      'selected': function (event, element) {
        window.lindneo.currentComponentWidget = element;
        window.lindneo.toolbox.refresh( element );
      }
    });

  };





  var soundComponentBuilder = function ( component ) {
    var element  = $('<div class="sound-controllers"> </div>');
    var elementWrap=$('<div title="'+j__("Ses Aracı")+'"></div>');
    elementWrap.appendTo( page_div_selector );
    console.log('Ses ARACI',component);
    element
    .appendTo( elementWrap )
    .soundComponent({
      'component': component,
      'update': function ( event, component ) {
        if(revision_value==0){
        var newObject = jQuery.extend(true, {}, component);
        revision_array.revisions.push({component_id: component.id, component: newObject, revision_date: $.now(), even_type: 'UPDATE'});
                revision_id++;

      }
      else revision_value=0;
      ////console.log(revision_array);
        window.lindneo.tlingit.componentHasUpdated( component );
      },
      'selected': function (event, element) {
        window.lindneo.currentComponentWidget = element;
        window.lindneo.toolbox.refresh( element );
      }
    });

  }
  
  var galeryComponentBuilder = function ( component ) {
    

    var element  = $('<div class="some-gallery" style="width:100%;height:100%;"> </div>');
    var elementWrap=$('<div title="'+j__("Galeri Aracı")+'"></div>');

    elementWrap.appendTo( page_div_selector );

    element
    .appendTo( elementWrap )
    .galeryComponent({
      'component': component,
      'update': function ( event, component ) {
        if(revision_value==0){
        var newObject = jQuery.extend(true, {}, component);
        revision_array.revisions.push({component_id: component.id, component: newObject, revision_date: $.now(), even_type: 'UPDATE'});
                revision_id++;

      }
      else revision_value=0;
      ////console.log(revision_array);
        window.lindneo.tlingit.componentHasUpdated( component );
      },
      'selected': function (event, element) {
        window.lindneo.currentComponentWidget = element;
        window.lindneo.toolbox.refresh( element );
      }
    });

  };

  var sliderComponentBuilder = function ( component ) {
    

    var element  = $('<div id="slider1_container" style="position: relative; top: 0px; left: 0px; width: 800px; height: 456px; background: #24262e; overflow: hidden;">');
    var elementWrap=$('<div title="'+j__("Sürgü Aracı")+'"></div>');

    elementWrap.appendTo( page_div_selector );

    element
    .appendTo( elementWrap )
    .sliderComponent({
      'component': component,
      'update': function ( event, component ) {
        if(revision_value==0){
        var newObject = jQuery.extend(true, {}, component);
        revision_array.revisions.push({component_id: component.id, component: newObject, revision_date: $.now(), even_type: 'UPDATE'});
                revision_id++;

      }
      else revision_value=0;
      ////console.log(revision_array);
        window.lindneo.tlingit.componentHasUpdated( component );
      },
      'selected': function (event, element) {
        window.lindneo.currentComponentWidget = element;
        window.lindneo.toolbox.refresh( element );
      }
    });

  };

  var thumbComponentBuilder = function ( component ) {
    

    var element  = $('<div id="thumb_container" style="position: relative; top: 0px; left: 0px; min-width: '+component.data.somegallery.css.width+'px; min-height: '+component.data.somegallery.css.height+'px; background: #24262e; overflow: hidden;">');
    var elementWrap=$('<div title="'+j__("Öngörüntü Slider Aracı")+'"></div>');

    elementWrap.appendTo( page_div_selector );

    element
    .appendTo( elementWrap )
    .thumbComponent({
      'component': component,
      'update': function ( event, component ) {
        if(revision_value==0){
        var newObject = jQuery.extend(true, {}, component);
        revision_array.revisions.push({component_id: component.id, component: newObject, revision_date: $.now(), even_type: 'UPDATE'});
                revision_id++;

      }
      else revision_value=0;
      ////console.log(revision_array);
        window.lindneo.tlingit.componentHasUpdated( component );
      },
      'selected': function (event, element) {
        window.lindneo.currentComponentWidget = element;
        window.lindneo.toolbox.refresh( element );
      }
    });

  };

  var quizComponentBuilder = function ( component ) {

    var element  = $('<div></div>');
    var elementWrap=$('<div title="'+j__("Soru Aracı")+'"></div>');
    elementWrap.appendTo( page_div_selector );

    element
    .appendTo( elementWrap )
    .quizComponent({
      'component': component,
      'update': function( event, component ){
        if(revision_value==0){
        var newObject = jQuery.extend(true, {}, component);
        revision_array.revisions.push({component_id: component.id, component: newObject, revision_date: $.now(), even_type: 'UPDATE'}); 
                revision_id++; 

      }
      else revision_value=0;
      ////console.log(revision_array);
        window.lindneo.tlingit.componentHasUpdated( component );
      }, 
      'selected': function ( event, element_ ){
        window.lindneo.currentComponentWidget = element_;
        window.lindneo.toolbox.refresh( element_ );
      }
    });
  };

  var mquizComponentBuilder = function ( component ) {

    var element  = $('<div></div>');
    var elementWrap=$('<div title="'+j__("Soru Aracı")+'"></div>');
    elementWrap.appendTo( page_div_selector );

    element
    .appendTo( elementWrap )
    .mquizComponent({
      'component': component,
      'update': function( event, component ){
        if(revision_value==0){
        var newObject = jQuery.extend(true, {}, component);
        revision_array.revisions.push({component_id: component.id, component: newObject, revision_date: $.now(), even_type: 'UPDATE'}); 
                revision_id++; 

      }
      else revision_value=0;
      ////console.log(revision_array);
        window.lindneo.tlingit.componentHasUpdated( component );
      }, 
      'selected': function ( event, element_ ){
        window.lindneo.currentComponentWidget = element_;
        window.lindneo.toolbox.refresh( element_ );
      }
    });
  };

  var plumbComponentBuilder = function ( component ) {
    
    var element  = $('<div class="plumb-controllers" style="width:100%; height:100%;"> </div>');
    var elementWrap=$('<div title="'+j__("Sıralı Bulmaca Aracı")+'"></div>');
    elementWrap.appendTo( page_div_selector );
    ////console.log(component);
    element
    .appendTo( elementWrap )
    .plumbComponent({
      'component': component,
      'marker': component.data.marker  ,
      'update': function ( event, component ) {
        if(revision_value==0){
        var newObject = jQuery.extend(true, {}, component);
        revision_array.revisions.push({component_id: component.id, component: newObject, revision_date: $.now(), even_type: 'UPDATE'});
                revision_id++;

      }
      else revision_value=0;
      ////console.log(revision_array);
        window.lindneo.tlingit.componentHasUpdated( component );
      },
      'selected': function (event, element) {
        window.lindneo.currentComponentWidget = element;
        window.lindneo.toolbox.refresh( element );
      }
    });

  };

  var cquizComponentBuilder = function ( component ) {
    
    var element  = $('<div class="cquiz-controllers" style="width:100%; height:100%;"> </div>');
    var elementWrap=$('<div title="'+j__("Card Quiz Aracı")+'"></div>');
    elementWrap.appendTo( page_div_selector );
    console.log(component);
    element
    .appendTo( elementWrap )
    .cquizComponent({
      'component': component,
      'marker': component.data.marker  ,
      'update': function ( event, component ) {
        if(revision_value==0){
        var newObject = jQuery.extend(true, {}, component);
        revision_array.revisions.push({component_id: component.id, component: newObject, revision_date: $.now(), even_type: 'UPDATE'});
                revision_id++;

      }
      else revision_value=0;
      ////console.log(revision_array);
        window.lindneo.tlingit.componentHasUpdated( component );
      },
      'selected': function (event, element) {
        window.lindneo.currentComponentWidget = element;
        window.lindneo.toolbox.refresh( element );
      }
    });

  };

  var puzzleComponentBuilder = function ( component ) {
    
    var element  = $('<div class="puzzle-controllers" style="width:100%; height:100%;"> </div>');
    var elementWrap=$('<div title="'+j__("Puzzle Aracı")+'"></div>');
    elementWrap.appendTo( page_div_selector );
    console.log(component);
    element
    .appendTo( elementWrap )
    .puzzleComponent({
      'component': component,
      'marker': component.data.marker  ,
      'update': function ( event, component ) {
        if(revision_value==0){
        var newObject = jQuery.extend(true, {}, component);
        revision_array.revisions.push({component_id: component.id, component: newObject, revision_date: $.now(), even_type: 'UPDATE'});
                revision_id++;

      }
      else revision_value=0;
      ////console.log(revision_array);
        window.lindneo.tlingit.componentHasUpdated( component );
      },
      'selected': function (event, element) {
        window.lindneo.currentComponentWidget = element;
        window.lindneo.toolbox.refresh( element );
      }
    });

  };

  var setBgColorOfSelectedComponent = function ( componentId ,activeUser){
    $('[id="' + componentId + '"]').parent().css({
      'border': '1px solid #ccc',
      'border-color': activeUser.color
    });
//    //console.log(activeUser.color);

    $('[color="' +activeUser.color+ '"]').parent().find('[component-instance="true"]').css( {'border': 'none'});
    $('[color="' +activeUser.color+ '"]').parent().children('.activeUser').remove();


    $('[id="' + componentId + '"]').parent().children('.activeUser').remove();
    var activeUserDOM=$('<span class="activeUser" style="position: absolute; top: -20px; right: -20px;color:'+activeUser.color+'; " color="'+activeUser.color+'">'+activeUser.name+'</span>');
 

    $('[id="' + componentId + '"]').parent().append(activeUserDOM); 

    

  };

  return {
    ChatNewLine: ChatNewLine,
    galeryComponentBuilder: galeryComponentBuilder,
    createComponent: createComponent,
    deleteComponent: deleteComponent,
    ComponentDelete: ComponentDelete,
    destroyChapter: destroyChapter,
    destroyPage: destroyPage,
    destroyComponent: destroyComponent,
    destroyByIdComponent: destroyByIdComponent,
    undoComponent: undoComponent,
    redoComponent: redoComponent,
    setBgColorOfSelectedComponent: setBgColorOfSelectedComponent
  };

})( window, jQuery );
