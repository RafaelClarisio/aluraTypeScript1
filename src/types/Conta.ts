import { Transacao } from "./Transacao.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { GrupoTransacao } from "./GrupoTransacao.js";

let saldo: number = JSON.parse(localStorage.getItem("saldo")) || 0;
const transacoes: Transacao[] = JSON.parse(localStorage.getItem("transacoes"), (key:string, value:string) => {
    if (key == "data") {
        return new Date(value);
    }

    return value;
}) || [];

function debitar (valor:number): void {
    if (valor <= 0) {
        throw new Error("O valor a ser debitado deve ser maior que 0 !");
    } else if (valor > saldo) {
    throw new Error("Saldo Insuficiente !")
    }
    saldo -= valor;

    localStorage.setItem("saldo", saldo.toString());
}

function depositar (valor:number): void {
    if ( valor <= 0) {
        throw new Error("O valor a ser depositado deve ser maior que 0 !")
    }
    saldo += valor;

    localStorage.setItem("saldo", saldo.toString());
}

const Conta = {
    getSaldo() {
        return saldo;
    },

    getDataAcesso(): Date {
        return new Date();
    },

    getGrupoTransacoes(): GrupoTransacao[] {
        const GrupoTransacao: GrupoTransacao[] = [];
        const listaTransacoes: Transacao[] = structuredClone(transacoes);
        const transacoesOrdenadas: Transacao[] = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime())
        let labelAtualGrupoTransacao: string = "";

        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao: string = transacao.data.toLocaleDateString("pt-br", {month: "long", year: "numeric"});
            if (labelAtualGrupoTransacao !== labelGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao;
                GrupoTransacao.push({
                    label: labelGrupoTransacao,
                    transacoes: []
                });
            }
            GrupoTransacao.at(-1).transacoes.push(transacao);
        }
        return GrupoTransacao;
    },

    registrarTransacao(novaTransacao: Transacao): void {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            depositar(novaTransacao.valor)
        } 
        else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            debitar(novaTransacao.valor);
        } 
        else {
            throw new Error("Tipo de Transação é inválido!");
        }
        transacoes.push(novaTransacao);
        console.log(this.getGrupoTransacoes());
        localStorage.setItem("transacoes", JSON.stringify(transacoes));
    }
}

export default Conta;