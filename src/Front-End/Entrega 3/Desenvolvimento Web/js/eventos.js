document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM pronto e eventos.js carregado');
    const tipoSelect = document.getElementById('cadastroTipo');
    const formEvento = document.getElementById('formEvento');
    const formCurso = document.getElementById('formCurso');

if (tipoSelect && formEvento && formCurso) {
    tipoSelect.addEventListener('change', () => {
        const valor = tipoSelect.value;

        if (valor === 'curso') {
            formEvento.style.display = 'none';
            formCurso.style.display = 'block';
        } else {
            formCurso.style.display = 'none';
            formEvento.style.display = 'block';
        }
    });
}
// Abrir o modal ao clicar no botão
    const addEventBtn = document.getElementById('addEventBtn');
    const modal = document.getElementById('eventModal');

    if (addEventBtn && modal) {
        addEventBtn.addEventListener('click', () => {
            modal.classList.add('active'); // ativa exibição com transição
        });
    } else {
        console.error('Botão ou modal não encontrado');
    }

    // Fechar o modal ao clicar no X
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.remove('active'); // esconde o modal
        });
    });

    // Envio do formulário
    const form = document.getElementById('eventForm')
    
    const imageInput = document.getElementById('eventImage');
    const previewImage = document.getElementById('previewImage');

if (imageInput && previewImage) {
    imageInput.addEventListener('change', () => {
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                previewImage.src = reader.result;
                previewImage.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            previewImage.src = '';
            previewImage.style.display = 'none';
        }
    });
}

    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const token = localStorage.getItem('token'); // precisa estar salvo após login

            const formData = new FormData();
            formData.append('titulo', document.getElementById('eventTitle').value);
            formData.append('descricao', document.getElementById('eventDescription').value);
            formData.append('data', document.getElementById('eventDate').value);
            formData.append('local', document.getElementById('eventLocal').value);
            formData.append('imagem', document.getElementById('eventImage').files[0]);

            try {
                const response = await fetch('http://localhost:3000/api/eventos', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    body: formData
                });

                const result = await response.json();

                if (!response.ok) {
                    alert('Erro ao criar evento: ' + result.message);
                    return;
                }

                alert('Evento criado com sucesso!');
                form.reset();
                modal.classList.remove('active');
            } catch (error) {
                alert('Erro na requisição: ' + error.message);
            }
        });
    }
});
