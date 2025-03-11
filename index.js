window.addEventListener('load', function () {
    const sections = document.querySelectorAll('.content-container');
    const navLinks = document.querySelectorAll('nav a');
    const bcs = document.querySelector('.bcs');
    const bcsLinks = document.querySelectorAll('.brainchild');
    const buttonL = document.getElementById('ar1');
    const buttonR = document.getElementById('ar2');
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

    // Кнопка влево
    buttonL.addEventListener('click', function(event) {
        const visibleWidth = bcs.clientWidth; // Ширина видимой области
        const newScrollLeft = bcs.scrollLeft - visibleWidth; // Прокрутка на ширину видимой области влево
        bcs.scrollTo({
            left: newScrollLeft,
            behavior: 'smooth'
        });
    });

    // Кнопка вправо
    buttonR.addEventListener('click', function(event) {
        const visibleWidth = bcs.clientWidth; // Ширина видимой области
        const newScrollLeft = bcs.scrollLeft + visibleWidth; // Прокрутка на ширину видимой области вправо
        bcs.scrollTo({
            left: newScrollLeft,
            behavior: 'smooth'
        });
    });
});