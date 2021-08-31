 //Select DOM 
const postInput = document.querySelector('.input-book'),
 createInput = document.querySelector('.add-icon'),
 sendButtonPost = document.querySelector('.send-button');

//Event Listeners
createInput.addEventListener('click', openModal);
sendButtonPost.addEventListener('click', addPosts);

//Functions
function openModal(){
  var parentOfInputFields = document.querySelector('.form-post');
  const classes = []
  for (var i = 0; i < parentOfInputFields.length; i++)  {
    // console.log(parentOfInputFields[i])
    var children = parentOfInputFields[i]
    var childrenClassName = children.className
    classes.push(childrenClassName)
  }
  // console.log(classes)
  if (classes[0] === "input-date"){
    console.log("add class")
    for (var i = 0; i < parentOfInputFields.length; i++) {
      var children_ = parentOfInputFields[i]
      if (i == 0){
        children_.classList.remove('input-date')
        children_.classList.add('input-date-open')
      }
      if (i == 1){
        children_.classList.remove('input-post')
        children_.classList.add('input-post-open')
      }
      if (i == 2){
        children_.classList.remove('input-place')
        children_.classList.add('input-place-open')
      }
      if (i == 3){
        children_.classList.remove('send-button')
        children_.classList.add('send-button-open')
      }
    }
  }
  else{
    console.log("remove class")
    for (var i = 0; i < parentOfInputFields.length; i++) {
      var children_ = parentOfInputFields[i]
      if (i == 0){
        children_.classList.remove('input-date-open')
        children_.classList.add('input-date')
      }
      if (i == 1){
        children_.classList.remove('input-post-open')
        children_.classList.add('input-post')
      }
      if (i == 2){
        children_.classList.remove('input-place-open')
        children_.classList.add('input-place')
      }
      if (i == 3){
        children_.classList.remove('send-button-open')
        children_.classList.add('send-button')
      }
    }
  }
  
}

function addPosts(e){
  e.preventDefault();
  var parentOfInputFields = document.querySelector('.form-post');
  // console.log(parentOfInputFields);
  var postText = []
  for (var i = 0; i < parentOfInputFields.length; i++){
    // console.log(parentOfInputFields[i].value)
    var value = parentOfInputFields[i].value;
    postText.push(value);
  }
  var articleTag = document.createElement('ARTICLE');
  articleTag.classList.add('post');
  var headingInArticle = document.createElement('H2');
  headingInArticle.classList.add('name-of-post');
  var placeInArticle = document.createElement('span');
  placeInArticle.classList.add('place-where-posted');
  headingInArticle.textContent = postText[0];
  placeInArticle.textContent = postText[2];
  headingInArticle.appendChild(placeInArticle);
  var textInArticle = document.createElement('p');
  textInArticle.classList.add('post-text');
  textInArticle.textContent = postText[1];
  articleTag.appendChild(headingInArticle);  
  articleTag.appendChild(textInArticle);
  const postsDiv = document.querySelector('.posts');
  postsDiv.appendChild(articleTag);
  // *** In this section I remove from inputs ***
  var invisibleFormDate = document.querySelector('.input-date-open');
  var invisibleFormText = document.querySelector('.input-post-open');
  var invisibleFormPlace = document.querySelector('.input-place-open');
  var invisibleFormButton = document.querySelector('.send-button-open');
  invisibleFormDate.classList.remove('input-date-open');
  invisibleFormDate.classList.add('input-date');
  invisibleFormText.classList.remove('input-post-open');
  invisibleFormText.classList.add('input-post');
  invisibleFormPlace.classList.remove('input-place-open');
  invisibleFormPlace.classList.add('input-place');
  invisibleFormButton.classList.remove('send-button-open');
  invisibleFormButton.classList.add('send-button'); 
  var informationText = document.querySelector('.post-is-added');

  // Show information text that everything from form was sendit
  informationText.classList.remove('post-is-added');
  informationText.classList.add('post-is-added-visible');
  setTimeout(hideElement, 2000) //milliseconds until timeout//
  function hideElement() {
    informationText.classList.remove('post-is-added-visible');
    informationText.classList.add('post-is-added');
  }
  // calling ajax 
  $.ajax({
    type: "POST",
    dataType: "JSON",
    // contentType: false,
    // processData: false,
    // cache: false,
    url: "php/insert.php",
    data: {
      // variable for php: variable from vanilla js
        date: postText[0],
        text: postText[1],
        place: postText[2]
    },
    error: function(response){
      console.log(response);
    },
    success: function (response) {
      console.log(response);
    }
});
}