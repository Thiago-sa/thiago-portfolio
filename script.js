// Arquivo JavaScript para o site de portfólio estilo Brittany Chiang

document.addEventListener('DOMContentLoaded', () => {
  // Elementos DOM
  const header = document.querySelector('.nav');
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const body = document.body;
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
  
  let lastScrollY = window.scrollY;
  
  // Função para controlar o header no scroll
  function handleScroll() {
    const currentScrollY = window.scrollY;
    
    // Esconde o header quando rola para baixo e mostra quando rola para cima
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      header.classList.add('nav-hidden');
    } else {
      header.classList.remove('nav-hidden');
    }
    
    // Adiciona background quando não está no topo
    if (currentScrollY > 0) {
      header.classList.add('nav-scrolled');
    } else {
      header.classList.remove('nav-scrolled');
    }
    
    lastScrollY = currentScrollY;
    
    // Destaca o link de navegação ativo com base na seção visível
    highlightActiveSection();
  }
  
  // Função para destacar a seção ativa na navegação
  function highlightActiveSection() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  // Toggle menu mobile
  function toggleMenu() {
    hamburger.classList.toggle('is-active');
    mobileMenu.classList.toggle('is-open');
    body.classList.toggle('blur');
  }
  
  // Animações de entrada
  function setupAnimations() {
    const animateElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animateElements.forEach(el => {
      observer.observe(el);
    });
  }
  
  // Adicionar classes de animação aos elementos
  function addAnimationClasses() {
    // Hero section
    const heroElements = document.querySelector('.hero').children[0].children;
    for (let i = 0; i < heroElements.length; i++) {
      heroElements[i].classList.add('fade-in');
      heroElements[i].style.transitionDelay = `${i * 100}ms`;
    }
    
    // Seções numeradas
    document.querySelectorAll('.numbered-heading').forEach(heading => {
      heading.classList.add('fade-in');
    });
    
    // About section
    document.querySelectorAll('.about-text p, .about-text h3, .skills-list, .about-pic').forEach(el => {
      el.classList.add('fade-in');
    });
    
    // Projects section
    document.querySelectorAll('.featured-project-content, .featured-project-image').forEach(el => {
      el.classList.add('fade-in');
    });
    
    // Skills section
    document.querySelectorAll('.skills-category').forEach(el => {
      el.classList.add('fade-in');
    });
    
    // Experience section
    document.querySelectorAll('.job-content, .experience-note').forEach(el => {
      el.classList.add('fade-in');
    });
    
    // Contact section
    document.querySelectorAll('.contact-inner > *').forEach(el => {
      el.classList.add('fade-in');
    });
  }
  
  // Inicializar animações de barras de habilidades
  function initSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute('data-level') || entry.target.style.width;
          entry.target.style.width = '0';
          setTimeout(() => {
            entry.target.style.width = width;
          }, 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    skillLevels.forEach(el => {
      observer.observe(el);
    });
  }
  
  // Event listeners
  window.addEventListener('scroll', handleScroll);
  hamburger.addEventListener('click', toggleMenu);
  
  // Fechar menu ao clicar em links
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
  });
  
  // Scroll suave para links de navegação
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Inicialização
  addAnimationClasses();
  setupAnimations();
  initSkillBars();
  handleScroll(); // Executar uma vez no carregamento
});
