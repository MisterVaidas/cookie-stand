const themeSelector = document.getElementById('theme');

themeSelector.addEventListener('change', function() {
    document.body.className = this.value;
});