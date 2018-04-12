const preloaderRunner = () => {

  let preloader = document.createElement('div');
  preloader.className = "preloader";

  let loader = document.createElement('div');
  loader.className = "loader";

  let root = document.querySelector('#root');
  preloader.appendChild(loader);

  if (!document.querySelector('.preloader')) {
    root.appendChild(preloader);
  } else if (document.querySelector('.preloader')) {
    document.querySelector('.preloader').classList.remove('preloader-hide', 'preloader-non-display');
  }

  setTimeout(() => {
    document.querySelector('.preloader').classList.add("preloader-hide")
  }, 1500); 

  setTimeout(() => {
    document.querySelector('.preloader').classList.add("preloader-non-display");
  }, 2000);
};

export default preloaderRunner;