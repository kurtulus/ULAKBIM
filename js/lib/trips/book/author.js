	/* Welcome */
	
	{ 
		content : j__("Okutus Editor'e HoşGeldiniz, Editor Tanıtımı için ileriye basınız."),
		position:'screen-center',
		delay:-1
	},

	{ 
		content : j__("Burası yayın üretiminin yapıldığı bölümdür."),
		position:'screen-center',
		delay:-1
	},

	/* Header */

	
	{ 
		sel:'#headermenu>ul>li:eq(1)',
		content : j__("Üzerinde çalıştığınız <br> yayının adını <br>buradan görebilirsiniz"),
		position:'s',
	},
	{ 
		sel:'#headermenu>ul>li:eq(2)',
		content : j__("Dosya bölümünden kitaplığınıza dönebilir,<br> yayınlarınızı  PDF veya EPUB3 formatında <br>yayınlayabilirsiniz."),
		position:'s',
	},
	{ 
		sel:'#headermenu>ul>li:eq(3)',
		content : j__("Düzen bölümünden kes, kopyala, yapıştır ile sayfa  <br> üzerindeki nesneleri yönetebilirsiniz."),
		position:'s',
	},
	{ 
		sel:'#headermenu>ul>li:eq(4)',
		content : j__("Görünüm bölümünden Cetvel aracı ile <br>  sayfa üzerindeki nesnelerinizin <br> yatay ve dikey pozisyonunu görebilirsiniz"),
		position:'s',
	},
	{ 
		sel:'#headermenu>ul>li:eq(5)',
		content : j__("Bu bölümden sayfa üzerinde metin arama yapabilirsiniz."),
		position:'s',
	},

	{ 
		sel:'#headermenu>ul>li:eq(8)',
		content : j__("Şu an beraber çalıştığınız kişilerin <br>listesini buradan takip edebilirsiniz."),
		position:'s',
	},

	{ 
		sel:'#headermenu>ul>li:eq(7)',
		content : j__("Yaptığınız işlemlerin <br>sonucunu buradan takip edebilirsiniz. <br> Yeşil-> Herşey yolunda, <br> Mavi -> İşlem yapılıyor, <br> Kırmızı -> İnternet Bağlantısı Problemi <br> demektir."),
		position:'s',
		delay:10000
	},
	{ 
		sel:'#headermenu>ul>li:eq(6)',
		content : j__("Bu bölümden profilinizi <br>görüntüleyebilir, hesabınızdan<br> çıkış yapabilirsiniz."),
		position:'s',
	},

	
	/* styler_box */

	
	{ 
		sel:'.styler_box',
		content : j__("Buradan üzerinde çalıştığınız bileşen ile ilgili seçenekleri kontrol edebilirsiniz."),
		position:'s',
		'callback': 
			function(){
				var offset=$('#current_page').offset();

				$($('.component_holder li')[0]).clone().offset($($('.component_holder li')[0]).offset() ) .prependTo('#author_pane_container').css(
				{
					
					'-webkit-background-size': 'contain',
					
					'-webkit-box-shadow': 'rgba(0, 0, 0, 0.74902) 10px 12px 24px -7px',
					'background-color': 'rgb(244, 244, 244)',
					'background-image': 'url(/css/images/components/tr_TR/image.png)',
					'background-position': '50% 50%',
					'background-repeat': 'no-repeat',
					'background-size': 'contain',
					'border-bottom-left-radius': '5px',
					'border-bottom-right-radius': '5px',
					'border-top-left-radius': '5px',
					'border-top-right-radius': '5px',
					'background-image': 'url(/css/images/components/tr_TR/image.png)',
					'background-position': '50% 50%',
					'background-repeat': 'no-repeat',
					'background-size': 'contain',
					'box-sizing': 'border-box',
					'color': 'rgb(34, 71, 97)',
					'cursor': 'move',
					'display': 'block',
					'float': 'left',
					'font-family': "'Helvetica Neue', Arial, Helvetica, sans-serif",
					'font-size': '13px',
					'font-weight': 'normal',
					'height': '60px',
					'line-height': '18.571430206298828px',
					'list-style-image': 'none',
					'list-style-position': 'outside',
					'list-style-type': 'none',
					'margin-bottom': '5px',
					'margin-left': '5px',
					'margin-right': '3px',
					'margin-top': '5px',
					'outline-color': 'rgb(34, 71, 97)',
					'outline-style': 'none',
					'outline-width': '0px',
					'text-align': 'left',
					'width': '73.34375px',
					'z-index': '9999999',
					'position': 'absolute'


				}).animate({
				    left: ("+="+($('#current_page').offset().left+250)),
				   top: ("+="+($('#current_page').offset().top+250)), 
				  }, 3000 ,function() {
				var that = $(this);
				setTimeout(function() {
				   that.remove();
				  } ,1000 ); });
			}

	},

	/* components */

	{ 
		sel:'.components',
		content : j__("Bu panel üzerinden sayfa üzerine sürükle-bırak ile zenginleştirme ekleyebilirsiniz."),
		position:'e'

	},

/*	{ 
		sel:'.icon-zoom.grey-5',
		content : j__("Büyüteç aracı ile sayfayı büyütebilirsiniz."),
		position:'e'

	},
*/
	{ 
		sel:'.chat_button',
		content : j__("Bu bölümden yazarlar aynı yayın üzerinde çoklu çalışma yaparken sohbet edebilirler."),
		position:'e'

	},



	/* Chapters And Pages Panel */

	{ 
		sel:'#chapters_pages_view',
		content : j__("Sağdaki panelden yayınınızın kapağını, sayfalarını ve bölümlerini düzenleyebilirsiniz."),
		position:'w'

	},
	{ 
		sel:'#chapters_pages_view > .box-body > .panel-group > .panel:eq(0)',
		content : j__("Buraya tıklayarak yayınınıza kapak ekleyebilirsiniz."),
		position:'w'

	},
	{ 
		sel:'#chapters_pages_view > .box-body > .panel-group > .panel:eq(1)',
		content : j__("Buraya tıklayarak yayınınızın kütüphanede görüneceği öngörüntüsünü ekleyebilirsiniz."),
		position:'w'

	},
	{ 
		sel:'#chapters_pages_view > .box-body > .panel-group > .panel:eq(2)',
		content : j__("Bu bölümden kullanmak üzere hızlı stillerinizi istediğiniz gibi düzenleyebilirsiniz."),
		position:'w'

	},
	{ 
		sel:'#chapters_pages_view > .box-body > .panel-group > .panel:eq(3)',
		content : j__("Sayfalar bölümünden yeni bölüm başlıklarını değiştirebilir, sayfaları ve bölümleri sıralayabilirsiniz."),
		position:'w'

	},
	{ 
		sel:'#chapters_pages_view > .box-body > .panel-group > .panel:eq(3) i:eq(1) ',
		content : j__("Yeni sayfa ve bölüm ekleyebilirsiniz."),
		position:'w'

	},
