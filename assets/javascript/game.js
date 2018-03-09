/* global variable declarations */
var crystal_colors = ["aliceblue", "antiquewhite", "azure", "bisque", "cornsilk", "honeydew", "lightyellow", "linen", "oldlace", "seashell", "papayawhip", "ivory"], chosen_crystal_colors = [], crystal_values = [];
var score_to_get = 21, current_score = 0;
var winning = false, losing = false;
var buttons = document.getElementsByTagName('button');

/* animate function */
function animate() {
    /* handles border radius changes */
    for (var i = 0; i < 9; i++) {
        var crystal_border_radius = Math.floor(Math.random() * (45 - 15 + 1)) + 15;
        var random_index = buttons[(Math.floor(Math.random() * buttons.length))];

        random_index.style.borderRadius = crystal_border_radius + "%";
    }

    /* handles background color changes */
    if (losing)
        $('body').css('background-color', '#682111');
    else if (winning)
        $('body').css('background-color', '#ffffff');
    else
        $('body').css('background-color', crystal_colors[(Math.floor(Math.random() * crystal_colors.length))]);

    /* animate function calls itself FOREVER */
    setTimeout(function() {
        animate();
    }, 1000);
}

/* new game method */
function new_game() {
    animate();
    
    /* reset global variables */
    chosen_crystal_colors = [], crystal_values = [], current_score = 0, winning = false, losing = false, score_to_get = Math.floor(Math.random() * (43 - 17 + 1)) + 17;

    /* reset display text */
    $('.game_status').text("the number to get is " + score_to_get);
    $('.score').text("your current nubmer is 0" + current_score);
    $('.win_image').css('margin-top', '-250px');

    /* initialize crystal_values array with non-repeating numbers, 1 through 9 */
    for (var i = 0; i < 9; i++) {
        var crystal_value_addition = Math.floor(Math.random() * (9 - 1 + 1)) + 1;

        /* check duplicates & decrement if so to remain in the loop */
        if (crystal_values.includes(crystal_value_addition)) {
            i--;
        } else {
            /* otherwise, push the new value to the array */
            crystal_values.push(crystal_value_addition);
        }
    }

    /* initialize chosen_crystal_colors array with randomly chosen colors from pre-defined array
    and fills all the buttons on screen with those colors */
    for (var i = 0; i < 9; i++) {
        var crystal_color_addition = crystal_colors[(Math.floor(Math.random() * crystal_colors.length))];

        /* duplicate check similar to the one for crystal values */
        if (chosen_crystal_colors.includes(crystal_color_addition)) {
            i--;
        } else {
            chosen_crystal_colors.push(crystal_color_addition);

            buttons[i].style.backgroundColor = crystal_color_addition;
        }
    }
}

/* if win conditions were met */
function win() {
    $('.game_status').text("! wOo HoO ! yOu WoN !");
    $('.win_image').css('margin-top', '0');

    setTimeout(function() {
        $('.game_status').text("! WoO hOo ! YoU wOn !");

        setTimeout(function() {
            if (winning)
                win();
        }, 250);
    }, 250);
}

/* if lose conditions were met */
function lose() {
    $('.game_status').text("! bOo HoO ! yOu LoSt !");

    setTimeout(function() {
        $('.game_status').text("! BoO hOo ! YoU lOsT !");

        /*  */
        setTimeout(function() {
            if (losing)
                lose();
        }, 250);
    }, 250);
}

/*function remove_element_class(element_class, classes_to_be_removed) {
    console.log(element_class);
    
    for (var i = 0; i < classes_to_be_removed.length; i++)
        if (document.getElementsByClassName(element_class).classList.contains(classes_to_be_removed[i]))
            document.getElementsByClassName(element_class).removeClass(classes_to_be_removed[i]);
}*/

/* once the document finishes loading */
$(document).ready(function() {
    /* every time an element with the class 'crystal' is clicked */
    $('.crystal').click(function() {
        /* determine if the playing is currently winning or losing to prevent overloading */
        if (!winning && !losing) {
            /* get which crystal was clicked and do a little margin animation */
            var clicked_crystal = $(this);

            clicked_crystal.css('margin-top', '50px');
            setTimeout(function() { clicked_crystal.css('margin-top', '0') }, 300);

            /* update the player's score based on the set value of the clicked crystal */
            current_score += crystal_values[parseInt(clicked_crystal.attr('id')) - 1];

            /* aesthetic formatting */
            if (current_score < 10)
                $('.score').text("your current number is 0" + current_score);
            else
                $('.score').text("your current number is " + current_score);
            
            $('.score').addClass("shake-slow");
            $('.score').addClass("shake-constant");
            
            setTimeout(function() {
                $('.score').removeClass("shake-slow");
                $('.score').removeClass("shake-constant");
            }, 150);

            /* determine if the player has won or lost after having clicked a crystal */
            if (current_score === score_to_get) {
                winning = true;

                $('.game_status').css('font-size', '40px');
                $('.game_status').addClass("shake-opacity");
                $('.game_status').addClass("shake-constant");
                $('body').css('background-color', '#ffffff');

                setTimeout(function() {
                    winning = false;

                    $('.game_status').css('font-size', '20px');
                    $('.game_status').removeClass("shake-opacity");
                    $('.game_status').removeClass("shake-constant");
                    
                    new_game();
                }, 2000);

                win();
            } else if (current_score > score_to_get) {
                losing = true;

                $('.game_status').css('font-size', '40px');
                $('body').css('background-color', '#682111');
                $('.display_text').addClass("shake-opacity");
                $('.display_text').addClass("shake-constant");
                $('.crystal_field').addClass("spin");
                $('.crystal_field').css('opacity', '0.25');
                $('.crystal_field').css('zoom', '2');

                setTimeout(function() {
                    losing = false;

                    $('.game_status').css('font-size', '20px');
                    /*var classes_to_be_removed = ["shake-opacity", "shake-constant"];
                    remove_element_class("display_text", classes_to_be_removed);*/
                    $('.display_text').removeClass("shake-opacity");
                    $('.display_text').removeClass("shake-constant");
                    $('.crystal_field').removeClass("spin");
                    $('.crystal_field').css('opacity', '1');
                    $('.crystal_field').css('zoom', '1');

                    new_game();
                }, 2000);

                lose();
            }
        }
    });
});