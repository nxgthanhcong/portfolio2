const $ = document.querySelector.bind(document)
    ; (function () {

        // header shadow: header--active
        const HEADER_ACTIVE = 'header--active'
        const header = $('#header')
        window.addEventListener('scroll', function () {
            const pageOffsetY = window.pageYOffset
            header.classList[pageOffsetY > 0 ? 'add' : 'remove'](HEADER_ACTIVE)
        })

    })()