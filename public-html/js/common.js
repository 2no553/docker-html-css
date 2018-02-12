// JavaScript Document

///////////////////////////////////////////////////////////////////////////
//ViewPort
///////////////////////////////////////////////////////////////////////////		
$(function(){
	var wid2 = window.innerWidth;
		//alert(wid2);
	if( wid2 < 768 ){
		//alert("SP");
	}
	else if ( 768 <= wid2 && wid2 <= 1024 ){
		//alert("iPad");
		$('head').append('<meta name="viewport" content="width=device-width, initial-scale=0.75,user-scalable=1">');
	}
	else {
		//alert("PC");
	}
});

///////////////////////////////////////////////////////////////////////////
//スマホとPC
///////////////////////////////////////////////////////////////////////////	
$(function(){
	var wid = window.innerWidth;

//Langage
	$('#Hd div.language').click(function() {
		$('#Hd div.language ul').slideToggle('fast');
	});	

//ハンバーガーメニュー
	$('div.hum a').click(function(){
		$('html').toggleClass('open');
		$('body').toggleClass('open');
	});
//URLから現在地を取る
	var url = window.location;	
    var path = url.href.split('/');
    var file_name_full = path.pop();
	var file_name = file_name_full.replace(/#.*$/,"");
	$('article a').each(function(){
		if($(this).attr('href').match(file_name)) {
			$(this).parent('li').addClass('curr');
		}
	});
//スムーズスクロール
   // #で始まるアンカーをクリックした場合に処理
   $('a[href^=#]').click(function() {
      // スクロールの速度
      var speed = 1000; // ミリ秒
      // アンカーの値取得
      var href= $(this).attr("href");
      // 移動先を取得
      var target = $(href == "#" || href == "" ? 'html' : href);
      // 移動先を数値で取得
      var position = target.offset().top - 50;
      // スムーススクロール
      $('body,html').animate({scrollTop:position}, speed, 'easeOutCubic');
      return false;
   });
	
///////////////////////////////////////////////////////////////////////////
//以下スマホサイト
///////////////////////////////////////////////////////////////////////////
if( wid < 1024 ){
	
}
///////////////////////////////////////////////////////////////////////////
//以下PCサイト
///////////////////////////////////////////////////////////////////////////
else if( wid >= 1023 ) {

}

//以上	
});