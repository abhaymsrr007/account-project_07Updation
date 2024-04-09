
function ConvertToUpperCase(obj) {
    let keys = Object.keys(obj);
  keys.forEach(key => {
    if (typeof obj[key] === "string") {
      obj[key] = obj[key].toUpperCase();
    }
    else {
      obj[key] = obj[key];
    }
    })
    return obj;
}



function convertKeysToCamelCase(obj) {
          const camelCasedObj = {};
          for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
              // Use a regular expression to convert snake_case to camelCase
              const camelKey = key.replace(/_([a-z])/g, (match, group1) => group1.toUpperCase());
              camelCasedObj[camelKey] = obj[key];
            }
          }
          return camelCasedObj;
}
        

function convertCamelToReadable(obj) {
  if (typeof obj !== 'object') {
    return obj;
  }
  // console.log(obj);
  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key) ) {
      const words = key.replace(/([a-z])([A-Z])/g, '$1 $2'); // Add space before capital letters
      const formattedKey = words.charAt(0).toUpperCase() + words.slice(1); // Capitalize the first letter
      // console.log(formattedKey);
      result[formattedKey] = obj[key] !== null ? convertCamelToReadable(obj[key]):"";
    }
  }
  return result;
}

var th = ['', 'thousand', 'million', 'billion', 'trillion'];
var dg = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
var tn = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
var tw = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
function toWords(s) {
  s = s?.toString();
  s = s?.replace(/[\, ]/g, '');
  if (s != parseFloat(s)) return;
  var x = s.indexOf('.');
  // var z = parseFloat(Number(s).toFixed(2)) ;
  var z = parseInt((s - parseInt(s)) * 100);
  // console.log("objectssdsdsd", typeof z);
  if (x == -1) x = s.length;
  if (x > 15) return 'too big';
  var n = s.split('');
  var str = '';
  var sk = 0;
  for (var i = 0; i < x; i++) {
    if ((x - i) % 3 == 2) {
      if (n[i] == '1') {
        str += tn[Number(n[i + 1])] + ' ';
        i++;
        sk = 1;
      }
      else if (n[i] != 0) {
        str += tw[n[i] - 2] + ' ';
        sk = 1;
      }
    }
    else if (n[i] != 0) {
      str += dg[n[i]] + ' ';
      if ((x - i) % 3 == 0) str += 'hundred ';
      sk = 1;
    }

    if ((x - i) % 3 == 1) {
      if (sk) str += th[(x - i - 1) / 3] + ' ';
      sk = 0;
    }
  }
  // if (z.length > 0 || !z) {
  //   str += " only";
  // } else {
  if (x != s.length) {
    str += 'rupees ';
    str += toWords(z);
    // Check if there is a fractional part
    str += z != 0 || x != s.length - 1 ? ' paisa' : ' only';
  }

  // }
  return str.replace(/\s+/g, ' ');
}


