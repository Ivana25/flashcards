let answer;
let question;
console.log("hi")
$(document).ready(function(){
    console.log('doc ready')
})
    $.ajax({
            type: 'GET',
            url: '/firstset_flashcards',
            success: function(data){
                console.log(data)
                data.forEach(flashcard => {
                    console.log(flashcard.question)
                answer = flashcard.answer
                $('.question').html(flashcard.question)
                $('.answer').html(flashcard.answer)
                
                });
                },
            error: function(err){
                console.log(err)
        }
    })

$('.display').click(function(){
    console.log("random question")
    $.ajax({
        type: 'GET',
        url: '/firstset_flashcards',
        success: function(data){
            console.log(data)
            let random = Math.floor(Math.random() * data.length)
            answer = data[random].answer
            $('.question').html(data[random].question)
            $('.answer').hide()
        },
        error: function(err){
            console.log(err)
        }
    })
})
$(".show").click(function () {
    $(".answer").show()
    $(".answer").html(answer);
})
    {$('.delete').click(function(){
    console.log("question and answer")
    
    app.delete('/firstset_flashcards', (req,res) => {
        db.collection('Cards').save(req.body, (err,result) => {
            if (err) return console.log(err)
    
            console.log('saved to database :)')
            res.redirect('/')
        })
    })
})
}                                                                
