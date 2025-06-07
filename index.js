function search() {
    const brainchildren = document.querySelectorAll('.brainchild');
    const searchInput = document.querySelector('input[type="search"]');
    const searchTerm = searchInput.value.toLowerCase().trim();

    const selectedSkills = Array.from(document.querySelectorAll('.skill-cont.selected-skill .skillH'))
                                .map(skillH => skillH.textContent.toLowerCase().trim());

    if (!brainchildren.length) return;

    if (searchTerm === '' && selectedSkills.length === 0) {
        brainchildren.forEach(brainchild => {
            brainchild.style.display = 'block';
        });
        return;
    }

    brainchildren.forEach(brainchild => {
        const projectSkills = Array.from(brainchild.querySelectorAll('.skill-cont .skillH'))
                                .map(skillH => skillH.textContent.toLowerCase().trim());
        const title = brainchild.querySelector('h2')?.textContent.toLowerCase() || '';
        
        let matchesSearchTerm = true;
        let matchesSelectedSkills = true;

        if (searchTerm !== '') {
            matchesSearchTerm = title.includes(searchTerm) || projectSkills.some(skill => skill.includes(searchTerm));
        }

        if (selectedSkills.length > 0) {
            matchesSelectedSkills = selectedSkills.some(selectedSkill => {
                return title.includes(selectedSkill) || projectSkills.includes(selectedSkill);
            });
        }
        
        brainchild.style.display = (matchesSearchTerm && matchesSelectedSkills) ? 'block' : 'none';
    });
}

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

    projects.forEach((project) => {
        const text = `
            <div class="brainchild" id="${project.id}">
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

    const searchInput = document.querySelector('input[type="search"]');
    searchInput.addEventListener('input', search);
    searchInput.addEventListener('change', search);

    const brainchildrenElements = document.querySelectorAll('.brainchild');

    brainchildrenElements.forEach(brainchild => {
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
            brainchildrenElements.forEach(bc => bc.style.display = 'none');
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
    window.addEventListener('keydown', function(event) {
        if (event.code === 'KeyS') {
            searchInput.focus();
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

document.querySelectorAll('.content-container .skill-cont').forEach(skillCont => {
    skillCont.addEventListener('click', function(e) {
        const skillText = this.querySelector('.skillH')?.textContent.trim();
        
        if (skillText) {
            this.classList.toggle('selected-skill');
            this.querySelector('.skillH').classList.toggle('selected-skill-text');
            search();
        }
    });
});