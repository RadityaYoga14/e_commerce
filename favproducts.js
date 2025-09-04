function toggleLike(heartElement) {
    heartElement.classList.add('animate');
    
    if (heartElement.classList.contains('liked')) {
        heartElement.classList.remove('liked');
        heartElement.classList.add('unliked');
    } else {
        heartElement.classList.remove('unliked');
        heartElement.classList.add('liked');
    }
    
    setTimeout(() => {
        heartElement.classList.remove('animate');
    }, 300);
}