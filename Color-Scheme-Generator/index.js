document.getElementById("get-scheme").addEventListener('click', function() {
    const mode = document.getElementById("mode-select").value;
    const color = document.getElementById("color-picker").value.slice(1)
    const url = `https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}&count=5`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("color-scheme")
            container.innerHTML = ''
            data.colors.forEach(color => {
                const div = document.createElement("div");
                div.style.backgroundColor = color.hex.value
                div.style.height = "140px"
                div.style.width = "40px"
                div.style.marginRight = "10px"
                container.appendChild(div)
            })
            
        })

})

