document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('startForm');
    const select = document.getElementById('difficultySelect');
    const errorMsg = document.getElementById('errorMsg');
    const difficultyInfo = document.getElementById('difficultyInfo');
    const startBtn = document.getElementById('startBtn');

    if (typeof confetti === 'function') {
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
    }

    if (select && select.value) updateDifficultyInfo();

    select?.addEventListener('change', () => {
        errorMsg.textContent = '';
        updateDifficultyInfo();
    });

    form?.addEventListener('submit', function (e) {
        if (!select.value) {
            e.preventDefault();
            errorMsg.textContent = '⚠️ Lütfen bir zorluk seviyesi seçiniz!';
            select.focus();
        } else {
            errorMsg.textContent = '';
            startBtn.disabled = true;
            startBtn.textContent = "Yükleniyor...";
        }
    });

    function updateDifficultyInfo() {
        switch (select.value) {
            case 'easy':
                difficultyInfo.textContent = 'Kolay zorluk yeni başlayanlar için uygundur.';
                break;
            case 'medium':
                difficultyInfo.textContent = 'Orta zorluk biraz daha fazla düşünmeyi gerektirir.';
                break;
            case 'hard':
                difficultyInfo.textContent = 'Zor zorluk gerçek Sudoku ustalarına göredir!';
                break;
            default:
                difficultyInfo.textContent = '';
        }
    }
});

// Dark Mode toggle
document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('themeSwitch');
    const themeLabel = document.getElementById('themeLabel');

    // Sayfa yüklendiğinde dark mode aktifse uygula
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeSwitch.checked = true;
        themeLabel.textContent = '🌙';
    }

    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            themeLabel.textContent = '🌙';
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            themeLabel.textContent = '☀️';
        }
    });
});
