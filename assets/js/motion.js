// 画面に入った要素を、下から順にすっと出す（動きを減らす設定の人には何もしない）
(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;
  document.documentElement.classList.add("motion");

  var SEL = [
    ".hero-inner .eyebrow", ".hero-inner h1", ".hero-body > *",
    ".page-hero .wrap > div > *:not(ol)", ".page-hero .flow li",
    ".section-number", ".section-heading", ".section-body > *:not(ul):not(ol)",
    ".flow li", ".ruled-list li", ".video-row", ".reading-grid article", ".faq",
    ".atmosphere .wrap > div", ".teacher figure", ".method-portrait",
    ".teacher-note > *", ".types", ".coming", ".lesson", ".facts", ".price",
    ".school-outline p", ".footer-head"
  ].join(",");

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

  function prep(el) {
    if (el.classList.contains("rv")) return;
    // 同じ親の中で何番目かで、少しずつ遅らせる
    var i = 0, s = el.previousElementSibling;
    while (s && i < 6) { if (s.matches(SEL)) i++; s = s.previousElementSibling; }
    var base = el.closest(".hero, .page-hero") ? 450 : 0;
    el.style.setProperty("--d", (base + i * 110) + "ms");
    el.classList.add("rv");
    if (el.matches(".lesson, .flow li, .ruled-list li")) el.classList.add("rv-side");
    io.observe(el);
  }
  function scan(root) {
    if (root.matches && root.matches(SEL)) prep(root);
    if (root.querySelectorAll) root.querySelectorAll(SEL).forEach(prep);
  }

  document.addEventListener("DOMContentLoaded", function () {
    scan(document.body);
    // 受講生ページはタブで動画の一覧を作り直すので、増えた分も拾う
    new MutationObserver(function (list) {
      list.forEach(function (m) { m.addedNodes.forEach(function (n) { if (n.nodeType === 1) scan(n); }); });
    }).observe(document.body, { childList: true, subtree: true });
  });
})();
