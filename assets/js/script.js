/* JS code requested by index.html file */

function resetToggler() {
    document.getElementById('toggler').style.border = "1px solid #646d7c"

    document.querySelectorAll('.line').forEach(div => div.style.height = '16%')
}

resetToggler()

function clickToggler() {
    let toggler = document.getElementById('toggler')

    if(toggler.style.borderWidth == '1px') {
        toggler.style.borderWidth = "4px"
    } else {
        toggler.style.borderWidth = "1px"
    }

    document.querySelectorAll('.line').forEach(div => {
        if(div.style.height == '16%') {
            div.style.height = "1px"
        } else {
            div.style.height = "16%"
        }
    })
}

$(function() {
    $('#toggler').on('click', function() {
        clickToggler()

        let top = $('#options').css('top')

        if(top == '-150px') {
            $('#options').animate({
                'top': 65
            }, 200)
        } else {
            $('#options').animate({
                'top': -150
            }, 200)
        }
    })

    let list = $('a')

    let menuHeight = $('#menu-area').innerHeight()

    function stopScrollMenu(ref, mainTop) {
        $(window).scroll(function() {
            list.removeClass('active')
            $('a[href="' + ref + '"]').addClass('active')
        })

        $('html, body').animate({
            scrollTop: mainTop - (menuHeight - 1)
        }, 800)
        
        setTimeout(() => {
            startScrollMenu()
        }, 820)
    }

    $('.link').click(function() {
        let id = $(this).attr('href')
        let topTarget = $(id).offset().top

        stopScrollMenu(id, topTarget)
        
        $('#options').animate({
            'top': -150
        }, 200)

        resetToggler()
    })

    let positions = {}

    $('.link').each(function() {
        let id = $(this).attr('href')
        positions[id] = ($(id).offset().top - menuHeight).toFixed(0)
    })

    function startScrollMenu() {
        $(window).scroll(function() {
            let topScroll = $(window).scrollTop()
            
            for(let id in positions) {
                if(topScroll >= positions[id]) {
                    list.removeClass('active')
                    $('a[href="' + id + '"]').addClass('active')
                }
            }
        })
    }

    startScrollMenu()

    $('#scroll-button').click(function() {
        stopScrollMenu('#section1', positions['#section1'])
    })

    $(window).scroll(function() {
        if(window.scrollY === 0) {
            $('#scroll-button').fadeOut('fast')
        } else {
            $('#scroll-button').fadeIn('fast')
        }
    })

    let windowWidth = $(window).width()

    $(window).resize(function() {
        if(windowWidth != $(window).width()) {
            location.reload()
        }
    })
})
