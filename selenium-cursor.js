class Cursor {

  constructor() {
    let cursor = document.createElement("img");
    cursor.setAttribute('src', 'data:image/png;base64,'
      + 'iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAQAAACGG/bgAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAA'
      + 'HsYAAB7GAZEt8iwAAAAHdElNRQfgAwgMIwdxU/i7AAABZklEQVQ4y43TsU4UURSH8W+XmYwkS2I0'
      + '9CRKpKGhsvIJjG9giQmliHFZlkUIGnEF7KTiCagpsYHWhoTQaiUUxLixYZb5KAAZZhbunu7O/PKf'
      + 'e+fcA+/pqwb4DuximEqXhT4iI8dMpBWEsWsuGYdpZFttiLSSgTvhZ1W/SvfO1CvYdV1kPghV68a3'
      + '0zzUWZH5pBqEui7dnqlFmLoq0gxC1XfGZdoLal2kea8ahLoqKXNAJQBT2yJzwUTVt0bS6ANqy1ga'
      + 'VCEq/oVTtjji4hQVhhnlYBH4WIJV9vlkXLm+10R8oJb79Jl1j9UdazJRGpkrmNkSF9SOz2T71s7M'
      + 'SIfD2lmmfjGSRz3hK8l4w1P+bah/HJLN0sys2JSMZQB+jKo6KSc8vLlLn5ikzF4268Wg2+pPOWW6'
      + 'ONcpr3PrXy9VfS473M/D7H+TLmrqsXtOGctvxvMv2oVNP+Av0uHbzbxyJaywyUjx8TlnPY2YxqkD'
      + 'dAAAAABJRU5ErkJggg==');
    cursor.setAttribute('id', 'selenium_cursor');
    cursor.setAttribute('style', 'position: absolute; z-index: 99999999999; pointer-events: none; left:0; top:0');
    document.body.appendChild(cursor);
    document.onmousemove = function (e) {
      e = e || window.event;
      document.getElementById("selenium_cursor").style.left = e.pageX + 'px';
      document.getElementById("selenium_cursor").style.top = e.pageY + 'px';
    }
  }

  sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

  log(text) {
    console.log(text);
  }

  async moveToTarget(target, speed = 1, offsetX = 0.5, offsetY = 0.5) {
    if (!target) {
      this.log("No valid target to move to");
      return;
    }
    let steps = 50;
    let cur = document.getElementById("selenium_cursor");
    let x0 = cur.getBoundingClientRect().x;
    let y0 = cur.getBoundingClientRect().y;
    let br = target.getBoundingClientRect();
    let y1 = br.y + br.height * offsetY;
    let x1 = br.x + br.width * offsetX;
    let dx = (x1 - x0) / steps;
    let dy = (y1 - y0) / steps;
    let distance = Math.sqrt((x0-x1)*(x0-x1)+(y0-y1)*(y0-y1));
    let delay = distance / 2000 / speed * steps;
    let ii = 0;
    for (ii = 0; ii <= steps; ii = ii + 1) {
      cur.style.left = x0 + (ii * dx) + "px";
      cur.style.top = y0 +  (ii * dy) + "px";
      await this.sleep(delay);
    }
  }

  log(msg){
    console.log(msg);
  }

  async moveToId(id, speed, offsetX, offsetY) {
    this.log("move cursor to ID: " + id);
    let target = document.getElementById(id);
    if(!target) {
      this.log("No element by ID: " + id);
      return;
    }
    await this.moveToTarget(target, speed, offsetX, offsetY);
  }

  async moveToName(name, speed, offsetX, offsetY) {
    this.log("move cursor to name: " + name);
    let target = document.getElementsByName(name);
    if(!target) {
      this.log("No element by ID: " + id);
      return;
    }
    if(target.length > 1) {
      this.log("More than 1 elements by name: " + name);
    }
    await this.moveToTarget(target[0], speed, offsetX, offsetY);
  }

  async moveToCss(css, speed, offsetX, offsetY) {
    this.log("move cursor to CSS: " + css);
    let pos = css.indexOf(":nth-child(");
    let targets = null;
    if(pos == -1) {
      targets = document.getElementsByClassName(css);
    } else {
      targets = document.getElementsByClassName(css.substring(0,pos));
    }
    if(!targets || targets.length == 0) {
      this.log("No elements with CSS: " + css);
      return;
    }
    let target = null;
    if (targets.length > 1) {
      this.log("More than 1 elements by CSS: " + css);
      let index = css.substring(pos).replace(":nth-child(","").replace(")","");
      this.log("CSS index: " + index);
      target = targets[index - 1];
    } else {
      target = targets[0];
    }
    await this.moveToTarget(target, speed, offsetX, offsetY);
  }
}

document.cursor = new Cursor();

