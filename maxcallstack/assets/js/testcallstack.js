// Define HTML title
const setTitle = 'Get Max Call Stack';
window.document.title = setTitle;

let i = 0;
function inc() {
  i++;
  inc();
}
    
try {
  inc();
}
catch(e) {
  i++;
  console.log('Maximum stack size is', i, 'in your current browser');
}