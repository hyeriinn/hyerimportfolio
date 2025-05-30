$(function () {

  AOS.init();


  $(".light_toggle").click(function () {
    $('.toggle_btn').toggleClass("active");
    $(".column_left, .column_right").toggleClass("active");
  });

  /* new */
  var swiper = new Swiper(".new", {
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".new_next",
      prevEl: ".new_prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });


  /* best_seller 더보기 */

  $('.best_more button').click(function () {
    $('.best_list>ul>li>ul>li:nth-child(4),.best_list>ul>li>ul>li:nth-child(5) ').slideDown(500).removeClass('best_hide');
    $(this).parent().css("display", "none");

  })

  /* family - simplyscroll*/


  $('.famAni').simplyScroll(
    {
      speed: 10, /* 5가 중간속도 */
      direction: 'backwards',
      // pauseOnHover: false,/* hover 해도 안멈추게  */
      frameRate: 10,

    }
  )


});

