import { register } from 'register-service-worker'

// The ready(), registered(), cached(), updatefound() and updated()
// events passes a ServiceWorkerRegistration instance in their arguments.
// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration

register(process.env.SERVICE_WORKER_FILE, {
    // The registrationOptions object will be passed as the second argument
    // to ServiceWorkerContainer.register()
    // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Parameter

    // registrationOptions: { scope: './' },

    ready(/* registration */) {
        console.log('Service worker is active.')
    },

    registered(/* registration */) {
        console.log('Service worker has been registered.')
    },

    cached(/* registration */) {
        console.log('Content has been cached for offline use.')
    },

    updatefound(registration) {
        console.log('New content is downloading.')
        const installing = registration.installing
        installing && installing.addEventListener('statechange', () => {
            if (installing.state === 'installed') {
                console.log('New content is installed')
                window.AppState.updated = true
            }
        })
    },

    updated(/* registration */) {
        console.log('New content is available')
    },

    offline() {
        console.log('No internet connection found. App is running in offline mode.')
    },

    error(err) {
        console.error('Error during service worker registration:', err)
    }
})
