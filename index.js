async function loadProjects() {
    try {
        const response = await fetch('/projects.json');
        const projects = await response.json();
        return projects;
    } catch (error) {
        console.error('Ошибка загрузки JSON:', error);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const bcs = document.querySelector('.bcs');
    const arwr = document.querySelector('.arrs-wr');
    const projects = await loadProjects();
    let brainchildren; // Будет обновляться после добавления проектов

    // Функция поиска, которая использует текущий список brainchildren
    function search() {
        const searchInput = document.querySelector('input[type="search"]');
        const searchTerm = searchInput.value.toLowerCase().trim();

        if (!brainchildren) return; // Если элементы еще не загружены

        if (searchTerm === '') {
            brainchildren.forEach(brainchild => {
                brainchild.style.display = 'block';
            });
            return;
        }

        brainchildren.forEach(brainchild => {
            const skillConts = brainchild.querySelectorAll('.skill-cont');
            const title = brainchild.querySelector('h2')?.textContent.toLowerCase() || '';
            
            let found = false;
            
            if (title.includes(searchTerm)) {
                found = true;
            }
            
            skillConts.forEach(skillCont => {
                const skillText = skillCont.textContent.toLowerCase().trim();
                if (skillText.includes(searchTerm)) {
                    found = true;
                }
            });

            brainchild.style.display = found ? 'block' : 'none';
        });
    }

    projects.forEach((project, index) => {
        const text = `
            <div class="brainchild" id="${index + 1}">
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

    brainchildren = document.querySelectorAll('.brainchild');
    
    const searchInput = document.querySelector('input[type="search"]');
    searchInput.addEventListener('input', search);
    searchInput.addEventListener('change', search);

    brainchildren.forEach(brainchild => {
        brainchild.addEventListener('click', function() {
            const existingBrainchildMore = document.querySelector('.brainchildMore');
            if (existingBrainchildMore) {
                existingBrainchildMore.remove();
            }

            const projectId = brainchild.id;
            const projectData = projects.find(item => item.id === projectId);

            if (!projectData) return;

            const text = `
                <div class="brainchildMore" id="${projectData.id}">
                    <div class="bcwp">
                        <h2>${projectData.title}</h2>
                        <p class="text-of-prj">
                            ${projectData.description}
                        </p>
                        <div class="know-cont brch-kn-cont">
                        ${projectData.skills.map(skill => `
                            <div class="skill-cont">
                                <h4 class="skillH noselect">${skill}</h4>
                            </div>
                        `).join('')}
                        </div>
                        <div class="full-text"><p>${projectData.fullText}</p></div>
                    </div>
                </div>
            `;
            
            bcs.insertAdjacentHTML("beforeend", text);
            brainchildren.forEach(bc => bc.style.display = 'none');
            arwr.style.display = 'none';

            const bchm = document.querySelector('.brainchildMore');
            bchm.addEventListener('click', function() {
                bchm.remove();
                arwr.style.display = 'flex';
                search(); 
            });
        });
    });
    window.addEventListener('resize', () => {
        const headerH = document.querySelector('header').offsetHeight;
        document.querySelectorAll('.content-container h2').forEach(h2 => {
            h2.style.scrollMarginTop = `${headerH}px`;
        });
    });

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
    
    if (window.location.hash) {
        history.replaceState(null, null, ' ');
    }
    
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
        if (bcsCurP > 0) {
            bcsCurP--;
            bcs.scrollTo({
                left: bcsLinks[bcsCurP].offsetLeft,
                behavior: 'smooth'
            });
        } else {
            bcs.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        }
    });

    buttonR.addEventListener('click', function(event) {
        if (bcsCurP < bcsLinks.length - 1) {
            bcsCurP++;
            bcs.scrollTo({
                left: bcsLinks[bcsCurP].offsetLeft,
                behavior: 'smooth'
            });
        } else {
            bcs.scrollTo({
                left: bcsLinks[bcsLinks.length - 1].offsetLeft,
                behavior: 'smooth'
            });
        }
    });
});