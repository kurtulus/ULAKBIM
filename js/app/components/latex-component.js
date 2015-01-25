'use strict';

$(document).ready(function(){
  $.widget('lindneo.latexComponent', $.lindneo.component, {
    
    options: {
     

    },

    _create: function(){

      var that = this;

      

      var componenthtmlid='latex'+this.options.component.id;
      

      // = '<p>\\[\\pi r^3\\]</p>';
      //console.log(this.options.component.data.html_inner);
      var latex_data = html_tag_replace(this.options.component.data.html_inner);

      //console.log(html_tag_replace(this.options.component.data.html_inner));
      if(this.options.component.data.html_inner){
        var pop_message=$('<div class="box" id="'+this.options.component.id+'_box" style=" width:100%; height:100%; overflow:hidden;"></div>');
        //var popupmessage=$('<div></div>');
        pop_message.appendTo(this.element);
        //popupmessage.appendTo(pop_message);
        //pop_message.html(latex_data);
        //console.log(latex_data);
        //UpdateMath(pop_message);
        latex_to_html(latex_data, this.options.component.id);
      }
       

      
      this._super({resizableParams:{handles:"e, s, se"}});
/*
      this.element.resizable("option",'maxHeight', 128 );
      this.element.resizable("option",'minHeight', 128 );
      this.element.resizable("option",'maxWidth', 128 );
      this.element.resizable("option",'minWidth', 128 );

*/ 
      

    },

    field: function(key, value){
      
      this._super();

      // set
      this.options.component[key] = value
    }
    
  });

  
});

var latex_to_html = function(tex, component_id){
  component_id = component_id;
  tex = "$" + tex + "$";
  //tex.replace('\\','\\\\');
  var componentSelector = '#'+component_id;
  //console.log(tex);
  //$(componentSelector).find('.box').attr('id', component_id + "_box");

  $("#"+component_id + "_box").html(tex);
  //console.log($("#"+component_id + "_box"));

  MathJax.Hub.queue.Push(["Typeset", MathJax.Hub, component_id + "_box"]);

}



var html_tag_replace = function (str){
   //var content = str.replace('&lt;','<')
   //                 .replace('&gt;','>')
   //                 .replace('<div>','')
   //                 .replace('</div>','');
   //console.log(str);
   while( str.indexOf('<pre style="color: rgb(0, 0, 0); line-height: normal; text-align: start;">') > -1)
      {
        str = str.replace('<pre style="color: rgb(0, 0, 0); line-height: normal; text-align: start;">', '');
      }

    while( str.indexOf('</pre>') > -1)
      {
        str = str.replace('</pre>', '>');
      }
    while( str.indexOf('&lt;') > -1)
      {
        str = str.replace('&lt;', '<');
      }

    while( str.indexOf('&gt;') > -1)
      {
        str = str.replace('&gt;', '>');
      }

    while( str.indexOf('&amp;') > -1)
      {
        str = str.replace('&amp;', '&');
      }

      
   //console.log(str);
   return str;
};
var wrapperOutputDiv;
var wrapperBoxDiv;
var wrapperTextarea;

var QUEUE = MathJax.Hub.queue;  // shorthand for the queue
var box = $(wrapperBoxDiv).get(0);
console.log(box);
var HIDEBOX = function () {box.style.visibility = "hidden"}
var SHOWBOX = function () {box.style.visibility = "visible"}

  var UpdateMath = function (TeX) {
    //console.log(TeX);
    //console.log($('#MathOutput'));
    
    QUEUE.Push(function(){
      box = $(wrapperBoxDiv).get(0);
    });
    
    
    document.getElementById(wrapperOutputDiv[0].id).innerHTML = "$"+TeX+"$";

    //reprocess the MathOutput Element
    QUEUE.Push(HIDEBOX, ["Typeset",MathJax.Hub,wrapperOutputDiv[0].id], SHOWBOX);

    /*
    document.getElementById("MathOutput").innerHTML = "\\displaystyle{"+TeX+"}";

    //reprocess the MathOutput Element
    MathJax.Hub.Queue(["Text",MathJax.Hub,"MathOutput"]);
    */
  }

  var LatexOutput = function (TeX, component_id) {
    QUEUE.Push(HIDEBOX,["Text",math,"\\displaystyle{"+TeX+"}"],SHOWBOX);
    $( ".box" ).css( "visibility", "visible" );
    //console.log(math);
  }

