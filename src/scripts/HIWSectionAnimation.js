if (document.documentElement.clientWidth > 900) {
  window.addEventListener('scroll', sectionAnimationOnScroll);
  window.addEventListener('resize', getSizeValues);
}

const container = document.querySelector('.sticky-container');
const stickyElement = document.querySelector('.sticky-element');
const dottedLine = document.querySelector('.dotted-lines');
const arrowLeft = document.querySelector('.left-arrow');

const card1 = document.querySelector('.card.card1');
const card2 = document.querySelector('.card.card2');
const card3 = document.querySelector('.card.card3');
const card4 = document.querySelector('.card.card4');
const card5 = document.querySelector('.card.card5');

let viewportHeight = stickyElement.offsetHeight;
let topLineLength = dottedLine.offsetWidth;
let rightLineLength = dottedLine.offsetHeight;
let bottomLineLength = dottedLine.offsetWidth;
let totalLength = topLineLength + bottomLineLength + rightLineLength;

let topLineLengthAnimationProportion = (topLineLength / totalLength) * 100;
let rightLineLengthAnimationProportion = (rightLineLength / totalLength) * 100;
let bottomLineLengthAnimationProportion = (bottomLineLength / totalLength) * 100;

function getSizeValues() {
  viewportHeight = stickyElement.offsetHeight;
  topLineLength = dottedLine.offsetWidth;
  rightLineLength = dottedLine.offsetHeight;
  bottomLineLength = dottedLine.offsetWidth;
  totalLength = topLineLength + bottomLineLength + rightLineLength;
  
  topLineLengthAnimationProportion = (topLineLength / totalLength) * 100;
  rightLineLengthAnimationProportion = (rightLineLength / totalLength) * 100;
  bottomLineLengthAnimationProportion = (bottomLineLength / totalLength) * 100;
}

function sectionAnimationOnScroll() {
  if (document.documentElement.clientWidth <= 900)
    return;
  const sectionScrollFromTop = container.offsetTop;
  const scrollY = window.scrollY;
  const scrollPinDistance = container.offsetHeight;

  const scrollYEnd = sectionScrollFromTop + scrollPinDistance - viewportHeight;
  let scrollPercentage = 0;

  if (scrollY > sectionScrollFromTop && scrollY < scrollYEnd) {
    scrollPercentage = ((scrollY - sectionScrollFromTop) / (scrollPinDistance - viewportHeight)) * 100;
    let topLineLengthPercentage = 0;
    let rightLineLengthPercentage = 0;
    let bottomLineLengthPercentage = 0;
    if (scrollPercentage < topLineLengthAnimationProportion) {
      topLineLengthPercentage = (scrollPercentage / topLineLengthAnimationProportion) * 100;
      rightLineLengthPercentage = 0;
      bottomLineLengthPercentage = 0;
    }
    else if (scrollPercentage > topLineLengthAnimationProportion && scrollPercentage < topLineLengthAnimationProportion + rightLineLengthAnimationProportion) {
      rightLineLengthPercentage = ((scrollPercentage - topLineLengthAnimationProportion) / rightLineLengthAnimationProportion) * 100;
      topLineLengthPercentage = 100;
      bottomLineLengthPercentage = 0;
    }
    else if (scrollPercentage > topLineLengthAnimationProportion + rightLineLengthAnimationProportion) {
      topLineLengthPercentage = 100;
      rightLineLengthPercentage = 100;
      bottomLineLengthPercentage = ((scrollPercentage - topLineLengthAnimationProportion - rightLineLengthAnimationProportion) / bottomLineLengthAnimationProportion) * 100;
    }

    if (topLineLengthPercentage >= 25) {
      card1.classList.add('active');
    }
    else {
      card1.classList.remove('active');
    }
    if (topLineLengthPercentage >= 50) {
      card2.classList.add('active');
    }
    else {
      card2.classList.remove('active');
    }
    if (topLineLengthPercentage >= 75) {
      card3.classList.add('active');
    }
    else {
      card3.classList.remove('active');
    }
    if (bottomLineLengthPercentage >= 33) {
      card4.classList.add('active');
    }
    else {
      card4.classList.remove('active');
    }
    if (bottomLineLengthPercentage >= 66) {
      card5.classList.add('active');
    }
    else {
      card5.classList.remove('active');
    }

    if (scrollPercentage == 100) {
      arrowLeft.classList.add('active');
    }
    else {
      arrowLeft.classList.remove('active');
    }

    dottedLine.style.setProperty('--topLinePercentage', topLineLengthPercentage + '%');
    dottedLine.style.setProperty('--rightLinePercentage', rightLineLengthPercentage + '%');
    dottedLine.style.setProperty('--bottomLinePercentage', bottomLineLengthPercentage + '%');
  }
  else if (scrollY > scrollYEnd) {
    arrowLeft.classList.add('active');
    dottedLine.style.setProperty('--bottomLinePercentage', '100%');
  }
}