function openModal(imgElement) {
    const modalImage = document.getElementById('modalImage');
    modalImage.src = imgElement.src;  
    const modal = new bootstrap.Modal(document.getElementById('imageModal'));
    modal.show(); 
}
