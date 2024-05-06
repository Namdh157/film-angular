export default function mainJs() {
  const header = document.querySelector('.header');
  const loader = document.querySelector('#loader');
  loader.style.display = 'none';
  window.addEventListener('scroll', () => {
    header?.classList.toggle('bg-black', window.scrollY > 0);
    document.querySelector('.backtop-btn').classList.toggle('visibility', window.scrollY > screen.availHeight - header?.offsetHeight)
  });
  
}