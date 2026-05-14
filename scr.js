document.addEventListener('DOMContentLoaded', () => {

  function initSlider(gallerySelector, prevClass, nextClass) {
    const gallery = document.querySelector(gallerySelector);
    if (!gallery) return;
    
    const track = gallery.querySelector('.his-track, .team-track');
    const items = gallery.querySelectorAll('.his-item, .team-item');
    const prevBtn = gallery.querySelector(prevClass);
    const nextBtn = gallery.querySelector(nextClass);
    
    if (!track || !items.length || !prevBtn || !nextBtn) return;
    
    let current = 0;
    const total = items.length;
    
    const showSlide = (idx) => {
      current = (idx + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
    };
    
    prevBtn.onclick = (e) => { e.preventDefault(); showSlide(current - 1); };
    nextBtn.onclick = (e) => { e.preventDefault(); showSlide(current + 1); };
    
  
    let startX = 0;
    track.ontouchstart = (e) => { startX = e.touches[0].clientX; };
    track.ontouchend = (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (diff > 40) showSlide(current + 1);
      if (diff < -40) showSlide(current - 1);
    };
    
    showSlide(0);
  }


  initSlider('.his-gallery', '.his-btn--prev', '.his-btn--next');
  initSlider('.team-gallery', '.team-btn--prev', '.team-btn--next');


  const form = document.getElementById('myForm');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const submitBtn = document.getElementById('submitBtn');
  const acquireBtn = document.getElementById('acquireBtn');

  if (form && submitBtn && modalOverlay) {
    const phone = document.getElementById('phone');
    phone?.addEventListener('input', function() {
      let v = this.value.replace(/\D/g,'');
      if(v[0]==='8') v='7'+v.slice(1);
      if(v[0]!=='7') v='7'+v;
      let f='+7';
      if(v.length>1) f+=' ('+v.slice(1,4);
      if(v.length>4) f+=') '+v.slice(4,7);
      if(v.length>7) f+='-'+v.slice(7,9);
      if(v.length>9) f+='-'+v.slice(9,11);
      this.value = f;
    });

    const validate = () => {
      const name = document.getElementById('name')?.value.trim();
      const phoneVal = phone?.value.replace(/\D/g,'');
      const email = document.getElementById('email')?.value.trim();
      if(!name || name.length<2) return alert('Введите имя (мин. 2 символа)');
      if(!phoneVal || phoneVal.length<11) return alert('Введите корректный телефон');
      if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert('Введите корректный email');
      return true;
    };

    const openModal = () => {
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    };
    const closeModal = () => {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
      form.reset();
    };

    submitBtn.onclick = () => { if(validate()) openModal(); };
    acquireBtn?.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
    modalClose.onclick = closeModal;
    modalOverlay.onclick = (e) => { if(e.target===modalOverlay) closeModal(); };
    document.onkeydown = (e) => { if(e.key==='Escape' && modalOverlay.classList.contains('active')) closeModal(); };
  }
});