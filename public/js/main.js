
/*---------------------- carrousel banner ---------------------*/

const startBannerShow = () => {
  const banner = document.querySelector(".banner");

  let intervalBanner = 1;
  setInterval(() => {
    intervalBanner++;
    banner.style.backgroundImage = `url(/images/banner${intervalBanner}.webp)`;
    intervalBanner == 3 ? (intervalBanner = 0) : "";
  }, 3000);
};

startBannerShow();
