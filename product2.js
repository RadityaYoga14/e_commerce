// Array gambar untuk slider
const productImages = [
    'callie.png',
    'produk 17.png', 
    'produk 19.png',
];

let currentImageIndex = 0;
let selectedColor = 'navy';
let selectedSize = 'L';
let currentQuantity = 1;

// Fungsi untuk menampilkan pesan notifikasi
function showMessage(message, type = 'success') {
    // Hapus pesan yang ada
    const existingMessage = document.querySelector('.notification-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Buat elemen pesan baru
    const messageEl = document.createElement('div');
    messageEl.className = `notification-message ${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#22c55e' : '#ef4444'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        font-weight: 500;
    `;

    document.body.appendChild(messageEl);

    // Animasi masuk
    setTimeout(() => {
        messageEl.style.transform = 'translateX(0)';
    }, 100);

    // Hilangkan pesan setelah 3 detik
    setTimeout(() => {
        messageEl.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 300);
    }, 3000);
}

// Fungsi untuk update gambar utama
function updateMainImage() {
    const mainImage = document.querySelector('.main-image');
    if (mainImage && productImages[currentImageIndex]) {
        mainImage.src = productImages[currentImageIndex];
        
        // Update thumbnail active state
        updateThumbnailActive();
    }
}

// Fungsi untuk update thumbnail aktif
function updateThumbnailActive() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        if (index === currentImageIndex) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

// Fungsi navigasi gambar - Previous
function previousImage() {
    currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : productImages.length - 1;
    updateMainImage();
}

// Fungsi navigasi gambar - Next  
function nextImage() {
    currentImageIndex = currentImageIndex < productImages.length - 1 ? currentImageIndex + 1 : 0;
    updateMainImage();
}

// Fungsi untuk klik thumbnail
function selectThumbnail(index) {
    if (index >= 0 && index < productImages.length) {
        currentImageIndex = index;
        updateMainImage();
    }
}

// Fungsi untuk pilih warna
function selectColor(button, color) {
    // Hapus class active dari semua tombol warna
    document.querySelectorAll('.color-option').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Tambah class active ke tombol yang dipilih
    button.classList.add('active');
    selectedColor = color;
    
    console.log('Warna dipilih:', selectedColor);
}

// Fungsi untuk pilih ukuran
function selectSize(button, size) {
    // Hapus class active dari semua tombol ukuran
    document.querySelectorAll('.size-option').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Tambah class active ke tombol yang dipilih
    button.classList.add('active');
    selectedSize = size;
    
    console.log('Ukuran dipilih:', selectedSize);
}

// Fungsi untuk menambah quantity
function increaseQuantity() {
    currentQuantity++;
    document.getElementById('quantity').value = currentQuantity;
}

// Fungsi untuk mengurangi quantity
function decreaseQuantity() {
    if (currentQuantity > 1) {
        currentQuantity--;
        document.getElementById('quantity').value = currentQuantity;
    }
}

// Fungsi untuk toggle love/favorite
function toggleLove() {
    const loveBtn = document.getElementById('loveBtn');
    
    if (loveBtn.classList.contains('loved')) {
        loveBtn.classList.remove('loved');
        loveBtn.innerHTML = '♡';
        showMessage('Dihapus dari favorit!', 'success');
    } else {
        loveBtn.classList.add('loved');
        loveBtn.innerHTML = '♥';
        showMessage('Ditambahkan ke favorit!', 'success');
    }
}

// Fungsi untuk add to cart
function addToCart() {
    const productData = {
        name: 'Callie X Hello Kitty cardigan',
        brand: 'CALLIE',
        price: 'Rp. 445.000',
        color: selectedColor,
        size: selectedSize,
        quantity: currentQuantity
    };
    
    console.log('Produk ditambahkan ke keranjang:', productData);
    showMessage(`Produk berhasil dimasukkan ke keranjang! (${currentQuantity} item)`, 'success');
}

// Fungsi untuk buy now
function buyNow() {
    const productData = {
        name: 'Callie X Hello Kitty cardigan',
        brand: 'CALLIE',
        price: 'Rp. 445.000',
        color: selectedColor,
        size: selectedSize,
        quantity: currentQuantity
    };
    
    console.log('Buy now dengan data:', productData);
    showMessage('Mengarahkan ke halaman checkout...', 'success');
    
    // Redirect ke halaman checkout setelah 1 detik
    setTimeout(() => {
        // Ganti dengan URL halaman checkout yang sesuai
        window.location.href = 'favproducts.html';
        // Atau jika ingin buka di tab baru:
        // window.open('checkout.html', '_blank');
    }, 1000);
}

// Event listener untuk keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        previousImage();
    } else if (e.key === 'ArrowRight') {
        nextImage();
    }
});

