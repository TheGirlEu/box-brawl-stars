let linksGenerados = 0;

        function encodeMessage(message) {
            return btoa(message);
        }

        function generarLink() {
            const mensaje = document.getElementById('mensajeInput').value.trim();
            const caja = document.getElementById('tipoCaja').value;
            const cantidad = document.getElementById('cantidad').value;

            if (!mensaje || !cantidad) {
                alert("🚨 Por favor, completa todos los campos.");
                return;
            }

            const cantidadNum = parseInt(cantidad);

            // Validación de cantidad según tipo de caja
            if ((caja === "Caja Brawl" && (cantidadNum < 1 || cantidadNum > 2)) ||
                (caja === "Caja Grande" && (cantidadNum < 3 || cantidadNum > 4)) ||
                (caja === "Megacaja" && (cantidadNum < 5 || cantidadNum > 7))) {
                alert("🚨 Cantidad no válida para la caja seleccionada.");
                return;
            }

            const datos = `${mensaje}|${caja}|${cantidad}`;
            const encoded = encodeMessage(datos);
            const enlace = `caja.html?msg=${encoded}`;

            const linkCopy = document.getElementById('linkCopy');
            linkCopy.textContent = enlace;
            document.getElementById('linkResult').style.display = "block";

            navigator.clipboard.writeText(enlace).then(() => {
                alert("🚀✨ Link generado!");
            });

            linksGenerados++;
            document.getElementById('counterLinks').textContent = `Links generados: ${linksGenerados}`;
        }

        document.getElementById('generarBtn').addEventListener('click', generarLink);

        document.getElementById('linkCopy').addEventListener('click', function () {
            const enlace = this.textContent;
            navigator.clipboard.writeText(enlace).then(() => {
                alert("🚀✨ Link copiado!");
            });
        });