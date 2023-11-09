import { formatarData, formatarMoeda } from "../utils/formaters.js";
import { FormatoData } from "../types/FormatoData.js";
import Conta from "../types/contas.js";

const elementoSaldo = document.querySelector(".saldo-valor .valor") as HTMLElement;
const elementoDataAcesso = document.querySelector(".block-saldo time") as HTMLElement;
 
if (elementoDataAcesso != null) {
    const dataAcesso: Date = new Date();
    elementoDataAcesso.textContent = formatarData(dataAcesso, FormatoData.DIA_SEMANA_DIA_MES_ANO)
}

 
renderizarSaldo();
function renderizarSaldo (): void {
    if (elementoSaldo != null) {
        elementoSaldo.textContent = formatarMoeda(Conta.getSaldo())
    }
}

const saldoComponente = {
    atualizar() {
        renderizarSaldo();
    }
}

export default saldoComponente;