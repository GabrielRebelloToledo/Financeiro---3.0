export interface Transacoes{
    
    id?: string,
    tipoLancamento: string,
    categoria: string,
    tipotransacao: string,
    parcelas: number,
    cartao: string,
    dataTransacao: string,
    dataPPagamento: string,
    pago_recebido: number,
    valor: number,
    historico: string,
    
}