document.addEventListener('DOMContentLoaded', (event) => {
    // A global variable to store the element being dragged
    let draggedItem = null;

    // 1. Get all the grid items
    const gridItems = document.querySelectorAll('.grid-item');

    // 2. Add event listeners to all items
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

        // Since we are swapping *content* (background images) and not the elements themselves, 
        // we don't need to use e.dataTransfer.setData().
    }

    function handleDragEnd(e) {
        // Remove the visual feedback class from the dragged item
        this.classList.remove('dragging');
        draggedItem = null;
    }
    
    function handleDragEnter(e) {
        // Prevent action on the dragged element itself
        if (this !== draggedItem) {
            this.classList.add('over');
        }
    }

    function handleDragLeave(e) {
        // Remove the 'over' class when the drag leaves the target
        this.classList.remove('over');
    }

    function handleDragOver(e) {
        // This is necessary to allow dropping
        e.preventDefault(); 
    }

    function handleDrop(e) {
        e.preventDefault();

        // The target element where the drag is dropped
        const dropTarget = this;

        // Ensure the drag is not dropped onto itself
        if (draggedItem !== dropTarget) {
            // --- THE CORE SWAPPING LOGIC ---

            // 1. Get the current background images (the content)
            const draggedContent = window.getComputedStyle(draggedItem).backgroundImage;
            const targetContent = window.getComputedStyle(dropTarget).backgroundImage;

            // 2. Swap the content
            draggedItem.style.backgroundImage = targetContent;
            dropTarget.style.backgroundImage = draggedContent;

            // 3. Optional: Remove any hover/over classes
            dropTarget.classList.remove('over');

        } else {
            // If dropped onto itself, just remove any hover/over classes
            dropTarget.classList.remove('over');
        }
    }

    // Optional: Add styling for the 'over' class to style the drop zone in style.css
    /*
    .grid-item.over {
        border: 2px solid #007bff;
        box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
    }
    */
});