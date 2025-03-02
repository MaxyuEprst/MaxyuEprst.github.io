window.addEventListener('load', function () {
    const sections = document.querySelectorAll('.content-container');
    const navLinks = document.querySelectorAll('nav a');
    let currentPos = 0;
    const header = document.getElementsByTagName('nav')[0];
    const headerH = header.offsetHeight + 50; 
    sections.forEach(section => {
        section.style.scrollMarginBlockStart = `${headerH}px`;
    });
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    window.addEventListener('keydown', function(event) {
        if (event.code === 'Tab') {
            event.preventDefault();
            navLinks[currentPos].classList.remove('active');
            currentPos = (currentPos + 1) % navLinks.length;
            navLinks[currentPos].classList.add('active');
            navLinks[currentPos].click();
        }
    });

    
}); 