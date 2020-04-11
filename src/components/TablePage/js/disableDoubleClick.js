const disableTripleClick = true;

let down = Date.now();
let oldDown = down;


function disableDoubleClick(e) {
  const time = Date.now();

  if ((time - down) < 500 && (disableTripleClick || (down - oldDown) > 500)) {

    oldDown = down;
    down = time;

    e.preventDefault();
  }

  oldDown = down;
  down = time;
}

export default disableDoubleClick;
