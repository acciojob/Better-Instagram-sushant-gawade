document.addEventListener('DOMContentLoaded', (event) => {
    // A global variable to store the element currently being dragged
    let draggedItem = null;

    // Get all the grid items
    const gridItems = document.querySelectorAll('.grid-item');

    // Add event listeners to all items
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
        // Set the currently dragged item
        draggedItem = this;

        // Add a class for visual feedback
        this.classList.add('dragging');
        
        // Use dataTransfer to store a placeholder, though we are mainly swapping content
        // This is necessary for some browsers to initiate drag
        e.dataTransfer.setData('text/plain', this.id);
    }

    function handleDragEnd(e) {
        // Remove the visual feedback class from the dragged item
        this.classList.remove('dragging');
        draggedItem = null;
    }
    
    function handleDragEnter(e) {
        // Add visual feedback to the potential drop target
        if (this !== draggedItem) {
            this.classList.add('over');
        }
    }

    function handleDragLeave(e) {
        // Remove visual feedback when drag leaves the target
        this.classList.remove('over');
    }

    function handleDragOver(e) {
        // This is essential to allow dropping (by default, drop is disabled)
        e.preventDefault(); 
    }

    function handleDrop(e) {
        e.preventDefault();

        const dropTarget = this;

        // Ensure the drag is not dropped onto itself
        if (draggedItem !== dropTarget) {
            // --- THE CORE SWAPPING LOGIC ---

            // 1. Get the current background image URL (the content) of the elements
            // We must use getComputedStyle because the image is set via CSS, not inline style.
            // Note: window.getComputedStyle is safer for cross-browser consistency.
            const draggedContent = window.getComputedStyle(draggedItem).backgroundImage;
            const targetContent = window.getComputedStyle(dropTarget).backgroundImage;

            // 2. Swap the content by changing the inline style (which overrides CSS)
            draggedItem.style.backgroundImage = targetContent;
            dropTarget.style.backgroundImage = draggedContent;
            
            // Note: If you want to keep the content swap in the CSS file, 
            // you would swap the element's IDs or a unique class instead.
        }

        // Remove the 'over' class from the drop target
        dropTarget.classList.remove('over');
    }
});