var insertLatexAtTextareaCursor = function (ID,text) {
    //var txtarea = document.getElementById(areaId);
    console.log();
    var txtarea = $(wrapperTextarea).get(0);
    var scrollPos = txtarea.scrollTop;
    var strPos = 0;
    var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? 
    "ff" : (document.selection ? "ie" : false ) );
    if (br == "ie") { 
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart ('character', -txtarea.value.length);
        strPos = range.text.length;
    }
    else if (br == "ff") strPos = txtarea.selectionStart;
    
    var front = (txtarea.value).substring(0,strPos); 
    var back = (txtarea.value).substring(strPos,txtarea.value.length); 
    txtarea.value=front+text+back;
    strPos = strPos + text.length;
    if (br == "ie") { 
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart ('character', -txtarea.value.length);
        range.moveStart ('character', strPos);
        range.moveEnd ('character', 0);
        range.select();
    }
    else if (br == "ff") {
        txtarea.selectionStart = strPos;
        txtarea.selectionEnd = strPos;
        txtarea.focus();
    }
    txtarea.scrollTop = scrollPos;
}

var createLatexComponent = function ( event, ui, oldcomponent ) { 
  


  if(typeof oldcomponent == 'undefined'){
    //console.log('dene');
    var top = (ui.offset.top-$(event.target).offset().top ) + 'px';
    var left = ( ui.offset.left-$(event.target).offset().left ) + 'px';
    var popup_value = '';
    var width = '400';
    var height = '300';
  }
  else{
    top = oldcomponent.data.self.css.top;
    left = oldcomponent.data.self.css.left;
    popup_value = oldcomponent.data.html_inner;

    var width = oldcomponent.data.width ;
    var height = oldcomponent.data.height;
  }; 

  var min_left = $("#current_page").offset().left;
  var min_top = $("#current_page").offset().top;
  var max_left = $("#current_page").width() + min_left;
  var max_top = $("#current_page").height() + min_top;
  var window_width = $( window ).width();
  var window_height = $( window ).height();

  if(max_top > window_height) max_top = window_height;
  if(max_left > window_width) max_top = window_width;
  
  var top=(event.pageY - 25);
  var left=(event.pageX-150);

  console.log(top);

  if(left < min_left)
    left = min_left;
  else if(left+510 > max_left)
    left = max_left - 510;

  if(top < min_top)
    top = min_top;
  else if(top+510 > max_top)
    top = max_top - 510;

  console.log(top);

  top = top + "px";
  left = left + "px";

   var idPre = $.now();

  $('<div>').componentBuilder({

    top:top,
    left:left,
    title: j__("Latex"),
    btnTitle : j__("Ekle"), 
    beforeClose : function () {
      /* Warn about not saved work */
      /* Dont allow if not confirmed */
      return confirm(j__("Yaptığınız değişiklikler kaydedilmeyecektir. Kapatmak istediğinize emin misiniz?"));
    },
    onBtnClick: function(){

      if (wrapperTextarea.val() == "") {
        alert (j__("Lütfen latex ile ilgili veri girişinizi yapınız"));
        return false;
      }

      if(typeof oldcomponent == 'undefined'){
        //console.log('dene');
        var top = (ui.offset.top-$(event.target).offset().top ) + 'px';
        var left = ( ui.offset.left-$(event.target).offset().left ) + 'px';
      }
      else{
        top = oldcomponent.data.self.css.top;
        left = oldcomponent.data.self.css.left;
        window.lindneo.tlingit.componentHasDeleted( oldcomponent, oldcomponent.id );
        oldcomponent.data.html_inner = $(".MathInput").html();

      };

      var  component = {
        'type' : 'latex',
        'data': {
          'html_inner':  $(wrapperTextarea).val(),
          'width': width,
          'height': height,
          'lock':'',
          'self': {
            'css': {
              'position':'absolute',
              'top': top ,
              'left':  left ,
              'overflow': 'visible',
              'opacity': '1', 
              'z-index': 'first'
            }
          }
        }
      };


      if(typeof oldcomponent !== 'undefined'){
        window.lindneo.tlingit.componentHasDeleted( oldcomponent, oldcomponent.id );
        console.log("Log Kaydı: Eski Latex Kutusu silindi.",oldcomponent);
      };
      var componentWithId=window.lindneo.tlingit.componentHasCreated(component);
      console.log("Log Kaydı: Yeni Latex Kutusu oluşturuldu.",componentWithId);
    },
    onComplete:function (ui){

      var mainDiv = $('<div>')
        .css({"width":"100%", "height":"100%"})
        .appendTo(ui);

          var symbolDiv = $('<div>')
            .css({"width":"49%", "float":"left"})
            .appendTo(mainDiv);

            var symbolSelect = $('<select>')
              .attr("title",j__("Genel Latex Sembolleri"))
              .addClass("form-control")
              .appendTo(symbolDiv);

              var symbolOption = $("<option value=''>"+j__("Semboller")+"</option>\
                                    <option title= '\\sqrt{x}' value='\\sqrt{x}'>√</option>\
                                    <option title= '\\sqrt[n]{x}' value='\\sqrt[n]{x}'>∛</option>\
                                    <option title= 'x^n' value='x^n'>x²</option>\
                                    <option title= 'x_n' value='x_n'>x₂</option>\
                                    <option title= 'x_a^b' value='x_a^b'>x₂²</option>\
                                    <option title= '\\frac{a}{b}' value='\\frac{a}{b}'>÷</option>\
                                    <option title= '\\lim_{x \\to 0}' value='\\lim_{x \\to 0}'>limit</option>\
                                    <option title= '\\sum_{a}^{b}' value='\\sum_{a}^{b}'>∑</option>\
                                    <option title= '\\int_{a}^{b}' value='\\int_{a}^{b}'>∫</option>\
                                    <option title= '\\oint_{a}^{b}' value='\\oint_{a}^{b}'>∮</option>\
                                    <option title= '\\prod_{a}^{b}' value='\\prod_{a}^{b}'>∏</option>\
                                    <option title= '\\binom{n}{k}' value='\\binom{n}{k}'>binom</option>\
                                    <option title= '\\left( \\right)' value='\\left( \\right)'>( )</option>\
                                    <option title= '\\left[ \\right]' value='\\left[ \\right]'>[ ]</option>\
                                    <option title= '\\lceil x \\rceil' value='\\lceil x \\rceil'>⌈ x ⌉</option>\
                                    <option title= '\\lfloor x \\rfloor' value='\\lfloor x \\rfloor'>⌊ x ⌋</option>\
                                    <option title= '\\left\\{ \\right\\}' value='\\left\\{ \\right\\}'>{ }</option>\
                                    <option title= '\\bigcup_{\\alpha\\in S}' value='\\bigcup_{\\alpha\\in S}'>⋃</option>\
                                    <option title= '\\bigcap_{\\alpha\\in S}' value='\\bigcap_{\\alpha\\in S}'>⋂</option>\
                                    <option title= '\\partial' value='\\partial'>∂</option>\
                                    <option title= '\\infty' value='\\infty'>∞</option>\
                                    <option title= '\\therefore' value='\\therefore'>∴</option>\
                                    <option title= '\\displaystyle' value='\\displaystyle'>displaystyle</option>\
                                    <option title= '\\textstyle' value='\\textstyle'>textstyle</option>\
                                    <option title= '\\scriptstyle' value='\\scriptstyle'>scriptstyle</option>\
                                    <option title= '\\text{}' value='\\text{}'>text</option>\
                                    <option title= '\\textbf{}' value='\\textbf{}'>bold</option>\
                                    <option title= '\\textit{}' value='\\textit{}'>ital</option>\
                                    <option title= '\\textrm{}' value='\\textrm{}'>roman</option>\
                                    <option title= '{\\color{red} }' value='{\\color{red} }'>R</option>\
                                    <option title= '{\\color{green} }' value='{\\color{green} }'>G</option>\
                                    <option title= '{\\color{blue} }' value='{\\color{blue} }'>B</option>")
                .appendTo(symbolSelect);


          var greekDiv = $('<div>')
            .css({"width":"49%", "float":"left","margin-left":"5px"})
            .appendTo(mainDiv);

            var greekSelect = $('<select>')
              .attr("title",j__("Harf Karekterleri"))
              .addClass("form-control")
              .appendTo(greekDiv);

              var greekOption = $("<option title=''>"+j__("Harfler")+"</option>\
                                      <optgroup label= 'Lowercase'>\
                                        <option title= '\\alpha' value='\\alpha'>ɑ</option>\
                                        <option title= '\\beta' value='\\beta'>β</option>\
                                        <option title= '\\gamma' value='\\gamma'>ɣ</option>\
                                        <option title= '\\delta' value='\\delta'>δ</option>\
                                        <option title= '\\epsilon' value='\\epsilon'>ϵ</option>\
                                        <option title= '\\varepsilon' value='\\varepsilon'>ε</option>\
                                        <option title= '\\zeta' value='\\zeta'>ζ</option>\
                                        <option title= '\\eta' value='\\eta'>η</option>\
                                        <option title= '\\theta' value='\\theta'>θ</option>\
                                        <option title= '\\vartheta' value='\\vartheta'>ϑ</option>\
                                        <option title= '\\iota' value='\\iota'>ι</option>\
                                        <option title= '\\kappa' value='\\kappa'>κ</option>\
                                        <option title= '\\lambda' value='\\lambda'>λ</option>\
                                        <option title= '\\mu' value='\\mu'>μ</option>\
                                        <option title= '\\nu' value='\\nu'>ν</option>\
                                        <option title= '\\xi' value='\\xi'>ξ</option>\
                                        <option title= '\\pi' value='\\pi'>π</option>\
                                        <option title= '\\varpi' value='\\varpi'>ϖ</option>\
                                        <option title= '\\rho' value='\\rho'>ρ</option>\
                                        <option title= '\\varrho' value='\\varrho'>ϱ</option>\
                                        <option title= '\\sigma' value='\\sigma'>σ</option>\
                                        <option title= '\\varsigma' value='\\varsigma'>ς</option>\
                                        <option title= '\\tau' value='\\tau'>τ</option>\
                                        <option title= '\\upsilon' value='\\upsilon'>υ</option>\
                                        <option title= '\\phi' value='\\phi'>ϕ</option>\
                                        <option title= '\\varphi' value='\\varphi'>φ</option>\
                                        <option title= '\\chi' value='\\chi'>χ</option>\
                                        <option title= '\\psi' value='\\psi'>ψ</option>\
                                        <option title='\\omega' value='\\omega'>ω</option>\
                                      </optgroup>\
                                      <optgroup label='Uppercase'>\
                                        <option title= '\\Gamma' value='\\Gamma'>Ɣ</option>\
                                        <option title= '\\Delta' value='\\Delta'>Δ</option>\
                                        <option title= '\\Theta' value='\\Theta'>Θ</option>\
                                        <option title= '\\Lambda' value='\\Lambda'>Λ</option>\
                                        <option title= '\\Xi' value='\\Xi'>Ξ</option>\
                                        <option title= '\\Pi' value='\\Pi'>Π</option>\
                                        <option title= '\\Sigma' value='\\Sigma'>Σ</option>\
                                        <option title= '\\Upsilon' value='\\Upsilon'>Υ</option>\
                                        <option title= '\\Psi' value='\\Psi'>Ψ</option>\
                                        <option title= '\\Omega' value='\\Omega'>Ω</option>\
                                      </optgroup>")
                .appendTo(greekSelect);

          var wrapperDiv = $('<div>')
            .css({"border":"1px #ccc solid","width": "100%", "height": "100%"})
            .addClass("popup_wrapper drag-cancel")
            .appendTo(mainDiv);

            wrapperTextarea = $('<textarea>')
              .css({"resize":"none","width": "100%", "margin-top":"5px"})
              .attr("contenteditable","true")
              .attr("rows","5")
              .addClass("MathInput drag-cancel")
              .val( popup_value )
              .appendTo(wrapperDiv);

            wrapperBoxDiv = $('<div>')
              .css({"visibility":"hidden"})
              .addClass("box")
              .appendTo(wrapperDiv);

              wrapperOutputDiv = $('<div>')
                .addClass("output")
                .attr("id","MathOutput"+idPre)
                .appendTo(wrapperBoxDiv);


      symbolSelect.change(function() {
        insertLatexAtTextareaCursor('MathInput', $( this ).val());

        UpdateMath(wrapperTextarea.val());
      });

      greekSelect.change(function() {
        insertLatexAtTextareaCursor('MathInput', $( this ).val());

        UpdateMath(wrapperTextarea.val());
      });

      wrapperTextarea.bind('input propertychange', function() {
        //console.log(this.value);
        UpdateMath(this.value);
      });

      if (MathJax.Hub.Browser.isMSIE) {
        MathInput.onkeypress = function () {
          if (window.event && window.event.keyCode === 13) {this.blur(); this.focus()}
        }
      }
              



    }

  }).appendTo('body');

};