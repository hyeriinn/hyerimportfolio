$(function () {
  /* notice - simplyScroll */
  $('.noticeAni').simplyScroll({
    speed: 10,
    direction: 'backwards',
    frameRate: 10,
  });
})
document.addEventListener("DOMContentLoaded", () => {
  AOS.init();

  //햄버거 메뉴
  $('.ham').click(function () {
    $('header').toggleClass('on');
  })



  /* main select */
  let data = {
    jeju: {
      제주시: ["협재해수욕장", "함덕해수욕장", "이호테우해수욕장", "삼양해수욕장", "금능해수욕장", "곽지해수욕장", "김녕해수욕장", "월정해수욕장"],
      서귀포시: ["중문해수욕장", "표선해비치", "중문색달해수욕장", "신양섭지해수욕장", "화순금모래해수욕장", "표선해수욕장"]
    },
    gyeonggi: {
      화성시: ["제부도", "궁평리해수욕장"],
      안산시: ["방아머리해변", "대부도"]
    }
  };

  const regionMap = {
    "제주": "jeju",
    "경기": "gyeonggi"
  };

  const selected = {
    region: "제주",
    city: "제주시",
    beach: "협재해수욕장"
  };

  const dropdowns = document.querySelectorAll(".dropdown");
  const preview = document.getElementById("preview");

  initDropdowns();

  function initDropdowns() {
    dropdowns.forEach(dropdown => {
      const btn = dropdown.querySelector(".dropdown-toggle");
      btn.addEventListener("click", () => {
        dropdowns.forEach(d => d.classList.add("open"));
      });
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".dropdown-group")) {
        dropdowns.forEach(d => d.classList.remove("open"));
      }
    });

    dropdowns.forEach(drop => {
      const type = drop.dataset.type;
      const menu = drop.querySelector(".dropdown-menu");
      const btn = drop.querySelector(".dropdown-toggle");

      if (menu) {
        menu.addEventListener("click", (e) => {
          if (e.target.tagName !== "LI") return;
          const label = e.target.textContent;
          selected[type] = label;
          btn.textContent = label;
          updateMenuSelection(menu, label);

          if (type === "region") {
            selected.city = "";
            selected.beach = "";
            renderCities(label);
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
  }

  function renderCities(regionKey) {
    const key = regionMap[regionKey] || regionKey;
    const cityMenu = document.querySelector('[data-type="city"] .dropdown-menu');
    cityMenu.innerHTML = "";
    const cities = Object.keys(data[key] || {});
    cities.forEach(city => {
      const li = document.createElement("li");
      li.textContent = city;
      if (city === selected.city) li.classList.add("selected");
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
      if (beach === selected.beach) li.classList.add("selected");
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

  function updateMenuSelection(menu, label) {
    const items = menu.querySelectorAll("li");
    items.forEach(item => {
      item.classList.toggle("selected", item.textContent === label);
    });

    /* info 버튼 */
    $(".info_icon_inner").hover(
      function () {
        $(this).css('box-shadow', '0 0 70px #fff');
      },
      function () {
        $(this).css('box-shadow', 'none');
      }
    );

  }
  /* photo_slide */
  /*   let photo = new Swiper(".photo_slide", {
      loop: true,
      centeredSlides: true,
      spaceBetween: 100,
      slidesPerView: 1,
      navigation: {
        nextEl: ".photo_slide .prev_next .next",
        prevEl: ".photo_slide .prev_next .prev",
      },
    }); */

  const animalInfo = [
    {
      rank: "멸종위기동물 1급",
      title: "청다리 도요사촌",
      name: "Totanus guttifer Nordmann",
      type: "도요목 도요과",
      size: "약 29~34cm",
      feature: "다리가 짧고 노란색. 부리는 길고 위로 휘며, 기부는 크고 황색을 띔.",
      habitat: "서해안·남해안 갯벌, 강 하구에 도래",
      danger: "서해안 지역의 갯벌 매립과 해안 개발로 인한 서식처 소실,밀렵, 해안 습지 오염으로 인한 개체수 감소",

    },
    {
      rank: "멸종위기동물 1급",
      title: "녹색바다거북",
      name: "Chelonia mydas",
      type: "거북목 바다거북과",
      size: "몸길이 최대 2m, 몸무게 약 200kg, 등딱지 길이 78~112cm",
      feature: "목을 등딱지 속으로 넣지 못함, 아래턱은 강하고 톱니모양",
      habitat: "태평양, 대서양, 인도양의 열대 및 아열대 바다",
      danger: "해양 오염, 불법 포획, 기후 변화로 인한 산란지 파괴"
    },
    {
      rank: "멸종위기동물 1급",
      title: "남방큰돌고래",
      name: "Tursiops aduncus",
      type: "고래목 돌고래과",
      size: "몸길이 최대 2.6m / 몸무게 약 230kg",
      feature: "몸집이 가늘고, 주둥이는 가늘고 길며, 등은 짙은 회색, 배는 밝은 회색 또는 회색 반점",
      habitat: "제주도 해안을 포함하여 인도, 중국 남부, 홍해 등지의 해안",
      danger: "해양 오염, 특히 플라스틱 및 중금속 축적, 관광 상업화로 인한 지속적 인간 접근과 교란"
    }
  ];

  const infoBox = document.getElementById("info-text");

  function updateInfo(index) {
    const bird = animalInfo[index];
    infoBox.innerHTML =
      `<div class="photo_txt_title">
        <div class="photo_txt_title_L">
        <h2 class="photo_i">${bird.title}</h2>
       <em>${bird.name}</em>
      </div >
      <b>${bird.rank}</b>
      </div>
      <ul  class="photo_txt_body">
      <li><strong>분류</strong><p>${bird.type}</p></li>
      <li><strong>크기</strong><p>${bird.size}</p></li>
      <li><strong>특징</strong><p>${bird.feature}</p></li>
      <li><strong>서식지</strong><p>${bird.habitat}</p></li>
      </ul>

      <div class="photo_txt_bottom">
      <strong>멸종위기 요인</strong>
      <p>${bird.danger}</p>
      </div>
    `;
  }

  const swiper = new Swiper(".swiper", {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    navigation: {
      nextEl: ".slide_next",
      prevEl: ".slide_prev"
    },
    scrollbar: {
      el: ".swiper-scrollbar",
    },
    on: {
      slideChange: function () {
        updateInfo(this.realIndex);
      }
    }
  });

  updateInfo(0);


});
