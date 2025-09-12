function toggleSection(sectionId, buttonElement) {
    const section = document.getElementById(sectionId);

    if (section.style.display === 'none' || section.style.display === '') {
        section.style.display = 'block';
        buttonElement.textContent = '▲';
    } else {
        section.style.display = 'none';
        buttonElement.textContent = '▼';
    }
}