"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/digerati/skipToMainContent.ts
  var skipToMainContent = () => {
    const trigger = document.querySelector('[dd-skip-to-main-content="trigger"]'), target = document.querySelector('[dd-skip-to-main-content="target"]');
    if (!trigger || !target) {
      return;
    }
    ["click", "keypress"].forEach((event) => {
      trigger.addEventListener(event, (e) => {
        if (e.type === "keydown" && e.which !== 13) {
          return;
        }
        e.preventDefault();
        target.setAttribute("tabindex", "-1");
        target.focus();
      });
    });
  };

  // src/digerati/currentYear.ts
  var currentYear = () => {
    const target = document.querySelector('[dd-date="current-year"]');
    if (!target) {
      return;
    }
    const fullYear = (/* @__PURE__ */ new Date()).getFullYear();
    target.innerText = fullYear.toString();
  };

  // src/a7architecture/teamMemberModal.ts
  var teamMemberModal = () => {
    const showModalLinks = document.querySelectorAll('[dd-modal="show"]'), modal = document.querySelector('[dd-modal="modal"]');
    if (!showModalLinks || !modal) {
      return;
    }
    showModalLinks.forEach((showModalLink) => {
      showModalLink.addEventListener("click", () => {
        let teamMember = showModalLink;
        if (!teamMember) {
          return false;
        }
        modal.querySelector(['[dd-modal="name"]']).innerText = teamMember.querySelector('[dd-tm="name"]').innerText;
        modal.querySelector(['[dd-modal="qualification"]']).innerText = teamMember.querySelector('[dd-tm="qualification"]').innerText;
        modal.querySelector(['[dd-modal="job-title"]']).innerText = teamMember.querySelector('[dd-tm="job-title"').innerText;
        modal.querySelector(['[dd-modal="image"]']).src = teamMember.querySelector('[dd-tm="image"]').src;
        modal.querySelector(['[dd-modal="email"]']).href = teamMember.querySelector('[dd-tm="email"]').href;
        modal.querySelector(['[dd-modal="biography"]']).innerHTML = teamMember.querySelector('[dd-tm="biography"]').innerHTML;
        modal.querySelector(['[dd-modal="fact-question"]']).innerHTML = teamMember.querySelector('[dd-tm="fact-question"]').innerHTML;
        modal.querySelector(['[dd-modal="fact-answer"]']).innerHTML = teamMember.querySelector('[dd-tm="fact-answer"]').innerHTML;
      }, { passive: true });
    });
  };

  // src/digerati/setEqualHeight.ts
  var setEqualHeight = () => {
    const selector = '[dd-equal="height"]';
    const adjustHeights = () => {
      const slides = document.querySelectorAll(selector);
      console.log(`Found ${slides.length} slides using selector "${selector}"`);
      let maxHeight = 0;
      slides.forEach((slide) => {
        slide.style.height = "";
        const slideHeight = slide.offsetHeight;
        console.log(`Slide height: ${slideHeight}px`);
        if (slideHeight > maxHeight) {
          maxHeight = slideHeight;
        }
      });
      console.log(`Tallest slide height determined: ${maxHeight}px`);
      slides.forEach((slide) => {
        slide.style.height = maxHeight + "px";
        console.log(`Setting slide height to ${maxHeight}px`);
      });
      console.log(`Adjusted slide heights to ${maxHeight}px`);
    };
    adjustHeights();
    window.addEventListener("resize", adjustHeights);
  };
  var targetSelector = '[fs-cmsslider-element="list"]';
  var targetNode = document.querySelector(targetSelector);
  if (targetNode) {
    const config = { childList: true };
    let hasExecuted = false;
    const observerCallback = (mutationsList, observer2) => {
      if (!hasExecuted && targetNode.children.length === 0) {
        console.log(`${targetSelector} is empty. Executing setEqualHeight now.`);
        setEqualHeight();
        hasExecuted = true;
        observer2.disconnect();
      }
    };
    const observer = new MutationObserver(observerCallback);
    observer.observe(targetNode, config);
  } else {
    console.warn(`Element with selector ${targetSelector} not found.`);
  }

  // src/index.ts
  window.Webflow || [];
  window.Webflow.push(() => {
    skipToMainContent();
    currentYear();
    teamMemberModal();
    setEqualHeight();
  });
})();
//# sourceMappingURL=index.js.map
