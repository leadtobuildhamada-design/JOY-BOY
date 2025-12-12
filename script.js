// ============================================
// ナビゲーション機能
// ============================================

// ハンバーガーメニューの開閉
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // メニューリンククリック時にメニューを閉じる
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// スクロール時のナビゲーションバーのスタイル変更
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.8)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    }
});

// ============================================
// スムーススクロール
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // ナビゲーションバーの高さを考慮
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// スクロールアニメーション（フェードイン）
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// アニメーション対象の要素を監視
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.reason-card, .menu-item, .testimonial-card, .gallery-item, .concept-content, .access-content');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// ============================================
// ギャラリーモーダル機能
// ============================================

const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.createElement('div');
modal.className = 'modal';
modal.innerHTML = `
    <div class="modal-content">
        <button class="modal-close">&times;</button>
        <img class="modal-image" src="" alt="Gallery Image">
    </div>
`;
document.body.appendChild(modal);

const modalImage = modal.querySelector('.modal-image');
const modalClose = modal.querySelector('.modal-close');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // 画像要素を取得
        const img = item.querySelector('img');
        if (img) {
            modalImage.src = img.src;
            modalImage.alt = img.alt || 'Gallery Image';
        } else {
            // プレースホルダーの場合のフォールバック
            const placeholder = item.querySelector('.image-placeholder');
            if (placeholder) {
                modalImage.src = '#';
                modalImage.alt = placeholder.textContent || 'Gallery Image';
            }
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ESCキーでモーダルを閉じる
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ============================================
// 予約フォーム処理
// ============================================

const reservationForm = document.getElementById('reservationForm');

if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // フォームデータの取得
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            guests: document.getElementById('guests').value,
            message: document.getElementById('message').value
        };

        // バリデーション
        if (!formData.name || !formData.phone || !formData.email || !formData.date || !formData.time || !formData.guests) {
            alert('必須項目をすべて入力してください。');
            return;
        }

        // 実際の送信処理は、バックエンドAPIに接続する必要があります
        // ここでは、コンソールに出力し、成功メッセージを表示します
        console.log('予約情報:', formData);

        // 送信成功メッセージ
        showSuccessMessage('ご予約ありがとうございます。\n確認のため、お電話またはメールにてご連絡させていただきます。');

        // フォームをリセット
        reservationForm.reset();
    });
}

// 成功メッセージ表示関数
function showSuccessMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #1a1f2e 0%, #2d3a2d 100%);
        color: #d4af37;
        padding: 2rem;
        border-radius: 8px;
        border: 3px solid #d4af37;
        z-index: 3000;
        text-align: center;
        font-size: 1.1rem;
        font-weight: 700;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
        white-space: pre-line;
        max-width: 90%;
    `;
    messageDiv.textContent = message;

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '閉じる';
    closeBtn.style.cssText = `
        margin-top: 1rem;
        padding: 0.5rem 2rem;
        background: #d4af37;
        color: #0a0a0a;
        border: none;
        border-radius: 4px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = '#ff8c00';
    });
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = '#d4af37';
    });
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(messageDiv);
        document.body.style.overflow = '';
    });

    messageDiv.appendChild(closeBtn);
    document.body.appendChild(messageDiv);
    document.body.style.overflow = 'hidden';
}

// ============================================
// 日付入力の最小値設定（今日以降）
// ============================================

const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// ============================================
// パフォーマンス最適化：画像の遅延読み込み
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// スクロールトップボタン（オプション）
// ============================================

// スクロールトップボタンを作成
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: #d4af37;
    color: #0a0a0a;
    border: 2px solid #d4af37;
    border-radius: 50%;
    font-size: 1.5rem;
    font-weight: 700;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
`;

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.background = '#ff8c00';
    scrollTopBtn.style.transform = 'translateY(-3px)';
    scrollTopBtn.style.boxShadow = '0 6px 15px rgba(212, 175, 55, 0.6)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.background = '#d4af37';
    scrollTopBtn.style.transform = 'translateY(0)';
    scrollTopBtn.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.5)';
});

document.body.appendChild(scrollTopBtn);

// スクロール時にボタンを表示/非表示
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

// ============================================
// ページ読み込み完了時の処理
// ============================================

window.addEventListener('load', () => {
    // ページ読み込みアニメーション
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

