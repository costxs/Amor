document.addEventListener('DOMContentLoaded', () => {

    // Pegando todos os elementos que vamos usar
    const enterButton = document.getElementById('enter-button');
    const landingPage = document.getElementById('landing-page');
    const flowerContainer = document.getElementById('flower-container');
    const quizPrompt = document.getElementById('quiz-prompt');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const skipQuizBtn = document.getElementById('skip-quiz-btn');
    const quizContainer = document.getElementById('quiz-container');
    const questionText = document.getElementById('question-text');
    const answerButtons = document.getElementById('answer-buttons');
    const resultContainer = document.getElementById('result-container');
    const resultMessage = document.getElementById('result-message');
    const continueBtn = document.getElementById('continue-btn');
    const mainContent = document.getElementById('main-content');

    // ☆☆☆ CONFIGURE A DATA DO ANIVERSÁRIO AQUI ☆☆☆
    const anniversaryDate = new Date(2025, 11, 21, 0, 0, 0).getTime();

    // ☆☆☆ EDITE AS PERGUNTAS E RESPOSTAS DO QUIZ AQUI ☆☆☆
    const questions = [
        {
            question: "Qual foi o dia em que nossos corações se conectaram pela primeira vez?",
            answers: [
                { text: "10 de Janeiro", correct: false },
                { text: "25 de Março", correct: false },
                { text: "15 de Fevereiro", correct: true }, // A terceira é a correta, como pedido
                { text: "01 de Abril", correct: false }
            ]
        },
        {
            question: "Qual o nome do primeiro filme que vimos juntinhos?",
            answers: [
                { text: "Titanic", correct: false },
                { text: "Como se fosse a primeira vez", correct: true },
                { text: "Homem-Aranha", correct: false },
                { text: "A Bela e a Fera", correct: false }
            ]
        },
        {
            question: "Qual a sua comida favorita que eu amo preparar para você?",
            answers: [
                { text: "Pizza", correct: false },
                { text: "Lasanha", correct: false },
                { text: "Hambúrguer", correct: false },
                { text: "Macarronada especial", correct: true }
            ]
        },
        {
            question: "Qual destes é o nosso 'lugar especial'?",
            answers: [
                { text: "O cinema", correct: false },
                { text: "Aquele banco na praça", correct: true },
                { text: "A sorveteria", correct: false },
                { text: "Minha casa", correct: false }
            ]
        },
        {
            question: "O que eu mais amo em você?",
            answers: [
                { text: "Seu sorriso", correct: false },
                { text: "Seu jeito de me fazer rir", correct: false },
                { text: "Sua inteligência e carinho", correct: false },
                { text: "Tudo, cada pequeno detalhe!", correct: true }
            ]
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let animationFrameId; // Para controlar a animação da galáxia

    // --- FLUXO PRINCIPAL ---

    // 1. Clicar no botão inicial
    enterButton.addEventListener('click', () => {
        landingPage.style.opacity = '0';
        setTimeout(() => {
            landingPage.classList.add('hidden');
            showGalaxy();
        }, 1000);
    });

    // 2. Lógica da Galáxia
    function showGalaxy() {
        flowerContainer.classList.remove('hidden');
        const canvas = document.getElementById('galaxy-canvas');
        const ctx = canvas.getContext('2d');

        // Ajusta o canvas para o tamanho da janela
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const numParticles = 1500; // Aumentei um pouco para um efeito mais denso
        const center = { x: canvas.width / 2, y: canvas.height / 2 };

        // Classe para as partículas
        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.radius = Math.random() * (Math.max(canvas.width, canvas.height) / 2); // Começa a uma distância aleatória do centro
                this.angle = Math.random() * Math.PI * 2; // Começa em um ângulo aleatório
                this.speed = (Math.random() * 0.02) + 0.005; // Velocidade de rotação
                this.size = Math.random() * 2.5 + 1;
                // Cores quentes (laranja, amarelo, vermelho) para o disco de acreção
                this.color = `hsl(${Math.random() * 40 + 10}, 100%, ${Math.random() * 50 + 50}%)`;

                // Para a animação de dispersão
                this.vx = 0; // Velocidade X
                this.vy = 0; // Velocidade Y
            }

            update() {
                // Diminui o raio para puxar a partícula para o centro
                this.radius *= 0.99; // Ajuste este valor para mudar a velocidade de atração
                // Aumenta o ângulo para girar
                this.angle += this.speed;

                // Se a partícula chegar muito perto do centro, reseta ela para o início
                if (this.radius < 1) {
                    this.reset();
                }
            }

            // Novo método para a dispersão
            updateDisperse() {
                this.x += this.vx;
                this.y += this.vy;
            }

            draw() {
                const x = center.x + Math.cos(this.angle) * this.radius;
                const y = center.y + Math.sin(this.angle) * this.radius;
                ctx.beginPath();
                ctx.arc(x, y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            drawDisperse() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        // Inicializa as partículas
        function init() {
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle());
            }
        }

        // Loop de animação
        function animate() {
            // Fundo preto com um pouco de transparência para criar um efeito de rastro
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Desenha um círculo preto no centro para representar o buraco negro
            ctx.beginPath();
            ctx.arc(center.x, center.y, 20, 0, Math.PI * 2); // O raio 20 define o tamanho do buraco negro
            ctx.fillStyle = 'black';
            ctx.fill();

            // Atualiza e desenha cada partícula
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        }

        init();
        animate();

        // Adiciona o evento de clique para parar a animação e continuar
        flowerContainer.addEventListener('click', (event) => handleGalaxyClick(event, particles, center, ctx, canvas), { once: true });
    }

    function handleGalaxyClick(event, particles, center, ctx, canvas) {
        const clickX = event.clientX;
        const clickY = event.clientY;

        // Calcula a distância do clique ao centro
        const distance = Math.sqrt(Math.pow(clickX - center.x, 2) + Math.pow(clickY - center.y, 2));

        // Define a área clicável (o "buraco negro" e uma pequena margem)
        const clickableRadius = 50; 

        // Se o clique não for no centro, reativa o listener e não faz nada
        if (distance > clickableRadius) {
            flowerContainer.addEventListener('click', (event) => handleGalaxyClick(event, particles, center, ctx, canvas), { once: true });
            return;
        }

        // 1. Para a animação principal
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }

        // 2. Prepara as partículas para a dispersão
        particles.forEach(p => {
            // Posição atual da partícula
            p.x = center.x + Math.cos(p.angle) * p.radius;
            p.y = center.y + Math.sin(p.angle) * p.radius;

            // Define uma velocidade de explosão para fora a partir do centro
            const angle = Math.atan2(p.y - center.y, p.x - center.x);
            const speed = Math.random() * 10 + 5; // Velocidade de dispersão
            p.vx = Math.cos(angle) * speed;
            p.vy = Math.sin(angle) * speed;
        });

        // 3. Inicia a animação de dispersão
        function disperseAnimation() {
            // Fundo com rastro mais rápido para o efeito de "sumiço"
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.updateDisperse();
                p.drawDisperse();
            });

            requestAnimationFrame(disperseAnimation);
        }
        disperseAnimation();

        // 4. Após a animação, mostra o quiz
        setTimeout(() => {
            flowerContainer.classList.add('hidden');
            quizPrompt.classList.remove('hidden');
            // Não precisa mais parar a animação aqui, pois ela continua até as partículas saírem da tela
        }, 1500); // Duração da animação de dispersão
    }

    // 3. Botões do convite do quiz
    skipQuizBtn.addEventListener('click', loadMainSite);
    startQuizBtn.addEventListener('click', startQuiz);

    // 4. Iniciar o quiz
    function startQuiz() {
        quizPrompt.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        currentQuestionIndex = 0;
        score = 0;
        showNextQuestion();
    }

    // 5. Mostrar a pergunta atual
    function showNextQuestion() {
        resetState();
        const question = questions[currentQuestionIndex];
        questionText.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.addEventListener('click', () => selectAnswer(button, answer.correct));
            answerButtons.appendChild(button);
        });
    }

    // 6. Ao selecionar uma resposta
    function selectAnswer(selectedButton, isCorrect) {
        if (isCorrect) {
            score++;
            selectedButton.classList.add('correct');
        } else {
            selectedButton.classList.add('wrong');
        }
        
        // Desabilita todos os botões para não clicar de novo
        Array.from(answerButtons.children).forEach(button => {
            button.disabled = true;
        });

        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showNextQuestion();
            } else {
                showResults();
            }
        }, 1500); // Espera 1.5s antes de ir para a próxima pergunta
    }

    // 7. Mostrar resultados
    function showResults() {
        quizContainer.classList.add('hidden');
        if (score >= 4) { // Acertou 4 ou 5
            resultMessage.innerText = "Parabéns minha princesa! Você conhece cada detalhe do nosso amor!";
        } else { // Acertou 3 ou menos
            resultMessage.innerText = "Você não me ama? Brincadeira, amor! Eu te amo de qualquer jeito!";
        }
        resultContainer.classList.remove('hidden');
    }

    // 8. Botão para continuar para o site principal
    continueBtn.addEventListener('click', loadMainSite);

    // --- FUNÇÕES FINAIS E DO SITE PRINCIPAL ---

    function loadMainSite() {
        // Esconde todos os elementos intermediários
        quizPrompt.classList.add('hidden');
        quizContainer.classList.add('hidden');
        resultContainer.classList.add('hidden');
        
        // Mostra o conteúdo principal
        mainContent.classList.remove('hidden');
        document.body.style.overflow = 'auto';

        // Inicia as funções do site principal
        startSlideshow();
        startCountdown();
    }

    function resetState() {
        while (answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }

    // Lógica do carrossel de fotos
    let slideIndex = 0;
    function startSlideshow() {
        showSlides();
    }
    function showSlides() {
        let slides = document.getElementsByClassName("slide");
        if (slides.length === 0) return;
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 4000);
    }

    // Lógica do cronômetro
    function startCountdown() {
        const countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = anniversaryDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

            document.getElementById('days').innerText = days;
            document.getElementById('hours').innerText = hours;

            if (distance < 0) {
                clearInterval(countdownInterval);
                document.getElementById('timer').innerHTML = "Feliz Aniversário!";
            }
        }, 1000);
    }
});