// Inisialisasi ketika halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    console.log('MISO Product Page Script loaded!');
    
    // Set thumbnail click events
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => selectThumbnail(index));
        thumbnail.style.cursor = 'pointer';
    });
    
    // Set initial active thumbnail
    updateThumbnailActive();
    
    // Update quantity input jika ada perubahan manual
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        quantityInput.addEventListener('change', function() {
            const newValue = parseInt(this.value);
            if (newValue >= 1) {
                currentQuantity = newValue;
            } else {
                this.value = currentQuantity;
            }
        });
    }
    
    // Tambahkan hover effect untuk thumbnails
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        thumbnail.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Tambahkan efek hover untuk navigation arrows
    const navArrows = document.querySelectorAll('.nav-arrow');
    navArrows.forEach(arrow => {
        arrow.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-50%) scale(1.1)';
        });
        
        arrow.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-50%) scale(1)';
        });
    });
});

// Auto-slide gambar setiap 5 detik (opsional - bisa dihapus jika tidak diinginkan)
/*
setInterval(() => {
    nextImage();
}, 5000);
*/

// Touch/swipe support untuk mobile (opsional)
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.main-image')?.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.main-image')?.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50; // minimum distance for swipe
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextImage(); // swipe left -> next image
        } else {
            previousImage(); // swipe right -> previous image
        }
    }
}

// Data reviews sample
const reviewsData = [
    {
        id: 1,
        name: "Jemie",
        time: "17 hours ago", 
        rating: 5,
        title: "Great",
        content: "ok zara.",
        fullContent: ""
    },
    {
        id: 2,
        name: "RobUrHeart", 
        time: "19 hours ago",
        rating: 5,
        title: "Good job",
        content: ".",
        fullContent: "."
    },
    {
        id: 3,
        name: "Mark zubejeg",
        time: "21 hours ago",
        rating: 5, 
        title: "Veery good Very well",
        content: "Yea good? ok good.",
        fullContent: ""
    },
    {
        id: 4,
        name: "Wildson",
        time: "1 day ago",
        rating: 5,
        title: "Keren banget dan nyamann",
        content: "Pas sampe langsung dicoba dan emg bagus banget asli cocok mix and match sama celana apa aja menurut gua, dan emg bahan linen nya itu bagus, ga tipis dan ga tebel banget,",
        fullContent: "Pas sampe langsung dicoba dan emg bagus banget asli cocok mix and match sama celana apa aja menurut gua, dan emg bahan linen nya itu bagus, ga tipis dan ga tebel banget, pkoknya keren deh, bakal repeat order warna lain nya si"
    },
    {
        id: 5,
        name: "Miray D.",
        time: "2 days ago",
        rating: 4,
        title: "Good", 
        content: "Bahan adem dan jatuh, gak kaku sama sekali. Jahitan rapi, cutting-nya juga pas di badan. Bisa dipakai ke kantor, meeting, atau jalan santai pun tetap oke. Garis-garisnya bikin badan kelihatan lebih ramping dan tinggi.",
        fullContent: "Bahan adem dan jatuh, gak kaku sama sekali. Jahitan rapi, cutting-nya juga pas di badan. Bisa dipakai ke kantor, meeting, atau jalan santai pun tetap oke. Garis-garisnya bikin badan kelihatan lebih ramping dan tinggi, Ukuran pas banget di aku"
    },
    {
        id: 6,
        name: "Rebecca Roberts",
        time: "3 days ago",
        rating: 4,
        title: "Good quality t-shirt",
        content: "Good",
        fullContent:"good thx"
    },
    {
        id: 7,
        name: "Carol",
        time: "3 days ago",
        rating: 5,
        title: "Super speedy delivery",
        content: "Pengiriman nya cepet banget, ga perlu nunggu lama. kurir nya juga baik banget..",
        fullContent: "Pengiriman nya cepet banget, ga perlu nunggu lama. kurir nya juga baik banget..apalagi packaging nya juga aman banget aman banget sumpah"
    },
    {
        id: 8,
        name: "IkanBersyap", 
        time: "4 days ago",
        rating: 3,
        title: "Bapuk",
        content: "Gatau ni jelek aja.",
        fullContent: "",
    },
    {
        id: 9,
        name: "Sarah Thompson",
        time: "5 days ago", 
        rating: 2,
        title: "Not as expected",
        content: "Mending beli hush puppy guys, better",
        fullContent: ""
    },
    {
        id: 10,
        name: "Michael Chen",
        time: "6 days ago",
        rating: 1,
        title: "Jlek",
        content: "JLK",
        fullContent: ""
    }
];

// State management
let currentReviews = [...reviewsData];
let expandedReviews = new Set();

