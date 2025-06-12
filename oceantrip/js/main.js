$(function () {
  AOS.init();

//햄버거 메뉴
$('.ham').click(function(){
  $('header').toggleClass('on');
})

  /* notice - simplyScroll */

  $('.noticeAni').simplyScroll(
    {
      speed: 10, /* 5가 중간속도 */
      direction: 'backwards',
      // pauseOnHover: false,/* hover 해도 안멈추게  */
      frameRate: 10,

    }
  )


  /*main_visual 버튼 */


  /* info 버튼 */

  $(".info_icon_inner").hover(
    function () {
      $(this).css(
        'box-shadow', '0 0 70px #fff'
      );
    },
    function () {
      $(this).css('box-shadow', 'none');
    }
  );



  /* photo_slide */
  let photo = new Swiper(".photo_slide", {
    loop: true,
    centeredSlides: true,
    spaceBetween: 100,
    slidesPerView: 1.5,
    navigation: {
      nextEl: ".photo_slide .prev_next .next",
      prevEl: ".photo_slide .prev_next .prev",
    },
  });
});