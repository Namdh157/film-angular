export default function mainJs() {
  const header = document.querySelector('.header')
  window.addEventListener('scroll', () => {
    header?.classList.toggle('bg-black', window.scrollY > 0);
    document.querySelector('.backtop-btn').classList.toggle('visibility', window.scrollY > screen.availHeight - header?.offsetHeight)
  });
  
}