// Fungsi untuk generate bintang rating
function generateStars(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHtml += '<span class="star filled">★</span>';
        } else {
            starsHtml += '<span class="star">★</span>';
        }
    }
    return starsHtml;
}

// Fungsi untuk truncate text
function truncateText(text, maxLength = 120) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Fungsi untuk render reviews
function renderReviews(reviews) {
    const reviewsGrid = document.getElementById('reviewsGrid');
    
    reviewsGrid.innerHTML = reviews.map(review => {
        const isExpanded = expandedReviews.has(review.id);
        const contentToShow = isExpanded ? review.fullContent : truncateText(review.content);
        const needsReadMore = review.fullContent.length > 120;
        
        return `
            <div class="review-card">
                <div class="review-stars">
                    ${generateStars(review.rating)}
                </div>
                <div class="reviewer-info">
                    <h4 class="reviewer-name">${review.name}</h4>
                    <span class="review-time">${review.time}</span>
                </div>
                <h3 class="review-title">${review.title}</h3>
                <p class="review-content" id="content-${review.id}">
                    ${contentToShow}
                    ${needsReadMore && !isExpanded ? `<button class="read-more-btn" onclick="toggleReadMore(${review.id})">Read more</button>` : ''}
                    ${needsReadMore && isExpanded ? `<button class="read-more-btn" onclick="toggleReadMore(${review.id})">Read less</button>` : ''}
                </p>
            </div>
        `;
    }).join('');
}

// Fungsi untuk toggle read more/less
function toggleReadMore(reviewId) {
    const review = reviewsData.find(r => r.id === reviewId);
    if (!review) return;
    
    if (expandedReviews.has(reviewId)) {
        expandedReviews.delete(reviewId);
    } else {
        expandedReviews.add(reviewId);
    }
    
    // Re-render hanya review yang berubah
    renderReviews(currentReviews);
}

// Fungsi untuk sort reviews berdasarkan rating (tertinggi ke terendah)
function sortReviewsByRating() {
    currentReviews = [...reviewsData].sort((a, b) => {
        // Sort by rating desc, then by time (newest first)
        if (b.rating !== a.rating) {
            return b.rating - a.rating;
        }
        // Jika rating sama, sort by time
        const timeA = parseTime(a.time);
        const timeB = parseTime(b.time);
        return timeA - timeB;
    });
}

// Helper function untuk parsing waktu
function parseTime(timeStr) {
    const now = new Date();
    if (timeStr.includes('hour')) {
        const hours = parseInt(timeStr);
        return new Date(now.getTime() - (hours * 60 * 60 * 1000));
    } else if (timeStr.includes('day')) {
        const days = parseInt(timeStr);
        return new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));
    }
    return now;
}

// Fungsi untuk menghitung dan update overall rating
function updateOverallRating() {
    const totalRating = reviewsData.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = (totalRating / reviewsData.length).toFixed(1);
    const totalReviews = reviewsData.length.toLocaleString();
    
    // Update header info
    const trustpilotInfo = document.querySelector('.trustpilot-info p');
    if (trustpilotInfo) {
        trustpilotInfo.innerHTML = `Rated <strong>${averageRating} / 5</strong> based on <strong>${totalReviews} reviews</strong> on ⭐ Trustpilot`;
    }
}

// Fungsi untuk smooth scroll
function initSmoothScroll() {
    const reviewsGrid = document.getElementById('reviewsGrid');
    reviewsGrid.style.scrollBehavior = 'smooth';
}

// Fungsi untuk lazy loading (opsional)
function observeReviewCards() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    document.querySelectorAll('.review-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Event listener untuk infinite scroll
function initInfiniteScroll() {
    const reviewsGrid = document.getElementById('reviewsGrid');
    let isLoading = false;
    
    reviewsGrid.addEventListener('scroll', function() {
        if (isLoading) return;
        
        const scrollTop = this.scrollTop;
        const scrollHeight = this.scrollHeight;
        const clientHeight = this.clientHeight;
        
        // Trigger saat hampir mencapai bottom
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            console.log('Near bottom - could load more reviews');
            // Di sini bisa ditambahkan logic untuk load more reviews
        }
    });
}

// Inisialisasi saat DOM loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Reviews system loaded!');
    
    // Sort reviews dan render
    sortReviewsByRating();
    renderReviews(currentReviews);
    
    // Update overall rating
    updateOverallRating();
    
    // Initialize features
    initSmoothScroll();
    initInfiniteScroll();
    
    // Lazy loading animation
    setTimeout(() => {
        observeReviewCards();
    }, 100);
    
    console.log(`Loaded ${reviewsData.length} reviews, sorted by rating (highest first)`);
});