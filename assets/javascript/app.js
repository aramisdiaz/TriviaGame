$(document).ready(function(){
  

    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {

    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',

    questions: {
      q1: "Which of the following dice is used to make ability checks?",
      q2: "Which of the following races has darkvision?",
      q3: "Which two Saves are Sorcerers proficient in?",
      q4: "At what level does a Paladin gain an aura that adds CHA to all Saving Throws?",
      q5: "Which class utilizes a d12 hit die?",
      q6: "What is the base spell level of the Fireball spell?",
      q7: "A Rakshasa is vulnerable to what damage type, when inflicted by a good creature using a magic weapon?",
      q8: "Which dragon has an acidic breath attack?",
      q9: "Who is the Supreme Master of The Nine Hells?",
      q10:"Who, along with Dave Arneson, created Dungeons & Dragons?",


    },
    options: {
      q1: ['d4', 'd6', 'd12', 'd20'],
      q2: ['Halfling', 'Bugbear', 'Dragonborn', 'Kenku'],
      q3: ['DEX and CHA', 'INT and WIS', 'CON and CHA', 'INT and CHA'],
      q4: ['6', '9', '13', '20'],
      q5: ['Paladin', 'Barbarian', 'Paladin', 'Ranger'],
      q6: ['3rd','4th','5th','6th'],
      q7: ['Bludgeoning', 'Piercing', 'Slashing','Fire'],
      q8: ['Blue', 'Green', 'White','Black'],
      q9: ['Baalzebul', 'Asmodeus', 'Mephistopheles','Demogorgon'],
      q10: ['Gary Gygax', 'Richard Garfield', 'Jeremy Crawford','Peter Adkison'],


    },
    answers: {
      q1: 'd20',
      q2: 'Bugbear',
      q3: 'CON and CHA',
      q4: '6',
      q5: 'Barbarian',
      q6: '3rd',
      q7: 'Piercing',
      q8: 'Black',
      q9: 'Asmodeus',
      q10: 'Gary Gygax'
    },



    startGame: function(){

      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      

      $('#game').show();
      

      $('#results').html('');
      

      $('#timer').text(trivia.timer);
      

      $('#start').hide();
  
      $('#remaining-time').show();
      

      trivia.nextQuestion();
      
    },

    nextQuestion : function(){
      

        trivia.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      

      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      

      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      

      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      

      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-lg btn-danger">'+key+'</button>'));
      })
      
    },

    timerRunning : function(){

        if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }

      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }

      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        

        $('#results')
          .html('<h3>You made it to the end of the dungeon!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Play again, if you dare!</p>');
        

          $('#game').hide();
        

          $('#start').show();
      }
      
    },

    guessChecker : function() {
      

        var resultId;
      

        var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      

        if($(this).text() === currentAnswer){

            $(this).addClass('btn-success').removeClass('btn-danger');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>INT Check Passed!</h3>');
      }

      else{

        $(this).addClass('btn-warning').removeClass('btn-danger');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>INT Check Failed! The answer is '+ currentAnswer +'.</h3>');
      }
      
    },

    guessResult : function(){
      

        trivia.currentSet++;
      

        $('.option').remove();
      $('#results h3').remove();
      

      trivia.nextQuestion();
       
    }
  
  }