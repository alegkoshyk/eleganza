// Eleganza shared interactivity
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // ===== Drawer (mobile menu) =====
  const drawer = $("#drawer");
  if (drawer) {
    const open = () => drawer.classList.add("open");
    const close = () => drawer.classList.remove("open");
    $("#openDrawer")?.addEventListener("click", open);
    $("#closeDrawer")?.addEventListener("click", close);
    drawer.addEventListener("click", e => { if (e.target === drawer) close(); });
  }

  // ===== Modals =====
  function openModal(id) {
    const m = document.getElementById(id);
    if (m) { m.classList.add("open"); document.body.style.overflow = "hidden"; }
  }
  function closeModal(m) {
    m.classList.remove("open");
    document.body.style.overflow = "";
  }
  $$(".modal-backdrop").forEach(m => {
    m.addEventListener("click", e => { if (e.target === m) closeModal(m); });
    m.querySelector(".close")?.addEventListener("click", () => closeModal(m));
  });
  $$("[data-modal]").forEach(el => {
    el.addEventListener("click", e => {
      e.preventDefault();
      openModal(el.dataset.modal);
    });
  });
  // Auto-open via URL hash (#paywall, #buy-tokens)
  if (location.hash) {
    const id = location.hash.slice(1);
    if (document.getElementById(id)?.classList.contains("modal-backdrop")) {
      openModal(id);
    }
  }

  // ===== Switches (toggle on/off) =====
  document.addEventListener("click", e => {
    const sw = e.target.closest(".switch");
    if (sw) {
      sw.classList.toggle("on");
      sw.setAttribute("aria-checked", sw.classList.contains("on"));
    }
  });

  // ===== Chips toggle (in chip-row containers) =====
  document.addEventListener("click", e => {
    const chip = e.target.closest(".chip");
    if (chip && chip.parentElement?.classList.contains("chip-row")) {
      chip.classList.toggle("active");
    }
  });

  // ===== Match tabs (single-select) =====
  $$(".match-tabs").forEach(tabs => {
    tabs.addEventListener("click", e => {
      const b = e.target.closest("button");
      if (!b) return;
      tabs.querySelectorAll("button").forEach(x => x.classList.remove("active"));
      b.classList.add("active");
    });
  });

  // ===== Token options (Buy more tokens modal) =====
  $$(".token-options").forEach(grid => {
    grid.addEventListener("click", e => {
      const opt = e.target.closest(".token-opt");
      if (!opt) return;
      grid.querySelectorAll(".token-opt").forEach(o => o.classList.remove("active"));
      opt.classList.add("active");
    });
  });

  // ===== Product card toggle (matching screen) =====
  document.addEventListener("click", e => {
    const prod = e.target.closest(".product");
    if (prod) prod.classList.toggle("selected");
  });

  // ===== Group collapse (studio) =====
  document.addEventListener("click", e => {
    const head = e.target.closest(".group-head");
    if (head) head.parentElement.classList.toggle("collapsed");
  });

  // ===== Studio product toggle =====
  document.addEventListener("click", e => {
    const sp = e.target.closest(".studio-product");
    if (sp) {
      sp.classList.toggle("selected");
      // recount
      const grp = sp.closest(".group");
      if (grp) {
        const n = grp.querySelectorAll(".studio-product.selected").length;
        grp.querySelectorAll(".selcount").forEach(el => el.textContent = n);
      }
      const total = $$(".studio-product.selected").length;
      const t = $("#totalCount");
      if (t) t.textContent = total;
    }
  });

  // ===== Mobile nav active state from current path =====
  const path = location.pathname.replace(/\/$/, "") || "/";
  $$(".mobile-tabbar a, .sidebar .nav-item, .topnav a").forEach(a => {
    if (a.tagName === "A") {
      const href = a.getAttribute("href")?.replace(/\/$/, "");
      if (href && (href === path || (href !== "/" && path.startsWith(href)))) {
        a.classList.add("active");
      }
    }
  });
})();
