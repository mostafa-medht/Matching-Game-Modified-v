/*
 * Create a list that holds all of your cards
 */

$(document).ready(function(){
    /*
     * Create a list that holds all of your cards
     */
    // Adding main Vars 
    //const matchedCards = document.getElementsByClassName('card match');
    //const openCards = document.getElementsByClassName('card show open');
    const restart = document.getElementById('restart');
    const moves = document.getElementById("moves");
    const uls = document.getElementsByTagName('ul');
    let counter = 0 ;
    const minutesLabel = document.getElementById("minutes");
    const secondsLabel = document.getElementById("seconds");
    const $deck = $('.deck');

    // Array of cards object 

    let cards = ['diamond','diamond','paper-plane-o','paper-plane-o','anchor','anchor','bolt','bolt','cube','cube','leaf','leaf','bicycle','bicycle','bomb','bomb'];
    
    // Initialization Function  
    window.init = function () {
	    shuffle(cards);
	    $deck.empty();
	    // A for loop creates 16  <li> tags with the class of card for every <i> tag
	    // A class of fa fa- and a name of each object from the objects=[] array
	    for (let i = 0; i < cards.length; i++) {
	        $deck.append($('<li class="card"><i class="fa fa-' + cards[i] + '"></i></li>'));
	    }
	    
	    for (let i=0; i<=2 ;i++){
	     uls[0].children[i].firstChild.className = "fa fa-star";
	    }

	    clickHandler();
	    
	    timer = setInterval(setTime, 1000);
	    window.clearInterval(timer);
	    reset();
    };

    // Shuffle Function with cards obj as para 

    function shuffle (cards){
        let random = 0; 
        let temp = 0;
        for(let i=0;i<cards.length ;i++){
            random = Math.round(Math.random()*i) ;
            //console.log(random);
            temp = cards[i];
            cards[i] = cards[random];
            cards[random] = temp;
        }
        console.log(cards);
    }

    // Counter Function used with time and moves 

    function count() {
        return counter +=1;
    }

    // Reset function

    function reset(){
        totalSecs  = 0;
        counter = 0;
        moves.innerHTML = '0';
    }
   
    restart.addEventListener('click', init);


    var totalSecs = 0;
    var timer = setInterval(setTime, 1000);

    // Set time function

    function setTime (){
        totalSecs++ ; 
        secondsLabel.innerHTML = convertToStr(totalSecs%60);
        minutesLabel.innerHTML = convertToStr(parseInt(totalSecs/60));
    }

    // convert time to string fun 

    function convertToStr (value){
        let valueStr = value + '' ;
        if (valueStr.length < 2){
            return '0' + valueStr; 
        } else {
            return valueStr;
        }
    }

    // Click Handler fun

    function clickHandler (e){
        $('.card').on('click',function(e){
                 if (
                //e.target.id === 'deck' ||
                // e.target.className.includes('open') ||
                // e.target.className.includes('match')
                $(this).hasClass('show') || $(this).hasClass('match') ) {return e.preventDefault();} 
                $(this).addClass('card show open');
                this.openCards = document.getElementsByClassName('card show open');
                if(this.openCards && this.openCards.length >= 2) {
                    checMatch(this.openCards);
                }
            rating();
        });
    }

    // Check match fun 

    function checMatch (cards){
        let opCards = cards;
            if ($('.card.show.open ').length==2){
                moves.innerHTML = count();
                if (opCards&&opCards[0].children[0].className == opCards[1].children[0].className){
                    $('.card.show.open').each(function(){
                        $(this).addClass('match');
                    });
                    $('.card.show.open').each(function(){
                        $(this).removeClass('show open');
                    });    
                    checWin();
                }else {
                    $deck.find('.open').addClass('unmatch');
                    setTimeout(function(){
                        $('.card.show.open').each(function(){
                            $(this).removeClass('show open unmatch');
                        }); 
                    },400);
                }
                
        }
    }

    // check Win fun

    function checWin(){
        if($('.match').length == 16){
        $('#myText').text(`In ${totalSecs} seconds, you did a total of ${moves.innerHTML} moves with Scores ${$('.fa-star').length} . Well done!`);
        $('#infoModalLabel').html('<h4> &#9818; &#9787; &#9996; Congratulation ,You Win ! &#9996; &#9818; &#9787; <h4>');    
        $('#myModal').modal('toggle');
        }
    }

    // Check lose fun

    function checLose(){
        if (moves.innerHTML >20){
            $('#myText').text(`In ${totalSecs} seconds, you did a total of ${moves.innerHTML} moves with Scores 0. Sorry!`);
            $('#infoModalLabel').html('<h4> &#9785; &#9785 OOps , You Lose &#9785; &#9785; <h4>');
            $('#myModal').modal('toggle');
        }
    }

    // Rating fun or scores

    function rating(){
        if (moves.innerHTML > 7 && moves.innerHTML <= 10){
            uls[0].children[0].firstChild.className = "fa fa-star-o";
        } else if ( moves.innerHTML > 10 && moves.innerHTML <=20) {
            uls[0].children[1].firstChild.className = "fa fa-star-o";
        }
        else  {
            checLose();
        }
    }

    init ();

// Shuffle function from http://stackoverflow.com/a/2450976
// function shuffle(array) {
//     var currentIndex = array.length, temporaryValue, randomIndex;

//     while (currentIndex !== 0) {
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex -= 1;
//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//     }

//     return array;
// }

});