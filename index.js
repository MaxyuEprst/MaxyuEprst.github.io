async function loadProjects() {
    try {
        // Получаем данные с помощью fetch()
        const response = await fetch('/projects.json'); // Убедись, что путь правильный
        
        // Преобразуем ответ в JSON
        const projects = await response.json();

        return projects;
    } catch (error) {
        console.error('Ошибка загрузки JSON:', error);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const bcs = document.querySelector('.bcs');
    const projects = await loadProjects();

    projects.forEach((project, index) => {
        let text = `
            <div class="brainchild" id="b${index + 1}">
                <button class="more-but"><p class="mbt">Подробнее</p></button>
                <img src="${project.imageSrc}" class="bcp" />
                <div class="bcwp">
                    <h2>${project.title}</h2>
                    <p class="three-line-ellipsis text-of-prj">
                        ${project.description}
                    </p>
                    <div class="know-cont brch-kn-cont">
                        ${project.skills.map(skill => `
                            <div class="skill-cont">
                                <h4 class="skillH noselect">${skill}</h4>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        bcs.insertAdjacentHTML("beforeend", text);
    });
});

window.addEventListener('load', function () {
    const bcs = document.querySelector('.bcs');
    const bcsLinks = document.querySelectorAll('.brainchild');
    const sections = document.querySelectorAll('.content-container');
    const navLinks = document.querySelectorAll('nav a');
    const buttonL = document.getElementById('ar1');
    const buttonR = document.getElementById('ar2');
    const addObj = document.getElementById('add');
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

    bcs.addEventListener('scroll', () => {
        bcsLinks.forEach((bcsLink, index) => {
            const bcsOffset = bcsLink.offsetLeft;
            const bcsWidth = bcsLink.clientWidth;
            if (bcs.scrollLeft >= bcsOffset - bcsWidth / 2) {
                bcsCurP = index;
            }
        });
    });

    buttonL.addEventListener('click', function(event) {
        const bcs = document.querySelector('.bcs');
        const bcsLinks = document.querySelectorAll('.brainchild');
        if (bcsCurP > 0) {
            bcsCurP--;
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
    
    buttonR.addEventListener('click', function(event) {
        const bcs = document.querySelector('.bcs');
        const bcsLinks = document.querySelectorAll('.brainchild');
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