const video = document.getElementById('heroVideo');
const nextScene = document.getElementById('nextScene');
const squeakSound = document.getElementById('squeakSound');

// Ativa o som do vídeo se o usuário clicar ENQUANTO ele estiver rolando
const enableAudio = () => {
  if (video && !video.ended) {
    video.muted = false;
    video.play().catch(() => {});
  }
  document.removeEventListener('click', enableAudio);
  document.removeEventListener('touchstart', enableAudio);
};

document.addEventListener('click', enableAudio);
document.addEventListener('touchstart', enableAudio);

// Quando o vídeo acabar
video.addEventListener('ended', () => {
    video.pause(); // Pausa o vídeo definitivamente
    video.style.display = 'none'; 
    nextScene.style.display = 'block'; 

    // REMOVE o ativador de áudio para que cliques futuros NÃO voltem a tocar o vídeo
    document.removeEventListener('click', enableAudio);
    document.removeEventListener('touchstart', enableAudio);
});

// Som do Squeak nas pelúcias
const plushies = document.querySelectorAll('.grid-game img');

plushies.forEach(plush => {
    plush.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (squeakSound) {
            squeakSound.currentTime = 0;
            squeakSound.play().catch(error => {
                console.error("Erro ao tocar o áudio:", error);
            });
        }
    });
});

// ===== Infinite Slider (Secção 3 - lado direito) =====
/* 👉 EDITE AQUI: troque pelas fotos que quiser exibir no slider.
   Cada item precisa de "src" (caminho da imagem) e "alt" (texto alternativo). */
const sliderImages = [
    { src: './img/photo1.png', alt: 'Foto 1' },
    { src: './img/photo2.png', alt: 'Foto 2' },
    { src: './img/photo3.png', alt: 'Foto 3' },
    { src: './img/photo4.png', alt: 'Foto 4' },
    { src: './img/photo5.png', alt: 'Foto 5' },
    { src: './img/photo6.png', alt: 'Foto 6' },
    { src: './img/photo7.png', alt: 'Foto 7' },
    { src: './img/photo8.png', alt: 'Foto 8' },
    { src: './img/photo9.png', alt: 'Foto 9' },
    { src: './img/photo10.png', alt: 'Foto 10' },
    { src: './img/photo11.png', alt: 'Foto 11' },
    { src: './img/photo12.png', alt: 'Foto 12' },
];
/* Fim da lista de imagens — não precisa mexer no resto do código. */

function buildInfiniteSlider(container, imgs) {
    if (!container) return;

    const track = container.querySelector('.slider-track');
    const duration = container.dataset.duration || 160; // bem mais lento por padrão
    const durationHover = container.dataset.durationHover;

    container.style.setProperty('--duration', `${duration}s`);

    const renderSet = () => imgs.map(img =>
        `<img src="${img.src}" alt="${img.alt}" decoding="async">`
    ).join('');

    // Duplica as imagens para o loop ficar contínuo, sem "salto"
    track.innerHTML = renderSet() + renderSet();

    if (durationHover) {
        container.addEventListener('mouseenter', () => {
            container.style.setProperty('--duration', `${durationHover}s`);
        });
        container.addEventListener('mouseleave', () => {
            container.style.setProperty('--duration', `${duration}s`);
        });
    }
}

const infiniteSliderEl = document.querySelector('.infinite-slider');
buildInfiniteSlider(infiniteSliderEl, sliderImages);