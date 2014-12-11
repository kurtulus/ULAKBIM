'use strict';

window.lindneo = window.lindneo || {};


window.lindneo.toolbox = (function(window, $, undefined){

  var that=this;
  var selectedComponents=[];
  var add_value=0;
  var is_copy=0;
  var SelectionBox=$("<div class='mulithing' style='border:1px solid blue;pointer-events:none;'> </div>");

  var makeMultiSelectionBox = function(){
    $('#group_btn').hide();
    $('#ungroup_btn').hide();
          
    if ($("#current_page").find('.mulithing').length)
      this.SelectionBox.remove();
	
    if (this.selectedComponents.length<=1) return;
    


    $('#group_btn').show();
    $('#ungroup_btn').show();


    var newBoxPosition=this.positions();
    newBoxPosition['position']='absolute';
    newBoxPosition['z-index']='9001';
    this.SelectionBox
		.css(newBoxPosition)
    	.appendTo( $('#current_page'))
		.resizable({
			"handles":"n, e, w, s, nw, se, sw, ne"
		});




  };

  var positions = function (position)
  {
    var component_values = [];
    var value = 0;
    var min_left = 10000000;
    var min_top = 10000000;
    var max_right = 0;
    var max_bottom = 0;
    $.each(this.selectedComponents, function( key, component ) {
      var wrapper = component.element;
      if (wrapper.attr('component-instance')=='true')
        wrapper=wrapper.parent();
      var position = $(wrapper ).position();
      if($.type(position) != "undefined"){
        var object_left = parseInt( position.left );
        var object_width = parseInt($(wrapper).width());
        var object_top = parseInt(position.top );
        var object_height = parseInt($(wrapper).height());
        var object_right = object_left + object_width;
        var object_bottom = object_top + object_height;


        if(min_left > object_left)  min_left = object_left;
        if(max_right < object_right)  max_right = object_right;
        if(min_top > object_top)  min_top = object_top;
        if(max_bottom < object_bottom)  max_bottom = object_bottom;

      }

   });
    return {
      'left':min_left+'px',
      'width':(max_right-min_left)+'px',
      'top':min_top+'px',
      'height':(max_bottom-min_top)+'px'
    };

};

  var  componentsAlignmentLeftToSet = function ()
  {
    var position = this.component_position('left');
    console.log(position);
    $.each(this.selectedComponents, function( key, component ) {
      console.log(component.options.component.data.self.css.left);
      component.options.component.data.self.css.left = position;
      window.lindneo.tlingit.componentHasUpdated(component.options.component);
      window.lindneo.nisga.destroyByIdComponent(component.options.component.id);
      window.lindneo.nisga.createComponent(component.options.component);
      
    });
    //return position;
  };

  var  componentsAlignmentRightToSet = function ()
  {
    var position = this.component_position('right');
    //console.log(position);
    $.each(this.selectedComponents, function( key, component ) {
      //console.log(component.options.component.data.self.css.left);
      var left_position = position - parseInt(component.options.component.data.self.css.width,10);
      component.options.component.data.self.css.left = left_position+'px';
      window.lindneo.tlingit.componentHasUpdated(component.options.component);
      window.lindneo.nisga.destroyByIdComponent(component.options.component.id);
      window.lindneo.nisga.createComponent(component.options.component);

    });
    //return position;
  };

  var  componentsAlignmentCenterToSet = function ()
  {
    var position = this.component_position('center');
    console.log(position);
    $.each(this.selectedComponents, function( key, component ) {
      //console.log(component.options.component.data.self.css.left);
      var object_width = parseInt(component.options.component.data.self.css.width);
      var object_position = position - (object_width / 2);
      component.options.component.data.self.css.left = object_position;
      window.lindneo.tlingit.componentHasUpdated(component.options.component);
      window.lindneo.nisga.destroyByIdComponent(component.options.component.id);
      window.lindneo.nisga.createComponent(component.options.component);
    });
    //return position;
  };

  var  componentsAlignmentTopToSet = function ()
  {
    var position = this.component_position('top');
    //console.log(position);
    $.each(this.selectedComponents, function( key, component ) {
      //console.log(component.options.component.data.self.css.left);
      //console.log(position);
      //console.log(component.options.component);
      component.options.component.data.self.css.top = position;
      //console.log(component.options.component.id);
      //console.log(component.options.component.data.self.css.left);
      window.lindneo.tlingit.componentHasUpdated(component.options.component);
      window.lindneo.nisga.destroyByIdComponent(component.options.component.id);
      window.lindneo.nisga.createComponent(component.options.component);
      
    });
    //return position;
  };

  var  componentsAlignmentBottomToSet = function ()
  {
    var position = this.component_position('bottom');
    //console.log(position);
    $.each(this.selectedComponents, function( key, component ) {
      //console.log(component.options.component.data.self.css.left);
      
      var top_position = position - parseInt(component.options.component.data.self.css.height,10);
      component.options.component.data.self.css.top = top_position+'px';
      window.lindneo.tlingit.componentHasUpdated(component.options.component);
      window.lindneo.nisga.destroyByIdComponent(component.options.component.id);
      window.lindneo.nisga.createComponent(component.options.component);

    });
    //return position;
  };

  var  componentsAlignmentMiddleToSet = function ()
  {
    var position = this.component_position('middle');
    console.log(position);
    $.each(this.selectedComponents, function( key, component ) {
      //console.log(component.options.component.data.self.css.left);
      var object_height = parseInt(component.options.component.data.self.css.height);
      var object_position = position - (object_height / 2);
      component.options.component.data.self.css.top = object_position;
      window.lindneo.tlingit.componentHasUpdated(component.options.component);
      window.lindneo.nisga.destroyByIdComponent(component.options.component.id);
      window.lindneo.nisga.createComponent(component.options.component);
    });
    //return position;
  };

  var  componentsAlignmentVerticalGapsToSet = function ()
  {
   console.log('Vertical Gaps');
   var position = this.component_gaps('vertical');
  };

  var  componentsAlignmentHorizontalGapsToSet = function ()
  {
   console.log('Horizontal Gaps');
   var position = this.component_gaps('horizontal');
  };

  var component_position = function(position)
  {
    var value = 0;
    if(position == 'left'){
      $.each(this.selectedComponents, function( key, component ) {
        //console.log(component.options.component.data.self.css.left);
        var object_left = parseInt(component.options.component.data.self.css.left);
        if(value==0) value = object_left;
        if(value > object_left) value = object_left;
      });
      value = value + 'px';
    }
   else if(position == 'right'){
    console.log(position);
      $.each(this.selectedComponents, function( key, component ) {
        //console.log(component.options.component.data.self.css.left);
        var object_left = component.options.component.data.self.css.left;
        object_left = parseInt(object_left);
        var object_value = object_left + parseInt(component.options.component.data.self.css.width);
        //alert(object_value);
        if(value==0) value = object_value;
        if(value < object_value) value = object_value;
      });
      //value = value + 'px';
    }
    else if(position == 'center'){
      var value_max = 0;
      var value_min = 0;
      $.each(this.selectedComponents, function( key, component ) {
        //console.log(component.options.component.data.self.css.left);
        var object_left = component.options.component.data.self.css.left;
        object_left = parseInt(object_left);
        var object_value = parseInt(component.options.component.data.self.css.width);
        var object_right = object_left + object_value;
        if(value_max==0) {
          value_max = object_right;
          value_min = object_left;
        }
        if(value_min > object_left) value_min = object_left;
        if(value_max < object_right) value_max = object_right;
        console.log(value_max);
        console.log(value_min);
      });
      value = value_max - (value_max - value_min) / 2;
    }
    else if(position == 'top'){
      $.each(this.selectedComponents, function( key, component ) {
        //console.log(component.options.component.data.self.css.left);
        var object_top = parseInt(component.options.component.data.self.css.top);
        if(value==0) value = object_top;
        if(value > object_top) value = object_top;
      });
      value = value + 'px';
    }
    else if(position == 'bottom'){
    console.log(position);
      $.each(this.selectedComponents, function( key, component ) {
        //console.log(component.options.component.data.self.css.left);
        var object_top = component.options.component.data.self.css.top;
        object_top = parseInt(object_top);
        var object_value = object_top + parseInt(component.options.component.data.self.css.height);
        //alert(object_value);
        if(value==0) value = object_value;
        if(value < object_value) value = object_value;
      });
      //value = value + 'px';
    }
    else if(position == 'middle'){
      var value_max = 0;
      var value_min = 0;
      $.each(this.selectedComponents, function( key, component ) {
        //console.log(component.options.component.data.self.css.left);
        var object_top = component.options.component.data.self.css.top;
        object_top = parseInt(object_top);
        var object_value = parseInt(component.options.component.data.self.css.height);
        var object_bottom = object_top + object_value;
        if(value_max==0) {
          value_max = object_bottom;
          value_min = object_top;
        }
        if(value_min > object_top) value_min = object_top;
        if(value_max < object_bottom) value_max = object_bottom;
      });
      value = value_max - (value_max - value_min) / 2;
    }
    
    return value;
  };

  var component_gaps = function (position)
  {
    var component_values = [];
    var value = 0;
    var min_left = 0;
    var min_top = 0;
    var max_left = 0;
    var max_top = 0;
    $.each(this.selectedComponents, function( key, component ) {
        var object_left = parseInt(component.options.component.data.self.css.left.replace("px", ""));
        var object_width = parseInt(component.options.component.data.self.css.width);
        var object_top = parseInt(component.options.component.data.self.css.top.replace("px", ""));
        var object_height = parseInt(component.options.component.data.self.css.height);
        var object_right = object_left + object_width;
        var object_bottom = object_top + object_height;

        if(min_left == 0)   min_left = object_left;
        if(max_left == 0)   max_left = object_left;
        if(min_top == 0)  min_top = object_top;
        if(max_top == 0)  max_top = object_top;
        
        if(min_left > object_left)  min_left = object_left;
        if(max_left < object_left)  max_left = object_left;
        if(min_top > object_top)  min_top = object_top;
        if(max_top < object_top)  max_top = object_top;

        component_values.push({'component':component.options.component, 'id' : component.options.component.id, 'left': object_left, 'right': object_right, 'top': object_top, 'bottom': object_bottom});
      });
    
    
    if(position == 'vertical'){
      var component_spaces = [];
      var components_count = component_values.length;
      var spaces = 0;

      component_values.sort(function(obj1, obj2) {
      return obj1.top - obj2.top;
    });

      for(var i = 0; i<components_count - 1; i++){
        var space = component_values[i + 1].top - component_values[i].bottom;
        if(space > 0) spaces = spaces + space;
        component_spaces.push(space);
      };
      //console.log(components_count);
    value = spaces / (components_count -1);
    $.each(component_values, function( key, component ) {
        if(key!=0 && key!= components_count-1){
          if(component_spaces[key-1] > value){
            
            var object_top = component.component.data.self.css.top.replace("px", "");
            object_top = parseInt(object_top);
            var div = component_spaces[key-1] - value;
            var key_value = div;
            console.log(div);
            div = object_top - div;
            console.log(div);
            div = div + 'px';
            component.component.data.self.css.top = div;
            
            window.lindneo.tlingit.componentHasUpdated(component.component);
            window.lindneo.nisga.destroyByIdComponent(component.component.id);
              window.lindneo.nisga.createComponent(component.component);
              component_spaces[key] = component_spaces[key] + key_value;
              console.log(component_spaces[key]);
          }
          else {
            
            var object_top = component.component.data.self.css.top.replace("px", "");
            object_top = parseInt(object_top);
            var div = value - component_spaces[key-1];
            var key_value = div;
            console.log(div);
            div = object_top + div;
            
            console.log(div);
            div = div + 'px';
            component.component.data.self.css.top = div;
            console.log(component.component);
            window.lindneo.tlingit.componentHasUpdated(component.component);
            window.lindneo.nisga.destroyByIdComponent(component.component.id);
              window.lindneo.nisga.createComponent(component.component);
              console.log(component_spaces[key]);
              component_spaces[key] = component_spaces[key] - key_value;
              console.log(component_spaces[key]);
          }
        }
      });
    //console.log(component_values);
    //console.log(component_spaces);
    //console.log(value);
    }
    else if(position == 'horizontal'){
      var component_spaces = [];
      var components_count = component_values.length;
      var spaces = 0;

      component_values.sort(function(obj1, obj2) {
      return obj1.left - obj2.left;
    });

      for(var i = 0; i < components_count - 1; i++){
        var space = component_values[i + 1].left - component_values[i].right;
        if(space > 0) spaces = spaces + space;
        component_spaces.push(space);
      };
      value = spaces / (components_count -1);
      console.log(value);
    $.each(component_values, function( key, component ) {
        if(key!=0 && key!= components_count-1){
          if(component_spaces[key-1] > value){
            
            var object_left = component.component.data.self.css.left.replace("px", "");
            object_left = parseInt(object_left);
            var div = component_spaces[key-1] - value;
            var key_value = div;
            //console.log(div);
            div = object_left - div;
            //console.log(div);
            div = div + 'px';
            component.component.data.self.css.left = div;
            //console.log(component.component);
            window.lindneo.tlingit.componentHasUpdated(component.component);
            window.lindneo.nisga.destroyByIdComponent(component.component.id);
              window.lindneo.nisga.createComponent(component.component);
              console.log(component_spaces[key]);
              component_spaces[key] = component_spaces[key] + key_value;
              console.log(component_spaces[key]);
          }
          else {
            
            var object_left = component.component.data.self.css.left.replace("px", "");
            object_left = parseInt(object_left);
            var div = value - component_spaces[key-1];
            var key_value = div;
            //console.log(div);
            div = object_left + div;
            //console.log(div);
            div = div + 'px';
            component.component.data.self.css.left = div;
            //console.log(component.component);
            window.lindneo.tlingit.componentHasUpdated(component.component);
            window.lindneo.nisga.destroyByIdComponent(component.component.id);
              window.lindneo.nisga.createComponent(component.component);
              console.log(component_spaces[key]);
              component_spaces[key] = component_spaces[key] - key_value;
              console.log(component_spaces[key]);
          }
        }
      });
    //console.log(component_values);
    //console.log(component_spaces);
    //console.log(value);
    }
    return value;
  }

  var  findHighestZIndexToSet = function (elem)
  {
    var elems = $(elem);
    var highest = 0;

    //console.log(elem);
    //console.log(elems);
    
    for (var i = 0; i < elems.length; i++)
    {
      var zindex=document.defaultView.getComputedStyle(elems[i],null).getPropertyValue("z-index");
      //console.log(zindex);

        
      if ((zindex >= highest) && (zindex != 'auto'))
      {
        highest = zindex;
        
      }
    }
    //console.log(highest);
    return parseInt(highest)+1;
  };



  var  findHigherZIndexToSet = function (elem,id)
  {
    var elems = $(elem);
    var eleman= $('#'+id).parent();

    var zindexCompare= parseInt( $(eleman).css('z-index') );
    if(zindexCompare==9999) zindexCompare =999;
    console.log(zindexCompare);
    console.log(eleman);
    for (var i = 0; i < elems.length; i++)
    {
      var zindex=document.defaultView.getComputedStyle(elems[i],null).getPropertyValue("z-index");
      if(zindex==9999) zindex =999;
      console.log(zindex);
      if (zindex != 'auto' && !(eleman[0] === elems[i]) ){

        zindex=parseInt(zindex);
        console.log(zindex);
        console.log(zindexCompare);
        if (( zindex>= zindexCompare) && zindex<9000)
        {
          console.log(zindex);
          return parseInt(zindex)+1;
        }
      }
    }
    return parseInt(zindex);
  };

   
  var  findlowerZIndexToSet = function (elem,id)
  {
    var elems = $(elem);
    var eleman= $('#'+id).parent();
    var zindexCompare= parseInt( eleman.css('z-index') );

    for (var i = 0; i < elems.length; i++)
    {
      var zindex=document.defaultView.getComputedStyle(elems[i],null).getPropertyValue("z-index");
      if (zindex != 'auto' && !isNaN(zindex) && !(eleman[0] === elems[i]) ){

        zindex=parseInt(zindex);
        //console.log(zindex);
        //console.log(zindexCompare);

        if (( zindex<= zindexCompare) && zindex>100)
        {
          return parseInt(zindex)-1;
        }
      }
    }
    return parseInt(zindex);
  };

  var  findlowestZIndexToSet = function (elem)
  {
    var elems = $(elem);
    var lowest = 9999;

    for (var i = 0; i < elems.length; i++)
    {

      var zindex=document.defaultView.getComputedStyle(elems[i],null).getPropertyValue("z-index");

      if ((zindex <= lowest) && zindex>100 &&  (zindex != 'auto'))
      {
        lowest = zindex;
        
      }
    }
    return parseInt(lowest)-1;
  };


  var _create = function () {
    

  };


  var getClipboardItems = function  (){
      //return this.selectedComponents;
      return JSON.parse( localStorage.getItem('clipboard') );
  }; 
  var clearClipboard = function () {
    return localStorage.removeItem('clipboard');
  }

  var setClipboardItems = function (newClipboard){
    return localStorage.setItem('clipboard', JSON.stringify( newClipboard ));
  };

  var selectionUpdated = function (){

    

    var that = this;
      $('.toolbox').hide();
      //console.log('BEGIN');
      //console.log(this.selectedComponents);
      //console.log('END');
      //return;

      $.each(this.selectedComponents, function( key, component ) {
      //console.log(component.options.component.data.lock);
      //$('.toolbox.'+component.options.component.type+'-options, .toolbox.generic-options').show();
      //console.log(component.options.component);
        if(typeof component.options.component.data.lock == "undefined" || component.options.component.data.lock == '' || !component.options.component.data.lock) { 
      //console.log(this.options.component.data.lock);
      
          //if(typeof component.options.component.data.lock.username == "undefined"){
            //console.log("unlock");
            $('.toolbox.'+component.options.component.type+'-options, .toolbox.generic-options').show();
          //}
        }



        $('.toolbox .tool').unbind( "change" );
        $('.toolbox-btn').unbind( "click" );
        //console.log(component);
              //return;

        $('.toolbox .tool, .toolbox-btn').each(function (index) {

              var rel=$(this).attr('rel');
              var relValue = component.getProperty(rel);
              if(rel == "rotate"){
                //relValue =
                
                var rotation = component.options.component.data.self.rotation;
                var degree_rotation = rotation * 180 / 3.14
                //console.log  ( degree_rotation );
                if(isNaN(degree_rotation))
                  degree_rotation = 0;
                relValue = Math.round(degree_rotation).toFixed(0);
              }
              if( relValue != null) { 
                // text select ve color icin
                $(this).not('radio').val(relValue);
                
                //checkbox ve radio icin
                $(this).prop('checked', ( $(this).attr('activeVal') == relValue ? true : false )); 
          

                //console.log  ( rel + ' is ' + relValue); 

              }

             if( $(this).hasClass('color') ){

                $(this).change(function(){
                  component.setProperty ( $(this).attr('rel') , $(this).val() );
                  that.selectionUpdated();
                });

             } else if( $(this).hasClass('select') ){
                $(this).change(function(){
                  var str =  $(this).children("option:selected").val();
                  component.setProperty ( $(this).attr('rel') ,str  );
                  that.selectionUpdated();
                });

             } else if( $(this).hasClass('checkbox') || $(this).hasClass('radio') ){
                $(this).change(function(){ 
                  var isChecked= $(this).is(':checked')    ; 
                  var newValue = ( isChecked == true ? $(this).attr('activeVal') : $(this).attr('passiveVal') );
                  component.setProperty ( $(this).attr('rel') ,newValue  );
                  that.selectionUpdated();
                });
               
             } else if($(this).hasClass('toolbox-btn')){
                $(this).click(function(){
                  component.setProperty ( $(this).attr('rel') ,$(this).attr('action')  );
                  that.selectionUpdated();
                });

             }
             else if($(this).hasClass('text')){
                $(this).keydown(function(e){
                  if(e.which == "13"){
                    console.log(component);
                    //return;
                    var degree = $(this).val();
                    var radian = (degree/180)*3.14;
                    var glob_rel=$(this).attr('rel');
                    $.each(window.lindneo.toolbox.selectedComponents,function(i,val){
                      console.log(val);
                        val.setProperty ( glob_rel , radian );
                    });
            
                    //that.selectionUpdated();
                    console.log(that);
                  }
                });

             }
        });
      });
      this.makeMultiSelectionBox();
     /*
      while(this.selectedComponents.length > 0) {
        this.selectedComponents.pop();
      }*/

  };



  var addComponentToSelection = function (component){
    //console.log(component);
    var newObject = component;
    this.removeComponentFromSelection(newObject);
      
    this.selectedComponents.push(newObject);
    this.selectionUpdated();
        
      
  };

  var removeComponentFromSelection = function (component){
      //key capture problem fix
      $(document).unbind('keydown');
      //sconsole.log(component);
      if (typeof component.options != "undefined")
        this.selectedComponents=$.grep(this.selectedComponents, function (n,i){
          return (n.options.component.id !== 
            component.options.component.id);  
        });
      this.selectionUpdated();


  };
  
  var deleteComponentFromSelection = function (component){
      this.selectedComponents=[];
      this.selectionUpdated();
      //console.log('delete selections....')
      //console.log(selectedComponents);

  };

  var undoSelectedItemsClipboard = function () {
      //console.log("undooooo");
      //window.lindneo.nisga.undoComponent();
      window.lindneo.tlingit.undo();
 
  };
  
  var redoSelectedItemsClipboard = function () {
      //console.log("undooooo");
      window.lindneo.tlingit.redo();
  };

  var lockSelectedItemsToClipboard = function () {
      var newClipboard=[];
      var that = this;
      this.clearClipboard();      
      
      $.each(window.lindneo.toolbox.selectedComponents, function( key, component ) {
        //console.log(component.options);
        $('#'+component.options.component.id).parent().draggable({ disabled: true });
        $('#'+component.options.component.id).droppable({ disabled: true });
        $('#'+component.options.component.id).selectable({ disabled: true });
        $('#'+component.options.component.id).sortable({ disabled: true });
        $('#'+component.options.component.id).resizable({ disabled: true });
        $('#'+component.options.component.id).attr('readonly','readonly');
        $('#delete-button-'+component.options.component.id).hide();
        if ($.type(component.options.component.data.lock) == "undefined") component.options.component.data.lock='';
        window.lindneo.toolbox.selectionUpdated();
        //console.log(component.options.component);
        component.options.component.data.lock=window.lindneo.user;
        this._trigger('update', null, component.options.component );
        that.selectionUpdated();
        //console.log(component.options.component);
        var newComponent =JSON.parse(JSON.stringify(component.options.component)); 
        //console.log(newComponent);
        this._trigger('update', null, component.options.component );
        newComponent.id= '';
        newComponent.page_id= '';
        
        newClipboard.push(newComponent);
      });
        //console.log(newClipboard);
        return this.setClipboardItems(newClipboard);
  };

  var unlockSelectedItemsToClipboard = function () {
      var newClipboard=[];
      var that = this;
      this.clearClipboard();
      
      $.each(window.lindneo.toolbox.selectedComponents, function( key, component ) {
        //console.log(component.options.component.data);
        if(component.options.component.data.lock!=''){
          if(component.options.component.data.lock.username==window.lindneo.user.username){
            $('#'+component.options.component.id).parent().draggable({ disabled: false });
            $('#'+component.options.component.id).droppable({ disabled: false });
            $('#'+component.options.component.id).selectable({ disabled: false });
            $('#'+component.options.component.id).sortable({ disabled: false });
            $('#'+component.options.component.id).resizable({ disabled: false });
            $('#'+component.options.component.id).removeAttr('readonly');
            component.options.component.data.lock='';
            //console.log(component.options.component.data.lock);
            that.selectionUpdated();
            var newComponent =JSON.parse(JSON.stringify(component.options.component)); 
            //console.log(newComponent);
            this._trigger('update', null, component.options.component );
            newComponent.id= '';
            newComponent.page_id= '';
            
            newClipboard.push(newComponent);
          }
          else alert('Yetkili değilsiniz....');
        }
      });
        //console.log(newClipboard);
        return this.setClipboardItems(newClipboard);
  };

  var copySelectedItemsToClipboard = function (cut) {

        var newClipboard=[];

        this.clearClipboard();
        
        $.each(window.lindneo.toolbox.selectedComponents, function( key, component ) {
          
          var newComponent =JSON.parse(JSON.stringify(component.options.component)); 
          //console.log(component.options.component);
          if(cut==true) window.lindneo.tlingit.componentHasDeleted( component.options.component, component.options.component.id );
          
          //console.log(newComponent);
          $('.copy-paste').css('display','inline-block');
          newComponent.id= '';
          newComponent.page_id= '';
          
          newClipboard.push(newComponent);
          
         
        });

        console.log(newClipboard);
        return this.setClipboardItems(newClipboard);
 
  };


  var pasteClipboardItems = function () {
      var oldClipboard = this.getClipboardItems();
      var newClipboard=[];

      $.each(oldClipboard, function( key, component ) {
        component.data.self.css.top = (parseInt(component.data.self.css.top)+25 ) +"px";
        component.data.self.css.left = (parseInt(component.data.self.css.left)+25 ) +"px";

        newClipboard.push(component);
        $('.copy-paste').css('display','none');
        console.log(component);
        window.lindneo.tlingit.componentHasCreated( component );
      });
      return this.setClipboardItems(newClipboard);
  };

  var load = function () {
    // creates toolbox

    var that=this;


     $('.toolbox').hide();
     
    $('.undo').click(function(){
      that.undoSelectedItemsClipboard();
    });
    
    $('.redo').click(function(){
      that.redoSelectedItemsClipboard();
    });
    
    $('#generic-disable').click(function(){
      that.lockSelectedItemsToClipboard();
    });

    $('#generic-undisable').click(function(){
      that.unlockSelectedItemsToClipboard();
    });

    $('.generic-cut').click(function(){
      console.log('cutting');
      that.copySelectedItemsToClipboard(true);
    });
 
    $('.generic-copy').click(function(){
      that.copySelectedItemsToClipboard(false);
    });

    $('.generic-paste').click(function(){
      that.pasteClipboardItems();
    });

  };

  var refresh = function ( component ) {

    if( component ) {
      // show only toolbox-items usable for selected component type
      switch( component.type() ) {
        case 'text':
          break;
        default:
          // show all toolbox items
      }
    } else {
      // show all toolbox items
    }
  };

  return {
    findHighestZIndexToSet: findHighestZIndexToSet,
    findHigherZIndexToSet: findHigherZIndexToSet,
    findlowerZIndexToSet: findlowerZIndexToSet,
    findlowestZIndexToSet: findlowestZIndexToSet,
    pasteClipboardItems: pasteClipboardItems,
    copySelectedItemsToClipboard: copySelectedItemsToClipboard,
    lockSelectedItemsToClipboard: lockSelectedItemsToClipboard,
    unlockSelectedItemsToClipboard: unlockSelectedItemsToClipboard,
    clearClipboard: clearClipboard,
    setClipboardItems: setClipboardItems,
    getClipboardItems: getClipboardItems,
    selectionUpdated: selectionUpdated,
    SelectionBox: SelectionBox,
    selectedComponents: selectedComponents,
    addComponentToSelection: addComponentToSelection,
    removeComponentFromSelection: removeComponentFromSelection,
    deleteComponentFromSelection: deleteComponentFromSelection,
    undoSelectedItemsClipboard: undoSelectedItemsClipboard,
    redoSelectedItemsClipboard: redoSelectedItemsClipboard,
    componentsAlignmentLeftToSet: componentsAlignmentLeftToSet,
    componentsAlignmentRightToSet: componentsAlignmentRightToSet,
    componentsAlignmentCenterToSet: componentsAlignmentCenterToSet,
    componentsAlignmentTopToSet: componentsAlignmentTopToSet,
    componentsAlignmentBottomToSet: componentsAlignmentBottomToSet,
    componentsAlignmentMiddleToSet: componentsAlignmentMiddleToSet,
    componentsAlignmentVerticalGapsToSet: componentsAlignmentVerticalGapsToSet,
    componentsAlignmentHorizontalGapsToSet: componentsAlignmentHorizontalGapsToSet,
    component_position: component_position,
    component_gaps: component_gaps,
    makeMultiSelectionBox: makeMultiSelectionBox,
    positions: positions,
    load: load,
    refresh: refresh
  };

})( window, jQuery );