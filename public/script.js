 const form = document.getElementById('uploadForm');
        form.onsubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const msgDiv = document.getElementById('mensaje');
            msgDiv.innerText = "Procesando... por favor espera.";
            msgDiv.style.color = "blue";

            try {
                const response = await fetch('/api/migrate', {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();
                msgDiv.innerText = result.message || result.error;
                msgDiv.style.color = response.ok ? "green" : "red";
            } catch (error) {
                msgDiv.innerText = "Error de conexión con el servidor";
                msgDiv.style.color = "red";
            }
        };