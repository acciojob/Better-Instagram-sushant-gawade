document.addEventListener('DOMContentLoaded', (event) => {
    let draggedItem = null;
    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragenter', handleDragEnter);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('dragleave', handleDragLeave);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragend', handleDragEnd);
    });

    // --- DRAG EVENT HANDLERS ---

    function handleDragStart(e) {
        draggedItem = this;
        this.classList.add('dragging');
        // Store the ID (useful for some browsers, though we use the global draggedItem)
        e.dataTransfer.setData('text/plain', this.id);
    }

    function handleDragEnd(e) {
        this.classList.remove('dragging');
        // Clean up the drop-over class from any lingering elements
        gridItems.forEach(item => item.classList.remove('over'));
        draggedItem = null;
    }
    
    function handleDragEnter(e) {
        if (this !== draggedItem) {
            this.classList.add('over');
        }
    }

    function handleDragLeave(e) {
        this.classList.remove('over');
    }

    function handleDragOver(e) {
        e.preventDefault(); 
    }

    function handleDrop(e) {
        e.preventDefault();

        const dropTarget = this;

        if (draggedItem && draggedItem !== dropTarget) {
            // --- THE CORE SWAPPING LOGIC ---
            
            // Get the current content (background-image URL) of the elements
            // We use getComputedStyle because the image is set via CSS
            const draggedContent = window.getComputedStyle(draggedItem).backgroundImage;
            const targetContent = window.getComputedStyle(dropTarget).backgroundImage;

            // Swap the content by setting the new background-image inline style
            draggedItem.style.backgroundImage = targetContent;
            dropTarget.style.backgroundImage = draggedContent;
        }

        // Clean up the 'over' class
        dropTarget.classList.remove('over');
    }
});