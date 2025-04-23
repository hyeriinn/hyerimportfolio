document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  // ✅ <strong>, <br> 등 유지하면서 텍스트 분해
  function splitTextPreserveTags(element) {
    const walk = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        const chars = node.textContent.split('');
        chars.forEach(char => {
          const span = document.createElement('span');
          span.className = 'char';
          span.innerHTML = char === ' ' ? '&nbsp;' : char;
          frag.appendChild(span);
        });
        return frag;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName === 'BR') return document.createElement('br');
        const clone = node.cloneNode(false);
        node.childNodes.forEach(child => {
          clone.appendChild(walk(child));
        });
        return clone;
      }
      return document.createTextNode('');
    };
    const result = walk(element);
    element.innerHTML = '';
    element.appendChild(result);
  }


  // ✅ rock 고정 위치 세팅
  const rock = document.querySelector(".rock");
  const vh = window.innerHeight;
  const vw = window.innerWidth;

  gsap.set(rock, {
    position: "fixed",
    top: vh * 0.55,
    left: vw * 0.5,
    xPercent: -50,
    yPercent: -50,
    opacity: 1,
    filter: "blur(0)"
  });

  // ✅ main 진입 시 rock 등장
  gsap.to(rock, {
    scrollTrigger: {
      trigger: "#main",
      start: "top top",
      end: "bottom top",
      scrub: true
    },
    x: 50,
    opacity: 1,
    filter: "blur(0px)"
  });

  // ✅ intro 텍스트 애니메이션 준비
  const h3 = document.querySelector(".intro_txt_bottom h3");
  splitTextPreserveTags(h3); // ✅ h3만 적용됨

  // ✅ intro 섹션 애니메이션
  const sculpture = gsap.timeline({
    scrollTrigger: {
      trigger: "#intro",
      start: "top top",
      end: "+=1200",
      scrub: true,
      pin: true,
      anticipatePin: 1,
      pinSpacing: true
    }
  });

  sculpture
    .from(".sculpture_line", {
      strokeDashoffset: 4000,
      autoAlpha: 0,
      ease: "power1.out"
    })
    .to(".sculpture_line", {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power1.out"
    })
    .from(".intro_txt_bottom", {
      opacity: 0,
      y: 50,
      duration: 0.6,
      ease: "power2.out"
    }, "+=0.3")
    .from(".intro_txt_bottom h3 .char", {
      opacity: 0,
      y: 20,
      stagger: 0.03,
      duration: 0.4,
      ease: "power2.out"
    }, "-=0.3");



  const profileTL = gsap.timeline();
  profileTL
    .from(".profile_contents .info", {
      x: -100,
      y: -100,
      autoAlpha: 0,
      duration: 0.6,
    })
    .from(".profile_contents .greet", {
      x: -100,
      autoAlpha: 0,
      duration: 0.6,
    })
    .from(".profile_contents .personality", {
      x: 100,
      y: -100,
      autoAlpha: 0,
      duration: 0.6,
    })
    .from(".profile_contents .skill", {
      x: -100,
      y: 100,
      autoAlpha: 0,
      duration: 0.6,
    })
    .from(".profile_contents .certificate", {
      x: 100,
      y: 100,
      autoAlpha: 0,
      duration: 0.6,
    })
    .to(".rock", {
      x: () => -window.innerWidth / 2,
      opacity: 0.4,
      filter: "blur(8px)",
      duration: 0.6,
    });
  ScrollTrigger.create(
    {
      animation: profileTL,
      trigger: ".profile_contents",
      start: "top top",
      end: "+=1000", // 전체 애니메이션이 끝날 만큼의 충분한 길이
      scrub: true,
      pin: true,
      anticipatePin: 1,
      // markers: true, // 디버깅용
      onEnter: () => rock.classList.add("behind_profile"),
      onLeaveBack: () => {
        rock.classList.remove("behind_profile"),
          gsap.set(rock, { filter: 'blur(0)', opacity: 1 })
      },
      onEnterBack: () => {gsap.set(rock, { filter: 'blur(0)', opacity: 1 })}
    }

  );
  VanillaTilt.init(document.querySelector(".profile_contents"), {
    max: 15,
    speed: 400,
    glare: false,
    "max-glare": 0.2,
  })
  // ✅ rock - projects 진입 시 이동

  const projectTL = gsap.timeline();
  projectTL.from(".rock", { opacity: 0.4, filter: "blur(8px)", });


  gsap.to(rock, {
    // x: () => -window.innerWidth / 2,
    scrollTrigger: {
      trigger: "#projects",
      start: "top top",
      end: "bottom bottom",
      // pin: true,
      // pinSpacing: false,
      scrub: true,
      // markers: true, // 디버깅용
    },
    opacity: 0.4,
    filter: "blur(8px)",

  });

  const SIDEBAR = document.querySelector(".project_left");
  const TRIGGER = document.querySelector(".projects_all");
  const END_TRIGGER = document.querySelector(".projects_all article:last-child");
  const LINK_TRIGGERS = [...document.querySelectorAll(".project_link")];
  const CONTENT_ITEMS = [...document.querySelectorAll(".project_detail")];




  ScrollTrigger.create({
    trigger: "#projects",      // ★ 고정 범위를 projects 전체 섹션으로
    start: "top top",        // ★ 뷰포트 탑에 닿을 때부터
    end: "bottom bottom",  // ★ 섹션 끝까지
    pin: ".project_left",  // ★ .project_left 요소를 고정
    pinSpacing: false,
    scrub: true,             // ★ 스크럽 넣어 스크롤과 동기화
    // markers: true           // (원하면 디버깅용)
    onEnter: () => { gsap.set('nav ul li', { color: '#181919', borderBottom: '1px solid #181919' }) },
    onLeaveBack: () => { gsap.set('nav ul li', { color: '#ffffff', borderBottom: '1px solid #ffffff' }) }
  });

  CONTENT_ITEMS.forEach((content, index) => {
    ScrollTrigger.create({
      trigger: content,
      start: "top center",
      end: "bottom center",
      toggleClass: {
        targets: LINK_TRIGGERS[index],
        className: "active"
      }
    });
  });

  // ✅ contact 진입 시 rock 사라짐
  ScrollTrigger.create({
    trigger: "#contact",
    start: "top center",
    onEnter: () => { gsap.to(rock, { opacity: 0, duration: 0.5 }), gsap.set('nav ul li', { display: 'none' }) },
    onEnterBack: () => gsap.to(rock, { opacity: 0.4, duration: 0.5 }),

    onLeaveBack: () => { gsap.set('nav ul li', { display: 'block' }) }
  });
});
