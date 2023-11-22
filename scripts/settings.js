const input1Value = document.getElementById('p1name').value;
const input2Value = document.getElementById('p2name').value;

if (input1Value && input2Value) {
  localStorage.setItem('p1name', input1Value);
  localStorage.setItem('p2name', input2Value);
} else {
  alert('Please enter names');
}