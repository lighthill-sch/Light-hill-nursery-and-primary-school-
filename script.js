// ========== ALL JS IN ONE FILE - NO DUPLICATES ==========
document.addEventListener('DOMContentLoaded', function() {
  
  // 1. SMOOTH SCROLL FOR BUTTONS
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
  
  // 2. ADD CURRENT YEAR TO FOOTER
  const copyright = document.querySelector('.copyright');
  if (copyright) {
    copyright.innerHTML = `© ${new Date().getFullYear()} Light Hill Nursery and Primary School. All Rights Reserved.`;
  }
  
  // 3. TYPEWRITER EFFECT
  const text = "My name is Gizamba Siragi, a teacher at Light Hill Nursery and Primary School";
  const typeElement = document.getElementById("typewriter");
  let i = 0;
  let typingStarted = false;
  
  function typeWriter() {
    if (i < text.length && typeElement) {
      typeElement.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 150);
    }
  }
  
  function checkScroll() {
    const aboutSection = document.querySelector('.about-me');
    if (!aboutSection || !typeElement) return;
    
    const rect = aboutSection.getBoundingClientRect();
    
    if (rect.top < window.innerHeight * 0.7 && !typingStarted) {
      typingStarted = true;
      typeWriter();
    }
  }
  
  window.addEventListener('scroll', checkScroll);
  checkScroll();
  
  // 4. HERO SLIDESHOW - 3 SLIDES SLIDING
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  
  function showSlide() {
    if (slides.length === 0) return;
    slides.forEach(slide => slide.classList.remove('active'));
    slides[currentSlide].classList.add('active');
    currentSlide = (currentSlide + 1) % slides.length;
  }
  
  if (slides.length > 0) {
    setInterval(showSlide, 5000);
  }
  
  // 5. READ MORE TOGGLE
  const readMoreBtn = document.getElementById('readMoreBtn');
  const aboutFull = document.getElementById('aboutFull');
  if (readMoreBtn && aboutFull) {
    readMoreBtn.addEventListener('click', function() {
      if (aboutFull.style.display === 'block') {
        aboutFull.style.display = 'none';
        this.textContent = 'Read More ↓';
      } else {
        aboutFull.style.display = 'block';
        this.textContent = 'Show Less ↑';
      }
    });
  }
  
  // 6. GALLERY SHOW MORE / SHOW LESS
  const showMoreBtn = document.getElementById('showMoreBtn');
  const hiddenItems = document.querySelectorAll('.masonry-item.hidden');
  let expanded = false;
  
  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', function() {
      hiddenItems.forEach(item => {
        if (expanded) {
          item.classList.add('hidden');
          showMoreBtn.textContent = 'Show More Photos ↓';
        } else {
          item.classList.remove('hidden');
          showMoreBtn.textContent = 'Show Less ↑';
        }
      });
      expanded = !expanded;
    });
  }
  
  // 7. MODAL + P.7 FORM WITH AJAX - NO ALERT
  const modal = document.getElementById('applyModal');
  const openBtns = document.querySelectorAll('#openFormBtn, #openFormBtn2');
  const closeBtn = document.querySelector('.close-btn');
  const backBtn = document.getElementById('backBtn');
  const toast = document.getElementById('toast');
  const p7Form = document.getElementById('p7Form');
  const submitBtn = document.getElementById('submitBtn');
  const successMsg = document.getElementById('successMsg');
  
  function openModal() {
    if (!modal) return;
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
    submitBtn.style.display = 'block';
    backBtn.style.display = 'none';
    successMsg.style.display = 'none';
    p7Form.reset();
  }
  
  function closeModal() {
    if (!modal) return;
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  }
  
  openBtns.forEach(btn => { if (btn) btn.onclick = openModal; });
  if (closeBtn) closeBtn.onclick = closeModal;
  if (backBtn) backBtn.onclick = closeModal;
  window.onclick = e => { if (e.target == modal) closeModal(); };
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal && modal.style.display === 'block') closeModal();
  });
  
  // P.7 FORM SUBMIT - AJAX TO KILL ALERT + SHOW TOAST
  if (p7Form) {
    p7Form.addEventListener('submit', async function(e) {
      e.preventDefault(); // THIS STOPS FORM SUBMIT DEFAULT ALERT
      
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      
      const formData = new FormData(p7Form);
      
      try {
        const response = await fetch('https://formsubmit.co/ajax/gizambasiragi114@gmail.com', {
          method: 'POST',
          body: formData
        });
        
        if (response.ok) {
          if (toast) toast.classList.add('show');
          if (successMsg) successMsg.style.display = 'block';
          submitBtn.style.display = 'none';
          if (backBtn) backBtn.style.display = 'block';
          p7Form.reset();
          
          setTimeout(() => {
            if (toast) toast.classList.remove('show');
          }, 4000);
        } else {
          alert('Error sending. Please try again.');
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Application';
        }
      } catch (error) {
        alert('Network error. Check internet.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Application';
      }
    });
  }
  
  // 8. CONTACT FORM AJAX - WITH WHATSAPP TOAST
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sending...';

      const formData = new FormData(contactForm);
      try {
        const response = await fetch('https://formsubmit.co/ajax/gizambasiragi114@gmail.com', {
          method: 'POST',
          body: formData
        });
        if (response.ok) {
          // Show WhatsApp-style toast instead of alert
          if (toast) {
            toast.innerHTML = '✅ Message sent! We will contact you soon.';
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 4000);
          }
          
          contactForm.reset();
          btn.disabled = false;
          btn.textContent = 'Send Message';
        } else {
          btn.disabled = false;
          btn.textContent = 'Send Message';
          alert('Error sending. Please try again.');
        }
      } catch {
        btn.disabled = false;
        btn.textContent = 'Send Message';
        alert('Network error. Check internet.');
      }
    });
  }
});
