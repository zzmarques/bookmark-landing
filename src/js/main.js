import { questions, features } from './data.js';

let wv = window.innerWidth;
window.addEventListener('resize', () => {
    wv = window.innerWidth;
});


const menu = (() => {
    const btnOpen = document.querySelector('div.hamb');
    const btnClose = document.querySelector('div.close');
    const navBar = document.querySelector('nav.navBar');
    const links = document.querySelectorAll('nav.navBar > ul > a');
    
    const showMenu = () => {
        navBar.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    const closeMenu = () => {
        navBar.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    btnOpen.addEventListener('click', showMenu);

    btnClose.addEventListener('click', closeMenu);

    links.forEach((btns) => {
        btns.addEventListener('click', () => {
            wv < 1024 ? closeMenu() : '';
        });
    });

})();


const question = (() => {
    const qts = document.querySelectorAll('div.containerQuestions');
    

    const showQts = (index) => {
        const answer = questions[index].Answer;
        const response = `<p>${answer}</p>`;
        const divTitle = qts[index].childNodes[1];

        

        if(qts[index].classList[1] === 'ativo') {
            closeQts(qts[index]);
            return;
        };


        divTitle.childNodes[3].classList.remove('fa-chevron-down');
        divTitle.childNodes[3].classList.add('fa-chevron-up');
        
        qts[index].classList.add('ativo');
        qts[index].insertAdjacentHTML('beforeend', response);
        


    };

    const closeQts = (qtsAtivo) => {
        const answerP = qtsAtivo.childNodes[3];
        const divTitle = qtsAtivo.childNodes[1];

        qtsAtivo.classList.remove('ativo');
        answerP.remove();
        
        divTitle.childNodes[3].classList.remove('fa-chevron-up');
        divTitle.childNodes[3].classList.add('fa-chevron-down')
        
    };

    qts.forEach((btnQts, index) => {
        btnQts.addEventListener('click',() => {
            showQts(index);
        });
        
    });
})();

const feature = (() => {
    const fts = document.querySelectorAll('div.options');
    const ftsText = document.querySelector('div.featuresText2');
    const ftsImg = document.querySelector('figure.featuresFigure img');
    
    const change = (index) => {
        
        fts.forEach(btn => {
            btn.classList.remove('active');
            btn.childNodes[1].classList.remove('sActive');
        });

        fts[index].classList.add('active');
        
        fts[index].getElementsByTagName('span')[0].classList.add('sActive');

        ftsImg.src = `src/assets/images/${features[index].img}`;
        ftsText.getElementsByTagName('h2')[0].innerHTML = features[index].title;
        ftsText.getElementsByTagName('p')[0].innerHTML = features[index].texto;
        
    };
    
    fts.forEach((btnFts, index) => {
        btnFts.addEventListener('click', () => {
            change(index);
        });
    });

})();

const valForm = (()=> {
    const inputEmail = document.querySelector('input#email');
    const btn = document.querySelector('button.btnContact');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    const showError = () => {
        const iconError = `<img src="src/assets/images/icon-error.svg" alt="icon-error" class="iconError">`;
        const msgError = `
            <div class="containerError">
                <span>Whoops, make sure it's an email</span>
            </div>
        `;

        inputEmail.insertAdjacentHTML('afterend', iconError);
        inputEmail.insertAdjacentHTML('afterend', msgError);
    }

    const removeError = () => {
        const iconError = document.querySelector('img.iconError');
        const msgError = document.querySelector('div.containerError');
        
        iconError.remove();
        msgError.remove();
    }

    btn.addEventListener('click', () => {
        if(inputEmail.value === '') {
            showError();
        } else if (!emailRegex.test(inputEmail.value)) {
            showError();
        } else {
            removeError();
        }
    });

})();
