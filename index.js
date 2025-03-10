window.addEventListener('load', function () {
    const sections = document.querySelectorAll('.content-container');
    const navLinks = document.querySelectorAll('nav a');
    const bcs = document.querySelector('.bcs');
    const bcsLinks = document.querySelectorAll('.brainchild');
    const buttonL = document.getElementById('ar1');
    const buttonR = document.getElementById('ar2');
    let bcsCurP = 0; // Индекс текущего элемента
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

    // Обновляем индекс текущего элемента при прокрутке
    bcs.addEventListener('scroll', () => {
        bcsLinks.forEach((bcsLink, index) => {
            const bcsOffset = bcsLink.offsetLeft;
            const bcsWidth = bcsLink.clientWidth;
            if (bcs.scrollLeft >= bcsOffset - bcsWidth / 2) {
                bcsCurP = index; // Сохраняем индекс текущего элемента
            }
        });
    });

    // Кнопка влево
    buttonL.addEventListener('click', function(event) {
        if (bcsCurP > 0) { // Если текущий элемент не первый
            bcsCurP--; // Переходим к предыдущему элементу
            bcs.scrollTo({
                left: bcsLinks[bcsCurP].offsetLeft,
                behavior: 'smooth'
            });
        }
        else{
            bcs.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        }
    });

    // Кнопка вправо
    buttonR.addEventListener('click', function(event) {
        if (bcsCurP < bcsLinks.length - 1) {
            bcsCurP++;
            bcs.scrollTo({
                left: bcsLinks[bcsCurP].offsetLeft,
                behavior: 'smooth'
            });
        }
        else{
            bcs.scrollTo({
                left: bcsLinks[bcsLinks.length - 1].offsetLeft,
                behavior: 'smooth'
            });
        }
    });
});