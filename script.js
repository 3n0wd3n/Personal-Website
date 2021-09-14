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
//   console.log(parentOfInputFields[0].value, "test");
  var postText = []
  for (var i = 0; i < parentOfInputFields.length; i++){
  //console.log(parentOfInputFields[i].value, parentOfInputFields[i])
    var value = parentOfInputFields[i].value;
    postText.push(value);
  }
//   console.log(typeof postText[0])
 if (postText[0] != "" & postText[1] != "" & postText[2] != ""){
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
  console.log("Sending works!")
 }
 else{
  var arrayForBadInputs = []
  // console.log(postText.length);
  for (var i = 0; i <  postText.length - 1; i++){
//    console.log(postText[i])
   if (postText[i] == ""){
    arrayForBadInputs.push(i);
   }
  }
  console.log(arrayForBadInputs);
  console.log("nevyplnil jsi všechna pole!")
  var somethingMissing = document.createElement('p');
  // somethingMissing.textContent = 'Nejsou vyplněna všechna pole !';
  var formPost = document.querySelector('.form-post');
//   console.log(formPost[0], formPost);
  formPost.appendChild(somethingMissing);
  setTimeout(showError, 3500)
  function showError() {
   formPost.removeChild(somethingMissing);
  }
 }
 parentOfInputFields[0].value = "";
 parentOfInputFields[1].value = "";
 parentOfInputFields[2].value = "";
 console.log("Count of bad inputs",arrayForBadInputs.length);
 for (var i = 0; i < arrayForBadInputs.length; i++) {
  //  takže jsem si vytvořil cyklus kde budu chtít aby se obarvovali jen rámečky polí které nejsou vyplněné
  //  už mám hotové vyselektování těch polí které uživatel nevyplnil pod seznam arrayForBadInputs a budu obarvovat děti od parentOfInptFields rodiče
  //  musím vyřešit to aby se rozsvítili současně
  // console.log(arrayForBadInputs[i])
  // parentOfInputFields
  badInputIndex = arrayForBadInputs[i];
  console.log(parentOfInputFields[badInputIndex]);
  badInput = parentOfInputFields[badInputIndex];
  // console.log(badInput);
  badInput.style.border = "2px solid";
  badInput.style.borderColor = "#eca1a6";
 }
 setTimeout(hide, 1500)
  function hide() {
    for (i = 0; i < arrayForBadInputs.length; i++){
      badInputIndex2 = arrayForBadInputs[i];
      // console.log(parentOfInputFields[badInputIndex]);
      badInput2 = parentOfInputFields[badInputIndex2];
      badInput2.style.border = "none";
    }
  }
}