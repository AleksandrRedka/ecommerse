$(document).ready(
    (function () {
        (function () {
            const pointSize = 2.5;
            const waves = new ShaderProgram( document.querySelector( '.particles' ), {
                texture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAb1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8v0wLRAAAAJHRSTlMAC/goGvDhmwcExrVjWzrm29TRqqSKenRXVklANSIUE8mRkGpv+HOfAAABCElEQVQ4y4VT13LDMAwLrUHteO+R9f/fWMfO6dLaPeKVEECRxOULWsEGpS9nULDwia2Y+ALqUNbAWeg775zv+sA4/FFRMxt8U2FZFCVWjR/YrH4/H9sarclSKdPMWKzb8VsEeHB3m0shkhVCyNzeXeAQ9Xl4opEieX2QCGnwGbj6GMyjw9t1K0fK9YZunPXeAGsfJtYjwzxaBnozGGorYz0ypK2HzQSYx1y8DgSRo2ewOiyh2QWOEk1Y9OrQV0a8TiBM1a8eMHWYnRMy7CZ4t1CmyRkhSUvP3gRXyHOCLBxNoC3IJv//ZrJ/kxxUHPUB+6jJZZHrpg6GOjnqaOmzp4NDR48OLxn/H27SRQ08S0ZJAAAAAElFTkSuQmCC',
                uniforms: {
                    size: { type: 'float', value: pointSize },
                    field: { type: 'vec3', value: [ 0, 0, 0 ] },
                    speed: { type: 'float', value: 5 },
                },
                vertex: `
        #define M_PI 3.1415926535897932384626433832795
        precision highp float;
        attribute vec4 a_position;
        attribute vec4 a_color;
        uniform float u_time;
        uniform float u_size;
        uniform float u_speed;
        uniform vec3 u_field;
        uniform mat4 u_projection;
        varying vec4 v_color;
        void main() {
          vec3 pos = a_position.xyz;
          pos.y += (
            cos(pos.x / u_field.x * M_PI * 8.0 + u_time * u_speed) +
            sin(pos.z / u_field.z * M_PI * 8.0 + u_time * u_speed)
          ) * u_field.y;
          gl_Position = u_projection * vec4( pos.xyz, a_position.w );
          gl_PointSize = ( u_size / gl_Position.w ) * 100.0;
          v_color = a_color;
        }`,
                fragment: `
        precision highp float;
        uniform sampler2D u_texture;
        varying vec4 v_color;
        void main() {
          gl_FragColor = v_color * texture2D(u_texture, gl_PointCoord);
        }`,
                onResize( w, h, dpi ) {
                    const position = [], color = [];
                    const width = 400 * ( w / h );
                    const depth = 400;
                    const height = 3;
                    const distance = 5;
                    for ( let x = 0; x < width; x += distance ) {
                        for ( let z = 0; z < depth; z+= distance ) {
                            position.push( - width / 2 + x, -30, -depth / 2 + z );
                            color.push( 0, 1 - ( x / width ) * 1, 0.5 + x / width * 0.5, z / depth )
                        }
                    }
                    this.uniforms.field = [ width, height, depth ];
                    this.buffers.position = position;
                    this.buffers.color = color;
                    this.uniforms.size = ( h / 400) * pointSize * dpi
                },
            } )
        })();
        (function () {
            if ($(window).width() >= '768') {
                const myFullpage = new fullpage('#fullpage', {
                    scrollOverflow: true,
                    scrollingSpeed: 800,
                    menu: ".navigation_menu",
                    anchors: ['main', 'service', 'portfolio', 'about', 'contacts', 'footer'],
                });
            }
        })();
        (function () {
            if ($(window).width() <= '1024') {
                $('.menu-js').click(function () {
                    $('body').toggleClass('body_hidden');
                    $(this).toggleClass('wrapper_burger_open');
                    $('.wrapper_nav').toggleClass('wrapper_nav_open');
                    $('.navigation_menu_bg').toggleClass('navigation_menu_bg_open');
                })
            }
        })();
        (function(){
            if ($(window).width() <= '1024') {
                $('.close-menu').click(function () {
                    $('body').toggleClass('body_hidden');
                    $('.menu-js').toggleClass('wrapper_burger_open');
                    $('.wrapper_nav').toggleClass('wrapper_nav_open');
                    $('.navigation_menu_bg').toggleClass('navigation_menu_bg_open');
                })
            }
        })();
        (function () {
            $('.brief-js').click(function () {
                $(this).toggleClass('add_brief_open');
                $('.downloader_brief').toggleClass('brief_open');
                $('.post_brief').toggleClass('brief_open');
            })
        })();
        (function () {
            $('.portfolio_slider_text').slick({
                fade: true,
                dots: false,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                asNavFor: '.portfolio_slider_img',
                arrows: false,
            });
            $('.portfolio_slider_title').slick({
                mobileFirst: true,
                asNavFor: '.portfolio_slider_img',
                vertical: true,
                dots: false,
                infinite: true,
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: false,
                centerMode:true,
                centerPadding: '33%',
                responsive: [
                    {
                        breakpoint: 350,
                        settings: {
                            centerPadding: '32%',
                        }
                    },
                    {
                        breakpoint: 400,
                        settings: {
                            centerPadding: '33%',
                        }
                    },
                    {
                        breakpoint: 767,
                        settings: {
                            centerPadding: '27%',
                        }
                    },
                    {
                        breakpoint: 1024,
                        settings: {
                            centerPadding: '28%',
                        }
                    },
                    {
                        breakpoint: 1250,
                        settings: {
                            centerPadding: '38%',
                        }
                    },
                    {
                        breakpoint: 1300,
                        settings: {
                            centerPadding: '26%',
                        }
                    },
                    {
                        breakpoint: 1400,
                        settings: {
                            centerPadding: '38%',
                        }
                    },
                    {
                        breakpoint: 1700,
                        settings: {
                            centerPadding: '28%',
                        }

                    },
                    {
                        breakpoint: 1700,
                        settings: {
                            centerPadding: '30%',
                        }

                    },

                    ],
            });
            $('.portfolio_slider_img').slick({
                swipe: false,
                vertical: true,
                dots: false,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                asNavFor: '.portfolio_slider_text,.portfolio_slider_title',
                arrows: true,
                prevArrow: '<button class="slick-review slick-prev portfolio-slider-prev"><img src="http://thelab-agency.kiev.ua/wp-content/themes/ardeil/assets/img/svg/Path 127.svg" alt=""></button>',
                nextArrow: '<button class="slick-review slick-next portfolio-slider-next"><img src="http://thelab-agency.kiev.ua/wp-content/themes/ardeil/assets/img/svg/Path 126.svg" alt=""></button>',
            });
        })();
        (function () {
            $('.slick-prev').click(function () {
                   $('.client_site_open').removeClass('client_site_open');
                   $('.slick-active').find('div.client_site').toggleClass('client_site_open');

                }
            );
            $('.slick-next').click(function () {
                    $('.client_site_open').removeClass('client_site_open');
                    $('.slick-active').find('div.client_site').toggleClass('client_site_open');
                }
            )
        })();
        (function () {
            $('.call-js').click(function () {
                $('body').addClass('body_hidden');
                $('.wrapper_pop_up').addClass('wrapper_pop_up_open');
                if ($(window).width() >= '768') {
                    fullpage_api.setAllowScrolling(false);
                }
            });
            $('.close-pop-js').click(function () {
                $('body').removeClass('body_hidden');
                $('.wrapper_pop_up').removeClass('wrapper_pop_up_open');
                if ($(window).width() >= '768'){
                    fullpage_api.setAllowScrolling(true);
                }
            });

        })();
        (function () {
            $(document).on('scroll', function () {
                let lengthScroll = $(document).scrollTop();
                if (lengthScroll > 150) {
                    $('header').css('background-color', 'rgba(48,46,50,0.7)');
                } else {
                    $('header').css('background-color', '')

                }
            });
        })();
        (function () {
            $('.pop-up-client-js').click(function () {
                $('body').addClass('body_hidden');
                let titleCompany = $(this).text();
                let linkCompany=$('.slick-active').find('a.clients_info_link').attr('href');


                $('.pop_up_portfolio_title').text(titleCompany);
                $('.client_url').attr('href', linkCompany);

                $('.wrapper_pop_up_portfolio').addClass('wrapper_pop_up_portfolio_open');

            });
            document.querySelector('.wrapper_pop_up_portfolio').onwheel = e => e.stopPropagation();
            $('.close-pop-portfolio-js').click(function () {
                $('body').removeClass('body_hidden');
                $('.wrapper_pop_up_portfolio').removeClass('wrapper_pop_up_portfolio_open');
            })
        })();

    })()
);