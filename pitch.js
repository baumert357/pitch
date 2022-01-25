(function () {

  // the pitch
  const pitch = parseInt(document.getElementById("pitch").innerHTML);

  // the reading
  let reading = document.getElementById("reading").innerHTML;

  // the div that contains the reading
  let readingParent = document.getElementById("reading");

  // the reading as an array
  let readingArray = reading.split("");

  // the special characters that will be checked against
  let specialChars = ["ゃ", "ゅ", "ょ"];

  // a place to store the bundled special character(s)
  let specialCharsBundled = [];

  // a place to store the index of the special character(s)
  let index = [];


  // looking for special characters in reading
  for (let i in readingArray) {
    for (let j in specialChars) {
      if (readingArray[i] == specialChars[j]) {
        let a = readingArray.indexOf(specialChars[j]);
        let b = readingArray[a];
        let c = readingArray[a - 1];
        let d = [c + b];
        specialCharsBundled.push(d);
        index.push(a);

        // to prevent the "index bug"
        readingArray.splice(a, 1, " ");
      } else {
        continue;
      }
    }
  }


  // replacing the special character with the bundled characters
  for (let i = 0; i < index.length; i++) {
    let a = specialCharsBundled[i];
    let b = index[i];
    readingArray[b - 1] = a;
  }


  // removing the " " placeholder
  let newReadingArray = [];
  for (let i in readingArray) {
    if (readingArray[i] == " ") {
      continue;
    } else {
      newReadingArray.push(readingArray[i]);
    }
  }
  readingArray = newReadingArray;


  // determines what color the reading should have based on its pitch
  switch (pitch) {

    // red, heiban
    case 0:
      readingParent.style.color = "#dc3545";
      break;

    // green, atamadaka
    case 1:
      readingParent.style.color = "#198754";
      break;

    // yellow, odaka | req. 2 morae
    case readingArray.length:
      readingParent.style.color = "#ffc107";
      break;

    default:

      // blue, nakadaka | req. 3 morae
      if (pitch < readingArray.length) {
        readingParent.style.color = "#0d6efd";

        // adds a dashed line above the character on which the pitch will fall afterwards
        let readingChar = readingArray[pitch - 1];
        readingArray[pitch - 1] = "<span style='display: inline-block; border-top: 1px dashed #0d6efd;'>" + readingChar + "</span>";
        reading = readingArray.join("");
        document.getElementById("reading").innerHTML = reading;
        break;
      }
  }
})();