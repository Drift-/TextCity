//code to remove element using 'remove()' instead of having to call the parent element
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}