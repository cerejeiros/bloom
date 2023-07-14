export default function checkPassword(input: string) {
    if (!/[0-9]/.test(input)) {
        alert("A senha deve conter pelo menos um número e uma letra maiúscula");
        return false;
    }

    // Verifica se a senha contém pelo menos uma letra maiúscula
    if (!/[A-Z]/.test(input)) {
        alert("A senha deve conter  pelo menos uma letra maiúscula");
        return false;
    }

    // Verificar se tem no minimo 6 caracteres.
    if (input.length < 6) {
        alert("A senha deve conter no mínimo 6 caracteres");
        return false;
    }

    return true;
}
