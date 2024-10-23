const toggleNavbar = () => {
  const navbar = document.querySelector(".navmobile");
  if (navbar!.classList.contains("hidden")) {
    navbar!.classList.remove("hidden");
    navbar!.classList.add("flex");
    disableScroll();
  } else {
    navbar!.classList.remove("flex");
    navbar!.classList.add("hidden");
    enableScroll();
  }
};

function disableScroll() {
  document.body.style.overflow = "hidden";
}

function enableScroll() {
  document.body.style.overflow = "auto";
}

export default toggleNavbar;
