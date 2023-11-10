import Conta from "../types/Conta.js";
import { FormatoData } from "../types/FormatoData.js";
import { GrupoTransacao } from "../types/GrupoTransacao.js";
import { formatarData, formatarMoeda } from "../utils/formatters.js";

const elementoRegistroTransacoesExtrato: HTMLElement = document.querySelector(".extrato .registro-transacoes");

renderizarExtrato();
function renderizarExtrato(): void {
    const GrupoTransacao: GrupoTransacao[] = Conta.getGrupoTransacoes();
    elementoRegistroTransacoesExtrato.innerHTML = "";

    let htmlRegistroTransacoes:string = "";

    for(let GruposTransacao of GrupoTransacao) {
        let htmlTransacaoItem: string = "";
        for (let transacao of GruposTransacao.transacoes)     
        {
            htmlTransacaoItem += `
                <div class="transacao-item">
                    <div class="transacao-info">
                        <span class="tipo">Transferência</span>
                        <strong class="valor">-R$ 36,00</strong>
                </div>
                <time class="data">04/09</time>
            </div>
            `;
        }
        htmlRegistroTransacoes += `
        <div class="transacoes-group">
            <strong class="mes-group">${GruposTransacao.label}</strong>
            ${htmlTransacaoItem}
        </div>
    `;
    }
    if (htmlRegistroTransacoes == "") {
    elementoRegistroTransacoesExtrato.innerHTML = htmlRegistroTransacoes;
    }
}

