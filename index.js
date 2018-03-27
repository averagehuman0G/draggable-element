function enableDrag(el) {
  let initalX;
  let initialY;

  el.addEventListener('mousedown', selected);

  function changesBackToDefaultColor(e) {
    //cleans up
    el.removeEventListener('mouseleave', changesBackToDefaultColor);
    if (el.style.backgroundColor === 'skyblue') {
      el.style.backgroundColor = 'lightgrey';
    }
  }

  // * - When mouse selects element, it becomes color tomato.
  el.addEventListener('click', function() {
    el.style.backgroundColor = 'tomato';
  });
  //* - When mouse hovers the element, it becomes color skyblue.
  el.addEventListener('mouseover', function() {
    el.addEventListener('mouseleave', changesBackToDefaultColor);
    el.style.backgroundColor = 'skyblue';
  });

  function selected(e) {
    //mousemove is on the document since the mouse might move at a faster speed than our element
    //and because the event bubbles we can catch it on the document
    document.addEventListener('mousemove', movingMouse);
    //On mouseup we are no longer moving and don't need to have a mousemove listener
    document.addEventListener('mouseup', endDrag);
    //take the inital position of the mouse to calculate the new position of the box at the end
    initalX = e.offsetX;
    initialY = e.offsetY;
  }
  function movingMouse(e) {
    const currentXPosition = e.clientX - initalX;
    const currentYPosition = e.clientY - initialY;
    el.style.top = currentYPosition + 'px';
    el.style.left = currentXPosition + 'px';
  }
  function endDrag() {
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('mousemove', movingMouse);
  }
}

enableDrag(document.getElementById('box'));
