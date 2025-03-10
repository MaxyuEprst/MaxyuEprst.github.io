window.addEventListener('load', function () {
    const sections = document.querySelectorAll('.content-container');
    const navLinks = document.querySelectorAll('nav a');
    const bcs = document.querySelector('.bcs'); // Исправлено!
    const bcsLinks = document.querySelectorAll('.brainchild');
    const buttonL = document.getElementById('ar1');
    const buttonR = document.getElementById('ar2'); // Исправлено!
    let bcsCurP = 0;
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

    // Теперь bcs это DOM-элемент, и addEventListener работает
    bcs.addEventListener('scroll', () => {
        bcsLinks.forEach(bcsLink => {
            const bcsOffset = bcsLink.offsetLeft;
            const bcsWidth = bcsLink.clientWidth;
            if (pageXOffset >= (bcsOffset - bcsWidth / bcsLinks.length)) {
                bcsCurP = bcsLink.getAttribute('id');
            }
        });

    });

    buttonL.addEventListener('click', function(event) 
    {
        let sc = bcsCurP.offsetLeft + 
        if (bcs.scrollLeft > 0) { // Проверка, что прокрутка не в начале
            bcs.scrollBy({ left: bcsCurP.offsetLeft, behavior: 'smooth' });
        }
    });

    buttonR.addEventListener('click', function(event) { // Исправлено buttonLR → buttonR
        if (bcs.scrollLeft < bcs.scrollWidth) { // Проверка, что прокрутка не в конце
            bcs.scrollBy({ left: 200, behavior: 'smooth' });
        }
    });
});