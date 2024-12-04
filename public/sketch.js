//post
document.addEventListener('DOMContentLoaded', () => {
document.getElementById('textForm').addEventListener('submit', async () => {
    preventDefault();
    const input = document.getElementById('userInput').value;

    // Send data to the server
    const response = await fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: userInput,
    });

    const result = await response.text();
    alert(result);
})
});


//get
document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/results');
    const data = await response.text();

    // Dynamically update HTML
    document.getElementById('simplified').innerHTML = data;
});