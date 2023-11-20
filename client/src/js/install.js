const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();                         // prevent the mini-bar from appearing on mobile
    window.deferredPrompt = event;                 // stash the event so it can be triggered later
    butInstall.classList.toggle('hidden', false); // remove the hidden class from the button and make it visible
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const prompt = window.deferredPrompt;
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {});
