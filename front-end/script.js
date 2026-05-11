function checkStatus() {
    fetch("http://backend:5000/api/status")
        .then(res => res.json())
        .then(data => {
            document.getElementById("status").innerText = data.message;
        })
        .catch(() => {
            document.getElementById("status").innerText = "API Not Running";
        });
}