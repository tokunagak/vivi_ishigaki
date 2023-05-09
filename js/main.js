'use strict';
$(function(){
    
    // -----------------------------------------
    // ハンバーガーメニュー開閉
    // -----------------------------------------
    
    $('.bl_menuBtn').on('click',function(){
        $('.bl_menuBtn').toggleClass('is_clicked');
        $('.bl_menu').toggleClass('is_clicked');
    });
    
    // -----------------------------------------
    //スライダー
    // -----------------------------------------
    function slider(){
        
        $('.bl_slider').slick({
            fade:true,//切り替えをフェードで行う。初期値はfalse。
            autoplay: true,//自動的に動き出すか。初期値はfalse。
            autoplaySpeed: 3000,//次のスライドに切り替わる待ち時間
            speed:1000,//スライドの動きのスピード。初期値は300。
            initialSlide:0,//最初のスライドを指定
            infinite: true,//スライドをループさせるかどうか。初期値はtrue。
            slidesToShow: 1,//スライドを画面に3枚見せる
            slidesToScroll: 1,//1回のスクロールで3枚の写真を移動して見せる
            arrows: true,//左右の矢印あり
            prevArrow: '<div class="slick-prev"></div>',//矢印部分PreviewのHTMLを変更
            nextArrow: '<div class="slick-next"></div>',//矢印部分NextのHTMLを変更
            dots: true,//下部ドットナビゲーションの表示
            pauseOnFocus: false,//フォーカスで一時停止を無効
            pauseOnHover: false,//マウスホバーで一時停止を無効
            pauseOnDotsHover: false,//ドットナビゲーションをマウスホバーで一時停止を無効
        });
        
        // スマホ用：スライダーをタッチしても止めずにスライドをさせたい場合
        $('.bl_slider').on('touchmove', function(event, slick, currentSlide, nextSlide){
            $('.bl_slider').slick('slickPlay');
        });
    }
    
    slider();
    
    // -----------------------------------------
    // ページトップへ遷移ボタン
    // -----------------------------------------
    
    function PageTopAnime(){
        
        const scroll = $(window).scrollTop();
        
        if(scroll >= 200){
            $('.bl_pageTop').fadeIn();
        }else {
            $('.bl_pageTop').fadeOut();
        };
    };
    
    $(window).scroll(function () {
        PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
    });
    
    $('.bl_pageTop_link').click(function () {
        $('body,html').animate({
            scrollTop:0//ページトップまでスクロール
        },);//ページトップスクロールの速さ。数字が大きいほど遅くなる
        return false;//リンク自体の無効化
    });
    
    // -----------------------------------------
    // スクロールされた際の表示非表示
    // -----------------------------------------
    faideAnime();
    
    $(window).resize(function() {
        faideAnime();
    });
    
    
    $(window).scroll(function(){
        faideAnime();
    });
    
    function faideAnime(){
        $('.fadeInTrigger').each(function(){
            let target = $(this).offset().top -= 50;
            let scroll = $(window).scrollTop();
            let windowHeight = $(window).height();
            
            if(scroll > target - windowHeight + 200) {
                $(this).addClass('animate__animated animate__fadeIn');
            }else {
                $(this).removeClass('animate__animated animate__fadeIn');
            }
        });
        
        $('.fadeInLeftTrigger').each(function(){
            let target = $(this).offset().top -= 50;
            let scroll = $(window).scrollTop();
            let windowHeight = $(window).height();
            
            if(scroll > target - windowHeight + 300) {
                $(this).addClass('animate__animated animate__fadeInLeft');
            }else {
                $(this).removeClass('animate__animated animate__fadeInLeft');
            }
        });
        
        $('.fadeInTrigger_original').each(function(){
            let target = $(this).offset().top -= 50;
            let scroll = $(window).scrollTop();
            let windowHeight = $(window).height();
            
            if(window.matchMedia("(max-width: 768px)").matches){
                if(scroll > target - windowHeight + 300) {
                    $(this).addClass('animate__animated animate__fadeIn');
                }else {
                    $(this).removeClass('animate__animated animate__fadeIn');
                };
            }else{ 
                if(scroll > target - windowHeight + 300) {
                    $(this).addClass('animate__animated animate__fadeInLeft');
                }else {
                    $(this).removeClass('animate__animated animate__fadeInLeft');
                };
            };
            
            
        });
    };
    
    // -----------------------------------------
    // メイン画像の切り替え
    // -----------------------------------------
    
    function control_mv() {
        // 動画とスライダーの表示切り替え
        $('.switch').toggleClass('animate__animated animate__fadeIn');
        
        btn_txt();
        
        // スライダーの設定をリセットして再度設定し、１番目から開始
        $('.bl_slider').slick('unslick');
        slider();
        
        // 動画を初めから再生
        const videoPlay = $('.bl_videoWrapper > video')[0];
        videoPlay.currentTime = 0;
        videoPlay.play();
    };
    
    // ボタンの文字の切り替え関数
    
    function btn_txt(){
        if($('.el_mvBtn').text().trim() != 'skip'){
            $('.el_mvBtn').text('skip');
        }else {
            $('.el_mvBtn').text('replay');
        }
        
    };
    
    // control_mv()のイベントボタン
    $('.el_mvBtn').on('click', function(){
        control_mv()
        if($('.bl_videoWrapper').hasClass('animate__animated')){
            videoTimer();
        }
    });
    
    
    // 動画再生終了時の切り替わり
    function videoTimer() {
        const opVideo = $('.bl_videoWrapper > video').get(0);
    
        opVideo.addEventListener('loadedmetadata', function() {
        const playTime = opVideo.duration * 1000 - 1000;
    
        // 確認用
        console.log('動画の時間（長さ）： ' + opVideo.duration);
        console.log('動画の表示時間： ' + playTime);
    
        setTimeout(function(){
            control_mv()
        }, playTime);
    
        });
    };
    
    videoTimer();
    
});//$(function(){})の閉じ
