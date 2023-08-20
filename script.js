"use strict";

// story change btns

const storyBtnsContainerEl = document.querySelector(".story-parts");
const storyParagraphsContainerEl = document.querySelector(".story-paragraphs");
const storyBtnEls = document.querySelectorAll(".story-part");
const storyParagraphEls = document.querySelectorAll(".story-paragraph");

storyBtnsContainerEl.addEventListener("click", function (e) {
  const clickedBtn = e.target;
  if (!clickedBtn.classList.contains("story-part")) return;

  const btnID = clickedBtn.dataset.id;
  const paragraphEl = document.querySelector(`#${btnID}`);

  storyBtnEls.forEach((btn) => btn.classList.remove("active-story-part"));
  clickedBtn.classList.add("active-story-part");

  storyParagraphEls.forEach((p) => {
    p.classList.remove("active-story-paragraph");
  });
  paragraphEl.classList.add("active-story-paragraph");
});

// service hover effect

const servicesContainerEl = document.querySelector(".services");

servicesContainerEl.addEventListener("mouseover", (e) => {
  if (!e.target.closest(".service")) return;
  e.target.closest(".service").classList.add("service-hov");
});

servicesContainerEl.addEventListener("mouseout", (e) => {
  if (!e.target.closest(".service")) return;
  e.target.closest(".service").classList.remove("service-hov");
});

// portfolio type choice

const portfoliosContainerEl = document.querySelector(".portfolio-projects");
const portfolioEls = document.querySelectorAll(".portfolio-project");
const portfolioElsArr = [...portfolioEls];
const portfolioTypeContainerEl = document.querySelector(".portfolio-types");
const portfolioTypeEls = document.querySelectorAll(".portfolio-type");

function markupPortfolio(portfolioArr) {
  let portfolio = "";
  portfolioArr.forEach((el) => (portfolio += el.outerHTML));
  return portfolio;
}

portfolioTypeContainerEl.addEventListener("click", (e) => {
  if (!e.target.classList.contains("portfolio-type")) return;
  setTimeout(() => {
    portfoliosContainerEl.style.opacity = "1";
  }, 100);
  portfoliosContainerEl.style.opacity = "0";

  if (e.target.dataset.type === "all") {
    portfoliosContainerEl.innerHTML = markupPortfolio(portfolioEls);
    return;
  }
  const type = e.target.dataset.type;

  portfolioTypeEls.forEach((el) => el.classList.remove("active-type"));
  e.target.classList.add("active-type");

  const newPortfolioList = portfolioElsArr.filter(
    (portfolio) => portfolio.dataset.type === type
  );
  portfoliosContainerEl.innerHTML = markupPortfolio(newPortfolioList);
});

// portfolio hover , portfolio galery, portfolio img link

const pfContainerEl = document.querySelector(".portfolio-projects");
const pfLinkEls = document.querySelectorAll(".pf-icon-link");

pfContainerEl.addEventListener("mouseover", function (e) {
  const target = e.target.closest(".portfolio-project");
  if (!target) return;
  const overlay = target.querySelector(".pf-overlay");

  overlay.classList.add("pf-hov");
});

pfContainerEl.addEventListener("mouseout", function (e) {
  const target = e.target.closest(".portfolio-project");
  if (!e.target.closest(".portfolio-project")) return;
  const overlay = target.querySelector(".pf-overlay");

  overlay.classList.remove("pf-hov");
});

pfLinkEls.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const url = window.location.href;
    const extension = e.target
      .closest(".pf-img-container")
      .querySelector(".portfolio-img")
      .getAttribute("src");

    const imgLink = url + extension;
    navigator.clipboard.writeText(imgLink);

    const linkIcon = link.querySelector(".ph");

    linkIcon.classList.add("ph-check-circle");
    linkIcon.classList.remove("ph-link");
    setTimeout(() => {
      linkIcon.classList.remove("ph-check-circle");
      linkIcon.classList.add("ph-link");
    }, 1500);
  });
});

// colleague hov

const colleagues = document.querySelectorAll(".colleague");

colleagues.forEach((colleague) => {
  colleague.addEventListener("mouseover", function (e) {
    const containerEl = this.querySelector(".colleague-info");
    const jobEl = this.querySelector(".colleague-job");
    const nameEl = this.querySelector(".colleague-name");
    const socialLinksEl = this.querySelector(".social-links");

    containerEl.classList.add("colleague-hov");
    jobEl.classList.add("colleague-job-hov");
    nameEl.classList.add("colleague-job-hov");
    socialLinksEl.classList.add("social-hov");
  });
  colleague.addEventListener("mouseout", function (e) {
    const containerEl = this.querySelector(".colleague-info");
    const jobEl = this.querySelector(".colleague-job");
    const nameEl = this.querySelector(".colleague-name");
    const socialLinksEl = this.querySelector(".social-links");

    containerEl.classList.remove("colleague-hov");
    jobEl.classList.remove("colleague-job-hov");
    nameEl.classList.remove("colleague-job-hov");
    socialLinksEl.classList.remove("social-hov");
  });
});

// article hover

const blogArticles = document.querySelectorAll(".article");

blogArticles.forEach((article) => {
  article.addEventListener("mouseover", function () {
    if (this.classList.contains("active")) return;
    this.classList.add("active");
    const articleImg = this.querySelector(".article-img");
    const authorImg = this.querySelector(".author-img");

    articleImg.classList.add("active-article-img");
    authorImg.classList.add("active-author-img");
  });
  article.addEventListener("mouseout", function (e) {
    if (e.target.closest("article")) return;
    this.classList.remove("active");

    const articleImg = this.querySelector(".article-img");
    const authorImg = this.querySelector(".author-img");

    articleImg.classList.remove("active-article-img");
    authorImg.classList.remove("active-author-img");
  });
});

// smooth scroll nav-bar

const navLinkEls = document.querySelectorAll(".nav-bar--link");

navLinkEls.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const id = link.getAttribute("href");
    const section = document.querySelector(id);
    section.scrollIntoView({ behavior: "smooth" });
  });
});

// navbar highlight

const navSections = document.querySelectorAll("section[id]");

const obs = new IntersectionObserver(function (entries) {
  const [ent] = entries;
  navLinkEls.forEach((link) => link.classList.remove("active-link"));
  if (!ent.isIntersecting) return;
  const activeSectionID = ent.target.getAttribute("id");
  const link = document.querySelector(`[href='#${activeSectionID}']`);
  link.classList.add("active-link");
});

navSections.forEach((section) => {
  obs.observe(section);
});

// video

const videoPlayBtnEls = document.querySelectorAll(".play-video");
const videoContainer = document.querySelector(".video-container");
const video = document.querySelector(".video-content");
const overlay = document.querySelector(".overlay");

videoPlayBtnEls.forEach((playBtn) => {
  playBtn.addEventListener("click", function (e) {
    e.preventDefault();
    videoContainer.style.display = "block";
    video.src = `https://www.youtube.com/embed/6KefznccsY0?&autoplay=1`;
  });
});

const removeVideo = () => {
  video.src = "";
  videoContainer.style.display = "none";
};

overlay.addEventListener("click", removeVideo);

window.addEventListener("keydown", function (e) {
  if (e.key !== "Escape") return;
  removeVideo();
});
