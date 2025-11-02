// Fungsi untuk toggle dropdown filter
function toggleFilter(filterId) {
    const filterContent = document.getElementById(filterId);
    const icon = document.getElementById('icon-' + filterId);
    
    // Toggle class collapsed
    filterContent.classList.toggle('collapsed');
    
    // Rotate icon ketika diklik
    if (filterContent.classList.contains('collapsed')) {
        icon.style.transform = 'rotate(0deg)';
    } else {
        icon.style.transform = 'rotate(90deg)';
    }
}

// Inisialisasi: semua filter terbuka saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Semua filter sudah terbuka by default (tidak ada class collapsed)
    // Jika ingin menutup semua filter saat halaman dimuat, uncomment baris berikut:
    
    /*
    const filters = ['kategori', 'ukuran', 'harga'];
    filters.forEach(filterId => {
        const filterContent = document.getElementById(filterId);
        filterContent.classList.add('collapsed');
    });
    */
    
    // Animasi hover untuk product cards
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
});

// Fungsi untuk menambah animasi pada rating stars
document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.star');
    
    stars.forEach(star => {
        star.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        star.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});