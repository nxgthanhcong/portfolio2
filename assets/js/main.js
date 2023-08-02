const $ = document.querySelector.bind(document)
    ; (function () {

        // header shadow: header--active
        const HEADER_ACTIVE = 'header--active'
        const header = $('#header')
        window.addEventListener('scroll', function () {
            const pageOffsetY = window.pageYOffset
            header.classList[pageOffsetY > 0 ? 'add' : 'remove'](HEADER_ACTIVE)
        })

        // moblie:  button toggle menu
        const toggleBtn = $('.toggle-btn')
        const mobileNavigation = $('.mobile-navigation')
        toggleBtn.addEventListener('click', function () {
            toggleBtn.classList.toggle('active')
            mobileNavigation.classList.toggle('active')
        })

    })()