function toCollapseContainer(el) {
  // container background
  const toBeCallapedEl = el
    .closest(".content-container")
    .querySelector(".container-collapsible");

  // container timer element
  const toBeHiddenEl = toBeCallapedEl
    .closest(".content-container")
    .querySelector(".status-updated-time");

  toBeCallapedEl.setAttribute("state", "collpased");
  toBeHiddenEl.style.display = "none";
  setTimeout(() => {
    toBeCallapedEl.style.display = "none";
  }, 250);
}

function toExpandContainer(el) {
  // container background
  const toBeExpandedEl = el
    .closest(".content-container")
    .querySelector(".container-collapsible");

  // container timer element
  const toBeUnhiddenEl = toBeExpandedEl
    .closest(".content-container")
    .querySelector(".status-updated-time");
  toBeUnhiddenEl.style.display = "flex";
  toBeExpandedEl.style.display = "flex";
  toBeExpandedEl.setAttribute("state", "expanded");
}

export default {
  toCollapseContainer,
  toExpandContainer,
};
