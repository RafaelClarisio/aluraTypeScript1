import Conta from "../types/Conta.js";
const elementoRegistroTransacoesExtrato = document.querySelector(".extrato .registro-transacoes");
renderizarExtrato();
function renderizarExtrato() {
    const GrupoTransacao = Conta.getGrupoTransacoes();
    elementoRegistroTransacoesExtrato.innerHTML = "";
    let htmlRegistroTransacoes = "";
    for (let GruposTransacao of GrupoTransacao) {
        let htmlTransacaoItem = "";
        for (let transacao of GruposTransacao.transacoes) {
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
