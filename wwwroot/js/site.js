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

// Sudoku input alanlarına sadece 1-9 arası rakam girilsin
document.querySelectorAll('.cell input:not([disabled])').forEach(input => {
    input.addEventListener('input', (e) => {
        const val = e.target.value;
        if (!/^[1-9]$/.test(val)) {
            e.target.value = '';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Giriş validasyonu: sadece 1-9
    document.querySelectorAll('.cell input:not([disabled])').forEach(input => {
        input.addEventListener('input', (e) => {
            const val = e.target.value;
            if (!/^[1-9]$/.test(val)) {
                e.target.value = '';
            }
            input.classList.remove('error-cell');
        });
    });

    const checkBtn = document.getElementById('checkBtn');
    checkBtn?.addEventListener('click', () => {
        const grid = getGrid();
        const errors = validateGrid(grid);

        document.querySelectorAll('.cell input').forEach((input, index) => {
            const row = Math.floor(index / 9);
            const col = index % 9;

            if (errors[row][col]) {
                input.classList.add('error-cell');
            } else {
                input.classList.remove('error-cell');
            }
        });

        if (errors.flat().every(v => !v)) {
            confetti({
                particleCount: 200,
                spread: 90,
                origin: { y: 0.6 }
            });
            alert('🎉 Sudoku tamamlandı, tebrikler!');
        }
    });

    function getGrid() {
        const values = [];
        document.querySelectorAll('.cell input').forEach((input, i) => {
            const val = input.value;
            const row = Math.floor(i / 9);
            const col = i % 9;

            if (!values[row]) values[row] = [];
            values[row][col] = val ? parseInt(val) : null;
        });
        return values;
    }

    function validateGrid(grid) {
        const errors = Array.from({ length: 9 }, () => Array(9).fill(false));

        const markDuplicates = (indexes) => {
            const seen = {};
            indexes.forEach(([r, c]) => {
                const val = grid[r][c];
                if (!val) return;
                if (seen[val]) {
                    errors[r][c] = true;
                    errors[seen[val][0]][seen[val][1]] = true;
                } else {
                    seen[val] = [r, c];
                }
            });
        };

        // Satır kontrolü
        for (let r = 0; r < 9; r++) {
            const row = Array.from({ length: 9 }, (_, c) => [r, c]);
            markDuplicates(row);
        }

        // Sütun kontrolü
        for (let c = 0; c < 9; c++) {
            const col = Array.from({ length: 9 }, (_, r) => [r, c]);
            markDuplicates(col);
        }

        // 3x3 blok kontrolü
        for (let br = 0; br < 3; br++) {
            for (let bc = 0; bc < 3; bc++) {
                const block = [];
                for (let r = 0; r < 3; r++) {
                    for (let c = 0; c < 3; c++) {
                        block.push([br * 3 + r, bc * 3 + c]);
                    }
                }
                markDuplicates(block);
            }
        }

        return errors;
    }
});
