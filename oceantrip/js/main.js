document.addEventListener("DOMContentLoaded", () => {
  AOS.init();

  //햄버거 메뉴
  $('.ham').click(function () {
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


  /* main select */
  let data = {};

  const regionMap = {
    "제주": "jeju",
    "경기": "gyeonggi"
  };

  const selected = {
    region: "",
    city: "",
    beach: ""
  };

  const dropdowns = document.querySelectorAll(".dropdown");
  const preview = document.getElementById("preview");

  fetch("./data/loca.json")
    .then(res => res.json())
    .then(json => {
      data = json;
      initDropdowns(); // fetch 후 드롭다운 이벤트 등록
    })
    .catch(err => {
      console.error("데이터 불러오기 실패:", err);
    });

  function initDropdowns() {
    // 열고 닫기
    dropdowns.forEach(dropdown => {
      const btn = dropdown.querySelector(".dropdown-toggle");
      btn.addEventListener("click", () => {
        closeAll();
        dropdown.classList.toggle("open");
      });
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".dropdown-group")) closeAll();
    });

    dropdowns.forEach(drop => {
      const type = drop.dataset.type;
      const menu = drop.querySelector(".dropdown-menu");
      const btn = drop.querySelector(".dropdown-toggle");
      if (menu) {
        menu.addEventListener("click", (e) => {
          if (e.target.tagName !== "LI") return;
          const label = e.target.textContent;
          const value = e.target.dataset.value || label;
          selected[type] = label;
          btn.textContent = label;
          drop.classList.remove("open");

          if (type === "region") {
            selected.city = "";
            selected.beach = "";
            renderCities(value);
            renderBeaches(null);
            resetButton("city", "도시 선택");
            resetButton("beach", "해변 선택");
          }

          if (type === "city") {
            selected.beach = "";
            renderBeaches(label);
            resetButton("beach", "해변 선택");
          }

          updatePreview();
        });
      }
    });
    function closeAll() {
      dropdowns.forEach(d => d.classList.remove("open"));
    }

    function renderCities(regionKey) {
      const key = regionMap[regionKey] || regionKey; // 매핑 우선, 없으면 그대로
      const cityMenu = document.querySelector('[data-type="city"] .dropdown-menu');
      cityMenu.innerHTML = "";
      const cities = Object.keys(data[key] || {});
      cities.forEach(city => {
        const li = document.createElement("li");
        li.textContent = city;
        cityMenu.appendChild(li);
      });


    }

    function renderBeaches(city) {
      const beachMenu = document.querySelector('[data-type="beach"] .dropdown-menu');
      beachMenu.innerHTML = "";
      if (!city || !selected.region) return;

      const regionKey = regionMap[selected.region];
      const beaches = data[regionKey]?.[city] || [];

      beaches.forEach(beach => {
        const li = document.createElement("li");
        li.textContent = beach;
        beachMenu.appendChild(li);
      });
    }

    function resetButton(type, defaultText) {
      const btn = document.querySelector(`.dropdown[data-type="${type}"] .dropdown-toggle`);
      btn.textContent = defaultText;
    }

    function updatePreview() {
      const values = Object.values(selected).filter(v => v);
      preview.textContent = values.length
        ? `선택한 항목: ${values.join(" > ")}`
        : "선택한 항목이 없습니다.";
    }




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
  };
});
