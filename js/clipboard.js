// Clipboard utility module
export const Clipboard = {
    // Copy text to clipboard with modern API and fallback
    copyText: async (text) => {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(text);
                return true;
            } else {
                // Fallback for older browsers
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.style.position = 'fixed'; // Avoid scrolling to bottom
                document.body.appendChild(textarea);
                textarea.select();

                const success = document.execCommand('copy');
                document.body.removeChild(textarea);
                return success;
            }
        } catch (err) {
            console.error('Copy failed:', err);
            return false;
        }
    },

    // Initialize copy handlers for all elements with data-copy attribute
    init: () => {
        document.querySelectorAll('[data-copy]').forEach(element => {
            element.addEventListener('click', async (e) => {
                e.preventDefault();
                const textToCopy = element.getAttribute('data-copy') ||
                                  element.href ||
                                  element.textContent;

                const success = await Clipboard.copyText(textToCopy);

                // Provide visual feedback
                const originalText = element.textContent;
                element.textContent = success ? 'Copied!\n' : 'Failed to copy\n';

                setTimeout(() => {
                    element.textContent = originalText;
                }, 2000);
            });
        });
    }
};

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', Clipboard.init);